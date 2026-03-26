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
    company: "SIAR",
  },
  {
    id: "dave",
    quote: "Good design isn't decoration. It's clarity, restraint, and purpose working together.",
    author: "Dave Bernie",
    company: "Collectiv",
  },
];
