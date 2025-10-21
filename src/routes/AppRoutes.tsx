// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Room from "../pages/Room";
import ScrollToTop from "../shared/components/ScrollToTop";

const AppRoutes = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/room/:roomCode"
          element={
            <PrivateRoute>
              <Room />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
