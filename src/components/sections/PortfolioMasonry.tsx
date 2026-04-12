import fs from "fs";
import path from "path";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export default function PortfolioMasonry() {
  const dir = path.join(process.cwd(), "public", "images", "portfolio");
  const files = fs.readdirSync(dir).filter((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );
  const images = shuffle(files);

  return (
    <div
      style={{
        columns: "3 320px",
        columnGap: "2px",
        lineHeight: 0,
        marginTop: "2px",
        marginBottom: 0,
      }}
    >
      {images.map((file) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={file}
          src={`/images/portfolio/${encodeURIComponent(file)}`}
          alt=""
          loading="lazy"
          style={{
            width: "100%",
            display: "block",
            marginBottom: "2px",
            breakInside: "avoid",
          }}
        />
      ))}
    </div>
  );
}