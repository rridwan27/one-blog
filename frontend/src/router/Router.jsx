import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Errorpage from "../pages/Error/Errorpage";
import Home from "../pages/Home/Home";
import PrivateRoute from "../providers/PrivateRoute";
import AddBlog from "../pages/AddBlog/AddBlog";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import WishList from "../pages/WishList/WishList";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Profile from "../pages/Profile/Profile";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import axios from "axios";
import UpdatePost from "../pages/UpdatePost/UpdatePost";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/add-blog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-blogs",
        Component: AllBlogs,
      },
      {
        path: "/featured-blogs",
        Component: FeaturedBlogs,
        loader: () =>
          axios
            .get("http://localhost:5000/api/v1/post/allpost", {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            })
            .then((res) => res.data),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog-details/:id",
        element: (
          <PrivateRoute>
            <BlogDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          axios
            .get(
              `http://localhost:5000/api/v1/post/blog-details/${params.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            )
            .then((res) => res.data),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdatePost />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          axios
            .get(
              `http://localhost:5000/api/v1/post/blog-details/${params.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            )
            .then((res) => res.data),
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/sign-in",
        Component: SignIn,
      },
      {
        path: "/auth/sign-up",
        Component: SignUp,
      },
      {
        path: "/auth/forgot-password",
        Component: ForgotPassword,
      },
    ],
  },
]);

export default router;
