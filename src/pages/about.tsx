const About = () => {
  return (
    <div class="flex flex-col items-center p-4 md:p-8">
      <div class="max-w-4xl mx-auto text-left">
        <header class="mb-12 text-center flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" alt="Profile Picture" class="w-40 h-40 rounded-full mb-6 object-cover" />
          <h1 class="text-4xl md:text-6xl font-bold text-primary mb-4">About Me</h1>
          <p class="text-lg md:text-xl text-foreground/80">
            A passionate developer dedicated to building elegant and effective solutions.
          </p>
        </header>

        <section class="mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">My Story</h2>
          <p class="text-foreground/80 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p class="text-foreground/80 leading-relaxed">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
          </p>
        </section>

        <section>
          <h2 class="text-3xl font-bold text-foreground mb-4">My Philosophy</h2>
          <p class="text-foreground/80 leading-relaxed">
            I believe in crafting experiences that are not only functional but also intuitive and enjoyable for the user. My approach is rooted in clean code, user-centric design, and a commitment to continuous learning and improvement. I strive to create products that solve real-world problems and leave a lasting positive impact.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
