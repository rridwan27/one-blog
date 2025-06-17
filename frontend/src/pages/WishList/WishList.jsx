import { useEffect, useState } from "react";
import axios from "axios";
import { CircleSlash2, HeartOff } from "lucide-react";
import toast from "react-hot-toast";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/post/wishlist",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setWishlist(response.data.wishlist || []);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishList();
  }, []);

  const handleRemoveFromWishlist = async (postId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/post/wishlist/${postId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setWishlist((prev) => prev.filter((post) => post._id !== postId));
      toast.success("Post removed from wishlist successfully");
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Wishlist</h1>
      </div>

      {wishlist.length > 0 ? (
        <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((post) => (
            <article
              key={post._id}
              className="flex flex-col h-full overflow-hidden rounded-xl shadow-md transition hover:shadow-xl bg-white dark:bg-gray-800"
            >
              <div className="relative">
                <img
                  alt={post.title}
                  src={post.imageUrl}
                  className="h-56 w-full object-cover"
                />
                <p className="absolute top-2 right-2 bg-violet-300 text-violet-800 font-medium px-2 py-1 rounded-2xl">
                  {post.category}
                </p>
              </div>

              <div className="flex flex-col justify-between flex-grow p-5">
                <div className="mb-4">
                  <time
                    dateTime={post.createdAt}
                    className="block text-xs text-gray-500 dark:text-gray-400"
                  >
                    {new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>

                  <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h3>

                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {post.author?.fullName || "Unknown Author"}
                  </p>

                  <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {post.shortDescription || "No description available."}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveFromWishlist(post._id)}
                  className="w-full mt-auto px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 transition text-white font-medium rounded-md"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Remove from Wishlist</span>{" "}
                    <HeartOff className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold mb-6 text-center text-red-800">
          <span>You have no posts in your wishlist</span> <CircleSlash2 />
        </h1>
      )}
    </>
  );
};

export default WishList;
