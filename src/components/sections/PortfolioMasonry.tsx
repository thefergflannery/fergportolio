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

// Deterministic span pattern — 2-tall cells break the grid up visually
// Pattern repeats across however many images we have
const SPAN_PATTERN = [2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1];

export default function PortfolioMasonry() {
  const dir = path.join(process.cwd(), "public", "images", "portfolio");
  const files = fs.readdirSync(dir).filter((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );
  const images = shuffle(files);

  return (
    <>
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-auto-rows: 220px;
          gap: 2px;
          margin-top: 2px;
        }
        .portfolio-grid .cell-tall {
          grid-row: span 2;
        }
        @media (max-width: 1024px) {
          .portfolio-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 160px;
          }
        }
      `}</style>
      <div className="portfolio-grid">
        {images.map((file, i) => {
          const span = SPAN_PATTERN[i % SPAN_PATTERN.length];
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={file}
              src={`/images/portfolio/${encodeURIComponent(file)}`}
              alt=""
              loading="lazy"
              className={span === 2 ? "cell-tall" : undefined}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          );
        })}
      </div>
    </>
  );
}