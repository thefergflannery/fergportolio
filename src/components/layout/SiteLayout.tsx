import Header from "./Header";
import LeftRail from "./LeftRail";
import Footer from "./Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LeftRail />
      <div className="site-content">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
