import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import Sidebar from "./Sidebar";
import OrderDetails from "./OrderDetails";
const OrderdetailsPage = () => {
 
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="my-account-wrap w-100 d-block">
          <div className="row">
            <div className="col-lg-4">
              <div className="wrap-sidebar-account d-block position-sticky w-100 " style={{top:'100px'}}>
                <Sidebar  />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="my-account-content d-block position-relative w-100">
                <OrderDetails  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderdetailsPage;
