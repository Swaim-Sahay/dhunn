import axios from 'axios';

let spotifyAccessToken = null;
let tokenExpiryTime = null;

/**
 * Get Spotify API access token using Client Credentials Flow
 */
export const getSpotifyAccessToken = async () => {
  try {
    // Return cached token if still valid
    if (spotifyAccessToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
      return spotifyAccessToken;
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Spotify credentials not configured');
    }

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        }
      }
    );

    spotifyAccessToken = response.data.access_token;
    // Set expiry time (usually 3600 seconds, subtract 60 for buffer)
    tokenExpiryTime = Date.now() + (response.data.expires_in - 60) * 1000;

    return spotifyAccessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Spotify');
  }
};

/**
 * Search for tracks on Spotify
 */
export const searchSpotifyTracks = async (query, limit = 20) => {
  try {
    const token = await getSpotifyAccessToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: query,
        type: 'track',
        limit: limit
      }
    });

    return response.data.tracks.items;
  } catch (error) {
    console.error('Error searching Spotify tracks:', error.response?.data || error.message);
    throw new Error('Failed to search tracks');
  }
};

/**
 * Get audio features for tracks
 */
export const getAudioFeatures = async (trackIds) => {
  try {
    const token = await getSpotifyAccessToken();

    // Spotify API accepts max 100 IDs at once
    const ids = trackIds.slice(0, 100).join(',');

    const response = await axios.get('https://api.spotify.com/v1/audio-features', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        ids: ids
      }
    });

    return response.data.audio_features;
  } catch (error) {
    if (error.response?.status === 403) {
      console.warn('⚠️  Audio features endpoint returned 403 - using default values');
    } else {
      console.error('Error getting audio features:', error.response?.data || error.message);
    }
    // Return array with default values if fails
    return trackIds.map(() => ({
      instrumentalness: 0.3,
      energy: 0.5,
      valence: 0.5,
      tempo: 120
    }));
  }
};

/**
 * Get track details by ID
 */
export const getTrackById = async (trackId) => {
  try {
    const token = await getSpotifyAccessToken();

    const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error getting track by ID:', error.response?.data || error.message);
    throw new Error('Failed to get track details');
  }
};

/**
 * Get recommendations based on seed tracks
 */
export const getRecommendations = async (seedTracks, limit = 20) => {
  try {
    const token = await getSpotifyAccessToken();

    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        seed_tracks: seedTracks.slice(0, 5).join(','), // Max 5 seeds
        limit: limit,
        min_instrumentalness: 0.5 // Focus on instrumental tracks
      }
    });

    return response.data.tracks;
  } catch (error) {
    console.error('Error getting recommendations:', error.response?.data || error.message);
    throw new Error('Failed to get recommendations');
  }
};
