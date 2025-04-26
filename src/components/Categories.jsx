import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";


const categories = [
    
    

  { id: 1, img: "/assets/images/face-cls.jpg", title: "Face" },
  { id: 2, img: "/assets/images/face-cls.jpg", title: "Body" },
  { id: 3, img: "/assets/images/face-cls.jpg", title: "Eye" },
  { id: 4, img: "/assets/images/face-cls.jpg", title: "Lips" },
  { id: 5, img: "/assets/images/face-cls.jpg", title: "Skin" },
  { id: 1, img: "/assets/images/face-cls.jpg", title: "Face" },
  { id: 2, img: "/assets/images/face-cls.jpg", title: "Body" },
  { id: 3, img: "/assets/images/face-cls.jpg", title: "Eye" },
  { id: 4, img: "/assets/images/face-cls.jpg", title: "Lips" },
  { id: 5, img: "/assets/images/face-cls.jpg", title: "Skin" },
  
  
];

const CategoriesSlider = () => {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-2">
          <h3 className="heading">Explore Collections</h3>
          <Link to='/category' className="btn-line">
            View All Collection
          </Link>
        </div>
      </div>
      <div className="container-full slider-layout-right" data-wow-delay="0.1s">
        <Swiper
          dir="ltr"
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={6.2}
          breakpoints={{
            1024: { slidesPerView: 6.2 },
            768: { slidesPerView: 3.2 },
            480: { slidesPerView: 2.2 },
          }}
          pagination={{ clickable: true }}
        
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="collection-position-2 hover-img">
                <a className="img-style">
                  <img
                    className="lazyload"
                    src={category.img}
                    alt="banner-cls"
                  />
                </a>
                <div className="content">
                  <Link to={`/category/${title}`} className="cls-btn">
                    <h6 className="text">{category.title}</h6>
                    <i className="icon icon-arrowUpRight"></i>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
export default CategoriesSlider;