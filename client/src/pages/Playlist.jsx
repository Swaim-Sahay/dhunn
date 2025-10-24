import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { playlistsAPI } from '../utils/api';
import { useMusic } from '../context/MusicContext';
import { getErrorMessage, formatDuration } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';

const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong } = useMusic();
  
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const fetchPlaylist = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await playlistsAPI.getById(id);
      setPlaylist(response.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAll = () => {
    if (playlist?.songs?.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  const handlePlaySong = (song, index) => {
    playSong(song, playlist.songs);
  };

  const handleRemoveSong = async (songId) => {
    if (!window.confirm('Remove this song from the playlist?')) {
      return;
    }

    try {
      const response = await playlistsAPI.removeSong(id, songId);
      setPlaylist(response.data.data);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate('/library')}
          className="px-6 py-2 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
        >
          Back to Library
        </button>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Playlist not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/library')}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
      >
        <FaArrowLeft />
        <span>Back to Library</span>
      </button>

      {/* Playlist Header */}
      <div className="bg-gradient-primary rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-48 h-48 bg-dark-900/50 rounded-lg flex items-center justify-center">
            <FaPlay className="text-6xl text-white/50" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm uppercase tracking-wide mb-2">Playlist</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{playlist.name}</h1>
            {playlist.description && (
              <p className="text-white/80 mb-4">{playlist.description}</p>
            )}
            <div className="flex items-center justify-center md:justify-start space-x-2 text-sm">
              <span>{playlist.userId?.username || 'Unknown'}</span>
              <span>•</span>
              <span>{playlist.songs?.length || 0} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Play All Button */}
      {playlist.songs && playlist.songs.length > 0 && (
        <button
          onClick={handlePlayAll}
          className="flex items-center space-x-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 rounded-full font-semibold transition-colors"
        >
          <FaPlay />
          <span>Play All</span>
        </button>
      )}

      {/* Songs List */}
      {playlist.songs && playlist.songs.length > 0 ? (
        <div className="bg-dark-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-dark-700">
                <tr className="text-left text-sm text-gray-400">
                  <th className="p-4 w-12">#</th>
                  <th className="p-4">Title</th>
                  <th className="p-4 hidden md:table-cell">Album</th>
                  <th className="p-4 hidden sm:table-cell">Duration</th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {playlist.songs.map((song, index) => (
                  <tr
                    key={song._id || index}
                    className="border-b border-dark-700 hover:bg-dark-700 transition-colors group cursor-pointer"
                    onClick={() => handlePlaySong(song, index)}
                  >
                    <td className="p-4 text-gray-400">{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={song.albumArt || 'https://via.placeholder.com/40'}
                          alt={song.title}
                          className="w-10 h-10 rounded"
                        />
                        <div>
                          <div className="font-semibold">{song.title}</div>
                          <div className="text-sm text-gray-400">{song.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400 hidden md:table-cell">
                      {song.album}
                    </td>
                    <td className="p-4 text-gray-400 hidden sm:table-cell">
                      {formatDuration(song.duration)}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSong(song._id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from playlist"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-dark-800 rounded-lg">
          <p className="text-gray-400 mb-4">This playlist is empty</p>
          <p className="text-sm text-gray-500">
            Search for songs and add them to this playlist
          </p>
        </div>
      )}
    </div>
  );
};

export default Playlist;
