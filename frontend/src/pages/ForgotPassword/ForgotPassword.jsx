import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      if (email) {
        setSuccess("Password reset email sent. Check your inbox.");
        toast.success("Password reset link sent!");
        navigate("/auth/sign-in");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="flex justify-center items-center mt-48 px-4"
    >
      <div className="card w-full max-w-sm rounded-2xl py-6 shadow-2xl bg-white dark:bg-black/50 backdrop-blur-sm">
        <h2 className="font-semibold text-2xl text-center mb-4 text-gray-900 dark:text-white">
          Reset Your Password
        </h2>
        <form onSubmit={handleResetPassword} className="px-6">
          <div className="form-control mb-4">
            <label className="label mb-1">
              <span className="text-gray-700 dark:text-gray-300">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full bg-violet-700 hover:bg-violet-800 text-white border-none"
            >
              Send Reset Link
            </button>
          </div>

          <div className="text-center mt-4">
            <Link
              to="/auth/sign-in"
              className="text-violet-600 dark:text-violet-400 hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
