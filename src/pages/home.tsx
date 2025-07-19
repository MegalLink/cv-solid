import { Button } from "../ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/components/card";
import { Briefcase, Code, Database, Palette } from "lucide-solid";
import SkillCard from "../ui/components/skillscard";

const Home = () => {
  return (
    <div class="flex flex-col items-center text-center p-4 md:p-8">
      <header class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold text-primary mb-4">
          Innovative Solutions & Creative Design
        </h1>
        <p class="text-lg md:text-xl text-foreground/80 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button variant="secondary" size="lg">Contact Me</Button>
      </header>

      <section class="w-full max-w-5xl mt-16">
        <h2 class="text-3xl font-bold text-foreground mb-8">Key Skills</h2>
        <div class="grid grid-cols-2 xl:grid-cols-4 gap-8">
          <SkillCard 
            icon={<Palette class="w-12 h-12 text-primary" />} 
            title="UI/UX Design" 
            skills={["Figma", "Adobe XD", "User Research"]} 
            textColorClass="text-primary"
            bgColorClass="bg-secondary"
          />
          <SkillCard 
            icon={<Code class="w-12 h-12 text-primary" />} 
            title="Frontend Dev" 
            skills={["ReactJS", "SolidJS", "VueJS", "TailwindCSS"]} 
            textColorClass="text-primary"
            bgColorClass="bg-secondary"
          />
          <SkillCard 
            icon={<Briefcase class="w-12 h-12 text-primary" />} 
            title="Backend Dev" 
            skills={["Node.js", "Express", "NestJS", "GraphQL"]} 
            textColorClass="text-primary"
            bgColorClass="bg-secondary"
          />
          <SkillCard 
            icon={<Database class="w-12 h-12 text-primary" />} 
            title="Databases" 
            skills={["PostgreSQL", "MongoDB", "MySQL", "Redis"]} 
            textColorClass="text-primary"
            bgColorClass="bg-secondary"
          />
        </div>
      </section>

      <section class="w-full max-w-5xl mt-16">
        <h2 class="text-3xl font-bold text-foreground mb-8">Recent Projects</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <Card>
            <img src="https://images.unsplash.com/photo-1517694712202-1428bc38389a?q=80&w=2070&auto=format&fit=crop" alt="Project One" class="rounded-t-lg" />
            <CardHeader>
              <CardTitle>Project One</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-foreground/80 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <Button variant="outline">View Project</Button>
            </CardContent>
          </Card>
          <Card>
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" alt="Project Two" class="rounded-t-lg" />
            <CardHeader>
              <CardTitle>Project Two</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-foreground/80 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
              <Button variant="outline">View Project</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
