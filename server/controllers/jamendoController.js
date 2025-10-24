import {
  searchJamendoTracks,
  getJamendoInstrumental,
  getJamendoByGenre,
  getJamendoTrackById,
  getJamendoPopular,
  getJamendoByMood,
  getJamendoArtist,
  getJamendoArtistTracks,
  testJamendoConnection
} from '../utils/jamendo.js';

/**
 * Search tracks on Jamendo
 * GET /api/jamendo/search?query=piano&limit=20
 */
export const searchTracks = async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter is required'
      });
    }

    const tracks = await searchJamendoTracks(query, parseInt(limit));

    res.json({
      success: true,
      source: 'jamendo',
      query,
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in Jamendo search controller:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get instrumental tracks
 * GET /api/jamendo/instrumental?limit=30
 */
export const getInstrumental = async (req, res) => {
  try {
    const { limit = 30 } = req.query;

    const tracks = await getJamendoInstrumental(parseInt(limit));

    res.json({
      success: true,
      source: 'jamendo',
      type: 'instrumental',
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in Jamendo instrumental controller:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get tracks by genre
 * GET /api/jamendo/genre/:genre?limit=20
 */
export const getByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const { limit = 20 } = req.query;

    const tracks = await getJamendoByGenre(genre, parseInt(limit));

    res.json({
      success: true,
      source: 'jamendo',
      genre,
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in Jamendo genre controller:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get track details by ID
 * GET /api/jamendo/track/:id
 */
export const getTrackDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Remove 'jamendo_' prefix if present
    const trackId = id.replace('jamendo_', '');

    const track = await getJamendoTrackById(trackId);

    res.json({
      success: true,
      source: 'jamendo',
      track
    });
  } catch (error) {
    console.error('Error in Jamendo track details controller:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get popular/trending tracks
 * GET /api/jamendo/popular?limit=20
 */
export const getPopular = async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const tracks = await getJamendoPopular(parseInt(limit));

    res.json({
      success: true,
      source: 'jamendo',
      type: 'popular',
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in Jamendo popular controller:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get tracks by mood
 * GET /api/jamendo/mood/:mood?limit=20
 */
export const getByMood = async (req, res) => {
  try {
    const { mood } = req.params;
    const { limit = 20 } = req.query;

    const tracks = await getJamendoByMood(mood, parseInt(limit));

    res.json({
      success: true,
      source: 'jamendo',
      mood,
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in Jamendo mood controller:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get artist details
 * GET /api/jamendo/artist/:id
 */
export const getArtistDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await getJamendoArtist(id);

    res.json({
      success: true,
      source: 'jamendo',
      artist
    });
  } catch (error) {
    console.error('Error in Jamendo artist controller:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get tracks by artist
 * GET /api/jamendo/artist/:id/tracks?limit=20
 */
export const getArtistTracks = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 20 } = req.query;

    const tracks = await getJamendoArtistTracks(id, parseInt(limit));

    res.json({
      success: true,
      source: 'jamendo',
      artistId: id,
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in Jamendo artist tracks controller:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Test Jamendo API connection
 * GET /api/jamendo/test
 */
export const testConnection = async (req, res) => {
  try {
    const isConnected = await testJamendoConnection();

    res.json({
      success: isConnected,
      source: 'jamendo',
      message: isConnected 
        ? 'Jamendo API is working correctly' 
        : 'Jamendo API connection failed'
    });
  } catch (error) {
    console.error('Error testing Jamendo connection:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export default {
  searchTracks,
  getInstrumental,
  getByGenre,
  getTrackDetails,
  getPopular,
  getByMood,
  getArtistDetails,
  getArtistTracks,
  testConnection
};
