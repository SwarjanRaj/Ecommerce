import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";

export default function ExploreCollections({ categories }) {
  const isLoading = !categories || categories.length === 0;

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-2 wow fadeInUp">
          <h3 className="text-2xl font-semibold">Explore Categories</h3>
          <a href="" className="btn-line">
            View All Categories
          </a>
        </div>
      </div>
      <div className="container mx-auto wow fadeInUp" data-wow-delay="0.1s">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={6}
          spaceBetween={20}
          pagination={false}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            1024: { slidesPerView: 6 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
            280: { slidesPerView: 2 },
          }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="collection-position-2"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <Skeleton
                      width="100%"
                      height="100%"
                      className="border-round"
                    />
                    <div className="content mt-2">
                      <Skeleton width="70%" height="1.2rem" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : categories.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    className="collection-position-2 hover-img"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <Link to={`/category/${item.Slug}`} className="img-style">
                      <img
                        className="lazyload"
                        src={item.image_urls[0]}
                        alt={item.name}
                        loading="lazy"
                      />
                    </Link>
                    <div className="content">
                      <Link
                        to={`/category/${item.Slug}`}
                        className="cls-btn"
                      >
                        <h6 className="text">{item.name}</h6>{" "}
                        <i className="pi pi-arrow-up-right" />
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
