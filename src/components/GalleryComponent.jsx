import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const images = [
  "../assets/images/beauty13.jpg",
  "../assets/images/beauty10.jpg",
];

export default function ProductGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    import("lazysizes"); // Lazy load images
  }, []);

  return (
    <div className="tf-product-media-wrap sticky top-0">
      {/* Thumbnails Slider */}
      <div className="thumbs-slider">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          slidesPerView={4}
          spaceBetween={10}
          className="swiper tf-product-media-thumbs other-image-zoom"
          modules={[Thumbs]}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="stagger-item">
              <div className="item">
                <img className="lazyload" data-src={img} src={img} alt="Product Thumbnail" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      

      {/* Main Image Slider */}
      <div className="swiper tf-product-media-main" id="gallery-swiper-started">
        <Swiper
        //   navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="swiper-wrapper"
          modules={[Navigation, Thumbs]}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <a href={img} target="_blank" rel="noopener noreferrer" className="item">
                <img
                  className="tf-image-zoom lazyload"
                  data-zoom={img}
                  data-src={img}
                  src={img}
                  alt="Product"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </div>
  );
}
