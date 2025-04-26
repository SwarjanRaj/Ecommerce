import { useEffect, useState, useRef, useContext } from "react";
import Preloader from "./Preloader";
import TopHeader from "./TopHeader";
import { HeaderMenu, MobileMenu } from "./HeaderMenu";
import { CategoryContext } from "../../contexts/CategoryContext.jsx"; // Adjust path if needed

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const lastScrollY = useRef(0);

  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);
      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Preloader />

      <button id="scroll-top" className="scroll-top">
        {/* Scroll top SVG remains unchanged */}
      </button>

      <header
        id="header"
        className={`header-default ${isScrolled ? "scrolled" : ""} ${scrollDirection === "down" ? "scroll-down" : "scroll-up"}`}
      >
        <div className="container-fluid">
          <div className="row wrapper-header align-items-center">
            <TopHeader />
            <HeaderMenu categories={categories} />
            <MobileMenu categories={categories} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
