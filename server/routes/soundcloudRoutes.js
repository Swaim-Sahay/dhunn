import express from 'express';
import {
  searchTracks,
  getTrackDetails,
  getInstrumental,
  getUserTracks,
  getPlaylist,
  getTrending
} from '../controllers/soundcloudController.js';

const router = express.Router();

// Search tracks
router.get('/search', searchTracks);

// Get track details
router.get('/track/:trackId', getTrackDetails);

// Get instrumental tracks
router.get('/instrumental', getInstrumental);

// Get user tracks
router.get('/user/tracks', getUserTracks);

// Get playlist tracks
router.get('/playlist', getPlaylist);

// Get trending tracks
router.get('/trending', getTrending);

export default router;
