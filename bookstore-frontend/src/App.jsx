import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminHome from "./components/Admin/AdminHome";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserProfile from "./pages/UserProfile"; // Assuming you have a UserProfile component
import BookForm from "./components/BookForm";
import UserDashboard from "./pages/UserDashboard";
import User from "./components/Admin/Users";
import Ads from "./components/Admin/Ads";
import BookDetails from "./pages/BookDetails";
import SellerProfile from "./pages/SellerProfile";
import NotificationPage from "./pages/NotificationPage";
import Recommendation from "./pages/Recommendation";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          path: "",
          element: <Dashboard />,
          index: true,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "category",
          element: <Category />,
        },

        {
          path: "BookForm",
          element: <BookForm />,
        },
        {
          path: "login",
          element: <SignIn />,
        },
        {
          path: "register",
          element: <SignUp />,
        },
        {
          path: "books/:id",
          element: <BookDetails />,
        },
        {
          path: "seller/:id",
          element: <SellerProfile />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/admin",
      element: <AdminHome />,
      children: [
        {
          path: "adminDashboard",
          element: <AdminDashboard />,
          index: true,
        },
        // Additional admin routes can be added here
        {
          path: "ads",
          element: <Ads />,
        },
        {
          path: "userList",
          element: <User />,
        },
      ],
    },
    {
      path: "/user",
      element: <HomePage />, // This acts as a layout for user-related routes
      children: [
        {
          path: "userDashboard",
          element: <UserDashboard />,
        },
        {
          path: "profile/:id", // Dynamic segment for user ID
          element: <UserProfile />,
        },
        {
          path: "notification",
          element: <NotificationPage />,
        },
        {
          path: "recommendation/:id",
          element: <Recommendation />,
        },
        // Add more user-specific routes here
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
