import { 
  searchJioSaavnTracks, 
  getJioSaavnSongDetails,
  getJioSaavnTrending,
  getJioSaavnInstrumental 
} from '../utils/jiosaavn.js';

/**
 * @desc    Search for songs using JioSaavn
 * @route   GET /api/jiosaavn/search?query=searchTerm&limit=20
 * @access  Public
 */
export const searchJioSaavnSongs = async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const results = await searchJioSaavnTracks(query, limit);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
      source: 'jiosaavn'
    });
  } catch (error) {
    console.error('JioSaavn search error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching JioSaavn',
      error: error.message
    });
  }
};

/**
 * @desc    Get instrumental songs from JioSaavn
 * @route   GET /api/jiosaavn/instrumental?limit=20
 * @access  Public
 */
export const getJioSaavnInstrumentalSongs = async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const results = await getJioSaavnInstrumental(limit);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
      source: 'jiosaavn'
    });
  } catch (error) {
    console.error('JioSaavn instrumental error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching instrumental songs',
      error: error.message
    });
  }
};

/**
 * @desc    Get trending songs from JioSaavn
 * @route   GET /api/jiosaavn/trending?limit=20
 * @access  Public
 */
export const getJioSaavnTrendingSongs = async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const results = await getJioSaavnTrending(limit);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
      source: 'jiosaavn'
    });
  } catch (error) {
    console.error('JioSaavn trending error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching trending songs',
      error: error.message
    });
  }
};

/**
 * @desc    Get JioSaavn song by ID
 * @route   GET /api/jiosaavn/:id
 * @access  Public
 */
export const getJioSaavnSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await getJioSaavnSongDetails(id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    res.status(200).json({
      success: true,
      data: song,
      source: 'jiosaavn'
    });
  } catch (error) {
    console.error('JioSaavn song details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching song details',
      error: error.message
    });
  }
};
