import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { setIsAuthenticated, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      if (data.errors) {
        const errorMessages = data.errors.map((err) => err.msg || err);
        setError(errorMessages);
        return;
      }
      console.log("Login Successful");
      setIsAuthenticated(true);
      setUser(data.user);
      console.log("User", data.user);
      navigate("/homepage");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to login");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">
            Log In
          </h2>

          {error.length > 0 && (
            <ul className="alert alert-error flex flex-col justify-center">
              {error.map((errorMsg, index) => (
                <li key={index} className="text-sm list-disc list-inside">
                  {errorMsg}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control flex flex-col gap-2">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control flex flex-col gap-2">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                className="input input-bordered w-full"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          <div className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
