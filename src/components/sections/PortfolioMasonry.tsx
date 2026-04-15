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

const DESKTOP_COLS = 5;
const TABLET_COLS  = 4;
const MOBILE_COLS  = 2;

// LCM(5, 4, 2) = 20 — ensures every breakpoint has complete rows (no trailing gaps)
const LCM = 20;

export default async function PortfolioMasonry() {
  const dir = path.join(process.cwd(), "public", "images", "portfolio");
  const files = fs.readdirSync(dir).filter((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );

  // Trim to largest multiple of LCM that fits within the available images
  const count = Math.max(LCM, Math.floor(files.length / LCM) * LCM);
  const selected = shuffle(files).slice(0, Math.min(count, files.length));

  return (
    <>
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(${DESKTOP_COLS}, 1fr);
          gap: 0;
        }
        .portfolio-cell {
          aspect-ratio: 3 / 2;
          overflow: hidden;
          position: relative;
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
        }
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(${MOBILE_COLS}, 1fr);
          }
          .portfolio-cell {
            aspect-ratio: 1 / 1;
          }
        }
      `}</style>
      <div className="portfolio-grid">
        {selected.map((file) => (
          <div key={file} className="portfolio-cell">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/portfolio/${encodeURIComponent(file)}`}
              alt=""
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
}