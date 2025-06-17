import { useState } from "react";
import { toast } from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email || !isValidEmail) {
      toast.error("Please enter a valid email address");
      return;
    }

    setEmail("");
    toast.success("Thank you for subscribing!");
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-[#0c0e16] text-gray-800 dark:text-gray-200 rounded-lg shadow-inner">
      <section className="container mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Get updates with the latest blogs
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter and never miss an update from OneBlog!
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-[500px] flex flex-col sm:flex-row items-stretch gap-4 sm:gap-0 shadow-lg rounded-lg overflow-hidden border border-violet-600"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
              aria-label="Email Address"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
