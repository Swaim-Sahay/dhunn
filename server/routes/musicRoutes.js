import express from 'express';
import {
  searchAllPlatforms,
  getInstrumentalFromAll,
  getRecommendations,
  getSourcesStats
} from '../controllers/musicController.js';

const router = express.Router();

// Search across all platforms
router.get('/search', searchAllPlatforms);

// Get instrumental music from all platforms
router.get('/instrumental', getInstrumentalFromAll);

// Get recommendations
router.get('/recommendations', getRecommendations);

// Get sources statistics
router.get('/sources', getSourcesStats);

export default router;
