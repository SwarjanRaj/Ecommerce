import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import CartPop from "../components/Footer/CartPop";
import Sidebar from "../components/Dashboard/Sidebar";
import Innerpagebaner from "../components/Innerpagebaner";
import { GlobalDataContext } from "../contexts/GlobalDataContext";
import { PageCategoryContext } from "../contexts/PageCategoryContext";

const DashboardLayout = () => {
  const { categories } = useContext(GlobalDataContext);
  const [category, setCategory] = useState("Dashboard");

  return (
    <PageCategoryContext.Provider value={{ category, setCategory }}>
      <Navbar categories={categories} />
      <Innerpagebaner image={"/assets/images/1.png"} category={category} />
      <section className="flat-spacing">
        <div className="container">
          <div className="my-account-wrap w-100 d-block">
            <div className="row">
              <div className="col-lg-4">
                <div
                  className="wrap-sidebar-account d-block position-sticky w-100"
                  style={{ top: "100px" }}
                >
                  <Sidebar />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="my-account-content d-block position-relative w-100">
                  <main className="w-100 h-100">
                    <Outlet />
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <CartPop />
    </PageCategoryContext.Provider>
  );
};

export default DashboardLayout;
