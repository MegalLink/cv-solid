import { Briefcase, Code, Computer, Palette } from "lucide-solid";
import SkillCard from "../ui/components/skillscard";

const Home = () => {
  return (
    <div class="flex flex-col items-center text-center p-4 md:p-8">
      <header class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold text-primary mb-4">
          Full Stack Developer | 4+ Years of Experience
        </h1>
        <p class="text-lg md:text-xl text-foreground/80 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </header>

      <section class="w-full max-w-5xl mt-16">
        <h2 class="text-3xl font-bold text-foreground mb-8">Key Skills</h2>
        <div class="grid grid-cols-2 xl:grid-cols-4 gap-8">
          <SkillCard 
            icon={<Palette class="w-12 h-12 text-primary" />} 
            title="Architecture" 
            skills={["AWS", "Microservices", "Docker", "Kubernetes"]} 
            textColorClass="text-primary"
            bgColorClass="bg-secondary"
          />
          <SkillCard 
            icon={<Computer class="w-12 h-12 text-primary" />} 
            title="Frontend" 
            skills={["ReactJS", "SolidJS","TailwindCSS"]} 
            textColorClass="text-primary"
            bgColorClass="bg-secondary"
          />
          <SkillCard 
            icon={<Briefcase class="w-12 h-12 text-primary" />} 
            title="Backend" 
            skills={["Node.js", "Express", "NestJS", "Gin"]} 
            textColorClass="text-primary"
            bgColorClass="bg-secondary"
          />
          <SkillCard 
            icon={<Code class="w-12 h-12 text-primary" />} 
            title="Languages" 
            skills={["Typescript", "JavaScript", "Go","Python"]} 
            textColorClass="text-primary"
            bgColorClass="bg-secondary"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
