import { Phone, MapPin, Mail, Github, Linkedin } from "lucide-solid";

const About = () => {
  return (
    <div class="flex flex-col items-center p-4 md:p-8">
      <div class="max-w-4xl mx-auto text-left">
        <header class="mb-12 text-center flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" alt="Profile Picture" class="w-40 h-40 rounded-full mb-6 object-cover" />
          <h1 class="text-4xl md:text-6xl font-bold text-primary mb-4">About Me</h1>
          <p class="text-lg md:text-xl text-foreground/80 mb-8">
            A passionate developer dedicated to building elegant and effective solutions in the financial technology sector.
          </p>
          
          {/* Contact Information */}
          <div class="w-full max-w-2xl space-y-4">
            {/* Phone and Location */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center gap-3 bg-secondary/20 p-4 rounded-lg">
                <Phone class="w-5 h-5 text-primary flex-shrink-0" />
                <span class="text-sm text-foreground">+593 99 869 5861</span>
              </div>
              <div class="flex items-center gap-3 bg-secondary/20 p-4 rounded-lg">
                <MapPin class="w-5 h-5 text-primary flex-shrink-0" />
                <span class="text-sm text-foreground">Ecuador</span>
              </div>
            </div>
            
            {/* Email */}
            <div class="flex items-center justify-center gap-3 bg-secondary/20 p-4 rounded-lg">
              <Mail class="w-5 h-5 text-primary flex-shrink-0" />
              <a 
                href="mailto:jeferson.narvaez.dev@gmail.com" 
                class="text-sm text-foreground hover:text-primary transition-colors"
              >
                jeferson.narvaez.dev@gmail.com
              </a>
            </div>
            
            {/* Social Links */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://github.com/MegalLink" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center gap-3 bg-secondary/20 p-4 rounded-lg hover:bg-secondary/30 transition-colors group"
              >
                <Github class="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span class="text-sm text-foreground group-hover:text-primary transition-colors">
                  github.com/MegalLink
                </span>
              </a>
              <a 
                href="https://www.linkedin.com/in/jeferson-narvaez-553b90148/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center gap-3 bg-secondary/20 p-4 rounded-lg hover:bg-secondary/30 transition-colors group"
              >
                <Linkedin class="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span class="text-sm text-foreground group-hover:text-primary transition-colors">
                  linkedin.com/in/jeferson-narvaez
                </span>
              </a>
            </div>
          </div>
        </header>

        <section class="mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">Payment Industry Expertise</h2>
          <p class="text-foreground/80 leading-relaxed mb-4">
            Over the past 4+ years, I have specialized in developing robust payment solutions that bridge the gap between financial institutions and merchants. My expertise lies in creating seamless integrations that connect card payment systems with both local and international payment processors.
          </p>
          <p class="text-foreground/80 leading-relaxed mb-4">
            I have successfully implemented payment gateways for prominent local brands including Datafast and Credimatic, ensuring secure and efficient transaction processing for businesses across Ecuador. Additionally, I have extensive experience working with international payment giants like Visa and Mastercard, developing solutions that comply with global security standards.
          </p>
          <p class="text-foreground/80 leading-relaxed">
            My contributions to the payments industry include building scalable APIs with AWS and microservices architecture, optimizing transaction processing speeds, and creating user-friendly interfaces that simplify complex payment workflows for both merchants and end users. Each project has strengthened my understanding of financial regulations, security protocols, and the critical importance of reliability in payment systems.
          </p>
        </section>

        <section class="mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">Code & Life Balance</h2>
          <p class="text-foreground/80 leading-relaxed mb-4">
            My approach to software development centers on creating reusable, clean, and genuinely useful code. I believe that well-crafted code is like a well-organized mind - clear in purpose, efficient in execution, and sustainable over time. Every line I write is guided by principles of maintainability, scalability, and elegance.
          </p>
          <p class="text-foreground/80 leading-relaxed mb-4">
            When I'm not immersed in code, I find balance through diverse pursuits that keep both body and mind sharp. Andinism connects me with nature's raw power and teaches patience and perseverance - qualities that translate directly into tackling complex technical challenges. The mountains remind me that every peak requires careful planning, steady progress, and respect for the environment.
          </p>
          <p class="text-foreground/80 leading-relaxed">
            I'm passionate about exploring new destinations, experiencing different cultures, and broadening my perspective through travel. Regular gym sessions keep me physically strong and mentally focused, creating the energy and clarity needed for deep, creative work. This balanced lifestyle fuels my creativity and helps me approach problems with fresh perspectives and sustained enthusiasm.
          </p>
        </section>

        <section>
          <h2 class="text-3xl font-bold text-foreground mb-4">Life Philosophy</h2>
          <p class="text-foreground/80 leading-relaxed mb-4">
            I believe that true fulfillment comes from finding harmony between purpose and presence. In software development, as in life, I strive to remain mindful of the impact each decision has on the greater whole. Every feature built, every bug fixed, and every optimization made contributes to something larger than itself.
          </p>
          <p class="text-foreground/80 leading-relaxed mb-4">
            Impermanence is a fundamental truth that guides my work - technologies evolve, requirements change, and what seems permanent today may be obsolete tomorrow. This understanding encourages me to build flexible solutions, stay curious about emerging technologies, and maintain a growth mindset. I embrace change as an opportunity for learning rather than a source of stress.
          </p>
          <p class="text-foreground/80 leading-relaxed">
            Compassion and mindful action shape how I collaborate with teams and serve users. I believe that understanding the human element behind every technical requirement leads to better solutions. Whether working with colleagues or designing user experiences, I aim to reduce suffering and increase joy through thoughtful, intentional technology that truly serves people's needs.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
