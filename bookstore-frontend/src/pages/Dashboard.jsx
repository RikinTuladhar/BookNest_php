import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";

import Card from "../components/Card";
import axios from "axios";
const Dashboard = () => {
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

  const [book, setBook] = useState([]);
  const [pluse2, setpluse2] = useState([]);
  const [fiction, setFiction] = useState([]);
  const [bachelor, setBachelor] = useState([]);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/BookNest/bookstore-backend/book/getBook.php"
        );
        setBook(response.data);

        console.log(response.data);
        const pluse2 = response.data.filter((d) => d.c_name == "+2");
        const fiction = response.data.filter((d) => d.c_name == "Fiction");
        const bachelor = response.data.filter((d) => d.c_name == "Bachelor");
        setpluse2(pluse2);
        setFiction(fiction);
        setBachelor(bachelor);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchBook();
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Welcome to BookNest
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Online platform to buy and sell old books. Age of the book
                doesn't determines the knowledge it contains. So, keep learning
                keep sharing.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {user?.role == "USER" ? (
                  <Link
                    to="/BookForm"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Post Free Ad
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Post Free Ad
                  </Link>
                )}

                <Link
                  to=""
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h1 className="text-4xl text-blue-500 pb-5">+2 </h1>
            <Card book={pluse2} />
          </div>
          <div className="mt-9">
            <h1 className="text-4xl text-blue-500 pb-5">Bachelor Books</h1>
            <Card book={bachelor} />
          </div>
          <div className="mt-9">
            <h1 className="text-4xl text-blue-500 pb-5">Bachelor Books</h1>
            <Card book={fiction} />
          </div>
          <HowItWorks />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
