import { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { Heart, Loader } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BlogPostCard = ({ blog }) => {
  const { mongoUser, loading } = use(AuthContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    if (mongoUser && blog) {
      const bookmarked = mongoUser.bookmarks?.some(
        (bookmarkId) => bookmarkId.toString() === blog._id.toString()
      );
      setIsBookmarked(bookmarked);
    } else {
      setIsBookmarked(false);
    }
  }, [mongoUser, blog]);

  const truncateText = (text, wordCount) => {
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  const handleWishlist = async (id) => {
    setWishlistLoading(true);
    try {
      const response = await axios.post(
        `https://one-blog-tr95.onrender.com/api/v1/post/wishlist/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setIsBookmarked(data.isBookmarked);
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Failed to update wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center text-violet-600 h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-800 dark:text-gray-100 rounded-2xl overflow-hidden shadow-2xl dark:shadow-none hover:shadow-xl transition-shadow duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
        <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
          <img
            alt={blog.title}
            src={blog.imageUrl || "/placeholder.jpg"}
            className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="lg:col-span-7 flex flex-col p-6 lg:p-8">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 text-xs rounded-full dark:bg-violet-600 dark:text-gray-50 bg-gray-200 text-gray-800">
              {blog.category}
            </span>
            <button
              onClick={() => handleWishlist(blog._id)}
              className="cursor-pointer text-white px-4 py-2"
            >
              {wishlistLoading ? (
                <Loader className="animate-spin w-5 h-5 text-red-500" />
              ) : isBookmarked ? (
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              ) : (
                <Heart className="w-6 h-6 text-red-500" />
              )}
            </button>
          </div>

          <Link to={`/posts/${blog._id}`} className="hover:no-underline">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {blog.title}
            </h2>
          </Link>

          <div className="flex-1">
            <p className="text-gray-600 font-semibold dark:text-gray-300 mb-2">
              {blog.shortDescription}
            </p>

            <p className="mb-2 text-black dark:text-white">
              {truncateText(blog.longDescription, 50)}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-300 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {blog.author?.fullName || "Unknown Author"}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to={`/blog-details/${blog._id}`}
                className="inline-flex items-center text-sm font-medium text-violet-600 dark:text-violet-500 hover:text-violet-600 dark:hover:text-violet-800 transition-colors"
              >
                Read more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
