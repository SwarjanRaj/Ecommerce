import React, { useState } from 'react';

const ProductDescriptionTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState('description');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <section>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="widget-tabs style-1">
                            <ul className="widget-menu-tab">
                                <li
                                    className={`item-title ${activeTab === 'description' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('description')}
                                >
                                    <span className="inner">Description</span>
                                </li>
                                <li
                                    className={`item-title ${activeTab === 'reviews' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('reviews')}
                                >
                                    <span className="inner">Product Specification</span>
                                </li>
                                <li
                                    className={`item-title ${activeTab === 'shipping' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('shipping')}
                                >
                                    <span className="inner">Shipping & Returns</span>
                                </li>
                                <li
                                    className={`item-title ${activeTab === 'policies' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('policies')}
                                >
                                    <span className="inner">Return Policies</span>
                                </li>
                            </ul>

                            <div className="widget-content-tab">
                                <div className={`widget-content-inner ${activeTab === 'description' ? 'active' : ''}`}>
                                    {activeTab === 'description' && (
                                        <div className="tab-description">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: product?.longDescription || ''
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className={`widget-content-inner ${activeTab === 'reviews' ? 'active' : ''}`}>
                                    {activeTab === 'reviews' && (
                                        <div className="tab-reviews write-cancel-review-wrap">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: product?.productspecification || ''
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className={`widget-content-inner ${activeTab === 'shipping' ? 'active' : ''}`}>
                                    {activeTab === 'shipping' && (
                                        <div className="tab-shipping">
                                            <div className="w-100">
                                                <div className="text-btn-uppercase mb_12">
                                                    We've got your back
                                                </div>
                                                <p className="mb_12">
                                                    One delivery fee to most locations (check our Orders & Delivery page)
                                                </p>
                                                <p>
                                                    Free returns within 14 days (excludes final sale and made-to-order
                                                    items, face masks and certain products containing hazardous or
                                                    flammable materials, such as fragrances and aerosols)
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={`widget-content-inner ${activeTab === 'policies' ? 'active' : ''}`}>
                                    {activeTab === 'policies' && (
                                        <div className="tab-policies">
                                            <div className="text-btn-uppercase mb_12">Return Policies</div>
                                            <p className="mb_12 text-secondary">
                                                At Modave, we stand behind the quality of our products. If you're not
                                                completely satisfied with your purchase, we offer hassle-free returns
                                                within 30 days of delivery.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDescriptionTabs;
