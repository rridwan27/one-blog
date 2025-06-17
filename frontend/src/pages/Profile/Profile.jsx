import { useEffect, useState } from "react";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://one-blog-tr95.onrender.com/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        setProfile(res.data.user);
        setUpdateProfile({
          fullName: res.data.user.fullName || "",
          username: res.data.user.username || "",
          bio: res.data.user.bio || "",
          profilePicture: res.data.user.profilePicture || "",
        });
      } catch (err) {
        console.error("Update error:", err.response?.data || err.message);
        setProfile(null);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(
          "https://one-blog-tr95.onrender.com/api/v1/post/my-posts",
          {
            withCredentials: true,
          }
        );
        setMyPosts(res.data.posts);
      } catch (err) {
        console.error(
          "Failed to fetch my posts:",
          err.response?.data || err.message
        );
      }
    };
    fetchMyPosts();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://one-blog-tr95.onrender.com/api/v1/user/update`,
        updateProfile,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProfile(res.data.user);
    } catch (err) {
      console.error(
        "Failed to update user:",
        err.response?.data || err.message
      );
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://one-blog-tr95.onrender.com/api/v1/post/delete/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        if (data.success) {
          Swal.fire("Deleted!", "Your post has been deleted.", "success");

          setMyPosts(myPosts.filter((post) => post._id !== id));
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (!profile) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading profile...</div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-10">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={updateProfile.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-600"
          />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {profile.fullName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            @{profile.username}
          </p>
        </div>

        <form
          className="mt-6 grid grid-cols-1 gap-4"
          onSubmit={handleUpdateProfile}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={updateProfile.fullName}
              onChange={(e) =>
                setUpdateProfile({ ...updateProfile, fullName: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-2 text-sm dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={updateProfile.username}
              onChange={(e) =>
                setUpdateProfile({ ...updateProfile, username: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-2 text-sm dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bio
            </label>
            <textarea
              rows={3}
              value={updateProfile.bio}
              onChange={(e) =>
                setUpdateProfile({ ...updateProfile, bio: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-2 text-sm dark:text-white"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Picture URL
            </label>
            <input
              type="text"
              value={updateProfile.profilePicture}
              onChange={(e) =>
                setUpdateProfile({
                  ...updateProfile,
                  profilePicture: e.target.value,
                })
              }
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-2 text-sm dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-purple-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
      <div className="my-10 max-w-5xl mx-auto px-4">
        <h1 className="text-center text-3xl font-bold text-violet-600 mb-6">
          My Posts
        </h1>

        {myPosts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You haven't created any posts yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPosts.map((post) => (
              <article
                key={post._id}
                className="overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-video w-full">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col h-52">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {post.shortDescription?.slice(0, 120)}
                      {post.shortDescription?.length > 120 && "..."}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <time dateTime={new Date(post.createdAt).toISOString()}>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/update/${post._id}`)}
                        className="bg-violet-500 hover:bg-violet-600 cursor-pointer text-white px-4 py-2 rounded flex items-center gap-2"
                      >
                        <SquarePen className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded flex items-center gap-2"
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
