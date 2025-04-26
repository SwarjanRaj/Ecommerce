import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import FooterToolbar from './FooterToolbar';
import CartPop from './CartPop';
const Footer = () => {
  return (
    <>
    <footer id="footer" className="footer">
      <div className="footer-wrap">
        <div className="footer-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="footer-infor">
                  <div className="footer-logo">
                    <Link to="">
                      <img src="../assets/images/logo.png" alt="Logo" style={{maxWidth:'220px'}}/>
                    </Link>
                  </div>
                  
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer-menu">
                  <FooterMenu title="Links" links={[
                    { text: "Home", href: "" },
                    { text: "About Us", href: "#" },
                    { text: "Contact Us", href: "#" },
                    { text: "Terms & Conditions", href: "/terms" },
                    { text: "Privacy Policy", href: "/privacy" },
                    
                    // { text: "My Account", href: "" },
                  ]} />
                  <FooterMenu title="Categories" links={[
                    { text: "Face", href: "#" },
                    { text: "Lips", href: "#" },
                    { text: "Eyes", href: "#" },
                    { text: "Body", href: "" },
                    { text: "Skin", href: "" },
                  
                  ]} />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="footer-col-block">
                  <div className="footer-heading text-button footer-heading-mobile">
      Contact Us
    </div>
                  <ul className="footer-info">
                    
                    
                    <li>
                      <i className="pi pi-envelope"></i>
                      <p>
                        <a href="mailto:info@ashw.co.in">info@ashw.co.in</a>
                      </p>
                    </li>
                    <li>
                      <i className="pi pi-map-marker"></i>
                      <p>Hyderabad, INDIA</p>
                    </li>
                  </ul>
                  <ul className="tf-social-icon pt-5">
                    <li><a href="#" className="social-facebook"><i className="pi pi-facebook"></i></a></li>
                    <li><a href="#" className="social-amazon"><i className=" pi pi-twitter"></i></a></li>
                    <li><a href="#" className="social-instagram"><i className="pi pi-instagram"></i></a></li>
                   
                  </ul>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterBottom />
      </div>
    </footer>
   
    <FooterToolbar />
    <CartPop />
    
    </>
    
    
    
  );
};

const FooterMenu = ({ title, links }) => (
  <div className="footer-col-block pr-5">
    <div className="footer-heading text-button footer-heading-mobile">
      {title}
    </div>
    <div className="tf-collapse-content">
      <ul className="footer-menu-list">
        {links.map((link, index) => (
          <li className="text-caption-1" key={index}>
            <Link to={link.href} className="footer-menu_item">{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const FooterBottom = () => (
  <div className="footer-bottom">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="footer-bottom-wrap">
            <div className="left">
              <p className="text-caption-1">©2025 ASTRA ENTERPRISES. All Rights Reserved.</p>
            </div>
            <div className='right'>
<p className="text-caption-1">Design & Developed by Emobomo</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;