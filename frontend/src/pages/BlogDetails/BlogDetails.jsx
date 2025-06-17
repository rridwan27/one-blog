import { useLoaderData, useNavigate } from "react-router";
import { Loader, MessageCircleMore, Trash2 } from "lucide-react";
import axios from "axios";
import { use, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { FiEdit3 } from "react-icons/fi";
import Swal from "sweetalert2";

const BlogDetails = () => {
  const blogData = useLoaderData();
  const { loading, mongoUser } = use(AuthContext);
  const [text, setText] = useState("");
  const [comments, setComments] = useState(blogData.comments);
  const navigate = useNavigate();

  const {
    title,
    shortDescription,
    longDescription,
    author,
    imageUrl,
    category,
    createdAt,
    _id,
  } = blogData;

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      if (mongoUser?._id === author?._id) {
        toast.error("Author cannot comment on their own post");
        setText("");
        return;
      }
      const response = await axios.post(
        `https://one-blog-tr95.onrender.com/api/v1/post/comment/${_id}`,
        { text },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const updateCommentData = [...comments, response.data.comment];
        setComments(updateCommentData);
        setText("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
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

          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md uppercase font-semibold tracking-wide">
          {category}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-100 mb-6">
        {shortDescription}
      </p>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center mb-8">
          {author?.profilePicture && (
            <img
              src={author.profilePicture}
              alt={author.fullName}
              className="w-10 h-10 object-cover rounded-full mr-3"
            />
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {author?.fullName}
            </p>
            <p className="text-sm text-gray-500 font-semibold dark:text-gray-100">
              Published on{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="mb-8">
          <>
            {mongoUser?._id === author?._id ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/update/${_id}`)}
                  className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 cursor-pointer text-white px-4 py-2 rounded-md"
                >
                  <FiEdit3 />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded-md"
                >
                  <Trash2 />
                </button>
              </div>
            ) : (
              ""
            )}
          </>
        </div>
      </div>

      {imageUrl && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="prose max-w-none mb-8 dark:text-gray-100">
        {longDescription.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 dark:text-gray-100">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-8">
        <div className="flex items-center">
          <button className="flex items-center cursor-pointer text-gray-500 hover:text-blue-500">
            <MessageCircleMore className="w-5 h-5 mr-1" />
            <span className="text-gray-500 dark:text-gray-100">
              {comments.length} Comments
            </span>
          </button>
        </div>

        <div></div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Comments ({comments.length})
        </h3>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-50 dark:bg-gray-800 px-4 py-6 rounded-lg"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={comment.author?.profilePicture}
                    alt={comment.author?.fullName}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <span className="font-medium">
                    {comment.author?.fullName}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-100 ml-10">
                  <span className="py-2 px-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl">
                    {comment.text}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-100">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Leave a comment</h3>
        <form onSubmit={handleComment}>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            rows="4"
            placeholder="Write your comment here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            disabled={!text.trim()}
            className="bg-violet-600 hover:bg-violet-700 cursor-pointer text-white font-medium py-2 px-6 rounded-xl transition duration-200"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetails;
