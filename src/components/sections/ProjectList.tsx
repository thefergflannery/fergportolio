import Link from "next/link";
import Image from "next/image";
import AnimatedText from "../ui/AnimatedText";
import { projects } from "@/data/projects";

export default function ProjectList() {
  return (
    <div
      id="swork"
      style={{ paddingRight: 0, paddingLeft: 0 }}
    >
      {/* "Selected Work" heading */}
      <div
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <AnimatedText
          as="h2"
          id="selected-work"
          data-aos="slide-up"
          style={{
            textTransform: "uppercase",
            textAlign: "right",
            margin: 0,
            paddingTop: "var(--wp--preset--spacing--40)",
            paddingBottom: "var(--wp--preset--spacing--40)",
          }}
        >
          Selected Work
        </AnimatedText>
      </div>

      {/* Project rows */}
      <div data-aos="slide-up" data-aos-duration="1650">
        <div
          data-aos="slide-up"
          data-aos-duration="900"
          data-aos-easing="ease-out"
          data-aos-mirror="true"
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              textTransform: "uppercase",
            }}
          >
            {projects.map((project) => (
              <li key={project.slug}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    borderBottom: "1px solid #111111",
                    marginTop: "var(--wp--preset--spacing--20)",
                    marginBottom: "var(--wp--preset--spacing--20)",
                    paddingLeft: "var(--wp--preset--spacing--40)",
                    paddingRight: "var(--wp--preset--spacing--40)",
                    gap: "var(--wp--preset--spacing--40)",
                  }}
                  data-scroll-animation-enabled="true"
                  data-scroll-animation-threshold="0.5"
                  data-scroll-animation-duration="1000"
                  data-scroll-animation-delay="0"
                >
                  {/* Project title and thumbnail */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: 0 }}>
                      <Link
                        href={`/projects/${project.slug}`}
                        style={{
                          color: "#111111",
                          textDecoration: "none",
                        }}
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <div
                      className="hover-thumb-source"
                      style={{ width: 100, height: 100 }}
                    >
                      <Image
                        src={project.thumbnailImage}
                        alt={project.title}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover", height: "100px" }}
                      />
                    </div>
                  </div>

                  {/* Project type */}
                  <div>
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: 400,
                        textTransform: "capitalize",
                        fontSize: "var(--wp--preset--font-size--small)",
                      }}
                    >
                      {project.type}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
