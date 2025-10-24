import { useEffect, useRef } from 'react';

/**
 * YouTube Player Component
 * Uses YouTube IFrame Player API for embedded playback
 */
const YouTubePlayer = ({ videoId, isPlaying, onEnded, onReady, volume }) => {
  const playerRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (iframeRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          height: '0',
          width: '0',
          videoId: videoId,
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
            controls: 0,
            modestbranding: 1,
            rel: 0
          },
          events: {
            onReady: (event) => {
              if (volume !== undefined) {
                event.target.setVolume(volume * 100);
              }
              onReady?.(event);
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                onEnded?.();
              }
            }
          }
        });
      }
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  // Update video when videoId changes
  useEffect(() => {
    if (playerRef.current && videoId) {
      if (isPlaying) {
        playerRef.current.loadVideoById(videoId);
      } else {
        playerRef.current.cueVideoById(videoId);
      }
    }
  }, [videoId]);

  // Control playback
  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  // Control volume
  useEffect(() => {
    if (playerRef.current && volume !== undefined) {
      playerRef.current.setVolume(volume * 100);
    }
  }, [volume]);

  return <div ref={iframeRef} style={{ display: 'none' }} />;
};

export default YouTubePlayer;
