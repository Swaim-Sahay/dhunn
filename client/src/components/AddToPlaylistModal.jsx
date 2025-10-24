import { useState, useEffect } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { playlistsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/helpers';
import LoadingSpinner from './LoadingSpinner';

const AddToPlaylistModal = ({ song, onClose }) => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const response = await playlistsAPI.getUserPlaylists(user._id);
      setPlaylists(response.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      setAdding(true);
      setError('');
      setSuccess('');

      await playlistsAPI.addSong(playlistId, song);
      setSuccess('Song added to playlist!');
      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setAdding(false);
    }
  };

  const handleCreateAndAdd = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    try {
      setAdding(true);
      setError('');

      // Create new playlist
      const createResponse = await playlistsAPI.create({
        name: newPlaylistName,
        description: 'Created from search',
        isPublic: false
      });

      const newPlaylist = createResponse.data.data;

      // Add song to the new playlist
      await playlistsAPI.addSong(newPlaylist._id, song);
      
      setSuccess(`Created "${newPlaylistName}" and added song!`);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-800 rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <div>
            <h2 className="text-xl font-bold">Add to Playlist</h2>
            <p className="text-sm text-gray-400 mt-1">{song.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Create New Playlist Button */}
              <button
                onClick={() => setShowCreateNew(!showCreateNew)}
                className="w-full flex items-center space-x-3 p-4 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors mb-4"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <FaPlus className="text-xl" />
                </div>
                <span className="font-semibold">Create New Playlist</span>
              </button>

              {/* Create New Playlist Form */}
              {showCreateNew && (
                <form onSubmit={handleCreateAndAdd} className="mb-4 p-4 bg-dark-700 rounded-lg">
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Playlist name"
                    className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg mb-3 focus:outline-none focus:border-primary-500"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={adding || !newPlaylistName.trim()}
                    className="w-full py-2 bg-gradient-primary rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {adding ? 'Creating...' : 'Create and Add'}
                  </button>
                </form>
              )}

              {/* Playlists List */}
              {playlists.length > 0 ? (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">Your Playlists</h3>
                  {playlists.map((playlist) => (
                    <button
                      key={playlist._id}
                      onClick={() => handleAddToPlaylist(playlist._id)}
                      disabled={adding}
                      className="w-full flex items-center space-x-3 p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      <div className="w-12 h-12 bg-dark-600 rounded flex items-center justify-center text-2xl">
                        🎵
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{playlist.name}</p>
                        <p className="text-sm text-gray-400">
                          {playlist.songs?.length || 0} song{playlist.songs?.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">You don't have any playlists yet</p>
                  <p className="text-sm text-gray-500">Create your first playlist above</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
