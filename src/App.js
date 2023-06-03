import React, { useState } from "react";
import {
  Navigate,
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import LayoutRouter from "./LayoutRouter";

import Login from "./pages/Forms/Login";
import HomePage from "./pages/home/HomePage";

import { AnimatePresence } from 'framer-motion';
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/Forms/ForgotPassword";
import Register from "./pages/Forms/Register";
import ResetPassword from "./pages/Forms/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMain from "./pages/admin/AdminMain";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import PostsTable from "./pages/admin/PostsTable";
import UsersTable from "./pages/admin/UsersTable";
import Category from "./pages/category/Category";
import PostDetails from "./pages/postDetails/PostDetails";
import CreatePost from "./pages/posts/CreatePost";
import PostsPage from "./pages/posts/PostsPage";
import Profile from "./pages/profile/Profile";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";

function App() {
  const [userdata, setUserdata] = useState(null);

  const { loginUser } = useSelector((state) => state.auth);

// protection route function 
  function Protection (props){
    if (
      localStorage.getItem("UserInfo") === null
    ) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }




  // admin guard router
  function AdminProtection(props) {
    if (
      localStorage.getItem("UserInfo") === null ||
      loginUser?.role !== "Admin"
    ) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }

  const router = createHashRouter([
    {
      path: "/",
      element: <LayoutRouter  />,
      children: [
        {
          path: "/login",
          element: userdata?.isloggedin ? <Navigate to="/" /> : <AnimatePresence mode='wait' ><Login /></AnimatePresence> ,
        },

        {
          index: true,
          element: <Protection> <HomePage /></Protection> ,
        },
        {
          path: "/register",
          element: userdata?.isloggedin ? <Navigate to="/" /> : <Register />,
        },
        {
          path: "/auth/confirmLink/:token",
          element: <VerifyEmail/>
        },

        {
          path: "/forgot-password",
          element:<ForgotPassword /> ,
        },
        {
          path: "/reset-password/:token",
          element:<ResetPassword /> ,
        },
        {
          path: "/posts",
          element: <Protection><PostsPage /></Protection> ,
        },
        {
          path: "/posts/create",
          element: <Protection><CreatePost /></Protection> ,
        },
        {
          path: "/posts/details/:id",
          element:<Protection><PostDetails /></Protection> ,
        },
        {
          path: "/profile/:id",
          element: <Protection><Profile /></Protection> ,
        },

        {
          path: "/posts/categories/:category",
          element: <Protection> <Category /></Protection>,
        },

        {
          path: "/admin-dashboard",
          element: (
            <AdminProtection>
              <AdminDashboard />
            </AdminProtection>
          ),
          children: [
            { path: "", element: <AdminMain /> },
            { path: "users-table", element: <UsersTable /> },
            { path: "posts-table", element: <PostsTable /> },
            { path: "categories-table", element: <CategoriesTable /> },
            { path: "comments-table", element: <CommentsTable /> },
          ],
        },
        {
          path: "*",
          element: <h2 style={{ minHeight: "85vh" }}>page not found</h2>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
