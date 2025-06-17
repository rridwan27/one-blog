import { Mail, Phone, NotebookText } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0e1523] text-gray-800 dark:text-gray-300 py-10 px-6 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 border-b border-dashed border-violet-600 dark:border-violet-500 pb-8">
        <div className="max-w-sm">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-violet-600 dark:text-violet-500 mb-2"
          >
            <NotebookText size={32} />
            <span>OneBlog</span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            OneBlog is your daily dose of inspiration, knowledge, and stories.
            From tech to lifestyle, we deliver curated blogs to keep you
            informed and entertained.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-blogs">All Blogs</Link>
            </li>
            <li>
              <Link to="/featured-blogs">Featured Blogs</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-3">
            Contact Us
          </h4>
          <div className="flex items-center gap-2 mb-2">
            <Mail size={18} />
            <span className="text-sm">rridwan27@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <span className="text-sm">+8801722222222</span>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-3">
            Follow Us
          </h4>
          <div className="flex gap-4">
            <Link
              to="https://www.facebook.com/profile.php?id=100071921641796"
              target="_blank"
            >
              <FaFacebook
                className="text-violet-600 hover:text-violet-400 transition"
                size={22}
              />
            </Link>
            <Link to="https://www.instagram.com/aarnobbb._/" target="_blank">
              <FaInstagram
                className="text-violet-600 hover:text-violet-400 transition"
                size={22}
              />
            </Link>
            <Link to="https://x.com/arnob000007" target="_blank">
              <FaX
                className="text-violet-600 hover:text-violet-400 transition"
                size={22}
              />
            </Link>
            <Link to="https://github.com/rridwan27" target="_blank">
              <FaGithub
                className="text-violet-600 hover:text-violet-400 transition"
                size={22}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-xs font-semibold text-gray-600 dark:text-gray-400 pt-6">
        © 2025 - All rights reserved by{" "}
        <span className="text-violet-600 dark:text-violet-500">OneBlog</span>
      </div>
    </footer>
  );
};

export default Footer;
