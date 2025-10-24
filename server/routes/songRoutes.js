import express from 'express';
import {
  searchSongs,
  getInstrumentalSongs,
  getSongById,
  saveSong,
  getRecommendedSongs
} from '../controllers/songController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/search', searchSongs);
router.get('/instrumental', getInstrumentalSongs);
router.get('/recommended', getRecommendedSongs);
router.get('/:id', getSongById);

// Protected routes
router.post('/', protect, saveSong);

export default router;
