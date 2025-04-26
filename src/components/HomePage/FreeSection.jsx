import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const iconData = [
    { icon: "refresh", title: "14-Day Returns", desc: "Risk-free shopping with easy returns." },
    { icon: "truck", title: "Free Shipping", desc: "No extra costs, just the price you see." },
    { icon: "headphones", title: "24/7 Support", desc: "24/7 support, always here just for you." },
    { icon: "check", title: "Member Discounts", desc: "Special prices for our loyal customers." },
  ];
  

const FreeSection = () => {
  return (
    <section className="flat-spacing">
      <div className="container">
        <Swiper
        //   modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={4} // Desktop
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation= {false}
          pagination={{ clickable: true }}
          className="swiper tf-sw-iconbox"
        >
          {iconData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="tf-icon-box text-center">
                <div className="icon-box">
                <i className={`pi pi-${item.icon}`}></i>
                  
                </div>
                <div className="content">
                  <h6>{item.title}</h6>
                  <p className="text-secondary">{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="sw-pagination-iconbox sw-dots type-circle justify-content-center"></div>
      </div>
    </section>
  );
};

export default FreeSection;
