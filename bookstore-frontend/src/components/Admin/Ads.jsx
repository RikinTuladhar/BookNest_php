import React, { useState, useEffect } from "react";
import axios from "axios";

const Ads = () => {
  const [books, setBooks] = useState([]); // State to store the list of books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch book data from the API
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/BookNest/bookstore-backend/book/getBook.php" // Replace with your API endpoint
      );
      setBooks(response.data); // Set the fetched books data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError("Error fetching books data");
      setLoading(false); // Set loading to false if there's an error
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading books...</p>; // Display loading state
  }

  if (error) {
    return <p>{error}</p>; // Display error message
  }

  // Function to delete a book
  const deleteBook = async (bookId) => {
    try {
      await axios.delete(
        `http://localhost:80/BookNest/bookstore-backend/book/deleteBook.php?id=${bookId}` // Replace with your DELETE endpoint
      );
      // Remove the deleted book from the state
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      setError("Error deleting book");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Books Available for Sale</h2>
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Condition</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Posted By</th>
            <th className="px-4 py-2">Actions</th>{" "}
            {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b">
              <td className="px-4 py-2">{book.id}</td>
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2">{book.c_name}</td>
              <td className="px-4 py-2">{book.book_condition}</td>
              <td className="px-4 py-2">${book.price}</td>
              <td className="px-4 py-2">{book.posted_by}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteBook(book.id)} // Call deleteBook on button click
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ads;
