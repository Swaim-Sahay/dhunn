import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute, FaRandom, FaRedo } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';
import { formatDuration } from '../utils/helpers';

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    isMuted,
    duration,
    currentTime,
    isRepeat,
    isShuffle,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
  } = useMusic();

  if (!currentSong) return null;

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const barWidth = progressBar.offsetWidth;
    const clickedTime = (clickPosition / barWidth) * duration;
    seekTo(clickedTime);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const songSource = currentSong.jiosaavnId ? 'JioSaavn' : (currentSong.spotifyId ? 'Spotify' : 'Jamendo');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-900 border-t border-dark-800 z-40">
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded">
          🎵 {songSource} | 
          {isPlaying ? ' PLAYING' : ' PAUSED'} | 
          Vol: {Math.round(volume * 100)}%
        </div>
      )}
      
      <div className="px-4 py-3">
        <div
          className="progress-bar mb-3"
          onClick={handleProgressClick}
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <img
              src={currentSong.albumArt || 'https://via.placeholder.com/56'}
              alt={currentSong.title}
              className="w-14 h-14 rounded-md object-cover"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold truncate" title={currentSong.title}>
                {currentSong.title}
              </h4>
              <p className="text-sm text-gray-400 truncate" title={currentSong.artist}>
                {currentSong.artist}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleShuffle}
                className={`p-2 rounded-full transition-all ${
                  isShuffle
                    ? 'text-primary-500 bg-primary-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Shuffle"
              >
                <FaRandom />
              </button>

              <button
                onClick={playPrevious}
                className="p-2 text-gray-400 hover:text-white transition-colors btn-animate"
                title="Previous"
              >
                <FaStepBackward className="text-xl" />
              </button>

              <button
                onClick={togglePlayPause}
                className="w-12 h-12 flex items-center justify-center bg-white text-dark-900 rounded-full hover:scale-110 transition-transform btn-animate"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaPlay className="text-xl ml-1" />
                )}
              </button>

              <button
                onClick={playNext}
                className="p-2 text-gray-400 hover:text-white transition-colors btn-animate"
                title="Next"
              >
                <FaStepForward className="text-xl" />
              </button>

              <button
                onClick={toggleRepeat}
                className={`p-2 rounded-full transition-all ${
                  isRepeat
                    ? 'text-primary-500 bg-primary-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Repeat"
              >
                <FaRedo />
              </button>
            </div>

            <div className="flex items-center justify-between w-full text-xs text-gray-400">
              <span>{formatDuration(currentTime)}</span>
              <span>{formatDuration(duration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-1 justify-end">
            <button
              onClick={toggleMute}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <FaVolumeMute className="text-xl" /> : <FaVolumeUp className="text-xl" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${volume * 100}%, #334155 ${volume * 100}%, #334155 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
