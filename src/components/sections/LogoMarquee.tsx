import Image from "next/image";

const REPEAT_COUNT = 9;

export default function LogoMarquee() {
  return (
    <div
      id="50"
      style={{
        maxWidth: "var(--wp--style--global--wide-size)",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "var(--wp--preset--spacing--50)",
        paddingRight: "var(--wp--preset--spacing--50)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          borderBottom: "1px solid #111111",
        }}
      >
        {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
          <div key={i} style={{ flex: 1 }}>
            <Image
              src="/images/Group-1597883091-1.svg"
              alt=""
              width={152}
              height={152}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
