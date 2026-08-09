import { useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import CareerObjective from '@/components/CareerObjective';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import WhyWorkWithMe from '@/components/WhyWorkWithMe';
import Education from '@/components/Education';
import Portfolio from '@/components/Portfolio';
import ResumeCTA from '@/components/ResumeCTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Admin from '@/components/Admin';
import { useContent, mapExperiences, mapSkills, mapQualities, mapEducation, mapStats } from '@/useContent';
import { useScrollReveal } from '@/hooks';

function App() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { content, loading } = useContent();
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Admin route: #admin
  if (route === '#admin') {
    return <Admin />;
  }

  const sc = content?.siteContent;
  const profile = sc?.profile;
  const about = sc?.about;
  const objective = sc?.objective;
  const experiences = content ? mapExperiences(content.experiences) : undefined;
  const skills = content ? mapSkills(content.skills) : undefined;
  const qualities = content ? mapQualities(content.qualities) : undefined;
  const education = content ? mapEducation(content.education) : undefined;
  const stats = content ? mapStats(content.stats) : undefined;
  const portfolioItems = content?.portfolioItems ?? [];

  return (
    <div ref={ref} className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero
          profile={profile}
          heroImage={sc?.hero_image_url}
          resumePath={sc?.resume_path}
        />
        <Stats stats={stats} />
        <About
          about={about}
          profile={profile}
          aboutImage={sc?.about_image_url}
        />
        <CareerObjective objective={objective} />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <WhyWorkWithMe qualities={qualities} />
        <Education education={education} />
        <Portfolio portfolioItems={portfolioItems} />
        <ResumeCTA resumePath={sc?.resume_path} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      <SpeedInsights />
    </div>
  );
}

export default App;
