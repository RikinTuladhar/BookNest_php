import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Adjust if using cookies
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [userBooks, setUserBooks] = useState([]); // State to store user's book listings

  useEffect(() => {
    // Fetch the logged-in user's data and books
    const fetchUserData = async () => {
      try {
        console.log("Current User ID:", user.id); // Log current user ID

        // Fetch user books
        const responseBooks = await axios.get(
          `http://localhost:80/BookNest/bookstore-backend/book/getBook.php`
        );

        console.log("All Books:", responseBooks.data); // Log all books fetched

        // Filter books by user ID
        const userBooksFiltered = responseBooks.data.filter(
          (book) => book.user_id === user.id
        );

        console.log("Filtered User Books:", userBooksFiltered); // Log filtered books

        setUserBooks(userBooksFiltered); // Set books listed by the user
      } catch (error) {
        console.error("Error fetching user data or books:", error);
      }
    };

    fetchUserData();
  }, [user.id]); // Added user.id as a dependency to ensure it updates if user changes

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:80/BookNest/bookstore-backend/user/updateUser.php",
        formData
      );
      // Assuming the response includes updated user data
      setFormData(response.data); // Update formData with the latest user data
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update profile");
    }
  };

  const handleBookEdit = (book) => {
    // Logic to handle editing the book
    console.log("Edit book:", book);
    // You may want to implement a modal for editing the book
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(
        `http://localhost:80/BookNest/bookstore-backend/book/deleteBook.php?id=${bookId}`
      );
      console.log(response.data); // Log the response for debugging

      if (response.data.success) {
        // Filter out the deleted book from userBooks state
        setUserBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== bookId)
        );
        alert("Book deleted successfully");
      } else {
        console.log("Deletion failed:", response.data);
        alert("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Profile Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.fullname}</h2>
            <h2 className="text-2xl font-bold" id="number">
              {user.phone_number}
            </h2>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Manage Your Profile</h3>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form for editing user details */}
            <div className="flex justify-between">
              <label className="font-medium">Your Name:</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="border rounded-md p-1"
                required
              />
            </div>
            <div className="flex justify-between">
              <label className="font-medium">Email Address:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md p-1"
                required
              />
            </div>
            <div className="flex justify-between">
              <label className="font-medium">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className="border rounded-md p-1"
              />
            </div>
            <div className="flex justify-between">
              <label className="font-medium">Address:</label>
              <input
                type="text" // Change from 'tel' to 'text'
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded-md p-1"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Displaying user details */}
            <div className="flex justify-between">
              <span className="font-medium">Your Name:</span>
              <span>{user.fullname}</span> {/* Updated from user.name */}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email Address:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone Number:</span>
              <span>{user.phone_number}</span>{" "}
              {/* Updated to match local storage */}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Address:</span>
              <span>{user.address}</span>
            </div>
          </div>
        )}
      </div>

      {/* My Ads Section */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">My Ads</h3>

        <div className="grid grid-cols-2 gap-4">
          {userBooks.length > 0 ? (
            userBooks.map((book) => (
              <div key={book.id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={"/uploads/" + book.image} // Assuming the image URL is stored in book data
                  alt={book.title}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <h4 className="font-bold text-lg">{book.title}</h4>
                <p className="text-gray-600">Price: Rs{book.price}</p>
                <p className="text-gray-600">
                  Condition: {book.book_condition}
                </p>

                {/* Edit and Delete Buttons */}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleBookEdit(book)} // Make sure to implement this function properly
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You haven't listed any books yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
