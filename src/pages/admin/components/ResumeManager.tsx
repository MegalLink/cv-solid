import { createSignal, createEffect, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Pencil, Trash2, Save, X } from "lucide-solid";
import { createForm } from "@tanstack/solid-form";
import { Button } from "../../../ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/components/card";
import type { ResumeItem, ResumeItemType, ResumeFormData, Skill, SkillFormData } from "../../../types/resume";
import * as resumeService from "../../../services/resumeService";

// Helper component for error messages
const FieldError = (props: { errors?: any }) => {
  if (!props.errors || (Array.isArray(props.errors) && props.errors.length === 0)) return null;
  const errorMessage = Array.isArray(props.errors) ? props.errors[0] : props.errors;
  return <p class="mt-1 text-sm text-destructive">{errorMessage}</p>;
};

type ResumeTabType = 'experience' | 'education';
type TabType = ResumeTabType | 'skills';

export default function ResumeManager() {
  const [activeTab, setActiveTab] = createSignal<TabType>('experience');
  const [resumeItems, setResumeItems] = createStore<Record<ResumeTabType, ResumeItem[]>>({ 
    experience: [], 
    education: [] 
  });
  const [skills, setSkills] = createStore<Skill[]>([]);
  const [isEditing, setIsEditing] = createSignal(false);
  const [editingId, setEditingId] = createSignal<string | null>(null);
  const [isLoading, setIsLoading] = createSignal(false);

  // Create form instances with proper typing and validation
  const resumeForm = createForm(() => ({
    defaultValues: {
      title: '',
      place_name: '',
      from_date: '',
      to_date: '',
      description: '',
      type: activeTab() === 'experience' ? 'Work' : 'Education' as ResumeItemType
    } as ResumeFormData,
    onSubmit: async (values) => {
      await handleResumeSubmit(values.value);
    },
    validators: {
      onSubmit: ({ value }) => {
        const errors: Record<string, string> = {};
        if (!value.title) errors.title = 'Title is required';
        if (!value.place_name) errors.place_name = 'Place name is required';
        if (!value.from_date) errors.from_date = 'From date is required';
        return Object.keys(errors).length > 0 ? errors : undefined;
      }
    }
  }));

  const skillsForm = createForm(() => ({
    defaultValues: {
      skill_name: '',
      category: ''
    } as SkillFormData,
    onSubmit: async (values) => {
      await handleSkillSubmit(values.value);
    },
    validators: {
      onSubmit: ({ value }) => {
        const errors: Record<string, string> = {};
        if (!value.skill_name) errors.skill_name = 'Skill name is required';
        if (!value.category) errors.category = 'Category is required';
        return Object.keys(errors).length > 0 ? errors : undefined;
      }
    }
  }));

  // Load data when tab changes
  createEffect(async () => {
    setIsLoading(true);
    const currentTab = activeTab();
    
    try {
      if (currentTab === 'skills') {
        const skillsData = await resumeService.getSkills();
        setSkills(skillsData);
      } else {
        const type: ResumeItemType = currentTab === 'experience' ? 'Work' : 'Education';
        const items = await resumeService.getResumeItems(type);
        setResumeItems(currentTab, items);
      }
    } catch (error) {
      console.error(`Error loading ${activeTab()} data:`, error);
    } finally {
      setIsLoading(false);
    }
  });

  const loadResumeItems = async () => {
    const currentTab = activeTab();
    if (currentTab !== 'skills') {
      const type: ResumeItemType = currentTab === 'experience' ? 'Work' : 'Education';
      const items = await resumeService.getResumeItems(type);
      setResumeItems(currentTab, items);
    }
  };

  const loadSkills = async () => {
    const skillsData = await resumeService.getSkills();
    setSkills(skillsData);
  };

  // Reset resume form
  const resetResumeForm = () => {
    resumeForm.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  // Reset skills form
  const resetSkillsForm = () => {
    skillsForm.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  // Handle resume form submission
  const handleResumeSubmit = async (values: ResumeFormData) => {
    try {
      setIsLoading(true);
      // Map tab to correct database type
      const currentTab = activeTab();
      const dbType: ResumeItemType = currentTab === 'experience' ? 'Work' : 'Education';
      
      const data = {
        type: dbType,
        title: values.title,
        place_name: values.place_name,
        from_date: values.from_date,
        to_date: values.to_date || null,
        description: values.description
      };

      console.log('Submitting data:', data); // Debug log

      if (isEditing() && editingId()) {
        await resumeService.updateResumeItem(editingId()!, data);
      } else {
        await resumeService.addResumeItem(data);
      }

      await loadResumeItems();
      resetResumeForm();
    } catch (error: any) {
      console.error("Error saving resume item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle skills form submission
  const handleSkillSubmit = async (values: SkillFormData) => {
    try {
      setIsLoading(true);
      
      if (isEditing() && editingId()) {
        await resumeService.updateSkill(editingId()!, values);
      } else {
        await resumeService.addSkill(values);
      }
      
      await loadSkills();
      resetSkillsForm();
    } catch (error: any) {
      console.error("Error saving skill:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const editItem = (item: ResumeItem | Skill) => {
    if ('category' in item) {
      // Editing a skill
      skillsForm.setFieldValue('category', item.category);
      skillsForm.setFieldValue('skill_name', item.skill_name);
    } else {
      // Editing a resume item
      resumeForm.setFieldValue('title', item.title || '');
      resumeForm.setFieldValue('place_name', item.place_name);
      resumeForm.setFieldValue('from_date', item.from_date);
      resumeForm.setFieldValue('to_date', item.to_date || '');
      resumeForm.setFieldValue('description', item.description || '');
      // Don't set type as it will be derived from the active tab
    }
    setIsEditing(true);
    setEditingId(item.id);
  };

  const deleteItem = async (id: string, type: 'resume' | 'skill') => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setIsLoading(true);
      
      if (type === 'skill') {
        await resumeService.deleteSkill(id);
        setSkills(skills.filter(skill => skill.id !== id));
      } else {
        await resumeService.deleteResumeItem(id);
        const currentTab = activeTab();
        if (currentTab !== 'skills') {
          setResumeItems(currentTab, resumeItems[currentTab].filter(item => item.id !== id));
        }
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render the resume form fields using TanStack Form best practices
  const renderResumeForm = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          resumeForm.handleSubmit();
        }}
        class="space-y-6"
      >
        <resumeForm.Field name="title">
          {(field) => (
            <div class="space-y-2">
              <label for="resume-title" class="block text-sm font-medium text-foreground">
                Title <span class="text-destructive">*</span>
              </label>
              <input
                id="resume-title"
                name="title"
                value={field().state.value}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.currentTarget.value)}
                class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <FieldError errors={field().state.meta.errors} />
            </div>
          )}
        </resumeForm.Field>
        
        <resumeForm.Field name="place_name">
          {(field) => (
            <div class="space-y-2">
              <label for="resume-place-name" class="block text-sm font-medium text-foreground">
                {activeTab() === 'experience' ? 'Company' : 'Institution'} Name <span class="text-destructive">*</span>
              </label>
              <input
                id="resume-place-name"
                name="place_name"
                value={field().state.value}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.currentTarget.value)}
                class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <FieldError errors={field().state.meta.errors} />
            </div>
          )}
        </resumeForm.Field>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <resumeForm.Field name="from_date">
            {(field) => (
              <div class="space-y-2">
                <label for="resume-from-date" class="block text-sm font-medium text-foreground">
                  From Date <span class="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  id="resume-from-date"
                  name="from_date"
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onInput={(e) => field().handleChange(e.currentTarget.value)}
                  class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
                <FieldError errors={field().state.meta.errors} />
              </div>
            )}
          </resumeForm.Field>
          
          <resumeForm.Field name="to_date">
            {(field) => (
              <div class="space-y-2">
                <label for="resume-to-date" class="block text-sm font-medium text-foreground">
                  To Date (leave empty for current)
                </label>
                <input
                  type="date"
                  id="resume-to-date"
                  name="to_date"
                  value={field().state.value || ''}
                  onBlur={field().handleBlur}
                  onInput={(e) => field().handleChange(e.currentTarget.value)}
                  class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}
          </resumeForm.Field>
        </div>
        
        <resumeForm.Field name="description">
          {(field) => (
            <div class="space-y-2">
              <label for="resume-description" class="block text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                id="resume-description"
                name="description"
                rows={4}
                value={field().state.value || ''}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.currentTarget.value)}
                class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          )}
        </resumeForm.Field>
        
        <div class="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={resetResumeForm}
          >
            <X class="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading() || resumeForm.state.isSubmitting}
          >
            {isLoading() || resumeForm.state.isSubmitting ? (
              <>
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {resumeForm.state.isSubmitting ? 'Saving...' : 'Loading...'}
              </>
            ) : (
              <>
                <Save class="h-4 w-4 mr-2" />
                {isEditing() ? 'Update' : 'Save'}
              </>
            )}
          </Button>
        </div>
      </form>
    );
  };

  // Render the skills form fields using TanStack Form best practices
  const renderSkillsForm = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          skillsForm.handleSubmit();
        }}
        class="space-y-6"
      >
        <skillsForm.Field name="category">
          {(field) => (
            <div class="space-y-2">
              <label for="skills-category" class="block text-sm font-medium text-foreground">
                Category <span class="text-destructive">*</span>
              </label>
              <input
                id="skills-category"
                name="category"
                value={field().state.value}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.currentTarget.value)}
                class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <FieldError errors={field().state.meta.errors} />
            </div>
          )}
        </skillsForm.Field>
        
        <skillsForm.Field name="skill_name">
          {(field) => (
            <div class="space-y-2">
              <label for="skills-skill-name" class="block text-sm font-medium text-foreground">
                Skill Name <span class="text-destructive">*</span>
              </label>
              <input
                id="skills-skill-name"
                name="skill_name"
                value={field().state.value}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.currentTarget.value)}
                class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <FieldError errors={field().state.meta.errors} />
            </div>
          )}
        </skillsForm.Field>
        
        <div class="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={resetSkillsForm}
          >
            <X class="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading() || skillsForm.state.isSubmitting}
          >
            {isLoading() || skillsForm.state.isSubmitting ? (
              <>
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {skillsForm.state.isSubmitting ? 'Saving...' : 'Loading...'}
              </>
            ) : (
              <>
                <Save class="h-4 w-4 mr-2" />
                {isEditing() ? 'Update' : 'Save'}
              </>
            )}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div class="flex flex-col items-center p-4 md:p-8">
      <div class="max-w-5xl mx-auto w-full space-y-8">
        {/* Tabs */}
        <div class="border-b border-border">
          <nav class="-mb-px flex space-x-8">
            {(['experience', 'education', 'skills'] as const).map((tab) => (
              <button
                onClick={() => setActiveTab(tab)}
                class={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab() === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground/60 hover:text-foreground hover:border-primary/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Card */}
        <Card class="glassify">
          <CardHeader>
            <CardTitle>
              {isEditing() ? 'Edit' : 'Add New'} {activeTab() === 'skills' ? 'Skill' : activeTab().slice(0, -1)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Show when={activeTab() === 'skills'} fallback={renderResumeForm()}>
              {renderSkillsForm()}
            </Show>
          </CardContent>
        </Card>

        {/* List Card */}
        <Card class="glassify">
          <CardHeader>
            <CardTitle>
              {activeTab() === 'skills' ? 'Skills' : `${activeTab() === 'experience' ? 'Experience' : 'Education'} History`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading() ? (
              <div class="flex justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div class="space-y-4">
                {activeTab() === 'skills' ? (
                  <div class="space-y-4">
                    {skills.length === 0 ? (
                      <p class="text-foreground/60 text-center py-8">No skills added yet.</p>
                    ) : (
                      <div class="space-y-6">
                        {Array.from(new Set(skills.map(skill => skill.category))).map(category => (
                          <div>
                            <h3 class="text-lg font-semibold text-foreground mb-3">{category}</h3>
                            <div class="flex flex-wrap gap-2">
                              <For each={skills.filter(skill => skill.category === category)}>
                                {(skill) => (
                                  <div class="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-full">
                                    <span class="text-sm">{skill.skill_name}</span>
                                    <button
                                      type="button"
                                      onClick={() => editItem(skill)}
                                      class="text-foreground/60 hover:text-primary transition-colors"
                                      title="Edit"
                                    >
                                      <Pencil class="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteItem(skill.id, 'skill')}
                                      class="text-foreground/60 hover:text-destructive transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 class="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                )}
                              </For>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div class="space-y-4">
                    {(activeTab() === 'experience' ? resumeItems.experience : resumeItems.education).length === 0 ? (
                      <p class="text-foreground/60 text-center py-8">No {activeTab()} history added yet.</p>
                    ) : (
                      <div class="space-y-4">
                        <For each={activeTab() === 'experience' ? resumeItems.experience : resumeItems.education}>
                          {(item) => (
                            <Card class="glassify">
                              <CardContent class="p-6">
                                <div class="flex items-start justify-between">
                                  <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                      <h3 class="text-lg font-semibold text-foreground">
                                        {item.title}
                                      </h3>
                                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                        {item.type}
                                      </span>
                                    </div>
                                    <p class="text-sm font-medium text-foreground/80 mb-1">
                                      {item.place_name}
                                    </p>
                                    <p class="text-sm text-foreground/60 mb-3">
                                      {new Date(item.from_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {item.to_date ? new Date(item.to_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                                    </p>
                                    {item.description && (
                                      <p class="text-sm text-foreground/70">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => editItem(item)}
                                      class="text-foreground/60 hover:text-primary transition-colors p-2"
                                      title="Edit"
                                    >
                                      <Pencil class="h-4 w-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteItem(item.id, 'resume')}
                                      class="text-foreground/60 hover:text-destructive transition-colors p-2"
                                      title="Delete"
                                    >
                                      <Trash2 class="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </For>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
