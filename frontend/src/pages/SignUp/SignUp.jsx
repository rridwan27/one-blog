import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { NotebookText } from "lucide-react";
import { use, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { createUser, setUser, updateUser, googleSignIn, setLoading } =
    use(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );

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

    try {
      setLoading(true);

      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({
        displayName: restFormData.name,
        photoURL: restFormData.photo,
      });

      const userProfile = {
        username: restFormData.name,
        fullName: restFormData.name,
        profilePicture: restFormData.photo,
        email,
        password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        userProfile,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your account is created.",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setUser({
        ...user,
        displayName: restFormData.name,
        photoURL: restFormData.photo,
      });

      navigate(`${location.state ? location.state : "/"}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    updateUser({
      displayName: restFormData.name,
      photoURL: restFormData.photo,
    })
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = async () => {
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

        const res = await axios.post(
          "http://localhost:5000/api/v1/user/google-auth",
          userProfile,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your account is created.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`${location.state ? location.state : "/"}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center mt-20 md:mt-36"
    >
      <div className="w-full max-w-md p-8 bg-[#f5f6f6] dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-3 mb-4">
            <NotebookText size={36} className="text-violet-600" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              OneBlog
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
            Register your account
          </h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <button
            type="button"
            className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={24} />
            <span>Sign up with Google</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="Username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="Full Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
              >
                Photo URL
              </label>
              <input
                id="photo"
                name="photo"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="Photo URL"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="Password"
                required
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-violet-600 cursor-pointer hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
          >
            Register
          </button>

          <p className="text-center text-gray-600 dark:text-white">
            Already have an account?{" "}
            <Link
              to="/auth/sign-in"
              className="text-violet-600 hover:text-violet-800 font-medium cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};
export default SignUp;
