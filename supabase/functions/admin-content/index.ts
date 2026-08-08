import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ADMIN_PASSWORD = "VAMSHI@123";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function checkPassword(req: Request): boolean {
  const auth = req.headers.get("X-Admin-Password");
  return auth === ADMIN_PASSWORD;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/admin-content/, "");

    // GET — public read of all content
    if (req.method === "GET" && (path === "" || path === "/" || path === "/all")) {
      const [siteContent, experiences, skills, education, qualities, stats, portfolioItems] =
        await Promise.all([
          supabase.from("site_content").select("*").eq("id", 1).maybeSingle(),
          supabase.from("experiences").select("*").order("sort_order"),
          supabase.from("skills").select("*").order("sort_order"),
          supabase.from("education").select("*").order("sort_order"),
          supabase.from("qualities").select("*").order("sort_order"),
          supabase.from("stats").select("*").order("sort_order"),
          supabase.from("portfolio_items").select("*").order("sort_order"),
        ]);

      return json({
        site_content: siteContent.data,
        experiences: experiences.data,
        skills: skills.data,
        education: education.data,
        qualities: qualities.data,
        stats: stats.data,
        portfolio_items: portfolioItems.data,
      });
    }

    // All mutations require the admin password
    if (!checkPassword(req)) {
      return json({ error: "Unauthorized: invalid admin password" }, 401);
    }

    const body = await req.json().catch(() => ({}));
    const { action } = body as { action: string };

    // ===== Upload image to storage =====
    if (action === "upload-image") {
      const { base64, fileName, contentType, field } = body as {
        base64: string;
        fileName: string;
        contentType: string;
        field: string;
      };
      if (!base64 || !fileName) {
        return json({ error: "Missing base64 or fileName" }, 400);
      }
      const clean = base64.replace(/^data:[^;]+;base64,/, "");
      const bin = Uint8Array.from(atob(clean), (c) => c.charCodeAt(0));
      const path = `${field}/${Date.now()}-${fileName}`;
      const { data: up, error: upErr } = await supabase.storage
        .from("portfolio-images")
        .upload(path, bin, { contentType, upsert: true });
      if (upErr) return json({ error: upErr.message }, 500);
      const { data: pub } = supabase.storage.from("portfolio-images").getPublicUrl(path);
      return json({ url: pub.publicUrl, path });
    }

    // ===== Upload document (resume, PDF, Word, etc.) =====
    if (action === "upload-file") {
      const { base64, fileName, contentType, field } = body as {
        base64: string;
        fileName: string;
        contentType: string;
        field: string;
      };
      if (!base64 || !fileName) {
        return json({ error: "Missing base64 or fileName" }, 400);
      }
      const clean = base64.replace(/^data:[^;]+;base64,/, "");
      const bin = Uint8Array.from(atob(clean), (c) => c.charCodeAt(0));
      const path = `${field}/${Date.now()}-${fileName}`;
      const { error: upErr } = await supabase.storage
        .from("portfolio-images")
        .upload(path, bin, { contentType, upsert: true });
      if (upErr) return json({ error: upErr.message }, 500);
      const { data: pub } = supabase.storage.from("portfolio-images").getPublicUrl(path);
      return json({ url: pub.publicUrl, path });
    }

    // ===== site_content (single row) =====
    if (action === "update-site-content") {
      const updates = body as Record<string, unknown>;
      const allowed: Record<string, unknown> = {};
      for (const k of ["profile", "about", "objective", "hero_image_url", "about_image_url", "resume_path"]) {
        if (k in updates) allowed[k] = updates[k];
      }
      const { data, error } = await supabase
        .from("site_content")
        .upsert({ id: 1, ...allowed })
        .select()
        .maybeSingle();
      if (error) return json({ error: error.message }, 500);
      return json({ data });
    }

    // ===== Generic collection CRUD =====
    const collections = ["experiences", "skills", "education", "qualities", "stats", "portfolio_items"] as const;
    type Collection = (typeof collections)[number];

    function isCollection(v: string): v is Collection {
      return (collections as readonly string[]).includes(v);
    }

    const table = body.table as string;
    if (!isCollection(table)) {
      return json({ error: "Unknown table" }, 400);
    }

    if (action === "upsert") {
      const rows = body.rows as Record<string, unknown>[];
      if (!Array.isArray(rows)) return json({ error: "rows must be an array" }, 400);
      const { data, error } = await supabase.from(table).upsert(rows).select();
      if (error) return json({ error: error.message }, 500);
      return json({ data });
    }

    if (action === "delete") {
      const { id } = body as { id: string };
      if (!id) return json({ error: "Missing id" }, 400);
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ success: true });
    }

    if (action === "reorder") {
      const items = body.items as { id: string; sort_order: number }[];
      if (!Array.isArray(items)) return json({ error: "items must be an array" }, 400);
      for (const it of items) {
        await supabase.from(table).update({ sort_order: it.sort_order }).eq("id", it.id);
      }
      return json({ success: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
