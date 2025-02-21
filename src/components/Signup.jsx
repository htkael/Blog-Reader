import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import "../index.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(username, password, passwordConf);
      if (data.erros) {
        const errorMessages = data.errors.map((err) => err.msg || err);
        setError(errorMessages);
        return;
      }
      console.log("Signup Successful", data);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to signup"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">
            Sign Up
          </h2>

          {error && (
            <ul className="alert alert-error">
              {error.map((errorMsg, index) => (
                <li key={index} className="text-sm">
                  {errorMsg}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="password_conf"
                id="password_conf"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
