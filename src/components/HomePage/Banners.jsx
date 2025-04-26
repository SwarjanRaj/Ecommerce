import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Skeleton } from 'primereact/skeleton';

const Banners = ({ banners }) => {
    const loading = !banners || banners.length === 0;

    const skeletonSlides = Array.from({ length: 2 });

    return (
        <div className="tf-slideshow slider-style2 slider-effect-fade">
            <Swiper
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                speed={3000}
                effect="fade"
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay, EffectFade]}
            >
                {(loading ? skeletonSlides : banners).map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="wrap-slider">
                            {loading ? (
                                <Skeleton height="550px" width="100%" />
                            ) : (
                                <img src={slide.Image} alt={`fashion-slideshow-${index + 1}`} />
                            )}

                            <div className="box-content">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="content-slider">
                                                <div className="box-title-slider">
                                                    {loading ? (
                                                        <>
                                                            <Skeleton width="60%" height="40px" style={{ marginBottom: '1rem' }} />
                                                            <Skeleton width="80%" height="20px" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h2 className="fade-item fade-item-1 heading title-display text-white">
                                                                {slide.Name}
                                                            </h2>
                                                            <p className="fade-item fade-item-2 body-text-1 text-white">
                                                                {slide.Content}
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="fade-item fade-item-3 box-btn-slider">
                                                    {loading ? (
                                                        <Skeleton width="100px" height="40px" borderRadius="20px" />
                                                    ) : (
                                                        <Link to="" className="tf-btn btn-fill btn-square">
                                                            <span className="text">{slide.Button}</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banners;
