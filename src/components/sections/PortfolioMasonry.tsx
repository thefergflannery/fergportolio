import fs from "fs";
import path from "path";
import sharp from "sharp";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

// Grid constants
const COLS = 5;       // desktop columns
const ROW_PX = 80;    // one row unit in px — smaller = more resolution for tall images
const COL_PX = 320;   // approx px per column at ~1600px viewport

interface ImageCell {
  file: string;
  colSpan: number;
  rowSpan: number;
}

async function buildCells(files: string[], dir: string): Promise<ImageCell[]> {
  const results: ImageCell[] = [];

  for (const file of files) {
    let width = 1;
    let height = 1;

    try {
      const meta = await sharp(path.join(dir, file)).metadata();
      width = meta.width ?? 1;
      height = meta.height ?? 1;
    } catch {
      // fallback to square if sharp can't read
    }

    const ratio = width / height;

    // Assign col span based on orientation / aspect ratio
    let colSpan: number;
    if (ratio >= 1.6) {
      colSpan = 2; // landscape — take 2 cols
    } else if (ratio <= 0.75) {
      colSpan = 1; // portrait — single col, let rows carry the height
    } else {
      colSpan = 1; // near-square
    }

    // Row span: how many ROW_PX units does this image need at colSpan columns?
    // naturalHeight = (colSpan * COL_PX) / ratio
    const naturalH = (colSpan * COL_PX) / ratio;
    const rowSpan = Math.max(1, Math.round(naturalH / ROW_PX));

    results.push({ file, colSpan, rowSpan });
  }

  return results;
}

export default async function PortfolioMasonry() {
  const dir = path.join(process.cwd(), "public", "images", "portfolio");
  const files = fs.readdirSync(dir).filter((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );

  const shuffled = shuffle(files);
  const cells = await buildCells(shuffled, dir);

  return (
    <>
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(${COLS}, 1fr);
          grid-auto-rows: ${ROW_PX}px;
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
          }
        }
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .portfolio-grid .span-col-2 {
            grid-column: span 2 !important;
          }
        }
      `}</style>
      <div className="portfolio-grid">
        {cells.map(({ file, colSpan, rowSpan }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={file}
            src={`/images/portfolio/${encodeURIComponent(file)}`}
            alt=""
            loading="lazy"
            className={colSpan > 1 ? `span-col-${colSpan}` : undefined}
            style={{
              gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
              gridRow: `span ${rowSpan}`,
            }}
          />
        ))}
      </div>
    </>
  );
}