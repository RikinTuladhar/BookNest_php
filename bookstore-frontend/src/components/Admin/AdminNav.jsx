import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  const getUserFromLocalStorage = () => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  };

  const user = getUserFromLocalStorage();

  return (
    <div className="sticky top-0 flex items-center px-10 justify-between w-full  bg-[#f7f7f7] h-[10vh]">
      <div>
        <h1>Booknest</h1>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link to={"/admin/adminDashboard"}>Home</Link>{" "}
          </li>

          <li>
            <Link to={"/admin/userList"}>Users</Link>
          </li>
          <li>
            <Link to={"/admin/ads"}>Ads</Link>
          </li>

          {user?.role == "ADMIN" ? (
            <ul className="flex space-x-4">
              <li className="nav-item">
                <Link
                  to="/"
                  onClick={(e) => {
                    localStorage.removeItem("admin");
                  }}
                  className="flex items-center gap-2 px-2 text-gray-900 hover:text-teal-500"
                >
                  Log Out
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-4">
              <li className="nav-item">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-2 text-gray-900 hover:text-teal-500"
                >
                  <CiUser />
                  Log in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="px-2 text-gray-900 hover:text-teal-500"
                >
                  Sign up
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;
