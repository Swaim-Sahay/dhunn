import express from 'express';
import { proxyAudioStream } from '../controllers/proxyController.js';

const router = express.Router();

// Proxy audio stream to bypass CORS
router.get('/audio', proxyAudioStream);

export default router;
