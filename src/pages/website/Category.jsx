import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/Header/Navbar";
import SubCategoryHome from "../../components/HomePage/SubCategoryHome";
import BestSeller from "../../components/HomePage/CategoryProducts";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";
import { GlobalDataContext } from '../../contexts/GlobalDataContext';
import { SUBCATEGORIES } from "../../API/category";
const Category = () => {
  const { fetchProductsBySlug } = useContext(GlobalDataContext);
  const location = useLocation();
  const slug = location.pathname.split("/").pop();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("slug", slug);


  useEffect

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchProductsBySlug(slug);
        console.log("Fetched category products:", response);
          if (Array.isArray(response)) {
          setProducts(response);
        } else {
          console.warn("Unexpected response format", response);
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [slug]);
  

  return (
    <div>
      <Navbar />
      <Innerpagebaner category={slug} />
      <SubCategoryHome slug={slug} />

      {loading ? (
        <div className="text-center p-5"></div>
      ) : products.length > 0 ? (
        <BestSeller
          key={slug}
          title={slug.replace(/-/g, " ").toUpperCase()}
          products={products}
          slug={slug}

          bg="bg-light"
        />
      ) : (
        <></>
      )}

      <Footer />
      <FooterToolbar />
      <CartPop />
    </div>
  );
};

export default Category;
