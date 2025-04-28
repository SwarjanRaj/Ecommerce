// src/pages/Home/Home.js
import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Header/Navbar";
import Banners from "../../components/HomePage/Banners";
import Marquee from "../../components/HomePage/Marquee";
import CartPop from "../../components/Footer/CartPop";
import AddSection from "../../components/HomePage/AddSection";
import Footer from "../../components/Footer/Footer";
import FreeSection from "../../components/HomePage/FreeSection";
import Testimonials from "../../components/HomePage/Testimonials";
import ExploreCollections from "../../components/HomePage/ExploreCollections";
import BestSeller from "../../components/HomePage/BestSeller";
import NewLaunch from "../../components/HomePage/NewLaunch"; // Fixed naming
import { GlobalDataContext } from '../../contexts/GlobalDataContext';

const Home = () => {
  const [showComponents, setShowComponents] = useState([]);
  const { categories, productswithcategory, newLaunch, bestSeller, banners } = useContext(GlobalDataContext);
  
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const components = [
      "Banners",
      "Marquee",
      "ExploreCollections",
      "BestSellers",
      "AddSection",
      "Testimonials",
      "FreeSection",
      "Footer",
    ];

    components.forEach((component, index) => {
      setTimeout(() => {
        setShowComponents((prev) => [...prev, component]);
      }, index * 500);
    });
  }, []);



 
  return (
    <>
      <Navbar />
      {showComponents.includes("Banners") && <Banners banners={banners} />}
      {showComponents.includes("Marquee") && <Marquee />}
      {showComponents.includes("ExploreCollections") && <ExploreCollections categories={categories} />}
      {showComponents.includes("BestSellers") && (
  <>
    <NewLaunch title="Best Seller" products={bestSeller} bg="bg-light" />

    {(() => {
      let displayIndex = 0;

      return productswithcategory.map((cat) => {
        console.log(cat)
        if (!cat.products || cat.products.length === 0) return null;

        const bgClass = displayIndex % 2 !== 0 ? "bg-light" : "";
        displayIndex++;

        return (
          <BestSeller
            key={cat.categoryId}
            title={cat.categoryName}
            products={cat.products}
            slug={cat.categorySlug}
            bg={bgClass}
          />
        );
      });
    })()}

    <NewLaunch title="New Launch" products={newLaunch} />
  </>
)}

      {showComponents.includes("AddSection") && <AddSection />}
      {showComponents.includes("Testimonials") && <Testimonials />}
      {showComponents.includes("FreeSection") && <FreeSection />}
      {showComponents.includes("Footer") && <Footer />}
      <CartPop />
    </>
  );
};

export default Home;