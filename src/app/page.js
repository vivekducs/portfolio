import DashboardLayout from "@/components/DashboardLayout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import EngineeringHub from "@/components/EngineeringHub";
import Certifications from "@/components/Certifications";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import AchievementWall from "@/components/AchievementWall";

export default function Home() {
  return (
    <DashboardLayout>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <EngineeringHub />
      <Experience />
      <AchievementWall />
      <Certifications />
      <Stats />
      <Contact />
    </DashboardLayout>
  );
}
