export interface Project {
  slug: string;
  title: string;
  type: string;
  services: string;
  url?: string;
  featuredImage: string;
  featuredImageWidth: number;
  featuredImageHeight: number;
  thumbnailImage: string;
}

export const projects: Project[] = [
  {
    slug: "razorspire",
    title: "Digital That Delivers",
    type: "Agency",
    services: "Brand Strategy, Visual Design, Digital",
    url: "https://razorspire.com",
    featuredImage: "/images/maxresdefault.jpg",
    featuredImageWidth: 1280,
    featuredImageHeight: 720,
    thumbnailImage: "/images/maxresdefault.jpg",
  },
  {
    slug: "dingle",
    title: "Dingle Oceanworld",
    type: "Brand & Digital",
    services: "Brand Identity, Web Design, Digital Marketing",
    featuredImage: "/images/1681215608222.jpeg",
    featuredImageWidth: 1920,
    featuredImageHeight: 1280,
    thumbnailImage: "/images/1681215608222.jpeg",
  },
  {
    slug: "collectiv",
    title: "Collectiv",
    type: "Brand Identity",
    services: "Brand Strategy, Identity Design, Digital",
    featuredImage: "/images/1574877469106.jpeg",
    featuredImageWidth: 1280,
    featuredImageHeight: 800,
    thumbnailImage: "/images/1574877469106.jpeg",
  },
  {
    slug: "siar",
    title: "Siar",
    type: "Digital & Brand",
    services: "Brand Identity, Web Design, UX",
    featuredImage: "/images/645cee4f83c3c95c4e650caf_IMG_3867-p-1600.jpg",
    featuredImageWidth: 1600,
    featuredImageHeight: 1200,
    thumbnailImage: "/images/645cee4f83c3c95c4e650caf_IMG_3867-p-1600.jpg",
  },
  {
    slug: "a11yo",
    title: "A11YO",
    type: "Tool",
    services: "UX, Visual Design, Frontend & Backend Development, Accessibility",
    url: "https://www.a11yo.com/",
    featuredImage: "/images/Document2.png",
    featuredImageWidth: 2560,
    featuredImageHeight: 2240,
    thumbnailImage: "/images/Document2.png",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
