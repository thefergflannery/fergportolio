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

export default function PortfolioMasonry() {
  const dir = path.join(process.cwd(), "public", "images", "portfolio");
  const files = fs.readdirSync(dir).filter((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );

  const shuffled = shuffle(files);
  // Truncate to nearest multiple of COLS so last row is always full
  const count = Math.floor(shuffled.length / COLS) * COLS;
  const images = shuffled.slice(0, count);

  return (
    <>
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(${COLS}, 1fr);
          gap: 2px;
          margin-top: 2px;
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
        {images.map((file) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={file}
            src={`/images/portfolio/${encodeURIComponent(file)}`}
            alt=""
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
}