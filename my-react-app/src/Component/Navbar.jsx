import { Link, useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md py-3 px-6 flex justify-between items-center z-50">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">📺 MediaHub</Link>
      </div>

      {/* Navbar Links */}
      <div className="flex items-center space-x-4">
     
        
            {/* Upload Button */}
            <Link to="/upload" className="flex items-center bg-blue-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition">
              <FaUpload size={20} className="mr-2" />
              Upload
            </Link>

            {/* Logout Button */}
            <button onClick={handleLogout} className="flex items-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
              <BiLogOut size={20} className="mr-2" />
              Logout
            </button>

            {/* Avatar */}
            <BsPersonCircle size={30} className="cursor-pointer text-white" />
        
     
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
            Register
          </Link>
    
      </div>
    </nav>
  );
};

export default Navbar;
