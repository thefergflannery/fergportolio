import Header from "./Header";
import LeftRail from "./LeftRail";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LeftRail />
      <div className="site-content">
        <Header />
        <main id="main-content">
          {children}
        </main>
        <BottomNav />
        <Footer />
      </div>
    </>
  );
}
