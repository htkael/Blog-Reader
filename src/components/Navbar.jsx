import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, isAuthenticated, setUser } = useAuth();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };
  const username = localStorage.getItem("user");
  console.log("User found!", username);

  return (
    <div className="navbar bg-gray-700">
      <div className="flex-1 px-2 lg:flex-none">
        <Link to="/homepage" className="text-lg font-bold">
          Kael&apos;s Pages
        </Link>
      </div>
      <div className="flex flex-1 justify-end px-2">
        <div className="flex items-stretch">
          <Link to="/liked" className="btn btn-ghost rounded-btn">
            Liked Posts
          </Link>
          <button
            className="btn btn-ghost rounded-btn"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
