import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/LogIn.css";
import { CiGlass } from "react-icons/ci";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "", // Changed from name to email
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const postForm = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before submitting

    try {
      const response = await axios.post(
        `http://localhost:80/BookNest/bookstore-backend/user/loginUser.php`,
        user
      );
      const data = await response.data;
      console.log(data.message);
      localStorage.setItem("user", JSON.stringify(data.message));

      if (data.message.role === "USER") {
        navigate("/user/userDashboard"); // Redirect to the user dashboard
      } else if (data.message.role == "ADMIN") {
        navigate("/admin/adminDashboard");
      } else {
        setError(data.status); // Set error message from API
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      setError("There was an error logging in!");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-title">
          <h3>Welcome to BookNest! Please login.</h3>
          <div className="login-other">
            New member?{" "}
            <a href="register" className="link">
              Register
            </a>{" "}
            here.
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mod-login">
            <div className="mod-login-col1">
              <div className="mod-input mod-input-login">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Please enter your Email"
                  value={user.email}
                  onChange={postForm}
                  required
                />
              </div>
              <div className="mod-input mod-input-password">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Please enter your password"
                  value={user.password}
                  onChange={postForm}
                  required
                />
              </div>
              {/* <div className="mod-login-forgot">
                <a href="#" className="link">
                  Forgot your password?
                </a>
              </div> */}
            </div>
            <div className="mod-login-col2">
              <div className="mod-login-btn">
                <button
                  type="submit"
                  className="mod-button bg-indigo-600 hover:bg-indigo-500"
                >
                  LOGIN
                </button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
