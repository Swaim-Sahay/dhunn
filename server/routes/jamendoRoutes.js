import express from 'express';
import {
  searchTracks,
  getInstrumental,
  getByGenre,
  getTrackDetails,
  getPopular,
  getByMood,
  getArtistDetails,
  getArtistTracks,
  testConnection
} from '../controllers/jamendoController.js';

const router = express.Router();

// Test connection
router.get('/test', testConnection);

// Search tracks
router.get('/search', searchTracks);

// Get instrumental tracks
router.get('/instrumental', getInstrumental);

// Get popular/trending tracks
router.get('/popular', getPopular);

// Get tracks by genre
router.get('/genre/:genre', getByGenre);

// Get tracks by mood
router.get('/mood/:mood', getByMood);

// Get track details
router.get('/track/:id', getTrackDetails);

// Get artist details
router.get('/artist/:id', getArtistDetails);

// Get artist tracks
router.get('/artist/:id/tracks', getArtistTracks);

export default router;
