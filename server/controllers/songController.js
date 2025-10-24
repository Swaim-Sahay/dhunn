import Song from '../models/song.js';
import { searchSpotifyTracks, getAudioFeatures, getSpotifyAccessToken } from '../utils/spotify.js';

/**
 * @desc    Search for songs
 * @route   GET /api/songs/search?query=searchTerm&limit=20
 * @access  Public
 */
export const searchSongs = async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Search Spotify
    const spotifyResults = await searchSpotifyTracks(query, limit);

    if (!spotifyResults || spotifyResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No songs found'
      });
    }

    // Get audio features for all tracks
    const trackIds = spotifyResults.map(track => track.id);
    const audioFeatures = await getAudioFeatures(trackIds);

    // Combine track data with audio features
    const songsWithFeatures = spotifyResults.map((track, index) => {
      const features = audioFeatures[index] || {};
      return {
        spotifyId: track.id,
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        duration: Math.floor(track.duration_ms / 1000),
        previewUrl: track.preview_url || '',
        instrumentalness: features.instrumentalness || 0,
        energy: features.energy || 0,
        valence: features.valence || 0,
        tempo: features.tempo || 0
      };
    });

    res.status(200).json({
      success: true,
      count: songsWithFeatures.length,
      data: songsWithFeatures
    });
  } catch (error) {
    console.error('Search songs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching songs',
      error: error.message
    });
  }
};

/**
 * @desc    Get instrumental songs (instrumentalness > 0.5)
 * @route   GET /api/songs/instrumental?limit=50
 * @access  Public
 */
export const getInstrumentalSongs = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    // Get access token
    await getSpotifyAccessToken();

    // Search for instrumental genres and filter
    const genres = ['classical', 'jazz', 'ambient', 'instrumental', 'soundtrack', 'lofi'];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    
    const results = await searchSpotifyTracks(randomGenre, limit);
    const trackIds = results.map(track => track.id);
    const audioFeatures = await getAudioFeatures(trackIds);

    // Filter for high instrumentalness
    const instrumentalSongs = results
      .map((track, index) => {
        const features = audioFeatures[index] || {};
        return {
          spotifyId: track.id,
          title: track.name,
          artist: track.artists.map(a => a.name).join(', '),
          album: track.album.name,
          albumArt: track.album.images[0]?.url || '',
          duration: Math.floor(track.duration_ms / 1000),
          previewUrl: track.preview_url || '',
          instrumentalness: features.instrumentalness || 0,
          energy: features.energy || 0,
          valence: features.valence || 0,
          tempo: features.tempo || 0
        };
      })
      .filter(song => song.instrumentalness > 0.5);

    res.status(200).json({
      success: true,
      count: instrumentalSongs.length,
      data: instrumentalSongs
    });
  } catch (error) {
    console.error('Get instrumental songs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching instrumental songs',
      error: error.message
    });
  }
};

/**
 * @desc    Get song by ID
 * @route   GET /api/songs/:id
 * @access  Public
 */
export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;

    let song = await Song.findOne({ spotifyId: id });

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    res.status(200).json({
      success: true,
      data: song
    });
  } catch (error) {
    console.error('Get song error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching song',
      error: error.message
    });
  }
};

/**
 * @desc    Save song to database
 * @route   POST /api/songs
 * @access  Private
 */
export const saveSong = async (req, res) => {
  try {
    const songData = req.body;

    // Check if song already exists
    let song = await Song.findOne({ spotifyId: songData.spotifyId });

    if (song) {
      return res.status(200).json({
        success: true,
        data: song,
        message: 'Song already exists'
      });
    }

    // Create new song
    song = await Song.create(songData);

    res.status(201).json({
      success: true,
      data: song,
      message: 'Song saved successfully'
    });
  } catch (error) {
    console.error('Save song error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving song',
      error: error.message
    });
  }
};

/**
 * @desc    Get recommended instrumental tracks
 * @route   GET /api/songs/recommended
 * @access  Public
 */
export const getRecommendedSongs = async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    // Search for curated instrumental playlists
    const instrumentalGenres = [
      'piano instrumental',
      'guitar instrumental',
      'ambient music',
      'movie soundtrack',
      'study music',
      'classical music'
    ];

    const randomGenre = instrumentalGenres[Math.floor(Math.random() * instrumentalGenres.length)];
    const results = await searchSpotifyTracks(randomGenre, limit);
    const trackIds = results.map(track => track.id);
    const audioFeatures = await getAudioFeatures(trackIds);

    const songs = results.map((track, index) => {
      const features = audioFeatures[index] || {};
      return {
        spotifyId: track.id,
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        duration: Math.floor(track.duration_ms / 1000),
        previewUrl: track.preview_url || '',
        instrumentalness: features.instrumentalness || 0,
        energy: features.energy || 0,
        valence: features.valence || 0,
        tempo: features.tempo || 0
      };
    });

    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs
    });
  } catch (error) {
    console.error('Get recommended songs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recommended songs',
      error: error.message
    });
  }
};
