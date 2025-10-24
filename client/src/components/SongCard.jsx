import { FaPlay, FaPause, FaHeart, FaRegHeart, FaPlus } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';
import { useAuth } from '../context/AuthContext';
import { formatDuration } from '../utils/helpers';
import { useState, useEffect } from 'react';
import { playlistsAPI } from '../utils/api';

const SongCard = ({ song, showAddToPlaylist = false, onAddToPlaylist }) => {
  const { currentSong, isPlaying, playSong, togglePlayPause } = useMusic();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [lovedPlaylistId, setLovedPlaylistId] = useState(null);

  const songId = song.spotifyId || song.youtubeId || song.jiosaavnId || song.id;
  const currentSongId = currentSong?.spotifyId || currentSong?.youtubeId || currentSong?.jiosaavnId || currentSong?.id;
  const isCurrentSong = currentSongId === songId;

  // Get or create "Loved Songs" playlist
  useEffect(() => {
    const getLovedPlaylist = async () => {
      if (!user) return;
      
      try {
        const response = await playlistsAPI.getUserPlaylists(user._id);
        const playlists = response.data.data;
        let lovedPlaylist = playlists.find(p => p.name === 'Loved Songs');
        
        // Create if doesn't exist
        if (!lovedPlaylist) {
          const createResponse = await playlistsAPI.create({
            name: 'Loved Songs',
            description: 'Your favorite tracks ❤️'
          });
          lovedPlaylist = createResponse.data.data;
        }
        
        setLovedPlaylistId(lovedPlaylist._id);
        
        // Check if current song is in loved playlist
        const isInLovedPlaylist = lovedPlaylist.songs.some(s => {
          const playlistSongId = s.spotifyId || s.jiosaavnId || s.id;
          return playlistSongId === songId;
        });
        setIsFavorite(isInLovedPlaylist);
      } catch (error) {
        console.error('Error getting loved playlist:', error);
      }
    };
    
    getLovedPlaylist();
  }, [user, songId]);

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlayPause();
    } else {
      playSong(song, [song]);
    }
  };

  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (!user || !lovedPlaylistId) {
      console.log('Cannot toggle favorite:', { user: !!user, lovedPlaylistId });
      return;
    }

    try {
      if (isFavorite) {
        // Remove from loved playlist
        console.log('Removing song from loved playlist:', songId);
        await playlistsAPI.removeSong(lovedPlaylistId, songId);
        setIsFavorite(false);
        console.log('✅ Song removed from loved playlist');
      } else {
        // Add to loved playlist
        console.log('Adding song to loved playlist:', song.title, songId);
        const response = await playlistsAPI.addSong(lovedPlaylistId, song);
        console.log('✅ Song added to loved playlist:', response.data);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error updating loved songs:', error);
      const errorMsg = error.response?.data?.message || error.message;
      alert(`Failed to update loved songs: ${errorMsg}`);
    }
  };

  return (
    <div className="group relative bg-dark-800 rounded-lg p-4 hover:bg-dark-700 transition-all cursor-pointer card-hover">
      {/* Album Art */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-md">
        <img
          src={song.albumArt || 'https://via.placeholder.com/300?text=No+Image'}
          alt={song.title}
          className="w-full h-full object-cover"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="w-14 h-14 flex items-center justify-center bg-primary-500 rounded-full hover:bg-primary-600 hover:scale-110 transition-all btn-animate"
          >
            {isCurrentSong && isPlaying ? (
              <FaPause className="text-white text-xl ml-0.5" />
            ) : (
              <FaPlay className="text-white text-xl ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Song Info */}
      <div className="space-y-1">
        <h3 className="font-semibold text-white truncate" title={song.title}>
          {song.title}
        </h3>
        <p className="text-sm text-gray-400 truncate" title={song.artist}>
          {song.artist}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{song.album}</span>
          <span>{formatDuration(song.duration)}</span>
        </div>
      </div>

      {/* Action Buttons - Always visible */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={handleFavorite}
          className="p-2 hover:bg-dark-600 rounded-full transition-colors"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <FaHeart className="text-primary-500" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-white" />
          )}
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToPlaylist?.(song);
          }}
          className="p-2 hover:bg-dark-600 rounded-full transition-colors"
          title="Add to playlist"
        >
          <FaPlus className="text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default SongCard;
