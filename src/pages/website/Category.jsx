import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import SubCategoryHome from "../../components/HomePage/SubCategoryHome";
import BestSeller from "../../components/HomePage/CategoryProducts";

import Innerpagebaner from "../../components/Innerpagebaner";
import { GlobalDataContext } from '../../contexts/GlobalDataContext';

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
     
      <Innerpagebaner category={slug} image="../assets/images/1.png" />
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

     
    </div>
  );
};

export default Category;
