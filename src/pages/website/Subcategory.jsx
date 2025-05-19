import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BestSeller from "../../components/HomePage/CategoryProducts";
import { SUBCATEGORIESPRODUCTLIST } from "../../API/category";
import Innerpagebaner from "../../components/Innerpagebaner";

const Subcategory = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategoryProducts = async () => {
      try {
        const response = await SUBCATEGORIESPRODUCTLIST(slug);
        console.log(response)
     
        setProducts(response || []);
      } catch (error) {
        console.error("Failed to fetch subcategory products:", error);
      } finally {
        setLoading(false);
      }
    };
console.log("s",products)
    fetchSubcategoryProducts();
  }, [slug]);

  return (
    <div>
      <Innerpagebaner category={slug} image="../assets/images/1.png" />

     
        <BestSeller
          key={slug}
          title={slug === "new-launch" ? "New Launch" : slug}
          products={products}
          slug={slug}
          bg="bg-light"
        />

    </div>
  );
};

export default Subcategory;
