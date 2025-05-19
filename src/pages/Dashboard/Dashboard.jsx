import React, { useContext, useEffect } from "react";
import Home from "../../components/Dashboard/Home";
import { PageCategoryContext } from "../../contexts/PageCategoryContext";

const Dashboard = () => {
  const { setCategory } = useContext(PageCategoryContext);

  useEffect(() => {
    setCategory("Dashboard");
  }, [setCategory]);

  return (
    <>
      <Home />
    </>
  );
};

export default Dashboard;
