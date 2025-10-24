import { useMusic } from '../context/MusicContext';

const PlayerDebug = () => {
  const { currentSong, isPlaying, isYouTubeSong, volume, duration, currentTime } = useMusic();

  const isJioSaavn = currentSong?.jiosaavnId ? true : false;

  if (!currentSong) {
    return (
      <div className="fixed top-20 right-4 bg-dark-800 border border-primary-500 p-4 rounded-lg shadow-lg text-xs max-w-xs z-50">
        <h3 className="font-bold text-primary-400 mb-2">🎵 Player Debug</h3>
        <p className="text-gray-400">No song selected</p>
        <p className="text-gray-500 mt-2 text-xs">Click a song to start playing</p>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 bg-dark-800 border border-primary-500 p-4 rounded-lg shadow-lg text-xs max-w-xs z-50">
      <h3 className="font-bold text-primary-400 mb-2">🎵 Player Debug</h3>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-400">Song:</span>
          <span className="text-white truncate ml-2 max-w-[180px]" title={currentSong.title}>
            {currentSong.title}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Type:</span>
          <span className={isYouTubeSong ? 'text-red-400' : isJioSaavn ? 'text-green-400' : 'text-blue-400'}>
            {isYouTubeSong ? '▶️ YouTube' : isJioSaavn ? '🎵 JioSaavn' : '🎧 Spotify'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className={isPlaying ? 'text-green-400' : 'text-yellow-400'}>
            {isPlaying ? '▶️ PLAYING' : '⏸️ PAUSED'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Volume:</span>
          <span className="text-white">{Math.round(volume * 100)}%</span>
        </div>
        
        {isYouTubeSong && (
          <div className="flex justify-between">
            <span className="text-gray-400">YouTube ID:</span>
            <span className="text-blue-400 font-mono text-[10px]">{currentSong.youtubeId}</span>
          </div>
        )}
        
        {isJioSaavn && (
          <div className="flex justify-between">
            <span className="text-gray-400">JioSaavn ID:</span>
            <span className="text-green-400 font-mono text-[10px]">{currentSong.jiosaavnId}</span>
          </div>
        )}
        
        {currentSong.streamUrl && (
          <div className="flex justify-between">
            <span className="text-gray-400">Has Stream:</span>
            <span className="text-green-400">✅ YES</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-400">Time:</span>
          <span className="text-white">
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
          </span>
        </div>
        
        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="text-gray-500 text-[10px]">
            Check browser console (F12) for detailed logs
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDebug;
