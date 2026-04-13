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

// Approximate column widths at each breakpoint
const DESKTOP_COLS = 5;
const TABLET_COLS  = 4;
const MOBILE_COLS  = 2;

const ROW_PX      = 80;   // grid-auto-rows base unit
const VIEWPORT_W  = 1600; // desktop reference
const TABLET_W    = 1024;
const MOBILE_W    = 390;

interface ImageCell {
  file: string;
  ratio: number;
  colSpan: number;       // desktop col span
  colSpanMd: number;     // tablet col span
  colSpanSm: number;     // mobile col span
  rowSpan: number;       // desktop row span
  rowSpanMd: number;     // tablet row span
  rowSpanSm: number;     // mobile row span
}

function calcRowSpan(ratio: number, colSpan: number, totalCols: number, viewportW: number): number {
  const colW = viewportW / totalCols;
  const naturalH = (colSpan * colW) / ratio;
  return Math.max(1, Math.round(naturalH / ROW_PX));
}

async function buildCells(files: string[], dir: string): Promise<ImageCell[]> {
  const results: ImageCell[] = [];

  for (const file of files) {
    let w = 1, h = 1;
    try {
      const meta = await sharp(path.join(dir, file)).metadata();
      w = meta.width ?? 1;
      h = meta.height ?? 1;
    } catch { /* fallback square */ }

    const ratio = w / h;

    // Desktop: landscape gets 2 cols, everything else 1
    const colSpan   = ratio >= 1.6 ? 2 : 1;
    // Tablet: same logic but capped at 4
    const colSpanMd = ratio >= 1.6 ? 2 : 1;
    // Mobile: landscape fills both columns, portrait stays 1
    const colSpanSm = ratio >= 1.3 ? 2 : 1;

    results.push({
      file,
      ratio,
      colSpan,
      colSpanMd,
      colSpanSm,
      rowSpan:   calcRowSpan(ratio, colSpan,   DESKTOP_COLS, VIEWPORT_W),
      rowSpanMd: calcRowSpan(ratio, colSpanMd, TABLET_COLS,  TABLET_W),
      rowSpanSm: calcRowSpan(ratio, colSpanSm, MOBILE_COLS,  MOBILE_W),
    });
  }

  return results;
}

export default async function PortfolioMasonry() {
  const dir = path.join(process.cwd(), "public", "images", "portfolio");
  const files = fs.readdirSync(dir).filter((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );

  const cells = await buildCells(shuffle(files), dir);

  return (
    <>
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(${DESKTOP_COLS}, 1fr);
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
          grid-column: var(--col-span);
          grid-row:    var(--row-span);
        }
        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(${TABLET_COLS}, 1fr);
          }
          .portfolio-grid img {
            grid-column: var(--col-span-md);
            grid-row:    var(--row-span-md);
          }
        }
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(${MOBILE_COLS}, 1fr);
          }
          .portfolio-grid img {
            grid-column: var(--col-span-sm);
            grid-row:    var(--row-span-sm);
          }
        }
      `}</style>
      <div className="portfolio-grid">
        {cells.map(({ file, colSpan, colSpanMd, colSpanSm, rowSpan, rowSpanMd, rowSpanSm }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={file}
            src={`/images/portfolio/${encodeURIComponent(file)}`}
            alt=""
            loading="lazy"
            style={{
              "--col-span":    colSpan   > 1 ? `span ${colSpan}`   : "auto",
              "--row-span":    `span ${rowSpan}`,
              "--col-span-md": colSpanMd > 1 ? `span ${colSpanMd}` : "auto",
              "--row-span-md": `span ${rowSpanMd}`,
              "--col-span-sm": colSpanSm > 1 ? `span ${colSpanSm}` : "auto",
              "--row-span-sm": `span ${rowSpanSm}`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}