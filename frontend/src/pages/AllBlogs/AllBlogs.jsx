import Box from "@mui/material/Box";
import { use, useEffect, useState } from "react";
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
  const { loading } = use(AuthContext);

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
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.shortDescription.toLowerCase().includes(term) ||
          blog.longDescription.toLowerCase().includes(term)
      );
    }

    setFilteredData(result);
  };

  useEffect(() => {
    applyFilters();
  }, [category, search, data]);

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

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
                placeholder="Search"
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
                name=""
                id=""
                className="w-full cursor-pointer p-2 border focus:outline-none text-center border-gray-300 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option
                  value="All"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  All
                </option>
                <option
                  value="Politics"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  Politics
                </option>
                <option
                  value="Business"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  Business
                </option>
                <option
                  value="Health"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  Health
                </option>
                <option
                  value="Technology"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  Technology
                </option>
                <option
                  value="Sports"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  Sports
                </option>
                <option
                  value="Travel"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  Travel
                </option>
                <option
                  value="Wellness"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  Wellness
                </option>
                <option
                  value="Lifestyle"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  Lifestyle
                </option>
                <option
                  value="Other"
                  className="bg-gray-900 cursor-pointer text-gray-100"
                >
                  Other
                </option>
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
