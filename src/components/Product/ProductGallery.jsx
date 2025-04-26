import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

const ProductGallery = ({ gallery, image1, image2 }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Check if image1 and image2 exist, and if not, fallback to empty values
  const images = [
    image1?.imageUrl,
    image2?.imageUrl,
    ...(gallery && gallery.length > 0 ? gallery.map(img => img.imageUrl) : [])
  ].filter(Boolean); // Remove any undefined or null values

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  useEffect(() => {
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(activeIndex); // Update thumbnail swiper to active index
    }
  }, [activeIndex, thumbsSwiper]);

  if (images.length === 0) {
    return <div>No images available.</div>; // Fallback message if no images
  }

  return (
    <div className="tf-product-media-wrap thumbs-bottom sticky-top">
      <div className="thumbs-slider">
        {/* Main Image Swiper with Zoom */}
        <Swiper
          modules={[Thumbs, Zoom]}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={10}
          slidesPerView={1}
          zoom={true}
          className="swiper tf-product-media-main"
          id="gallery-swiper-started"
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide"
              data-color="gray"
              role="group"
              aria-label={`${index + 1} / ${images.length}`}
            >
              <div className="swiper-zoom-container">
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="tf-image-zoom ls-is-cached lazyloaded"
                  style={{ aspectRatio: "1/1", objectFit: "cover", width:"100%" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Swiper */}
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={1}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          className="swiper tf-product-media-thumbs other-image-zoom swiper-thumbs"
          data-direction="horizontal"
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide stagger-item stagger-finished"
              data-color="gray"
              role="group"
              aria-label={`Thumbnail ${index + 1} / ${images.length}`}
            >
              <div className="item">
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="ls-is-cached lazyloaded"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
