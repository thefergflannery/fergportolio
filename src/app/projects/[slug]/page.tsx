import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} – Ferg Flannery`,
    description: `${project.title} – ${project.services}`,
  };
}

function renderParagraphs(text: string) {
  return text.split("\n\n").map((para, i) => {
    if (para.startsWith("## ")) {
      return (
        <p key={i} style={{ margin: i === 0 ? 0 : "1.5em 0 0.25em", fontWeight: 700 }}>
          {para.slice(3)}
        </p>
      );
    }
    return (
      <p key={i} style={{ margin: i === 0 ? 0 : "1em 0 0" }}>
        {para}
      </p>
    );
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <SiteLayout>
      {/* Title row */}
      <main
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
          marginTop: "var(--wp--preset--spacing--40)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "flex-start",
            paddingTop: "var(--wp--preset--spacing--40)",
            paddingBottom: "var(--wp--preset--spacing--40)",
            gap: "var(--wp--preset--spacing--40)",
          }}
        >
          {/* Title + subtitle + back */}
          <div style={{ flexBasis: "82%", flexShrink: 0 }}>
            <h1
              style={{
                textTransform: "uppercase",
                fontSize: "var(--wp--preset--font-size--xx-large)",
                fontWeight: 800,
                margin: 0,
                color: "#111111",
              }}
            >
              {project.title}
            </h1>

            <p
              className="field-proejct_name"
              style={{
                fontSize: "var(--wp--preset--font-size--small)",
                margin: "var(--wp--preset--spacing--20) 0 var(--wp--preset--spacing--30)",
              }}
            >
              {project.subtitle}
            </p>

            {/* Back button */}
            <Link
              href="/work#swork"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "13px",
                backgroundColor: "color-mix(in srgb, currentColor 20%, transparent)",
                color: "#111111",
                borderRadius: "9999px",
                padding: "10px 16px",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 896 1024"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M463.072 951.070l14.142-14.14c9.372-9.372 9.372-24.568 0-33.942l-356.988-356.988h751.774c13.254 0 24-10.746 24-24v-20c0-13.254-10.746-24-24-24h-751.774l356.988-356.988c9.372-9.372 9.372-24.568 0-33.942l-14.142-14.14c-9.372-9.372-24.568-9.372-33.94 0l-422.102 422.1c-9.372 9.372-9.372 24.568 0 33.942l422.102 422.1c9.372 9.372 24.568 9.372 33.94-0.002z"
                />
              </svg>
              BACK
            </Link>
          </div>

          {/* Down arrow */}
          <div className="project-title-arrow" style={{ flexBasis: "66.66%", display: "flex", justifyContent: "flex-end" }}>
            <Link href="#intro" aria-label="Scroll to project">
              <Image
                src="/images/arrow-circle-detour-down.svg"
                alt=""
                width={68}
                height={68}
              />
            </Link>
          </div>
        </div>
      </main>

      {/* Featured image */}
      <div id="intro">
        <figure style={{ margin: 0, height: "50vh", overflow: "hidden" }}>
          <Image
            src={project.featuredImage}
            alt={project.title}
            width={project.featuredImageWidth}
            height={project.featuredImageHeight}
            priority
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>
      </div>

      {/* Project info */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #111111",
        }}
      >
        <div
          style={{
            maxWidth: "var(--wp--style--global--wide-size)",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "var(--wp--preset--spacing--50)",
            paddingRight: "var(--wp--preset--spacing--50)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              paddingTop: "var(--wp--preset--spacing--40)",
              paddingBottom: "var(--wp--preset--spacing--40)",
              gap: "var(--wp--preset--spacing--40)",
            }}
          >
            {/* Left: Services + Visit */}
            <div
              className="project-info-col-left"
              style={{
                flexBasis: "33.33%",
                flexShrink: 0,
                borderRight: "1px solid var(--wp--preset--color--accent-1)",
              }}
            >
              <p
                style={{
                  textTransform: "uppercase",
                  fontWeight: 700,
                  margin: "0 0 var(--wp--preset--spacing--20)",
                }}
              >
                <strong>Services</strong>
              </p>
              <p
                className="field-project-services"
                style={{
                  fontSize: "var(--wp--preset--font-size--small)",
                  margin: "0 0 var(--wp--preset--spacing--40)",
                }}
              >
                {project.services}
              </p>

              {project.url && (
                <>
                  <p
                    style={{
                      textTransform: "uppercase",
                      fontWeight: 700,
                      margin: "0 0 var(--wp--preset--spacing--20)",
                    }}
                  >
                    <strong>Visit</strong>
                  </p>
                  <p
                    className="field-url"
                    style={{ fontSize: "var(--wp--preset--font-size--small)", margin: 0 }}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit" }}
                    >
                      {project.urlLabel || project.url}
                    </a>
                  </p>
                </>
              )}
            </div>

            {/* Right: intro + extended text */}
            <div
              className="project-info-col-right"
              style={{
                flexBasis: "90%",
                fontSize: "var(--wp--preset--font-size--small)",
                lineHeight: 1.6,
                paddingRight: "var(--wp--preset--spacing--80)",
                paddingLeft: "var(--wp--preset--spacing--40)",
              }}
            >
              {project.intro && (
                <div className="field-intro" style={{ marginBottom: "var(--wp--preset--spacing--40)" }}>
                  {renderParagraphs(project.intro)}
                </div>
              )}
              {project.extended && (
                <div className="field-extended">
                  {renderParagraphs(project.extended)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="project-gallery" style={{ display: "flex", width: "100%" }}>
          {project.galleryImages.map((src, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                aspectRatio: "4/3",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={src}
                alt={`${project.title} – image ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="33vw"
              />
            </div>
          ))}
        </div>
      )}
    </SiteLayout>
  );
}
