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
    id: "mary",
    quote: "Working with Ferg was an absolute pleasure. His creative vision and attention to detail brought our brand to life in ways we hadn't imagined.",
    author: "Mary",
    company: "",
  },
];
