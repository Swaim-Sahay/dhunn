import express from 'express';
import {
  searchJioSaavnSongs,
  getJioSaavnInstrumentalSongs,
  getJioSaavnTrendingSongs,
  getJioSaavnSongById
} from '../controllers/jiosaavnController.js';

const router = express.Router();

// Search songs
router.get('/search', searchJioSaavnSongs);

// Get instrumental songs
router.get('/instrumental', getJioSaavnInstrumentalSongs);

// Get trending songs
router.get('/trending', getJioSaavnTrendingSongs);

// Get song by ID
router.get('/:id', getJioSaavnSongById);

export default router;
