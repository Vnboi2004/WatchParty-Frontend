// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Room from "../pages/Room";

const AppRoutes = () => {
  return (
    <Layout>
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
