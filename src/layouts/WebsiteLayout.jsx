// src/layouts/WebsiteLayout.js
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import CartPop from '../components/Footer/CartPop';
import { GlobalDataContext } from '../contexts/GlobalDataContext';

const WebsiteLayout = () => {
  const { categories } = useContext(GlobalDataContext);

  return (
    <>
      <Navbar categories={categories} />
      <main><Outlet /></main>
      <Footer />
      <CartPop />
    </>
  );
};

export default WebsiteLayout;
