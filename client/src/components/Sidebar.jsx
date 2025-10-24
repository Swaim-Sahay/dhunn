import { NavLink } from 'react-router-dom';
import { FaHome, FaSearch, FaBook, FaListUl, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import CreatePlaylistModal from './CreatePlaylistModal';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { isAuthenticated } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Search', path: '/search', icon: FaSearch },
    { name: 'Library', path: '/library', icon: FaBook, requireAuth: true }
  ];

  return (
    <>
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-dark-900 border-r border-dark-800 overflow-y-auto custom-scrollbar">
        <div className="p-6">
          {/* Main Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              if (item.requireAuth && !isAuthenticated) return null;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-primary text-white'
                        : 'text-gray-400 hover:text-white hover:bg-dark-800'
                    }`
                  }
                >
                  <item.icon className="text-xl" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Playlists Section */}
          {isAuthenticated && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Playlists
                </h3>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="p-1 hover:bg-dark-800 rounded transition-colors"
                  title="Create Playlist"
                >
                  <FaPlus className="text-gray-400 hover:text-white" />
                </button>
              </div>
              
              <NavLink
                to="/library"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-dark-800 transition-all"
              >
                <FaListUl />
                <span className="text-sm">Your Playlists</span>
              </NavLink>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 pt-8 border-t border-dark-800">
            <p className="text-xs text-gray-500 px-4">
              Dhunn - Stream instrumental music without vocals
            </p>
          </div>
        </div>
      </aside>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <CreatePlaylistModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
};

export default Sidebar;
