import sideProjectsData from "./side-projects.json";

export interface SideProject {
  title: string;
  subtitle: string;
  href: string;
  thumbnailImage: string;
}

export const sideProjects: SideProject[] = sideProjectsData as SideProject[];
