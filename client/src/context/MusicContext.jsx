import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const MusicContext = createContext();



export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
};

// Player status states
const PLAYER_STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  READY: 'READY',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  ERROR: 'ERROR',
};

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [playerStatus, setPlayerStatus] = useState(PLAYER_STATUS.IDLE);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  
  const audioRef = useRef(null);
  const playPromiseRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    const audio = document.createElement('audio');
    audio.crossOrigin = 'anonymous';
    audio.preload = 'metadata';
    audio.style.display = 'none';
    document.body.appendChild(audio);
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        if (document.body.contains(audioRef.current)) {
          document.body.removeChild(audioRef.current);
        }
      }
    };
  }, []);

  // Update audio source when current song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    
    const isJioSaavnSong = currentSong?.jiosaavnId ? true : false;
    const isJamendoSong = currentSong?.source === 'jamendo';
    
    let audioSrc = '';
    
    // Priority: streamUrl > previewUrl
    if (isJioSaavnSong && currentSong.streamUrl) {
      audioSrc = `http://localhost:5000/api/proxy/audio?url=${encodeURIComponent(currentSong.streamUrl)}`;
      console.log('🎵 Playing JioSaavn song via proxy');
    } else if (isJamendoSong && currentSong.streamUrl) {
      audioSrc = currentSong.streamUrl;
      console.log('🎵 Playing Jamendo song directly');
    } else if (currentSong.previewUrl) {
      audioSrc = currentSong.previewUrl;
      console.log('🎵 Playing preview URL');
    } else {
      console.error('❌ No playable URL found for song:', currentSong);
      setPlayerStatus(PLAYER_STATUS.ERROR);
      return;
    }

    if (audioRef.current.src !== audioSrc) {
        console.log('📡 Loading audio from:', audioSrc);
        setPlayerStatus(PLAYER_STATUS.LOADING);
        audioRef.current.src = audioSrc;
        audioRef.current.load();
    }
  }, [currentSong]);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;
    const nextIndex = (currentIndex + 1) % queue.length;
    // This will trigger the useEffect above
    setCurrentSong(queue[nextIndex]);
  }, [queue, currentIndex]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleCanPlay = () => {
        console.log('✅ Audio can play now');
        setPlayerStatus(PLAYER_STATUS.READY);
    };
    const handlePlay = () => setPlayerStatus(PLAYER_STATUS.PLAYING);
    const handlePause = () => setPlayerStatus(PLAYER_STATUS.PAUSED);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };
    const handleError = (e) => {
        console.error('❌ Audio error:', e);
        setPlayerStatus(PLAYER_STATUS.ERROR);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [isRepeat, playNext]);

  // Effect to auto-play when ready
  useEffect(() => {
    if (playerStatus === PLAYER_STATUS.READY) {
      togglePlayPause();
    }
  }, [playerStatus]);


  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Main play function
  const playSong = (song, songQueue = []) => {
    // Check if song has playable URL
    const hasPlayableUrl = song.streamUrl || song.previewUrl;
    
    if (!hasPlayableUrl) {
      console.error('❌ No playable URL for song:', song.title);
      alert('⚠️ This track cannot be played. No audio stream available.');
      return;
    }
    
    console.log('🎵 Playing song:', song.title, 'by', song.artist);
    console.log('   Source:', song.source || 'unknown');
    console.log('   Stream URL:', song.streamUrl ? 'Yes' : 'No');
    console.log('   Preview URL:', song.previewUrl ? 'Yes' : 'No');
    
    // If it's the same song, just toggle play/pause
    const songId = song.spotifyId || song.jiosaavnId || song.id;
    const currentSongId = currentSong?.spotifyId || currentSong?.jiosaavnId || currentSong?.id;
    if (songId === currentSongId) {
        togglePlayPause();
        return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentTime(0);
    setDuration(0);
    
    setCurrentSong(song);
    
    if (songQueue.length > 0) {
      setQueue(songQueue);
      setCurrentIndex(songQueue.findIndex(s => (s.spotifyId || s.jiosaavnId || s.id) === songId));
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current || playerStatus === PLAYER_STATUS.LOADING) {
      return;
    }

    // If a play promise is pending, let it finish.
    if (playPromiseRef.current) {
        await playPromiseRef.current;
    }

    if (playerStatus === PLAYER_STATUS.PLAYING) {
      audioRef.current.pause();
    } else {
      try {
        playPromiseRef.current = audioRef.current.play();
        await playPromiseRef.current;
      } catch (error) {
        console.error("Playback error:", error);
        if (error.name !== 'AbortError') {
            setPlayerStatus(PLAYER_STATUS.ERROR);
        }
      } finally {
        playPromiseRef.current = null;
      }
    }
  };

  const playPrevious = () => {
    if (queue.length === 0) return;
    if (audioRef.current?.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentSong(queue[prevIndex]);
  };

  const seekTo = (time) => {
    if (audioRef.current && isFinite(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleRepeat = () => setIsRepeat(!isRepeat);
  const toggleShuffle = () => setIsShuffle(!isShuffle);
  const addToQueue = (song) => setQueue(q => [...q, song]);
  const clearQueue = () => {
    setQueue([]);
    setCurrentIndex(0);
  };

  const isPlaying = playerStatus === PLAYER_STATUS.PLAYING;

  const value = {
    currentSong, isPlaying, queue, volume, isMuted, duration, currentTime, isRepeat, isShuffle,
    playerStatus,
    playSong, togglePlayPause, playNext: playNext, playPrevious, seekTo, setVolume, toggleMute,
    toggleRepeat, toggleShuffle, addToQueue, clearQueue, setDuration, setCurrentTime
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};
