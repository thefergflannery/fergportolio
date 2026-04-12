const images = [
  "13161738631531.5606952954c8e.jpeg",
  "13dca838392755.576029951f019.webp",
  "1a11b838392755.576029951dba1.webp",
  "2e64ea38392755.576029951e188.webp",
  "2e7e9f38392755.576029951eb09.webp",
  "41706d38392527.5760277a02bea.jpg",
  "620a9635dc5e93b866a28c09_Everything at a glance.png",
  "6cb4de38392755.576029951d73f.webp",
  "6d5e8338631511.56069530e1fcd.jpg",
  "7b637838392755.576029951d061.webp",
  "98a40338631475.56069360409a4.jpg",
  "aa935a38392755.576029951f441.webp",
  "ab68ce38392755.576028dbbb7b7.webp",
  "aff4c938392755.57602995210b1.webp",
  "bf08f938631469.5606935eef828.jpg",
  "d7f43638392755.576029951f921.webp",
  "ebb20f38631513.56069360f15a9.jpeg",
  "f748c538392755.5760299520326.webp",
];

export default function PortfolioMasonry() {
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