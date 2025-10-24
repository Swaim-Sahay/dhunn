import axios from 'axios';

/**
 * SoundCloud API Integration
 * Uses RapidAPI SoundCloud endpoint
 */

const SOUNDCLOUD_API_BASE = 'https://soundcloud-scraper.p.rapidapi.com';
const RAPIDAPI_KEY = '38db2ff47amsh8b40a0ee514b9c8p1c0c02jsn3b9fa8afbddc';

/**
 * Search for tracks on SoundCloud
 */
export const searchSoundCloudTracks = async (query, limit = 20) => {
  try {
    const response = await axios.get(`${SOUNDCLOUD_API_BASE}/v1/search`, {
      params: {
        query: query,
        type: 'track',
        limit: limit
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
      }
    });

    const tracks = response.data.tracks || response.data || [];
    
    return tracks.map(track => formatSoundCloudTrack(track));
  } catch (error) {
    console.error('Error searching SoundCloud tracks:', error.response?.data || error.message);
    
    // If API fails, try alternative endpoint
    if (error.response?.status === 403 || error.response?.status === 429) {
      console.warn('SoundCloud API rate limit or access issue');
      return [];
    }
    
    throw new Error('Failed to search SoundCloud tracks');
  }
};

/**
 * Get track details by URL or ID
 */
export const getSoundCloudTrackDetails = async (trackUrlOrId) => {
  try {
    const response = await axios.get(`${SOUNDCLOUD_API_BASE}/v1/track`, {
      params: {
        track: trackUrlOrId
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
      }
    });

    return formatSoundCloudTrack(response.data);
  } catch (error) {
    console.error('Error getting SoundCloud track details:', error.response?.data || error.message);
    return null;
  }
};

/**
 * Search for instrumental/background music on SoundCloud
 */
export const getSoundCloudInstrumental = async (limit = 20) => {
  const instrumentalQueries = [
    'instrumental piano',
    'ambient instrumental',
    'lofi instrumental',
    'chill instrumental',
    'study music instrumental',
    'acoustic instrumental',
    'jazz instrumental',
    'classical piano',
    'relaxing instrumental',
    'meditation music',
    'background music instrumental',
    'focus music'
  ];

  const randomQuery = instrumentalQueries[Math.floor(Math.random() * instrumentalQueries.length)];
  console.log('🎵 Fetching SoundCloud instrumental music with query:', randomQuery);
  
  return searchSoundCloudTracks(randomQuery, limit);
};

/**
 * Get user's tracks
 */
export const getSoundCloudUserTracks = async (userUrl, limit = 20) => {
  try {
    const response = await axios.get(`${SOUNDCLOUD_API_BASE}/v1/user/tracks`, {
      params: {
        user: userUrl,
        limit: limit
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
      }
    });

    const tracks = response.data || [];
    return tracks.map(track => formatSoundCloudTrack(track));
  } catch (error) {
    console.error('Error getting SoundCloud user tracks:', error.response?.data || error.message);
    return [];
  }
};

/**
 * Get playlist tracks
 */
export const getSoundCloudPlaylist = async (playlistUrl) => {
  try {
    const response = await axios.get(`${SOUNDCLOUD_API_BASE}/v1/playlist`, {
      params: {
        playlist: playlistUrl
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
      }
    });

    const tracks = response.data.tracks || [];
    return tracks.map(track => formatSoundCloudTrack(track));
  } catch (error) {
    console.error('Error getting SoundCloud playlist:', error.response?.data || error.message);
    return [];
  }
};

/**
 * Format SoundCloud track to our standard format
 */
const formatSoundCloudTrack = (track) => {
  if (!track) return null;

  // Calculate duration in seconds
  const duration = track.duration ? Math.floor(track.duration / 1000) : 0;
  
  // Get the best available artwork
  const albumArt = track.artwork_url || 
                   track.artworkUrl || 
                   track.user?.avatar_url || 
                   'https://via.placeholder.com/500?text=SoundCloud';

  // Check if track is likely instrumental based on title/description
  const isInstrumental = checkIfInstrumental(track.title, track.description);

  return {
    soundcloudId: track.id || track.urn,
    title: cleanTitle(track.title || 'Untitled'),
    artist: track.user?.username || track.publisher?.name || 'Unknown Artist',
    album: 'SoundCloud',
    albumArt: albumArt,
    duration: duration,
    streamUrl: track.media?.transcodings?.[0]?.url || track.stream_url || null,
    previewUrl: track.permalink_url || track.uri,
    permalink: track.permalink_url,
    playbackCount: track.playback_count || 0,
    likesCount: track.likes_count || track.favoritings_count || 0,
    genre: track.genre || 'Unknown',
    description: track.description || '',
    createdAt: track.created_at,
    instrumentalness: isInstrumental ? 0.8 : 0.3,
    energy: 0.6,
    valence: 0.5,
    tempo: 120
  };
};

/**
 * Check if a track is likely instrumental based on title and description
 */
const checkIfInstrumental = (title = '', description = '') => {
  const instrumentalKeywords = [
    'instrumental', 'inst.', 'inst ', 'piano', 'guitar', 'violin',
    'acoustic', 'ambient', 'background', 'lofi', 'lo-fi', 'chill',
    'beats', 'classical', 'jazz', 'meditation', 'study', 'focus',
    'relaxing', 'calm', 'peaceful', 'no vocals', 'karaoke'
  ];

  const text = (title + ' ' + description).toLowerCase();
  return instrumentalKeywords.some(keyword => text.includes(keyword));
};

/**
 * Clean up track titles
 */
const cleanTitle = (title) => {
  return title
    .replace(/\(Instrumental\)/gi, '')
    .replace(/\[Instrumental\]/gi, '')
    .replace(/- Instrumental/gi, '')
    .replace(/\(Official Audio\)/gi, '')
    .replace(/\[Official Audio\]/gi, '')
    .replace(/\(Official\)/gi, '')
    .replace(/\[Official\]/gi, '')
    .trim();
};

/**
 * Get trending tracks from SoundCloud
 */
export const getSoundCloudTrending = async (genre = 'all-music', limit = 20) => {
  try {
    // Note: This endpoint might vary based on RapidAPI's SoundCloud implementation
    const response = await axios.get(`${SOUNDCLOUD_API_BASE}/v1/search`, {
      params: {
        query: 'trending',
        type: 'track',
        limit: limit
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
      }
    });

    const tracks = response.data.tracks || response.data || [];
    return tracks.map(track => formatSoundCloudTrack(track));
  } catch (error) {
    console.error('Error getting SoundCloud trending:', error.response?.data || error.message);
    return [];
  }
};
