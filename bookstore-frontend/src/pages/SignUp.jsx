import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    phone_number: "", // Added phone_number
    address: "",
    role: "USER",
  });

  console.log(user);

  const getData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value, role: "USER" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/BookNest/bookstore-backend/user/registerUser.php",
        user
      );
      const data = await response.data.status;
      alert(data);
      // Clear the form by resetting the user state
      setUser({
        fullname: "",
        email: "",
        password: "",
        phone_number: "",
        address: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <>
      <div className="login-container" id="container">
        <div className="login">
          <div className="login-title">
            <h3>Create your BookNest Account</h3>
            <div className="login-other">
              Already a member?{" "}
              <a href="/login" className="link">
                Login
              </a>{" "}
              here.
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mod-login">
              <div className="mod-login-col1">
                <div className="mod-input mod-input-full-name">
                  <label htmlFor="fullname">Full name</label>
                  <input
                    onChange={getData}
                    name="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    value={user.fullname}
                    required
                  />
                </div>
                <div className="mod-input mod-input-login">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={getData}
                    name="email"
                    type="email"
                    placeholder="Please enter your Email"
                    value={user.email}
                    required
                  />
                </div>
                <div className="mod-input mod-input-password">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={getData}
                    name="password"
                    type="password"
                    placeholder="Please enter your password"
                    value={user.password}
                    required
                  />
                </div>
              </div>
              <div className="mod-login-col2">
                <div className="mod-input mod-input-phone">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    onChange={getData}
                    name="phone_number"
                    type="text"
                    placeholder="Enter your phone number"
                    maxLength={10}
                    value={user.phone_number}
                    required
                  />
                </div>
                <div className="mod-input mod-input-address">
                  <label htmlFor="address">Address</label>
                  <input
                    onChange={getData}
                    name="address"
                    type="text"
                    placeholder="Enter your address"
                    value={user.address}
                    required
                  />
                </div>
                <div className="mod-login-btn">
                  <button
                    type="submit"
                    className="mod-button bg-indigo-600 hover:bg-indigo-500"
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
