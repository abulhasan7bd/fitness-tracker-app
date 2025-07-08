import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

const MainLayouts = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayouts;
