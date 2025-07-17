import { Button } from "../ui/components/button";
import { Timeline, TimelineItem, TimelineTitle, TimelineSubtitle, TimelineContent } from "../ui/components/timeline";

const Resume = () => {
  return (
    <div class="flex flex-col items-center p-4 md:p-8">
      <div class="max-w-4xl mx-auto w-full">
        <header class="mb-12 text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-primary mb-4">Resume</h1>
          <p class="text-lg md:text-xl text-foreground/80">
            A summary of my professional experience, education, and skills.
          </p>
          <Button size="lg" class="mt-8">Download PDF</Button>
        </header>

        <section class="mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-8 border-b-2 border-border pb-2">Work Experience</h2>
          <Timeline>
            <TimelineItem>
              <TimelineTitle>Senior Developer</TimelineTitle>
              <TimelineSubtitle>Tech Company Inc. | 2020 - Present</TimelineSubtitle>
              <TimelineContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineTitle>Junior Developer</TimelineTitle>
              <TimelineSubtitle>Startup Co. | 2018 - 2020</TimelineSubtitle>
              <TimelineContent>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </section>

        <section class="mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-8 border-b-2 border-border pb-2">Education</h2>
          <Timeline>
            <TimelineItem>
              <TimelineTitle>Master's in Computer Science</TimelineTitle>
              <TimelineSubtitle>University of Technology | 2016 - 2018</TimelineSubtitle>
              <TimelineContent>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </section>

        <section>
          <h2 class="text-3xl font-bold text-foreground mb-8 border-b-2 border-border pb-2">Skills</h2>
          <div class="flex flex-wrap gap-4">
            <span class="bg-secondary text-secondary-foreground py-2 px-4 rounded-full">JavaScript</span>
            <span class="bg-secondary text-secondary-foreground py-2 px-4 rounded-full">React</span>
            <span class="bg-secondary text-secondary-foreground py-2 px-4 rounded-full">Node.js</span>
            <span class="bg-secondary text-secondary-foreground py-2 px-4 rounded-full">SQL</span>
            <span class="bg-secondary text-secondary-foreground py-2 px-4 rounded-full">UI/UX Design</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
