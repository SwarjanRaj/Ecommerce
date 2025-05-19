import React, { useEffect, useContext } from "react";
import OrderList from "../../components/Dashboard/OrderList";
import { PageCategoryContext } from "../../contexts/PageCategoryContext";

const Orders = () => {
  const { setCategory } = useContext(PageCategoryContext);

  useEffect(() => {
    setCategory("Orders");
  }, [setCategory]);

  return (
    <div>
      <OrderList />
    </div>
  );
};

export default Orders;
