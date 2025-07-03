import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

export default ProtectedLayout;
