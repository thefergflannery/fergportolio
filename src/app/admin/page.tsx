"use client";

import { useEffect, useState, useCallback } from "react";

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  services: string;
  url?: string;
  intro?: string;
  extended?: string;
  featuredImage: string;
  featuredImageWidth: number;
  featuredImageHeight: number;
  thumbnailImage: string;
}

const EMPTY: Project = {
  slug: "",
  title: "",
  subtitle: "",
  type: "",
  services: "",
  url: "",
  intro: "",
  extended: "",
  featuredImage: "",
  featuredImageWidth: 1280,
  featuredImageHeight: 720,
  thumbnailImage: "",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  const save = useCallback(async (updated: Project[]) => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  function handleEdit(p: Project) {
    setEditing({ ...p });
    setIsNew(false);
  }

  function handleNew() {
    setEditing({ ...EMPTY });
    setIsNew(true);
  }

  function handleDelete(slug: string) {
    if (!confirm("Delete this project?")) return;
    const updated = projects.filter((p) => p.slug !== slug);
    setProjects(updated);
    save(updated);
  }

  function handleFormSave() {
    if (!editing) return;
    const proj = { ...editing };
    if (!proj.slug) proj.slug = slugify(proj.title);
    // clean up empty strings to undefined
    if (!proj.url) delete proj.url;
    if (!proj.intro) delete proj.intro;
    if (!proj.extended) delete proj.extended;

    let updated: Project[];
    if (isNew) {
      updated = [...projects, proj];
    } else {
      updated = projects.map((p) => (p.slug === proj.slug ? proj : p));
    }
    setProjects(updated);
    setEditing(null);
    save(updated);
  }

  function moveProject(from: number, to: number) {
    const updated = [...projects];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    setProjects(updated);
    save(updated);
  }

  function handleDragStart(i: number) {
    setDragIndex(i);
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    moveProject(dragIndex, i);
    setDragIndex(i);
  }

  function handleDragEnd() {
    setDragIndex(null);
  }

  const field = (label: string, key: keyof Project, textarea = false) => (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", marginBottom: "4px", letterSpacing: "0.05em" }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          value={(editing?.[key] as string) ?? ""}
          onChange={(e) => setEditing((p) => p ? { ...p, [key]: e.target.value } : p)}
          rows={4}
          style={inputStyle}
        />
      ) : (
        <input
          type={key === "featuredImageWidth" || key === "featuredImageHeight" ? "number" : "text"}
          value={(editing?.[key] as string | number) ?? ""}
          onChange={(e) => {
            const val = (key === "featuredImageWidth" || key === "featuredImageHeight")
              ? Number(e.target.value)
              : e.target.value;
            setEditing((p) => p ? { ...p, [key]: val } : p);
          }}
          style={inputStyle}
        />
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", fontFamily: "'Martian Mono', monospace" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#39FF14", borderBottom: "2px solid #111", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/" style={{ fontSize: "11px", fontWeight: 700, color: "#111", textDecoration: "none", textTransform: "uppercase", opacity: 0.6 }}>← Site</a>
          <span style={{ fontSize: "18px", fontWeight: 800, color: "#111", textTransform: "uppercase" }}>Projects Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {saved && <span style={{ fontSize: "11px", fontWeight: 700, color: "#111" }}>Saved ✓</span>}
          {saving && <span style={{ fontSize: "11px", color: "#111", opacity: 0.6 }}>Saving…</span>}
          <button onClick={handleNew} style={btnStyle("#111", "#39FF14")}>
            + New Project
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 32px" }}>

        {/* Project list */}
        {!editing && (
          <>
            <p style={{ fontSize: "11px", color: "#666", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Drag rows to reorder · {projects.length} projects
            </p>
            <div style={{ border: "2px solid #111", borderRadius: "4px", overflow: "hidden", backgroundColor: "#fff" }}>
              {projects.map((p, i) => (
                <div
                  key={p.slug}
                  draggable
                  onDragStart={() => handleDragStart(i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDragEnd={handleDragEnd}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    borderBottom: i < projects.length - 1 ? "1px solid #e5e5e5" : "none",
                    backgroundColor: dragIndex === i ? "#f0ffe8" : "#fff",
                    cursor: "grab",
                    transition: "background-color 0.1s",
                  }}
                >
                  {/* Drag handle */}
                  <span style={{ color: "#bbb", fontSize: "16px", userSelect: "none", cursor: "grab" }}>⠿</span>

                  {/* Thumbnail */}
                  <div style={{ width: "60px", height: "40px", flexShrink: 0, overflow: "hidden", backgroundColor: "#f0f0f0", borderRadius: "2px" }}>
                    {p.thumbnailImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.thumbnailImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
                      {p.subtitle} · <span style={{ color: "#999" }}>/{p.slug}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div style={{ fontSize: "11px", color: "#666", maxWidth: "200px", textAlign: "right", display: "none" }}>
                    {p.services}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <a
                      href={`/projects/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ...smallBtn, backgroundColor: "#f0f0f0", color: "#111" }}
                    >
                      View
                    </a>
                    <button onClick={() => handleEdit(p)} style={{ ...smallBtn, backgroundColor: "#111", color: "#fff" }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.slug)} style={{ ...smallBtn, backgroundColor: "#ff3b30", color: "#fff" }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Edit / New form */}
        {editing && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 800, textTransform: "uppercase" }}>
                {isNew ? "New Project" : `Editing: ${editing.title}`}
              </h2>
              <button onClick={() => setEditing(null)} style={{ ...smallBtn, backgroundColor: "#f0f0f0", color: "#111" }}>
                ← Back
              </button>
            </div>

            <div style={{ backgroundColor: "#fff", border: "2px solid #111", borderRadius: "4px", padding: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                {field("Title", "title")}
                {field("Slug (URL)", "slug")}
                {field("Subtitle (tagline)", "subtitle")}
                {field("Type / Category", "type")}
                {field("Services", "services")}
                {field("Website URL", "url")}
              </div>

              <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px", marginTop: "8px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#666", marginBottom: "16px" }}>Project Description</p>
                {field("Intro paragraph", "intro", true)}
                {field("Extended text", "extended", true)}
              </div>

              <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px", marginTop: "8px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#666", marginBottom: "16px" }}>Images (use /images/filename.jpg paths)</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                  {field("Featured Image path", "featuredImage")}
                  {field("Thumbnail Image path", "thumbnailImage")}
                  {field("Featured Image Width (px)", "featuredImageWidth")}
                  {field("Featured Image Height (px)", "featuredImageHeight")}
                </div>

                {editing.featuredImage && (
                  <div style={{ marginTop: "8px" }}>
                    <p style={{ fontSize: "11px", color: "#666", margin: "0 0 8px" }}>Preview:</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editing.featuredImage} alt="" style={{ maxHeight: "160px", maxWidth: "100%", objectFit: "cover", border: "1px solid #e5e5e5" }} />
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #e5e5e5" }}>
                <button onClick={handleFormSave} style={btnStyle("#fff", "#111")}>
                  {saving ? "Saving…" : "Save Project"}
                </button>
                <button onClick={() => setEditing(null)} style={btnStyle("#111", "#f0f0f0")}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  border: "1.5px solid #ccc",
  borderRadius: "3px",
  fontFamily: "inherit",
  fontSize: "13px",
  backgroundColor: "#fafafa",
  boxSizing: "border-box",
  resize: "vertical",
};

const smallBtn: React.CSSProperties = {
  padding: "6px 12px",
  fontSize: "11px",
  fontWeight: 700,
  fontFamily: "inherit",
  textTransform: "uppercase",
  border: "1.5px solid #111",
  borderRadius: "3px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "0.04em",
};

function btnStyle(color: string, bg: string): React.CSSProperties {
  return {
    padding: "10px 20px",
    fontSize: "12px",
    fontWeight: 700,
    fontFamily: "inherit",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    border: "2px solid #111",
    borderRadius: "3px",
    cursor: "pointer",
    backgroundColor: bg,
    color: color,
  };
}
