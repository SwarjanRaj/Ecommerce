import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetUserData } from "../../API/customer";

const navItems = [
  { name: "Dashboard", slug: "", icon: "pi pi-objects-column" },
  { name: "Profile", slug: "profile", icon: "pi pi-user" },
  // { name: "Cart", slug: "cart", icon: "pi pi-cart-arrow-down" },
  { name: "Your Orders", slug: "orders", icon: "pi pi-cart-arrow-down" },
  { name: "Returns", slug: "returns", icon: "pi pi-replay" },
  { name: "Transactions", slug: "transactions", icon: "pi pi-credit-card" },
  { name: "My Address", slug: "address", icon: "pi pi-address-book" },
  { name: "Logout", slug: "logout", icon: "pi pi-sign-out" },
];

const Sidebar = () => {
  const [profile, setProfile] = useState(null);
  const { pathname } = useLocation(); // Get current path
  const navigate = useNavigate(); // Initialize navigation
  const toastRef = useRef(null); // Reference for toast messages

  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetUserData(); // Fetch user data
      if (userData) {
        setProfile(userData);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    toastRef.current?.showSuccess("Logged out successfully.");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="sidebar-account">
      <div className="account-avatar">
        <div className="image">
          <img src="/assets/images/beauty10.jpg" alt="User Avatar" />
        </div>
        <h6 className="mb_4">{profile?.first_name} {profile?.last_name}</h6>
        <div className="body-text-1">{profile?.email}</div>
      </div>
      <ul className="my-account-nav">
        {navItems.map(({ name, slug, icon }) => {
          const isActive = pathname === `/dashboard${slug ? `/${slug}` : ""}`;

          return (
            <li key={slug}>
              {slug === "logout" ? (
                <button className="my-account-nav-item logout-btn" onClick={handleLogout}>
                  <i className={icon}></i> {name}
                </button>
              ) : (
                <Link
                  to={`/dashboard${slug ? `/${slug}` : ""}`}
                  className={`my-account-nav-item ${isActive ? "active" : ""}`}
                >
                  <i className={icon}></i> {name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
