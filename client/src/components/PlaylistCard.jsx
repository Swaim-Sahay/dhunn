import { Link } from 'react-router-dom';
import { FaMusic, FaTrash } from 'react-icons/fa';
import { formatTimeAgo } from '../utils/helpers';

const PlaylistCard = ({ playlist, onDelete, showDelete = true }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Delete playlist "${playlist.name}"?`)) {
      onDelete?.(playlist._id);
    }
  };

  return (
    <Link
      to={`/playlist/${playlist._id}`}
      className="group relative bg-dark-800 rounded-lg p-4 hover:bg-dark-700 transition-all card-hover"
    >
      {/* Playlist Cover */}
      <div className="relative aspect-square mb-4 bg-gradient-primary rounded-md flex items-center justify-center overflow-hidden">
        {playlist.coverImage ? (
          <img
            src={playlist.coverImage}
            alt={playlist.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaMusic className="text-6xl text-white/30" />
        )}
        
        {/* Delete Button */}
        {showDelete && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 p-2 bg-red-500/90 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"
            title="Delete playlist"
          >
            <FaTrash className="text-white text-sm" />
          </button>
        )}
      </div>

      {/* Playlist Info */}
      <div className="space-y-1">
        <h3 className="font-semibold text-white truncate" title={playlist.name}>
          {playlist.name}
        </h3>
        
        {playlist.description && (
          <p className="text-sm text-gray-400 line-clamp-2" title={playlist.description}>
            {playlist.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
          <span>{playlist.songs?.length || 0} songs</span>
          <span>{formatTimeAgo(playlist.updatedAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
