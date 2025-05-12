import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";
import Profile from "../../components/Dashboard/Profile";
import { getUserData } from "../../API/customer";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const toastRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getUserData();
        if (userData) {
          setProfile(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toastRef.current?.showError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Innerpagebaner image={'../assets/images/1.png'} category="Profile" />
      <Profile data={profile} loading={loading} toastRef={toastRef} />
      <Footer />
      <FooterToolbar />
      <CartPop />
    </div>
  );
};

export default ProfilePage;
