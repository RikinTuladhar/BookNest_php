import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* The Outlet will be the main content area, take up remaining space */}
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* Footer will be pushed to the bottom */}
      <Footer />
    </div>
  );
};
export default HomePage;
