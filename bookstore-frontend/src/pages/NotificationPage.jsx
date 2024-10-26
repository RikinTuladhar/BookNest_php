import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      title: "Welcome Notification",
      message: "This is your first notification!",
      date: new Date().toLocaleString(),
    },
  ]);

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem("user"));

    // Ensure parsedUser exists and contains an ID
    if (!parsedUser || !parsedUser.id) {
      alert("User not found. Please log in.");
      return;
    }

    axios
      .get(
        `http://localhost/BookNest/bookstore-backend/book/getBookmark.php?id=${parsedUser.id}`
      )
      .then((res) => {
        console.log("Backend Response:", res.data);

        // Check if res.data.data is an array, otherwise fallback to an empty array
        setItems(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => {
        console.error("Error fetching bookmarks:", err);
        setError("Failed to load bookmarks. Please try again later.");
      });
  }, []);

  // Request permission for browser notifications when component mounts
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Function to add a new notification
  const addNotification = () => {
    const newNotification = {
      title: "New Notification",
      message: "You have a new message!",
      date: new Date().toLocaleString(),
    };

    // Add the new notification to the state
    setNotifications([...notifications, newNotification]);

    // Show browser notification if permission is granted
    if (Notification.permission === "granted") {
      new Notification(newNotification.title, {
        body: newNotification.message,
      });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="bg-white rounded shadow-md divide-y divide-gray-200">
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index} className="p-4">
              <p className="font-bold text-gray-700">{item.bookTitle}</p>
              <p className="text-gray-500">Posted date: {item.posted_date}</p>
              <p className="text-xs text-gray-400">Reached by {item.email}</p>
              <Link to={`/books/${item.bookid}`}>View</Link>
            </li>
          ))
        ) : (
          <p>No Notification.</p>
        )}
      </ul>
    </div>
  );
};

export default NotificationPage;
