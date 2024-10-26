import React, { useEffect, useState } from "react";
import { CiGlass, CiLocationOn } from "react-icons/ci";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate(); // Use navigate from react-router-dom
  const [book, setBook] = useState(null); // State to hold the book details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [buttonText, setButtonText] = useState("Call Now"); // State to manage button text

  // Fetch book details based on ID
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/BookNest/bookstore-backend/book/getSingleBook.php?id=${id}`
        );
        console.log(response.data);
        setBook(response.data); // Set the fetched book data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError("Error fetching book details");
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchBookDetails();
  }, [id]);

  // Handle Call Now button click
  const handleCallNow = () => {
    if (book) {
      const phoneNumber = book.phone_number; // Replace with actual phone number from book data if available
      setButtonText(phoneNumber); // Update button text to show phone number
    }
  };

  // Redirect to the appropriate profile page
  const handleProfileRedirect = () => {
    const loggedInUserId = localStorage.getItem("id"); // Get logged-in user ID from local storage
    if (book.user_id === loggedInUserId) {
      navigate(`/user/profile/${loggedInUserId}`); // Redirect to user's own profile
    } else {
      navigate(`/seller/${book.user_id}`); // Redirect to seller's profile
    }
  };

  if (loading) {
    return <p>Loading book details...</p>; // Display loading state
  }

  if (error) {
    return <p>{error}</p>; // Display error message
  }

  // If book is not found
  if (!book) {
    return <p>Book not found.</p>;
  }

  console.log(book);
  function handleBookmark() {
    // Parse user data from localStorage
    const parsedUser = JSON.parse(localStorage.getItem("user"));

    // Ensure parsedUser exists and contains an ID
    if (!parsedUser || !parsedUser.id) {
      alert("User not found. Please log in.");
      return;
    }

    const value = {
      book_id: id,
      buyer_id: parsedUser.id, // Use parsed user ID
      seller_id: book.userId,
      Flag: 0,
    };

    // Make POST request to add bookmark
    axios
      .post(
        "http://localhost/BookNest/bookstore-backend/book/addBookmark.php",
        value
      )
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status == "Failure") {
          alert("Already Booked");
        } else {
          alert(res.data.status);
        }
      })
      .catch((err) => {
        console.error("Error adding bookmark:", err);
      });
  }

  return (
    <div className="container mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-green-600">Rs {book.price}</h1>
          <h2 className="text-xl font-semibold mt-1">{book.title}</h2>
          <div className="text-sm text-gray-500 flex items-center">
            <span className="mr-2">By:</span>
            {book.userId}
            <Link
              to={`/seller/${book.userId}`} // Link for seller name, but will handle redirection
              onClick={handleProfileRedirect} // Use the function for redirection
              className="text-blue-500 hover:underline"
            >
              {/* {book.userId} */}
              {book.userName} {/* Display the seller's name */}
            </Link>
            <span className="mx-2">|</span>
            {/* <span>Posted: {book.postedDate}</span> */}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleCallNow} // Call the function when clicked
            className="bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700"
          >
            {buttonText} {/* Show current button text */}
          </button>
          <button
            onClick={handleBookmark} // Placeholder for another button action
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
          >
            Book Now {/* Show current button text */}
          </button>
        </div>
      </div>

      {/* Book Image and Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        {/* Image Section */}
        <div>
          <img
            src={book.image ? `/uploads/${book.image}` : "notfound.jpg"}
            alt={book.title}
            className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Description Section */}
        <div>
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="mt-2 text-gray-700">{book.description}</p>
          <div className="mt-4">
            <p className="text-gray-500">
              <strong>Condition:</strong> {book.book_condition}
            </p>
            <p className="text-gray-500">
              <strong>Date Posted:</strong>{" "}
              {new Date(book.posted_date).toLocaleDateString()}{" "}
              {/* Display formatted date */}
            </p>

            <p className="text-gray-500">
              <strong>Original Price:</strong> Rs {book.original_price}
            </p>
            <p className="text-gray-500 flex items-center">
              <CiLocationOn className="text-lg" />
              <span className="ml-2">
                <strong>Location:</strong> {book.address}{" "}
                {/* Make sure location is fetched correctly */}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
