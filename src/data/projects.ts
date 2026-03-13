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

export const projects: Project[] = [
  {
    slug: "razorspire",
    title: "Digital That Delivers",
    subtitle: "National Digital Transformation Programme",
    type: "Agency",
    services: "Creative Consultancy, Project Managament",
    url: "https://www.youtube.com/watch?v=jnJiWQp-G1A",
    intro:
      "Digital that Delivers is an initiative by Fáilte Ireland designed to support Irish tourism businesses in improving their digital capability. The programme helps visitor attractions, activity providers and tour operators strengthen their websites, booking systems and overall online presence. It combines expert support with grant funding to enable meaningful digital upgrades.",
    extended:
      "I worked as Lead Digital Consultant and Technical Diagnostic Expert, leading the Website workstream and overseeing delivery under the Website Accessibility Grant Scheme. I conducted structured digital audits across participant websites, with a strong focus on WCAG 2.2 AA accessibility compliance, user experience and booking journeys. I translated findings into clear, prioritised roadmaps and procurement-ready briefs aligned with grant requirements. I also worked between businesses and delivery agencies to review proposals, monitor scope and ensure completed projects met technical and accessibility standards before sign-off.",
    featuredImage: "/images/maxresdefault.jpg",
    featuredImageWidth: 1280,
    featuredImageHeight: 720,
    thumbnailImage: "/images/maxresdefault.jpg",
  },
  {
    slug: "dingle",
    title: "Dingle Oceanworld",
    subtitle: "Deep Atlantic Immersive",
    type: "Brand & Digital",
    services: "Visual Design, Creative Consulting, Project Management, Storyboarding",
    featuredImage: "/images/1681215608222.jpeg",
    featuredImageWidth: 1920,
    featuredImageHeight: 1280,
    thumbnailImage: "/images/1681215608222.jpeg",
  },
  {
    slug: "collectiv",
    title: "Collectiv",
    subtitle: "Website Design & Dev",
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
    subtitle: "Festival Identity",
    type: "Digital & Brand",
    services: "Visual Design, Graphics, Social",
    featuredImage: "/images/645cee4f83c3c95c4e650caf_IMG_3867-p-1600.jpg",
    featuredImageWidth: 1600,
    featuredImageHeight: 1200,
    thumbnailImage: "/images/645cee4f83c3c95c4e650caf_IMG_3867-p-1600.jpg",
  },
  {
    slug: "a11yo",
    title: "A11YO",
    subtitle: "Tool",
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
