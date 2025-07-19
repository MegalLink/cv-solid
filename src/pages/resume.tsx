import { For, Show } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { Button } from "../ui/components/button";
import { Timeline, TimelineItem, TimelineTitle, TimelineSubtitle, TimelineContent } from "../ui/components/timeline";
import { getAllResumeData } from "../services/resumeService";
import type { ResumeItem, Skill } from "../types/resume";

const Resume = () => {
  const resumeData = createQuery(() => ({
    queryKey: ['resume-data'],
    queryFn: getAllResumeData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  }));

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long" 
    });
  };

  const formatDateRange = (fromDate: string, toDate: string | null) => {
    return `${formatDate(fromDate)} - ${formatDate(toDate)}`;
  };

  // Group skills by category
  const skillsByCategory = () => {
    const skills = resumeData.data?.skills || [];
    const grouped: Record<string, Skill[]> = {};
    
    skills.forEach((skill: Skill) => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    
    return grouped;
  };

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

        <Show when={resumeData.isLoading}>
          <div class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p class="mt-4 text-foreground/60">Loading resume data...</p>
          </div>
        </Show>

        <Show when={resumeData.error}>
          <div class="text-center py-8">
            <p class="text-red-500">Error loading resume data. Please try again later.</p>
          </div>
        </Show>

        <Show when={resumeData.data}>
          <section class="mb-12">
            <h2 class="text-3xl font-bold text-foreground mb-8 border-b-2 border-border pb-2">Work Experience</h2>
            <Show 
              when={resumeData.data?.experience && resumeData.data.experience.length > 0}
              fallback={
                <div class="text-center py-8 text-foreground/60">
                  <p>No work experience entries found.</p>
                </div>
              }
            >
              <Timeline>
                <For each={resumeData.data?.experience}>
                  {(item: ResumeItem) => (
                    <TimelineItem>
                      <TimelineTitle>{item.title}</TimelineTitle>
                      <TimelineSubtitle>
                        {item.place_name} | {formatDateRange(item.from_date, item.to_date)}
                      </TimelineSubtitle>
                      <Show when={item.description}>
                        <TimelineContent>
                          {item.description}
                        </TimelineContent>
                      </Show>
                    </TimelineItem>
                  )}
                </For>
              </Timeline>
            </Show>
          </section>

          <section class="mb-12">
            <h2 class="text-3xl font-bold text-foreground mb-8 border-b-2 border-border pb-2">Education</h2>
            <Show 
              when={resumeData.data?.education && resumeData.data.education.length > 0}
              fallback={
                <div class="text-center py-8 text-foreground/60">
                  <p>No education entries found.</p>
                </div>
              }
            >
              <Timeline>
                <For each={resumeData.data?.education}>
                  {(item: ResumeItem) => (
                    <TimelineItem>
                      <TimelineTitle>{item.title}</TimelineTitle>
                      <TimelineSubtitle>
                        {item.place_name} | {formatDateRange(item.from_date, item.to_date)}
                      </TimelineSubtitle>
                      <Show when={item.description}>
                        <TimelineContent>
                          {item.description}
                        </TimelineContent>
                      </Show>
                    </TimelineItem>
                  )}
                </For>
              </Timeline>
            </Show>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-foreground mb-8 border-b-2 border-border pb-2">Skills</h2>
            <Show 
              when={resumeData.data?.skills && resumeData.data.skills.length > 0}
              fallback={
                <div class="text-center py-8 text-foreground/60">
                  <p>No skills found.</p>
                </div>
              }
            >
              <div class="space-y-6">
                <For each={Object.entries(skillsByCategory())}>
                  {([category, skills]: [string, Skill[]]) => (
                    <div>
                      <h3 class="text-xl font-semibold text-foreground mb-3">{category}</h3>
                      <div class="flex flex-wrap gap-3">
                        <For each={skills}>
                          {(skill: Skill) => (
                            <span class="bg-secondary text-secondary-foreground py-2 px-4 rounded-full text-sm">
                              {skill.skill_name}
                            </span>
                          )}
                        </For>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </section>
        </Show>
      </div>
    </div>
  );
};

export default Resume;
