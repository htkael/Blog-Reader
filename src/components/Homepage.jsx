import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";
import Navbar from "./Navbar";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        console.log("Posts found!", data);
        setPosts(data.posts);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to get posts from api");
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col gap-10">
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
      <div className="flex flex-col items-center gap-6 justify-center ">
        <h1 className="text-base-200 font-bold text-4xl">Welcome!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 p-4">
          {posts.map((post, index) => (
            <Link key={index} to={`/posts/${post.id}`}>
              <div className="card bg-base-100 w-96 h-64 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
                <div className="card-body">
                  <h2 className="card-title text-lg line-clamp-2">
                    {post.title}
                  </h2>
                  <div className="space-y-2 text-base-content/70 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Author:</span>
                      <span>{post.author.username}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Posted:</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Likes:</span>
                      <span>{post.likes}</span>
                    </div>
                  </div>
                  <div className="card-actions justify-end align-baseline">
                    <button className="btn btn-primary">View Post</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
