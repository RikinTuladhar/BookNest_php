import React, { useEffect, useState } from "react";
import axios from "axios";

const BookForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [book, setBook] = useState({
    title: "",
    original_price: "",
    price: "",
    book_condition: "",
    description: "",
  });
  const [image, setImage] = useState(null); // State for image file

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/BookNest/bookstore-backend/categories/getCategories.php"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(
            `http://localhost:80/BookNest/bookstore-backend/subcategories/getSubcategories.php?category_id=${selectedCategory}`
          );
          setSubcategories(response.data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the logged-in user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      alert("User ID not found. Please log in again.");
      return;
    }

    if (
      !book.title ||
      !selectedCategory ||
      !book.price ||
      !book.book_condition ||
      !book.description
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();

    // Append all book details
    for (let key in book) {
      formData.append(key, book[key]);
    }

    // Add the selected category, subcategory, and user ID to formData
    formData.append("category_id", selectedCategory);
    formData.append("subcategory_id", selectedSubcategory);
    formData.append("user_id", user.id); // Add user ID dynamically

    // Append the image file if it exists
    if (image) {
      formData.append("image", image);
    }

    // Make the POST request to createBook.php
    try {
      const response = await axios.post(
        "http://localhost:80/BookNest/bookstore-backend/book/createBook.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        alert("Book added successfully!");
        // Clear the form by resetting the state
        setBook({
          title: "",
          original_price: "",
          price: "",
          book_condition: "",
          description: "",
        });
        setSelectedCategory("");
        setSelectedSubcategory("");
        setImage(null);
        setSubcategories([]);
      } else {
        alert("Failed to add book. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-center text-3xl pb-5 font-semibold">Post an Ad</h2>
      <form
        onSubmit={handleSubmit}
        className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-300"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          Post Your Book
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
            placeholder="Enter book title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Category:</label>
          <select
            name="category_id"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSubcategories([]); // Reset subcategories when category changes
            }}
            required
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Subcategory:</label>
          <select
            name="subcategory_id"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Original Price:</label>
          <input
            type="text"
            step="0.01"
            name="original_price"
            maxLength={5}
            value={book.original_price}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
            placeholder="Enter original price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Price:</label>
          <input
            type="text"
            step="0.01"
            name="price"
            maxLength={5}
            value={book.price}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
            placeholder="Enter selling price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Book Condition:</label>
          <input
            type="text"
            name="book_condition"
            value={book.book_condition}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
            placeholder="Describe the book condition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description:</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
            placeholder="Write a brief description"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white rounded p-2 w-full hover:bg-indigo-500 transition duration-200 transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookForm;
