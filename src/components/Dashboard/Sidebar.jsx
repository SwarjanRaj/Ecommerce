import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../../API/customer";
import { AuthContext } from "../../contexts/AuthContext";

const navItems = [
  { name: "Dashboard", slug: "", icon: "pi pi-objects-column" },
  { name: "Profile", slug: "profile", icon: "pi pi-user" },
  { name: "Your Orders", slug: "orders", icon: "pi pi-cart-arrow-down" },
  { name: "Returns", slug: "returns", icon: "pi pi-replay" },
  { name: "Transactions", slug: "transactions", icon: "pi pi-credit-card" },
  { name: "My Address", slug: "address", icon: "pi pi-address-book" },
  { name: "Logout", slug: "logout", icon: "pi pi-sign-out" },
];

const Sidebar = () => {
  const [profile, setProfile] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toastRef = useRef(null);
  const { logout } = useContext(AuthContext); // ✅ Get logout from context

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      if (userData) {
        setProfile(userData);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout(); // ✅ Call the logout from AuthContext
    toastRef.current?.showSuccess("Logged out successfully.");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="sidebar-account">
      <div className="account-avatar">
        <div className="image">
<img
  src={profile?.image_urls?.[0]?.imageUrl || "https://www.dummyimg.in/placeholder?width=200"}
  alt={profile?.first_name || "Profile"}
  className="max-w-10/12"
/>
        </div>
        <h6 className="mb_4 bolder">{profile?.first_name} {profile?.last_name}</h6>
        <p className="body-text-1">{profile?.email}</p>
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
