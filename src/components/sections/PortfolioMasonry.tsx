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

const DESKTOP_COLS = 5;
const TABLET_COLS  = 4;
const MOBILE_COLS  = 2;

const ROW_PX     = 80;
const VIEWPORT_W = 1600;
const TABLET_W   = 1024;
const MOBILE_W   = 390;

interface ImageCell {
  file: string;
  colSpan: number;
  colSpanMd: number;
  colSpanSm: number;
  rowSpan: number;
  rowSpanMd: number;
  rowSpanSm: number;
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
    const colSpan   = ratio >= 1.6 ? 2 : 1;
    const colSpanMd = ratio >= 1.6 ? 2 : 1;
    const colSpanSm = ratio >= 1.3 ? 2 : 1;

    results.push({
      file,
      colSpan,   colSpanMd,   colSpanSm,
      rowSpan:   calcRowSpan(ratio, colSpan,   DESKTOP_COLS, VIEWPORT_W),
      rowSpanMd: calcRowSpan(ratio, colSpanMd, TABLET_COLS,  TABLET_W),
      rowSpanSm: calcRowSpan(ratio, colSpanSm, MOBILE_COLS,  MOBILE_W),
    });
  }
  return results;
}

// Greedy shortest-column algorithm — returns explicit 1-based grid positions
function simulatePlacement(
  cells: ImageCell[],
  cols: number,
  spanKey:    keyof ImageCell,
  rowSpanKey: keyof ImageCell,
): Array<{ col: number; row: number }> {
  const heights = new Array<number>(cols).fill(0);
  return cells.map((cell) => {
    const span  = cell[spanKey]    as number;
    const rSpan = cell[rowSpanKey] as number;
    let bestCol = 0;
    let minMaxH = Infinity;
    for (let c = 0; c <= cols - span; c++) {
      const maxH = Math.max(...heights.slice(c, c + span));
      if (maxH < minMaxH) { minMaxH = maxH; bestCol = c; }
    }
    for (let c = bestCol; c < bestCol + span; c++) heights[c] = minMaxH + rSpan;
    return { col: bestCol + 1, row: minMaxH + 1 }; // 1-based
  });
}

// Find the LAST count N (≥ MIN_SHOW) where the desktop grid has a clean flat bottom
// (all column heights equal, or within 1 row unit). Falls back to minimum imbalance.
function findCleanCutCount(cells: ImageCell[]): number {
  const MIN_SHOW = Math.min(10, cells.length);
  const heights  = new Array<number>(DESKTOP_COLS).fill(0);
  let lastClean  = -1;

  for (let i = 0; i < cells.length; i++) {
    const { colSpan, rowSpan } = cells[i];
    let bestCol = 0, minMaxH = Infinity;
    for (let c = 0; c <= DESKTOP_COLS - colSpan; c++) {
      const mh = Math.max(...heights.slice(c, c + colSpan));
      if (mh < minMaxH) { minMaxH = mh; bestCol = c; }
    }
    for (let c = bestCol; c < bestCol + colSpan; c++) heights[c] = minMaxH + rowSpan;

    if (i >= MIN_SHOW - 1) {
      const imbalance = Math.max(...heights) - Math.min(...heights);
      if (imbalance <= 1) lastClean = i + 1;
    }
  }

  if (lastClean > 0) return lastClean;

  // No perfect cut — return the count with the smallest column-height imbalance
  const h2 = new Array<number>(DESKTOP_COLS).fill(0);
  let minImbalance = Infinity;
  let best = cells.length;

  for (let i = 0; i < cells.length; i++) {
    const { colSpan, rowSpan } = cells[i];
    let bc = 0, mh = Infinity;
    for (let c = 0; c <= DESKTOP_COLS - colSpan; c++) {
      const mx = Math.max(...h2.slice(c, c + colSpan));
      if (mx < mh) { mh = mx; bc = c; }
    }
    for (let c = bc; c < bc + colSpan; c++) h2[c] = mh + rowSpan;

    if (i >= MIN_SHOW - 1) {
      const imbalance = Math.max(...h2) - Math.min(...h2);
      if (imbalance < minImbalance) { minImbalance = imbalance; best = i + 1; }
    }
  }

  return best;
}

export default async function PortfolioMasonry() {
  const dir   = path.join(process.cwd(), "public", "images", "portfolio");
  const files = fs.readdirSync(dir).filter((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );

  const allCells = await buildCells(shuffle(files), dir);

  // Trim to the count that gives the cleanest flat bottom on desktop
  const count = findCleanCutCount(allCells);
  const cells = allCells.slice(0, count);

  // Explicit positions for each breakpoint — simulation IS the layout
  const posDesk = simulatePlacement(cells, DESKTOP_COLS, "colSpan",   "rowSpan");
  const posMd   = simulatePlacement(cells, TABLET_COLS,  "colSpanMd", "rowSpanMd");
  const posSm   = simulatePlacement(cells, MOBILE_COLS,  "colSpanSm", "rowSpanSm");

  return (
    <>
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(${DESKTOP_COLS}, 1fr);
          grid-auto-rows: ${ROW_PX}px;
          gap: 0;
        }
        .portfolio-cell {
          grid-column: var(--gc);
          grid-row:    var(--gr);
          overflow: hidden;
        }
        .portfolio-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(${TABLET_COLS}, 1fr);
          }
          .portfolio-cell {
            grid-column: var(--gc-md);
            grid-row:    var(--gr-md);
          }
        }
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(${MOBILE_COLS}, 1fr);
          }
          .portfolio-cell {
            grid-column: var(--gc-sm);
            grid-row:    var(--gr-sm);
          }
        }
      `}</style>
      <div className="portfolio-grid">
        {cells.map(({ file, colSpan, colSpanMd, colSpanSm, rowSpan, rowSpanMd, rowSpanSm }, i) => (
          <div
            key={file}
            className="portfolio-cell"
            style={{
              "--gc":    `${posDesk[i].col} / span ${colSpan}`,
              "--gr":    `${posDesk[i].row} / span ${rowSpan}`,
              "--gc-md": `${posMd[i].col} / span ${colSpanMd}`,
              "--gr-md": `${posMd[i].row} / span ${rowSpanMd}`,
              "--gc-sm": `${posSm[i].col} / span ${colSpanSm}`,
              "--gr-sm": `${posSm[i].row} / span ${rowSpanSm}`,
            } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/portfolio/${file.replace(/ /g, "%20")}`}
              alt=""
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
}