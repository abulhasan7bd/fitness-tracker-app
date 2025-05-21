import React from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

const MainLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main >
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayouts;
