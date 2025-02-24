import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../services/api";
import Navbar from "./Navbar";
import { likePost } from "../services/api";
import { postComment, deleteComment } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Post = () => {
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  console.log("User", user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getSinglePost(id);
        console.log(data);
        setPost(data.post);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch post");
      }
    };
    fetchPosts();
  }, [id]);

  const like = async () => {
    if (!isLiked) {
      const data = await likePost(id);
      console.log(data);
      setIsLiked(true);
    } else {
      return;
    }
  };

  const removeComment = async (id) => {
    try {
      const data = await deleteComment(id);
      console.log("Comment deleted", data);
    } catch (err) {
      setError(err.message || "Failed to delete comment");
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const data = await postComment(id, comment);
      console.log("Comment submitted", data);
      setComment("");
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to comment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {error.length > 0 && (
        <ul className="alert alert-error flex flex-col justify-center">
          {error.map((errorMsg, index) => (
            <li key={index} className="text-sm list-disc list-inside">
              {errorMsg}
            </li>
          ))}
        </ul>
      )}
      <Navbar />
      {/* Main content */}
      <div className="max-w-3xl mx-auto p-4 pb-24">
        {" "}
        {/* Added padding bottom for sticky buttons */}
        {/* Post header */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content text-center rounded-full w-8">
                    <span className="text-s">
                      {post.author.username.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{post.author.username}</span>
                  <span className="text-sm text-base-content/60">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              {post.author.status === "author" && (
                <div className="badge badge-primary">Author</div>
              )}
            </div>

            {/* Post content */}
            <div className="prose max-w-none">
              <p>{post.content}</p>
            </div>
          </div>
        </div>
        {/* Comments section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Comments</h2>

            {post.comments.length > 0 ? (
              <div className="space-y-4">
                {post.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="border-b border-base-300 last:border-0 pb-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content text-center rounded-full w-6">
                          <span className="text-xs">
                            {comment.author.username.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <span className="font-medium">
                        {comment.author.username}
                      </span>
                      <span className="text-sm text-base-content/60">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p>{comment.content}</p>
                      {comment.authorId === user.id && (
                        <button
                          onClick={() => removeComment(comment.id)}
                          className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-base-content/60">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg">
        <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className={`btn btn-circle ${
                isLiked ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => like()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isLiked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <span className="text-lg font-medium">
              {post.likes + (isLiked ? 1 : 0)}
            </span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Add Comment
          </button>
        </div>
      </div>

      <dialog
        id="comment_modal"
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add a comment</h3>
          <form onSubmit={handleSubmitComment}>
            <div className="form-control">
              <textarea
                name="comment"
                className="textarea textarea-bordered h-24"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!comment.trim()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setModalOpen(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Post;
