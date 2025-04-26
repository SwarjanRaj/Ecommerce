import React, { createContext, useEffect, useState ,useContext  } from 'react';
import { CATEGORYLISTHOME ,CATEGORYSLUGPRODUCTS } from '../API/category';
import { PRODUCTSWITHCATEGORY ,PRODUCTSWITHSLUG  } from '../API/products';
import { BESTSELLER, NEWLAUNCH } from "../API/products";
import { BANNERLIST } from "../API/cms";

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [productswithcategory, setProductswithcategory] = useState([]);
  const [categorySlugProducts, setCategorySlugProducts] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singleProduct, setSingleProduct] = useState({});
const [bestSeller, setBestSeller] = useState([]);
  const [newLaunch, setNewLaunch] = useState([]);
  const [banners, setBanners] = useState([]);

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fresh = await CATEGORYLISTHOME();
        setCategories(fresh);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products with category (paginated)
  useEffect(() => {
    const fetchProductsWithPagination = async () => {
      try {
        let index = 0;
        let hasNext = true;
        let allData = [];

        while (hasNext) {
          const res = await PRODUCTSWITHCATEGORY(index);
          // console.log(`Response for index ${index}:`, res);

          if (res && res.products) {
            allData.push({
              categoryName: res.categoryName,
              categoryId: res.categoryId,
              products: res.products || [],
            });

            // console.log(`Pushed Category ${res.categoryName} with ${res.products.length} products`);
            hasNext = res.hasNext;
            index++;
          } else {
            console.warn("No products or invalid response at index:", index);
            hasNext = false;
          }
        }

        // console.log("Final productswithcategory data:", allData);
        setProductswithcategory(allData);
      } catch (error) {
        console.error("Error fetching products with category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsWithPagination();
  }, []);

  // Fetch products by slug and cache them
  const fetchProductsBySlug = async (slug) => {
    if (categorySlugProducts[slug]) return categorySlugProducts[slug]; // Return cached version

    try {
      const products = await CATEGORYSLUGPRODUCTS(slug);
      setCategorySlugProducts((prev) => ({
        ...prev,
        [slug]: products,
      }));
      // console.log("new2:", products)
      return products;
    } catch (error) {
      console.error("Error fetching products by slug:", error);
      return [];
    }
  };

  const fetchSingleProduct = async (slug) => {
    try {
      const oneproduct = await PRODUCTSWITHSLUG(slug);
      setSingleProduct((prev) => ({
        ...prev,
        [slug]: oneproduct,
      }));
      return oneproduct; // <-- Return fetched product
    } catch (error) {
      console.error("Error fetching single product:", error);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersData, bestSellerData, newLaunchData] = await Promise.all([
          BANNERLIST(),
          BESTSELLER(),
          NEWLAUNCH(),
        ]);
        setBanners(bannersData);
        setBestSeller(bestSellerData.data);
        setNewLaunch(newLaunchData.data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchData();
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{
        categories,
        productswithcategory,
        categorySlugProducts,
        loading,
        selectedCategoryId,
        setSelectedCategoryId,
        fetchProductsBySlug,
        fetchSingleProduct,
        banners,
        bestSeller,
        newLaunch
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
