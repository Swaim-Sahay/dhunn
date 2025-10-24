import axios from 'axios';

// Get your client ID from: https://devportal.jamendo.com/
const JAMENDO_CLIENT_ID = process.env.JAMENDO_CLIENT_ID || '657bb984';

/**
 * Base Jamendo API configuration
 */
const jamendoAPI = axios.create({
  baseURL: 'https://api.jamendo.com/v3.0',
  params: {
    client_id: JAMENDO_CLIENT_ID,
    format: 'json'
  }
});

/**
 * Search for tracks on Jamendo
 * @param {string} query - Search query
 * @param {number} limit - Number of results (default: 20)
 * @returns {Promise<Array>} Array of tracks
 */
export const searchJamendoTracks = async (query, limit = 20) => {
  try {
    const response = await jamendoAPI.get('/tracks', {
      params: {
        search: query,
        limit: limit,
        include: 'musicinfo',
        audioformat: 'mp32', // or 'mp31', 'ogg', 'flac'
        boost: 'popularity_total' // Boost popular tracks
      }
    });

    return response.data.results.map(track => formatJamendoTrack(track));
  } catch (error) {
    console.error('Error searching Jamendo tracks:', error.response?.data || error.message);
    throw new Error('Failed to search Jamendo tracks');
  }
};

/**
 * Get instrumental tracks from Jamendo
 * @param {number} limit - Number of results (default: 30)
 * @returns {Promise<Array>} Array of instrumental tracks
 */
export const getJamendoInstrumental = async (limit = 30) => {
  try {
    const response = await jamendoAPI.get('/tracks', {
      params: {
        vocalinstrumental: 'instrumental',
        limit: limit,
        include: 'musicinfo',
        audioformat: 'mp32',
        order: 'popularity_total'
      }
    });

    return response.data.results.map(track => formatJamendoTrack(track));
  } catch (error) {
    console.error('Error getting Jamendo instrumental:', error.response?.data || error.message);
    throw new Error('Failed to get instrumental tracks');
  }
};

/**
 * Get tracks by genre from Jamendo
 * @param {string} genre - Genre name (rock, pop, jazz, classical, electronic, etc.)
 * @param {number} limit - Number of results (default: 20)
 * @returns {Promise<Array>} Array of tracks
 */
export const getJamendoByGenre = async (genre, limit = 20) => {
  try {
    // Map common genres to Jamendo tags
    const genreMap = {
      'lofi': 'chillout lofi',
      'piano': 'piano classical',
      'ambient': 'ambient electronic',
      'classical': 'classical',
      'jazz': 'jazz',
      'electronic': 'electronic',
      'acoustic': 'acoustic folk',
      'instrumental': 'instrumental'
    };

    const searchTerm = genreMap[genre.toLowerCase()] || genre;

    const response = await jamendoAPI.get('/tracks', {
      params: {
        tags: searchTerm,
        limit: limit,
        include: 'musicinfo',
        audioformat: 'mp32',
        order: 'popularity_total'
      }
    });

    return response.data.results.map(track => formatJamendoTrack(track));
  } catch (error) {
    console.error('Error getting Jamendo by genre:', error.response?.data || error.message);
    throw new Error('Failed to get tracks by genre');
  }
};

/**
 * Get track details by ID
 * @param {string} trackId - Jamendo track ID
 * @returns {Promise<Object>} Track details
 */
export const getJamendoTrackById = async (trackId) => {
  try {
    const response = await jamendoAPI.get('/tracks', {
      params: {
        id: trackId,
        include: 'musicinfo lyrics',
        audioformat: 'mp32'
      }
    });

    if (response.data.results.length === 0) {
      throw new Error('Track not found');
    }

    return formatJamendoTrack(response.data.results[0]);
  } catch (error) {
    console.error('Error getting Jamendo track by ID:', error.response?.data || error.message);
    throw new Error('Failed to get track details');
  }
};

/**
 * Get popular/trending tracks from Jamendo
 * @param {number} limit - Number of results (default: 20)
 * @returns {Promise<Array>} Array of popular tracks
 */
export const getJamendoPopular = async (limit = 20) => {
  try {
    const response = await jamendoAPI.get('/tracks', {
      params: {
        limit: limit,
        include: 'musicinfo',
        audioformat: 'mp32',
        order: 'popularity_month', // or 'popularity_week', 'popularity_total'
        boost: 'popularity_month'
      }
    });

    return response.data.results.map(track => formatJamendoTrack(track));
  } catch (error) {
    console.error('Error getting Jamendo popular:', error.response?.data || error.message);
    throw new Error('Failed to get popular tracks');
  }
};

