 import React from "react";
 import { useLocation } from "react-router-dom";
  import SubCategoryHome from "../../components/HomePage/SubCategoryHome";

 import Innerpagebaner from "../../components/Innerpagebaner";
 import CategoryPage from "../../components/Category/CategoryPage";

 const Collections = () => {
   const location = useLocation();
   const pathSegments = location.pathname.split("/");
   const lastSegment = pathSegments[pathSegments.length - 1]; // Get last part of the URL
 
     return (
       <div>
         <Innerpagebaner category={lastSegment} image="../assets/images/1.png" />
         <SubCategoryHome />
         <CategoryPage title={lastSegment}/>
         
       </div>
     );
   };
   
   export default Collections;