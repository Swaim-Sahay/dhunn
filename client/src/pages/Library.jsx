import { useState, useEffect } from 'react';
import { FaPlus, FaMusic, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { playlistsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/helpers';
import PlaylistCard from '../components/PlaylistCard';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import LoadingSpinner from '../components/LoadingSpinner';

const Library = () => {
  const { user, isAuthenticated } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPlaylists();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('📚 Fetching playlists for user:', user._id);
      const response = await playlistsAPI.getUserPlaylists(user._id);
      console.log('✅ Playlists fetched:', response.data.data);
      setPlaylists(response.data.data || []);
    } catch (err) {
      console.error('❌ Error fetching playlists:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await playlistsAPI.delete(playlistId);
      setPlaylists(playlists.filter(p => p._id !== playlistId));
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const handlePlaylistCreated = (newPlaylist) => {
    setPlaylists([newPlaylist, ...playlists]);
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] fade-in">
        <div className="text-center max-w-md">
          <FaLock className="text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Library Access Required</h2>
          <p className="text-gray-400 mb-8">
            Sign in to create playlists and save your favorite tracks
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 bg-gradient-primary rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Your Library</h1>
          <p className="text-gray-400">
            Manage your playlists and favorite tracks
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchPlaylists}
            className="px-4 py-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
            title="Refresh playlists"
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus />
            <span className="font-semibold">Create Playlist</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {/* Playlists Grid */}
      {playlists.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playlist={playlist}
                onDelete={handleDeletePlaylist}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <FaMusic className="text-6xl text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No playlists yet</h3>
          <p className="text-gray-400 mb-6">
            Create your first playlist to get started
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-primary rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus />
            <span className="font-semibold">Create Your First Playlist</span>
          </button>
        </div>
      )}

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handlePlaylistCreated}
        />
      )}
    </div>
  );
};

export default Library;
