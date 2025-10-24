import {
  searchSoundCloudTracks,
  getSoundCloudTrackDetails,
  getSoundCloudInstrumental,
  getSoundCloudUserTracks,
  getSoundCloudPlaylist,
  getSoundCloudTrending
} from '../utils/soundcloud.js';

/**
 * Search SoundCloud tracks
 */
export const searchTracks = async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    console.log(`🔍 Searching SoundCloud for: "${query}"`);
    const tracks = await searchSoundCloudTracks(query, parseInt(limit));

    res.json({
      success: true,
      source: 'soundcloud',
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in searchTracks:', error);
    res.status(500).json({ 
      error: 'Failed to search SoundCloud tracks',
      message: error.message 
    });
  }
};

/**
 * Get track details
 */
export const getTrackDetails = async (req, res) => {
  try {
    const { trackId } = req.params;

    if (!trackId) {
      return res.status(400).json({ error: 'Track ID is required' });
    }

    console.log(`🎵 Getting SoundCloud track details for: ${trackId}`);
    const track = await getSoundCloudTrackDetails(trackId);

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.json({
      success: true,
      source: 'soundcloud',
      track
    });
  } catch (error) {
    console.error('Error in getTrackDetails:', error);
    res.status(500).json({ 
      error: 'Failed to get track details',
      message: error.message 
    });
  }
};

/**
 * Get instrumental tracks
 */
export const getInstrumental = async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    console.log('🎹 Getting SoundCloud instrumental tracks');
    const tracks = await getSoundCloudInstrumental(parseInt(limit));

    res.json({
      success: true,
      source: 'soundcloud',
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in getInstrumental:', error);
    res.status(500).json({ 
      error: 'Failed to get instrumental tracks',
      message: error.message 
    });
  }
};

/**
 * Get user tracks
 */
export const getUserTracks = async (req, res) => {
  try {
    const { userUrl, limit = 20 } = req.query;

    if (!userUrl) {
      return res.status(400).json({ error: 'User URL is required' });
    }

    console.log(`👤 Getting SoundCloud user tracks for: ${userUrl}`);
    const tracks = await getSoundCloudUserTracks(userUrl, parseInt(limit));

    res.json({
      success: true,
      source: 'soundcloud',
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in getUserTracks:', error);
    res.status(500).json({ 
      error: 'Failed to get user tracks',
      message: error.message 
    });
  }
};

/**
 * Get playlist tracks
 */
export const getPlaylist = async (req, res) => {
  try {
    const { playlistUrl } = req.query;

    if (!playlistUrl) {
      return res.status(400).json({ error: 'Playlist URL is required' });
    }

    console.log(`📝 Getting SoundCloud playlist: ${playlistUrl}`);
    const tracks = await getSoundCloudPlaylist(playlistUrl);

    res.json({
      success: true,
      source: 'soundcloud',
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in getPlaylist:', error);
    res.status(500).json({ 
      error: 'Failed to get playlist tracks',
      message: error.message 
    });
  }
};

/**
 * Get trending tracks
 */
export const getTrending = async (req, res) => {
  try {
    const { genre = 'all-music', limit = 20 } = req.query;

    console.log(`🔥 Getting SoundCloud trending tracks for genre: ${genre}`);
    const tracks = await getSoundCloudTrending(genre, parseInt(limit));

    res.json({
      success: true,
      source: 'soundcloud',
      count: tracks.length,
      tracks
    });
  } catch (error) {
    console.error('Error in getTrending:', error);
    res.status(500).json({ 
      error: 'Failed to get trending tracks',
      message: error.message 
    });
  }
};
