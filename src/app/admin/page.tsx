"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  services: string;
  url?: string;
  urlLabel?: string;
  intro?: string;
  extended?: string;
  featuredImage: string;
  featuredImageWidth: number;
  featuredImageHeight: number;
  thumbnailImage: string;
  galleryImages?: string[];
}

const EMPTY: Project = {
  slug: "",
  title: "",
  subtitle: "",
  type: "",
  services: "",
  url: "",
  urlLabel: "",
  intro: "",
  extended: "",
  featuredImage: "",
  featuredImageWidth: 1280,
  featuredImageHeight: 720,
  thumbnailImage: "",
  galleryImages: ["", "", ""],
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ── Image upload widget ─────────────────────────────────────────────────────
function ImageUpload({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (path: string) => void;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFile(file: File) {
    setUploadError("");

    const allowed = ["image/jpeg", "image/png", "image/gif"];
    if (!allowed.includes(file.type)) {
      setUploadError("Only JPG, PNG, GIF allowed.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError("Max file size is 8 MB.");
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setUploadError(data.error || "Upload failed.");
      return;
    }

    const { path } = await res.json();
    onChange(path);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", marginBottom: "4px", letterSpacing: "0.05em" }}>
        {label}
      </label>

      {/* Path text field */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/filename.jpg"
          style={{ ...inputStyle, flex: 1 }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            ...smallBtn,
            backgroundColor: "#39FF14",
            color: "#111",
            border: "1.5px solid #111",
            whiteSpace: "nowrap",
            opacity: uploading ? 0.6 : 1,
            flexShrink: 0,
          }}
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.gif"
        style={{ display: "none" }}
        onChange={handleInputChange}
      />

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          marginTop: "6px",
          border: "1.5px dashed #ccc",
          borderRadius: "3px",
          padding: "8px 12px",
          fontSize: "11px",
          color: "#999",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#fafafa",
        }}
        onClick={() => inputRef.current?.click()}
      >
        Drop JPG / PNG / GIF here, or click to browse
      </div>

      {uploadError && (
        <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#ff3b30" }}>{uploadError}</p>
      )}

      {/* Preview */}
      {value && (
        <div style={{ marginTop: "8px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            style={{ maxHeight: "120px", maxWidth: "100%", objectFit: "cover", border: "1px solid #e5e5e5", borderRadius: "2px" }}
          />
        </div>
      )}
    </div>
  );
}

// ── Main admin page ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
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

  const persist = useCallback(async (updated: Project[]) => {
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

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function handleEdit(p: Project) {
    setEditing({
      ...p,
      galleryImages: p.galleryImages?.length ? p.galleryImages : ["", "", ""],
    });
    setIsNew(false);
  }

  function handleNew() {
    setEditing({ ...EMPTY });
    setIsNew(true);
  }

  function handleDelete(slug: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    const updated = projects.filter((p) => p.slug !== slug);
    setProjects(updated);
    persist(updated);
  }

  function handleFormSave() {
    if (!editing) return;
    const proj = { ...editing };
    if (!proj.slug) proj.slug = slugify(proj.title);
    if (!proj.url) delete proj.url;
    if (!proj.urlLabel) delete proj.urlLabel;
    if (!proj.intro) delete proj.intro;
    if (!proj.extended) delete proj.extended;
    // Filter empty gallery slots
    if (proj.galleryImages) {
      proj.galleryImages = proj.galleryImages.filter(Boolean);
      if (!proj.galleryImages.length) delete proj.galleryImages;
    }

    let updated: Project[];
    if (isNew) {
      updated = [...projects, proj];
    } else {
      updated = projects.map((p) => (p.slug === proj.slug ? proj : p));
    }
    setProjects(updated);
    setEditing(null);
    persist(updated);
  }

  function moveProject(from: number, to: number) {
    const updated = [...projects];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    setProjects(updated);
    persist(updated);
  }

  function handleDragStart(i: number) { setDragIndex(i); }
  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    moveProject(dragIndex, i);
    setDragIndex(i);
  }
  function handleDragEnd() { setDragIndex(null); }

  // Helper: simple text field
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
          {!editing && (
            <button onClick={handleNew} style={btnStyle("#111", "#111", "#39FF14")}>
              + New Project
            </button>
          )}
          <button
            onClick={handleLogout}
            style={{ ...smallBtn, backgroundColor: "transparent", color: "#111", border: "1.5px solid #111", opacity: 0.6 }}
          >
            Sign Out
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
                  <span style={{ color: "#bbb", fontSize: "16px", userSelect: "none" }}>⠿</span>

                  <div style={{ width: "60px", height: "40px", flexShrink: 0, overflow: "hidden", backgroundColor: "#f0f0f0", borderRadius: "2px" }}>
                    {p.thumbnailImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.thumbnailImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                    <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
                      {p.subtitle} · <span style={{ color: "#999" }}>/{p.slug}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <a href={`/projects/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ ...smallBtn, backgroundColor: "#f0f0f0", color: "#111" }}>
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

              {/* Core fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                {field("Title", "title")}
                {field("Slug (URL)", "slug")}
                {field("Subtitle (tagline)", "subtitle")}
                {field("Type / Category", "type")}
                {field("Services", "services")}
                {field("Website URL", "url")}
                {field("URL Label (e.g. Visit Instagram)", "urlLabel")}
              </div>

              {/* Description */}
              <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px", marginTop: "8px" }}>
                <p style={sectionLabel}>Project Description</p>
                {field("Intro paragraph", "intro", true)}
                {field("Extended text (use ## for subheadlines, blank line between paragraphs)", "extended", true)}
              </div>

              {/* Images */}
              <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px", marginTop: "8px" }}>
                <p style={sectionLabel}>Images</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                  <ImageUpload
                    label="Featured Image"
                    value={editing.featuredImage}
                    onChange={(path) => setEditing((p) => p ? { ...p, featuredImage: path } : p)}
                  />
                  <ImageUpload
                    label="Thumbnail Image"
                    value={editing.thumbnailImage}
                    onChange={(path) => setEditing((p) => p ? { ...p, thumbnailImage: path } : p)}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                  {field("Featured Image Width (px)", "featuredImageWidth")}
                  {field("Featured Image Height (px)", "featuredImageHeight")}
                </div>
              </div>

              {/* Gallery images */}
              <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px", marginTop: "8px" }}>
                <p style={sectionLabel}>Gallery Images (up to 3)</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 24px" }}>
                  {[0, 1, 2].map((i) => (
                    <ImageUpload
                      key={i}
                      label={`Gallery ${i + 1}`}
                      value={editing.galleryImages?.[i] ?? ""}
                      onChange={(path) =>
                        setEditing((p) => {
                          if (!p) return p;
                          const imgs = [...(p.galleryImages ?? ["", "", ""])];
                          imgs[i] = path;
                          return { ...p, galleryImages: imgs };
                        })
                      }
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #e5e5e5" }}>
                <button onClick={handleFormSave} style={btnStyle("#fff", "#111", "#111")}>
                  {saving ? "Saving…" : "Save Project"}
                </button>
                <button onClick={() => setEditing(null)} style={btnStyle("#111", "#f0f0f0", "#111")}>
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

// ── Styles ──────────────────────────────────────────────────────────────────
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

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#666",
  marginBottom: "16px",
  marginTop: 0,
};

function btnStyle(color: string, bg: string, border: string): React.CSSProperties {
  return {
    padding: "10px 20px",
    fontSize: "12px",
    fontWeight: 700,
    fontFamily: "inherit",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    border: `2px solid ${border}`,
    borderRadius: "3px",
    cursor: "pointer",
    backgroundColor: bg,
    color: color,
  };
}