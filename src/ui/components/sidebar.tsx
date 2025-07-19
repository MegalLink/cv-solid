import { Button } from "./button";
import {  Github, Linkedin, Mail, FileText } from "lucide-solid";

const Sidebar = () => {
  return (
      <aside class="hidden lg:flex flex-col w-80 text-primary-foreground p-8 rounded-2xl justify-center glassify">
      <div class="flex flex-col items-center text-center">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
          alt="Jeferson Narváez"
          class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary-foreground/50"
        />
        <h1 class="text-2xl font-bold text-foreground">Jeferson Narváez</h1>
        <p class="text-md text-primary">Desarrollador Web</p>
      </div>
      <div class="flex justify-center gap-4 my-6">
        <a href="#" class="text-foreground hover:text-primary-foreground">
          <Github class="w-6 h-6" />
        </a>
        <a href="#" class="text-foreground hover:text-primary-foreground">
          <Linkedin class="w-6 h-6" />
        </a>
        <a href="#" class="text-foreground hover:text-primary-foreground">
          <Mail class="w-6 h-6" />
        </a>
      </div>
      <Button variant="default" size="lg" class="flex items-center gap-2">
        <FileText class="w-5 h-5" />
        Descargar CV
      </Button>
    </aside>
  );
};

export default Sidebar;
