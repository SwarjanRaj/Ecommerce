 import React from "react";
 import { useLocation } from "react-router-dom";
 
 import Navbar from "../../components/Header/Navbar";
 import SubCategoryHome from "../../components/HomePage/SubCategoryHome";
 import BestSeller from "../../components/HomePage/BestSeller";
 import Footer from "../../components/Footer/Footer";
 import FooterToolbar from "../../components/Footer/FooterToolbar";
 import CartPop from "../../components/Footer/CartPop";
 import Innerpagebaner from "../../components/Innerpagebaner";
 import CategoryPage from "../../components/Category/CategoryPage";

 const Collections = () => {
   const location = useLocation();
   const pathSegments = location.pathname.split("/");
   const lastSegment = pathSegments[pathSegments.length - 1]; // Get last part of the URL
 
     return (
       <div>
         <Navbar />
         <Innerpagebaner category={lastSegment} />
         <SubCategoryHome />
         <CategoryPage title={lastSegment}/>
         <Footer />
         <FooterToolbar />
         <CartPop />
       </div>
     );
   };
   
   export default Collections;