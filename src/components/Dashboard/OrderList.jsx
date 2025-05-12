import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import Sidebar from "./Sidebar";
import OrderTable from "./OrderTable";
import { ORDERLIST } from "../../API/order";
import { useToast } from "../../helper/ToastMessage";

const OrderList = () => {
  const { showSuccess, showError } = useToast();

  const [orders, setOrders] = useState([]);  // better to initialize as array
  const [loading, setLoading] = useState(false); // loading state added

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await ORDERLIST();
        console.log(res)
        if (res) {
          setOrders(res);
          showSuccess("Order data fetched successfully!");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
        showError("Failed to fetch order data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(orders)

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="my-account-wrap w-100 d-block">
          <div className="row">
            <div className="col-lg-4">
              <div className="wrap-sidebar-account position-sticky w-100" style={{ top: '100px' }}>
                <Sidebar />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="my-account-content">
                {/* Pass the order and loading to OrderTable */}
                <OrderTable orders={orders} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderList;
