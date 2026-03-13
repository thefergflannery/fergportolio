import projectsData from "./projects.json";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;  // ACF tagline — shown in project list and detail page
  type: string;      // category label (unused in UI, kept for metadata)
  services: string;  // ACF field-project-services
  url?: string;
  intro?: string;    // ACF field-intro
  extended?: string; // ACF field-extended
  featuredImage: string;
  featuredImageWidth: number;
  featuredImageHeight: number;
  thumbnailImage: string;
}

export const projects: Project[] = projectsData as Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
