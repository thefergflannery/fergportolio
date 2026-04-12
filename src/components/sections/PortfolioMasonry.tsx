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

const COLS = 5;
const ROWS_TARGET = 5; // total rows we want

function buildSpans(count: number): number[] {
  // We need: tall*2 + short*1 = COLS * ROWS_TARGET
  // and: tall + short = count
  // → tall = COLS*ROWS_TARGET - count
  const totalUnits = COLS * ROWS_TARGET;
  const tallCount = Math.max(0, totalUnits - count);
  // Distribute tall spans evenly
  const spans = Array(count).fill(1);
  const step = Math.floor(count / (tallCount || 1));
  for (let i = 0; i < tallCount; i++) {
    spans[i * step] = 2;
  }
  return spans;
}

export default function PortfolioMasonry() {
  const dir = path.join(process.cwd(), "public", "images", "portfolio");
  const files = fs.readdirSync(dir).filter((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );
  const images = shuffle(files);
  const spans = buildSpans(images.length);

  return (
    <>
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(${COLS}, 1fr);
          grid-auto-rows: 220px;
          grid-auto-flow: dense;
          gap: 2px;
          margin-top: 2px;
        }
        .portfolio-grid .cell-tall { grid-row: span 2; }
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
        {images.map((file, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={file}
            src={`/images/portfolio/${encodeURIComponent(file)}`}
            alt=""
            loading="lazy"
            className={spans[i] === 2 ? "cell-tall" : undefined}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        ))}
      </div>
    </>
  );
}