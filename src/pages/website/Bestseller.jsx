import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import SubCategoryHome from "../../components/HomePage/SubCategoryHome";
import BestSeller from "../../components/HomePage/CategoryProducts";

import Innerpagebaner from "../../components/Innerpagebaner";
import { GlobalDataContext } from '../../contexts/GlobalDataContext';

const BestSellerPage = () => {
  const { bestSeller } = useContext(GlobalDataContext);
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop();

  const products = bestSeller || [];
  const loading = bestSeller === undefined;

  return (
    <div>
      <Innerpagebaner category={slug} image="../assets/images/1.png" />
      {slug !== "new-launch" && <SubCategoryHome slug={slug} />}


      <BestSeller
  key={slug}
  title="NEW LAUNCH"
  products={products}
  slug={slug}
  bg="bg-light"
  loading={loading}
/>


      
    </div>
  );
};

export default BestSellerPage;
