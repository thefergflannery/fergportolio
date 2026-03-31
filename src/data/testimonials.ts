export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "john",
    quote:
      "The design work that ferg produces is always of the highest quality & super creative. What he delivers from our brief exceeds our expectations",
    author: "John Fitzgerald",
    company: "Siar & Subterranean Soul",
  },
  {
    id: "dave",
    quote:
      "Worked with Ferg on the design and development of our new website. It was a pleasure to work with him—he showed great patience throughout the process, a willingness to go the extra mile, and always went above and beyond. Highly recommend!",
    author: "Dave Beirne",
    company: "CEO & Co-Founder, Collectiv",
  },
];
