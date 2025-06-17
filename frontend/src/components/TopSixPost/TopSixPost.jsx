import axios from "axios";
import { useEffect, useState, use } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";

const TopSixPost = () => {
  const [posts, setPosts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState([]);

  const { mongoUser } = use(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/post/top-six",
          { withCredentials: true }
        );
        setPosts(res.data.posts);

        if (mongoUser?.bookmarks) {
          setIsBookmarked(mongoUser.bookmarks);
        } else {
          setIsBookmarked([]);
        }
      } catch (error) {
        console.error("Failed to fetch top posts:", error);
        toast.error("Failed to load posts");
      }
    };
    fetchPosts();
  }, [mongoUser]);

  const addToWishlist = async (postId) => {
    setSaving(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/post/wishlist/add/${postId}`,
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
        if (data.isBookmarked) {
          setIsBookmarked((prev) => [...prev, postId]);
        } else {
          setIsBookmarked((prev) => prev.filter((id) => id !== postId));
        }
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="my-10 px-4 container mx-auto">
      <h2 className="text-4xl font-bold text-violet-600 mb-8 text-center">
        Latest Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            key={post._id}
            className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg bg-white dark:bg-gray-800"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-4 sm:p-6">
              <time
                dateTime={post.createdAt}
                className="block text-xs text-gray-500 dark:text-gray-400"
              >
                {new Date(post.createdAt).toLocaleDateString()}
              </time>

              <Link to={`/blog-details/${post._id}`}>
                <h3 className="mt-0.5 text-lg font-semibold text-gray-900 hover:underline dark:text-white">
                  {post.title}
                </h3>
              </Link>

              <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                {post.shortDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 justify-center">
                <Link to={`/blog-details/${post._id}`}>
                  <button className="px-4 py-2 text-sm cursor-pointer font-semibold text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white transition">
                    Details
                  </button>
                </Link>
                <button
                  onClick={() => addToWishlist(post._id)}
                  disabled={saving}
                  className={`px-4 py-2 text-sm cursor-pointer font-semibold ${
                    isBookmarked.includes(post._id)
                      ? "bg-violet-600 text-white"
                      : "text-violet-600 border border-violet-600 hover:bg-violet-600 hover:text-white"
                  } rounded transition`}
                >
                  {saving
                    ? "Saving..."
                    : isBookmarked.includes(post._id)
                    ? "Bookmarked"
                    : mongoUser
                    ? "Add to Wishlist"
                    : "Sign in to save"}
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default TopSixPost;
