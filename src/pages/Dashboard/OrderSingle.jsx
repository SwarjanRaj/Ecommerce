import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import OrderdetailsPage from "../../components/Dashboard/OrderdetailsPage";
import { ORDERSINGLE } from "../../API/order";
import { useToast } from "../../helper/ToastMessage";
import { PageCategoryContext } from "../../contexts/PageCategoryContext";

const OrderSingle = () => {
  const { id } = useParams();
  const { showSuccess, showError } = useToast();
  const { setCategory } = useContext(PageCategoryContext);

  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategory("Order Details");

    const fetchData = async () => {
      try {
        const res = await ORDERSINGLE(id);
        if (res) {
          setOrder(res);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, setCategory]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            minHeight: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="preloader">
            <svg
              className="cart"
              role="img"
              aria-label="Shopping cart line animation"
              viewBox="0 0 128 128"
              width="128px"
              height="128px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
              >
                <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                  <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                  <circle cx="43" cy="111" r="13" />
                  <circle cx="102" cy="111" r="13" />
                </g>
                <g className="cart__lines" stroke="currentColor">
                  <polyline
                    className="cart__top"
                    points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                    strokeDasharray="338 338"
                    strokeDashoffset="-338"
                  />
                  <g className="cart__wheel1" transform="rotate(-90,43,111)">
                    <circle
                      className="cart__wheel-stroke"
                      cx="43"
                      cy="111"
                      r="13"
                      strokeDasharray="81.68 81.68"
                      strokeDashoffset="81.68"
                    />
                  </g>
                  <g className="cart__wheel2" transform="rotate(90,102,111)">
                    <circle
                      className="cart__wheel-stroke"
                      cx="102"
                      cy="111"
                      r="13"
                      strokeDasharray="81.68 81.68"
                      strokeDashoffset="81.68"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      ) : (
        <OrderdetailsPage order={order} />
      )}
    </div>
  );
};

export default OrderSingle;
