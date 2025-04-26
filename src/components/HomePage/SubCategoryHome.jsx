import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { SUBCATEGORIES } from "../../API/category";

const SubCategoryHome = ({ slug }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubCategories = async () => {
      try {
        const response = await SUBCATEGORIES(slug);
        console.log("Fetched subcategories:", response);
        setSubCategories(response); // Make sure your API gives an array with { title, slug, image } format
      } catch (error) {
        console.error("Failed to load subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadSubCategories();
    }
  }, [slug]);

  if (loading) {
    return <div className="text-center">Loading subcategories...</div>;
  }
  if(subCategories.length>0){

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading">Shop by product type</h3>
          <p className="subheading text-secondary">Fresh styles just in! Elevate your look.</p>
        </div>

        {subCategories.length > 0 ? (
          <div className="flat-collection-circle">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={15}
              slidesPerView={2}
              navigation={{
                prevEl: ".nav-prev-categories",
                nextEl: ".nav-next-categories",
              }}
              pagination={{ clickable: true, el: ".sw-pagination-categories" }}
              breakpoints={{
                1024: { slidesPerView: 6 },
                768: { slidesPerView: 4 },
                576: { slidesPerView: 3 },
                400: { slidesPerView: 2 },
              }}
            >
           {subCategories.map((category, index) => {
  const imageUrl = category.image_urls?.[0]?.imageUrl;
  
  if (!imageUrl) return null; // Skip if image is missing

  return (
    <SwiperSlide key={index}>
      <div className="collection-circle hover-img">
        <Link to={`/subcategory/${category.slug}`} className="img-style">
          <img
          style={{aspectRatio:1/1}}
            src={imageUrl}
            alt={category.SubCategoryName || "Subcategory"}
          />
        </Link>
        <div className="collection-content text-center">
          <Link to={`/subcategory/${category.slug}`} className="cls-title">
            <h6 className="text">{category.SubCategoryName}</h6>
            <i className="icon icon-arrowUpRight"></i>
          </Link>
        </div>
      </div>
    </SwiperSlide>
  );
})}


            </Swiper>
            <div className="d-flex d-lg-none sw-pagination-categories sw-dots type-circle justify-content-center"></div>
            <div className="nav-prev-categories d-none d-lg-flex nav-sw style-line nav-sw-left">
              <i className="pi pi-angle-left"></i>
            </div>
            <div className="nav-next-categories d-none d-lg-flex nav-sw style-line nav-sw-right">
              <i className="pi pi-angle-right"></i>
            </div>
          </div>
        ) : (
          <div className="text-center"></div>
        )}
      </div>
    </section>
  );
}
};

export default SubCategoryHome;
