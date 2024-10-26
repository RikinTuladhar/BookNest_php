import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/BookNest/bookstore-backend/categories/getCategories.php"
        );
        setCategories(response.data); // Assuming response data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategoryId) {
        try {
          const response = await axios.get(
            `http://localhost:80/BookNest/bookstore-backend/subcategories/getSubcategories.php?categoryId=${selectedCategoryId}`
          );
          setSubcategories(response.data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      }
    };

    fetchSubcategories();
  }, [selectedCategoryId]);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Our Categories</h2>
      <p className="text-center text-gray-600 mb-8">
        Choose books according to your choice
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-6 rounded-lg shadow-lg cursor-pointer"
            onClick={() => setSelectedCategoryId(category.id)}
          >
            <h3 className="text-lg font-bold mb-4">{category.name}</h3>
            {/* Display the number of books in the category */}
            <span className="text-gray-600">Books: {category.bookCount}</span>
          </div>
        ))}
      </div>

      {selectedCategoryId && subcategories.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-center mb-4">Subcategories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-lg shadow-lg bg-gray-100"
              >
                <h4 className="text-md font-semibold">{sub.name}</h4>
                <span className="text-gray-500">
                  Books Available: {sub.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
