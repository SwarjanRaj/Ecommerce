import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Innerpagebaner from "../../components/Innerpagebaner";
import ProductSection from "../../components/Product/newpro";
import ProductsSimialr from "../../components/Product/ProductsSimialr";
import ProductDescriptionTabs from "../../components/Product/productdes";
import { PRODUCTSWITHSLUG } from "../../API/products";
import { Skeleton } from "primereact/skeleton"; // Ensure you have PrimeReact installed

const Products = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const res = await PRODUCTSWITHSLUG(slug);
      setProduct(res);
    };
    loadProduct();
  }, [slug]);

  return (
    <div>

      {!product ? (
        <>
          {/* Skeleton for Banner Section */}
          <Skeleton className="page-title bg-cool" height="200px" />
          <div className="container">

          
          <div className="row">
              <div className="col-lg-6">
              <Skeleton width="100%" height="500px" className="mt-3" />
              </div>
              <div className="col-lg-6">
              <Skeleton width="100%" height="500px" className="mt-3" />
              </div>
          </div>
          </div>


          
        </>
      ) : (
        <>
          {/* Show actual product details when data is loaded */}
          <Innerpagebaner category={product?.productTitle || "Product Details"} image="../assets/images/1.png" />
          <ProductSection product={product} />
          <ProductDescriptionTabs product={product} />
          <ProductsSimialr categoryId={product?.CategoryID} />
        </>
      )}

    
    </div>
  );
};

export default Products;
