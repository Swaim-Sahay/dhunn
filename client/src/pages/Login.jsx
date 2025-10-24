import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMusic, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark px-4">
      <div className="max-w-md w-full space-y-8 bg-dark-800 p-8 rounded-2xl shadow-2xl">
        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FaMusic className="text-6xl text-primary-500" />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Dhunn</h1>
          <p className="text-gray-400">Welcome back! Login to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-primary rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <Link to="/signup" className="text-primary-500 hover:text-primary-400 font-semibold">
            Sign Up
          </Link>
        </div>

        {/* Continue as Guest */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white text-sm underline"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
