import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { Loader, NotebookText } from "lucide-react";
import { use, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, googleSignIn, setLoading, loading } = use(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Must contain at least one lowercase letter");
      return;
    }
    await axios.post(
      "https://one-blog-tr95.onrender.com/api/v1/user/login",
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Logged in successfully");
      })
      .catch((error) => {
        let errorMessage = "Incorrect email or password";
        console.log(error);
        setError(errorMessage);
        setLoading(false);
        toast.error(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;

        let photoURL = user.photoURL || "";
        if (photoURL.length > 512) {
          photoURL = photoURL.substring(0, 512);
          console.warn("Trimmed photo URL to 512 characters");
        }

        const userProfile = {
          name: user.displayName,
          email: user.email,
          photo: photoURL,
          creationTime: user.metadata?.creationTime,
          lastSignInTime: user.metadata?.lastSignInTime,
        };

        try {
          const res = await axios.post(
            "https://one-blog-tr95.onrender.com/api/v1/user/google-login",
            userProfile,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Google login response:", res.data);

          if (res.status === 200 && res.data?.success !== false) {
            toast.success("Logged in successfully");
            navigate(location.state ? location.state : "/");
          } else {
            toast.error(res.data?.message || "Login failed");
          }
        } catch (err) {
          console.error("Google login error:", err);
          toast.error(
            err?.response?.data?.message || "Something went wrong during login"
          );
        }
      })
      .catch((error) => {
        const errorMessage = error.message || "Google sign-in failed";
        console.log(error);
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-violet-600" size={40} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center mt-20 md:mt-36"
    >
      <div
        className="w-full max-w-md p-8 bg-[#f5f6f6]
 dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-4">
            <NotebookText size={36} className="text-violet-600" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              OneBlog
            </h1>
          </div>
          <p className="text-xl font-semibold text-gray-700 dark:text-white">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center cursor-pointer gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FcGoogle size={20} />
            <span className="">Continue with Google</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            <div className="flex justify-end">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-violet-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 dark:text-white">
          Don't have an account?{" "}
          <Link
            to="/auth/sign-up"
            className="text-violet-600 hover:text-violet-800 font-medium cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignIn;
