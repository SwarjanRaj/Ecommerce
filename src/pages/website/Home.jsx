import React, { useState, useEffect, useContext } from "react";
import Banners from "../../components/HomePage/Banners";
import Marquee from "../../components/HomePage/Marquee";
import AddSection from "../../components/HomePage/AddSection";
import FreeSection from "../../components/HomePage/FreeSection";
import Testimonials from "../../components/HomePage/Testimonials";
import ExploreCollections from "../../components/HomePage/ExploreCollections";
import BestSeller from "../../components/HomePage/BestSeller";
import NewLaunch from "../../components/HomePage/NewLaunch";
import { GlobalDataContext } from '../../contexts/GlobalDataContext';

const Home = () => {
  const { categories, productswithcategory, newLaunch, bestSeller, banners } = useContext(GlobalDataContext);
  const [showComponents, setShowComponents] = useState([]);

  useEffect(() => {
    const components = [
      "Banners", "Marquee", "ExploreCollections", "BestSellers", "AddSection", "Testimonials", "FreeSection"
    ];

    components.forEach((component, index) => {
      setTimeout(() => {
        setShowComponents(prev => [...prev, component]);
      }, index * 400);
    });
  }, []);

  return (
    <>
      {showComponents.includes("Banners") && <Banners banners={banners} />}
      {showComponents.includes("Marquee") && <Marquee />}
      {showComponents.includes("ExploreCollections") && <ExploreCollections categories={categories} />}
      {showComponents.includes("BestSellers") && (() => {
        let count = 0;
        const categorySections = productswithcategory.map((cat) => {
          if (cat.products && cat.products.length > 0) {
            const bg = count % 2 === 1 ? 'bg-light' : '';
            count++;
            return (
              <BestSeller
                key={cat.categoryId}
                title={cat.categoryName}
                products={cat.products}
                slug={cat.categorySlug}
                bg={bg}
              />
            );
          }
          return null;
        });

        return (
          <>
            <NewLaunch title="Best Seller" products={bestSeller} bg="bg-light" />
            {categorySections}
            <NewLaunch title="New Launch" products={newLaunch} />
          </>
        );
      })()}

      {showComponents.includes("AddSection") && <AddSection />}
      {showComponents.includes("Testimonials") && <Testimonials />}
      {showComponents.includes("FreeSection") && <FreeSection />}
    </>
  );
};

export default Home;
