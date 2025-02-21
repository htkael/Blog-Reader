import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";

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
      if (data.errors) {
        console.log("errors found");
        const errorMessages = data.errors.map((err) => err.msg || err);
        setError(errorMessages);
        return;
      } else {
        console.log("Signup Successful", data);
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to signup"
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">
            Sign Up
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
            <div className="form-control">
              <label htmlFor="usernmae" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="input input-bordered w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="password_conf" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered w-full"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
                name="password_conf"
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
