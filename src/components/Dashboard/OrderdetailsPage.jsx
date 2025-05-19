import React from "react";
import OrderDetails from "./OrderDetails";

const OrderdetailsPage = ({ order }) => {
  console.log(order); 

  return (
   <>
                {/* No need to add the sidebar here */}
                <OrderDetails order={order} />
   </>        
  );
};

export default OrderdetailsPage;
