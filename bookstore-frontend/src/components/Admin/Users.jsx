import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/BookNest/bookstore-backend/user/getUser.php" // Replace with your API endpoint
      );
      setUsers(response.data); // Set the fetched users data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError("Error fetching user data");
      setLoading(false); // Set loading to false if there's an error
    }
  };

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:80/BookNest/bookstore-backend/user/deleteUser.php?id=${userId}` // Replace with your DELETE endpoint
      );
      // Remove the deleted user from the state
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Error deleting user");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading users...</p>; // Display loading state
  }

  if (error) {
    return <p>{error}</p>; // Display error message
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Number</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Actions</th>{" "}
            {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            user.role == "ADMIN" ? (
              ""
            ) : (
              <>
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.fullname}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone_number}</td>
                  <td className="px-4 py-2">{user.address}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;
