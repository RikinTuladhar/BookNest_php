import React from "react";
import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import { useState } from "react";

const AdminHome = () => {
  const [reload, setReload] = useState(false);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <AdminNav />
        {/* The Outlet will be the main content area, take up remaining space */}
        <div className="flex-grow">
          <Outlet context={{ reload }} />
        </div>
        {/* Footer will be pushed to the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default AdminHome;
