import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Make sure to import Link
import axios from "axios";

const SellerProfile = () => {
  const { id } = useParams(); // Get user_id from the URL
  const [seller, setSeller] = useState(null); // State to hold seller details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [sellerBooks, setSellerBooks] = useState([]); // State to hold seller's books

  // Fetch seller data and books
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        // Fetch seller info based on user_id
        const sellerResponse = await axios.get(
          `http://localhost:80/BookNest/bookstore-backend/user/getUser.php?id=${id}`
        );
        console.log("Seller Data:", sellerResponse.data); // Log seller data
        setSeller(sellerResponse.data);

        // Fetch seller's books
        const booksResponse = await axios.get(
          `http://localhost:80/BookNest/bookstore-backend/book/getSingleBook.php?id=${id}`
        );
        console.log("Seller Books:", booksResponse.data); // Log seller books data
        setSellerBooks(booksResponse.data);

        setLoading(false);
      } catch (error) {
        setError("Error fetching seller information.");
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  if (loading) {
    return <p>Loading seller details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!seller) {
    return <p>No seller found.</p>;
  }

  return (
    <div className="container mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Seller Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src={
              seller.profileImage
                ? `/uploads/${seller.profileImage}`
                : "defaultAvatar.jpg"
            }
            alt={seller.fullname}
            className="w-32 h-32 rounded-full shadow-lg mb-4"
          />
          <h2 className="text-2xl font-semibold">{seller.fullname}</h2>
          <p className="text-gray-500">Last active: 1 day ago</p>
          <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full mt-2">
            INDIVIDUAL
          </span>
          <p className="text-gray-600 mt-4">
            Total Listings: {sellerBooks.length}
          </p>
        </div>

        {/* Seller's Book Listings */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Ad(S) Posted By {seller.fullname}
          </h3>
          {sellerBooks.map((book) => (
            <div key={book.id} className="flex items-center mb-4">
              <img
                src={book.image ? `/uploads/${book.image}` : "notfound.jpg"}
                alt={book.title}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold">{book.title}</h4>
                <p className="text-gray-500">Price: Rs {book.price}</p>
                <Link
                  to={`/book/${book.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Contact</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            placeholder="Message"
            className="w-full p-3 border rounded-lg"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;
