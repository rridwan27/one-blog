import Box from "@mui/material/Box";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import BlogGrid from "../../components/BlogGrid/BlogGrid";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { Loader } from "lucide-react";

const AllBlogs = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://one-blog-tr95.onrender.com/api/v1/post/allpost", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data.posts);
        setFilteredData(res.data.posts); // show all initially
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const applyFilters = () => {
    let result = data;

    if (category !== "All") {
      result = result.filter((blog) => blog.category === category);
    }

    if (search) {
      const term = search.toLowerCase();
      result = result.filter((blog) => blog.title.toLowerCase().includes(term));
    }

    setFilteredData(result);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  useEffect(() => {
    // auto-filter only when category changes
    applyFilters();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <Box component="section" sx={{ py: 4 }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">All Blogs</h2>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-10">
            <form
              onSubmit={handleSearch}
              className="flex flex-1 w-full max-w-md"
            >
              <input
                type="text"
                placeholder="Search by title"
                className="w-full p-2 border border-gray-300 rounded-l-full focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-violet-700 text-white py-2 px-4 rounded-r-full hover:bg-violet-800 transition-colors">
                Search
              </button>
            </form>
            <div className="flex flex-1 max-w-md w-full">
              <select
                className="w-full cursor-pointer p-2 border focus:outline-none text-center border-gray-300 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Politics">Politics</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Travel">Travel</option>
                <option value="Wellness">Wellness</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredData.map((blog) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: blog.id * 0.1 }}
                key={blog._id}
              >
                <BlogGrid blog={blog} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AllBlogs;
