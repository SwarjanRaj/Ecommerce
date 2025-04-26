import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { GlobalDataProvider } from "./contexts/GlobalDataContext";

import RouteScrollToTop from "./helper/RouteScrollToTop";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import ToastMessage from "./helper/ToastMessage";

import WebsiteRoutes from "./routes/WebsiteRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const toastRef = useRef();

  return (
    <AuthProvider>
      <CategoryProvider>
        <GlobalDataProvider>
          <Router>
            <ToastMessage ref={toastRef} />
            <PhosphorIconInit />
            <Routes>
              <Route path="/*" element={<WebsiteRoutes toastRef={toastRef} />} />
              <Route path="/dashboard/*" element={<PrivateRoute />}>
                <Route path="*" element={<DashboardRoutes toastRef={toastRef} />} />
              </Route>
            </Routes>
            <RouteScrollToTop />
          </Router>
        </GlobalDataProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