/**
 * Get tracks by mood
 * @param {string} mood - Mood tag (happy, sad, calm, energetic, etc.)
 * @param {number} limit - Number of results (default: 20)
 * @returns {Promise<Array>} Array of tracks
 */
export const getJamendoByMood = async (mood, limit = 20) => {
  try {
    const response = await jamendoAPI.get('/tracks', {
      params: {
        tags: mood,
        limit: limit,
        include: 'musicinfo',
        audioformat: 'mp32',
        order: 'popularity_total'
      }
    });

    return response.data.results.map(track => formatJamendoTrack(track));
  } catch (error) {
    console.error('Error getting Jamendo by mood:', error.response?.data || error.message);
    throw new Error('Failed to get tracks by mood');
  }
};

/**
 * Get artist details
 * @param {string} artistId - Jamendo artist ID
 * @returns {Promise<Object>} Artist details
 */
export const getJamendoArtist = async (artistId) => {
  try {
    const response = await jamendoAPI.get('/artists', {
      params: {
        id: artistId
      }
    });

    if (response.data.results.length === 0) {
      throw new Error('Artist not found');
    }

    return response.data.results[0];
  } catch (error) {
    console.error('Error getting Jamendo artist:', error.response?.data || error.message);
    throw new Error('Failed to get artist details');
  }
};

/**
 * Get tracks by artist
 * @param {string} artistId - Jamendo artist ID
 * @param {number} limit - Number of results (default: 20)
 * @returns {Promise<Array>} Array of tracks
 */
export const getJamendoArtistTracks = async (artistId, limit = 20) => {
  try {
    const response = await jamendoAPI.get('/tracks', {
      params: {
        artist_id: artistId,
        limit: limit,
        include: 'musicinfo',
        audioformat: 'mp32',
        order: 'popularity_total'
      }
    });

    return response.data.results.map(track => formatJamendoTrack(track));
  } catch (error) {
    console.error('Error getting Jamendo artist tracks:', error.response?.data || error.message);
    throw new Error('Failed to get artist tracks');
  }
};

/**
 * Format Jamendo track to unified format
 * @param {Object} track - Raw Jamendo track object
 * @returns {Object} Formatted track
 */
const formatJamendoTrack = (track) => {
  // Calculate instrumentalness based on vocal/instrumental tag
  const isInstrumental = track.vocalinstrumental === 'instrumental';
  
  return {
    id: `jamendo_${track.id}`,
    source: 'jamendo',
    title: track.name,
    artist: track.artist_name,
    artistId: track.artist_id,
    album: track.album_name || 'Single',
    albumId: track.album_id,
    albumArt: track.album_image || track.image || 'https://via.placeholder.com/300',
    duration: track.duration, // in seconds
    releaseDate: track.releasedate,
    
    // Streaming URLs (Jamendo provides FULL streaming!)
    streamUrl: track.audio || track.audiodownload,
    audioDownload: track.audiodownload, // High quality download URL
    previewUrl: track.audio, // Same as stream for Jamendo
    
    // Music info
    instrumentalness: isInstrumental ? 0.95 : 0.1,
    vocalInstrumental: track.vocalinstrumental,
    gender: track.musicinfo?.gender || null,
    speed: track.musicinfo?.speed || null, // slow, medium, veryfast
    tags: track.musicinfo?.tags || [],
    
    // Metadata
    license: track.license_ccurl,
    shareUrl: track.shareurl,
    position: track.position,
    language: track.lang || 'unknown',
    
    // Playback
    isPlayable: true,
    isFullTrack: true, // Unlike Spotify's 30s previews!
    
    // Stats
    downloads: track.stats?.rate_download_total || 0,
    listens: track.stats?.rate_listened_total || 0,
    
    // Original data for reference
    originalData: track
  };
};

/**
 * Test Jamendo API connection
 * @returns {Promise<boolean>} Connection status
 */
export const testJamendoConnection = async () => {
  try {
    const response = await jamendoAPI.get('/tracks', {
      params: {
        limit: 1
      }
    });
    
    console.log('✅ Jamendo API connected successfully');
    return response.data.results.length > 0;
  } catch (error) {
    console.error('❌ Jamendo API connection failed:', error.message);
    return false;
  }
};

export default {
  searchJamendoTracks,
  getJamendoInstrumental,
  getJamendoByGenre,
  getJamendoTrackById,
  getJamendoPopular,
  getJamendoByMood,
  getJamendoArtist,
  getJamendoArtistTracks,
  testJamendoConnection
};
