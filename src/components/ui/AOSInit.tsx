"use client";

import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    // Dynamically import AOS to avoid SSR issues
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 900,
        easing: "ease-out",
        once: false,
        mirror: true,
        offset: 80,
      });
    });

    // Handle .scroll-animate elements with IntersectionObserver
    const els = document.querySelectorAll<HTMLElement>(".scroll-animate");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("scroll-animate--in");
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
