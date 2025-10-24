import { Link } from 'react-router-dom';
import { FaMusic, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <FaMusic className="text-3xl text-primary-500 group-hover:text-primary-400 transition-colors" />
            <span className="text-2xl font-bold gradient-text">Dhunn</span>
          </Link>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FaUserCircle className="text-2xl" />
                  <span className="font-medium">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-primary rounded-lg hover:opacity-90 transition-opacity font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
