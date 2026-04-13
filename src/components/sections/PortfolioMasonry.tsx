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

// Repeating span pattern — col × row units
// dense flow fills all gaps automatically regardless of image count
const PATTERN: { col: number; row: number }[] = [
  { col: 1, row: 2 }, // tall
  { col: 1, row: 1 }, // square
  { col: 1, row: 1 }, // square
  { col: 2, row: 1 }, // wide landscape
  { col: 1, row: 1 }, // square
  { col: 1, row: 3 }, // very tall
  { col: 1, row: 1 }, // square
  { col: 2, row: 2 }, // large square
  { col: 1, row: 1 }, // square
  { col: 1, row: 2 }, // tall
  { col: 2, row: 1 }, // wide landscape
  { col: 1, row: 1 }, // square
];

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
          grid-auto-rows: 140px;
          grid-auto-flow: dense;
          gap: 0;
        }
        .portfolio-grid img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 130px;
          }
        }
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 120px;
          }
          /* On mobile wide items fill full width */
          .portfolio-grid .span-col-2 { grid-column: span 2 !important; }
          .portfolio-grid .span-col-3 { grid-column: span 2 !important; }
        }
      `}</style>
      <div className="portfolio-grid">
        {images.map((file, i) => {
          const { col, row } = PATTERN[i % PATTERN.length];
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={file}
              src={`/images/portfolio/${encodeURIComponent(file)}`}
              alt=""
              loading="lazy"
              className={`span-col-${col}`}
              style={{
                gridColumn: col > 1 ? `span ${col}` : undefined,
                gridRow: row > 1 ? `span ${row}` : undefined,
              }}
            />
          );
        })}
      </div>
    </>
  );
}