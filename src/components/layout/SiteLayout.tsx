import Header from "./Header";
import LeftRail from "./LeftRail";
import Footer from "./Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Sticky top nav */}
      <Header />

      {/* Two-column layout: left rail + content */}
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "stretch",
          paddingTop: 0,
        }}
      >
        <LeftRail />
        <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
      </div>

      <Footer />
    </div>
  );
}
