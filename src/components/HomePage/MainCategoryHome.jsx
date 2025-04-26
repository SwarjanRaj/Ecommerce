import React from "react";

const categories = [
  { name: "Face", image: "/assets/images/face-cls.jpg" , slug:'face'},
  { name: "Hand", image: "/assets/images/face-cls.jpg" , slug:'face'},
  { name: "Body", image: "/assets/images/face-cls.jpg"  , slug:'face'},
  { name: "Foot", image: "/assets/images/face-cls.jpg" , slug:'face'},
  { name: "Eye", image: "/assets/images/face-cls.jpg"  , slug:'face'},
  { name: "Lip", image: "/assets/images/face-cls.jpg"  , slug:'face'},
];

const MainCategoryHome = () => {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop by Skin Concern</h3>
          <p className="subheading text-secondary">Fresh styles just in! Elevate your look.</p>
        </div>
        <div className="tf-grid-layout tf-col-2 md-col-3 lg-col-4">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="collection-position-2 style-6 hover-img wow fadeInUp"
              data-wow-delay={`${index * 0.1}s`}
            >
              <a className="img-style">
                <img
                  className="lazyloaded"
                  src={category.image}
                  alt={`${category.name} banner`}
                />
              </a>
              <div className="content">
                <Link to={`/category/${category.slug}`} className="cls-btn">
                  <h6 className="text">{category.name}</h6>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainCategoryHome;
