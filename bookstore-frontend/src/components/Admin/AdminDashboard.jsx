import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const { reload, setReload } = useOutletContext();
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [totalBook, setTotalBook] = useState([]);
  // Function to fetch user data from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/BookNest/bookstore-backend/user/getUser.php" // Replace with your API endpoint
      );
      const bookResponse = await axios.get(
        "http://localhost:80/BookNest/bookstore-backend/book/getBook.php"
      );
      setTotalBook(bookResponse.data.length);
      console.log(bookResponse);
      setUsers(response.data); // Set fetched users data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError("Error fetching user data");
      setLoading(false); // Set loading to false if there's an error
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUsers();
  }, [reload]); // Refetch users if reload changes

  // Calculate statistics
  const totalUsers = users.length;

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  if (error) {
    return <p>{error}</p>; // Display error message
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-gray-600">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Books </h2>
          <p className="text-gray-600">{totalBook}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">New Signups</h2>
          <p className="text-gray-600"></p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.fullname}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
