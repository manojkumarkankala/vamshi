import { stats as staticStats } from '@/data';
import { useCountUp } from '@/hooks';

interface StatsProps {
  stats?: typeof staticStats;
}

export default function Stats({ stats = staticStats }: StatsProps) {
  return (
    <section className="relative z-10 -mt-2 bg-white pb-8 lg:pb-12">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div
      className={`reveal reveal-delay-${index + 1} group rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card`}
    >
      <div className="flex items-baseline gap-1">
        <span
          ref={ref}
          className="font-display text-4xl font-extrabold text-navy-900"
        >
          {animated}
        </span>
        <span className="text-lg font-semibold text-navy-500">{suffix}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-navy-600">{label}</p>
      <div className="mt-4 h-1 w-0 rounded-full bg-accent-500 transition-all duration-700 group-hover:w-full" />
    </div>
  );
}
