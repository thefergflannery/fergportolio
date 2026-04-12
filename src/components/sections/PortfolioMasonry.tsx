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

/**
 * Returns a col-span for every image so the grid fills completely with no gaps.
 * Full rows get span=1. The last partial row has its images widened to fill COLS.
 *
 * e.g. 31 images, 5 cols → remainder=1 → last image spans 5
 *      32 images, 5 cols → remainder=2 → last two images span 3 + 2
 *      33 images, 5 cols → remainder=3 → last three images span 2 + 2 + 1
 */
function computeSpans(count: number, cols: number): number[] {
  const spans = new Array(count).fill(1);
  const remainder = count % cols;
  if (remainder === 0) return spans;

  const base = Math.floor(cols / remainder);
  const extra = cols % remainder; // first `extra` items get one more column

  for (let i = 0; i < remainder; i++) {
    spans[count - remainder + i] = base + (i < extra ? 1 : 0);
  }
  return spans;
}

export default function PortfolioMasonry() {
  const dir = path.join(process.cwd(), "public", "images", "portfolio");
  const files = fs.readdirSync(dir).filter((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );
  const images = shuffle(files);
  const spans = computeSpans(images.length, COLS);

  return (
    <>
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(${COLS}, 1fr);
          gap: 0;
        }
        .portfolio-grid img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        @media (max-width: 1024px) {
          .portfolio-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 768px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
          .portfolio-grid img { height: 180px; }
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
            style={{
              gridColumn: spans[i] > 1 ? `span ${spans[i]}` : undefined,
            }}
          />
        ))}
      </div>
    </>
  );
}