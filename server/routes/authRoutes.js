import express from 'express';
import {
  signup,
  login,
  getMe,
  addToFavorites,
  removeFromFavorites
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/favorites/:songId', protect, addToFavorites);
router.delete('/favorites/:songId', protect, removeFromFavorites);

export default router;
