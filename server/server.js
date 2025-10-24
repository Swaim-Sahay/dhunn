import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import songRoutes from './routes/songRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import jiosaavnRoutes from './routes/jiosaavnRoutes.js';
import soundcloudRoutes from './routes/soundcloudRoutes.js';
import jamendoRoutes from './routes/jamendoRoutes.js';
import musicRoutes from './routes/musicRoutes.js';
import proxyRoutes from './routes/proxyRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', process.env.CLIENT_URL].filter(Boolean),
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/jiosaavn', jiosaavnRoutes);
app.use('/api/soundcloud', soundcloudRoutes);
app.use('/api/jamendo', jamendoRoutes);
app.use('/api/music', musicRoutes); // Combined music from all sources
app.use('/api/proxy', proxyRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Dhunn API is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🎵 Welcome to Dhunn API - Instrumental Music Streaming',
    version: '2.1.0',
    description: 'Multi-source music streaming API with Spotify, JioSaavn, SoundCloud & Jamendo',
    endpoints: {
      auth: '/api/auth',
      songs: '/api/songs (Spotify)',
      jiosaavn: '/api/jiosaavn (JioSaavn)',
      soundcloud: '/api/soundcloud (SoundCloud)',
      jamendo: '/api/jamendo (Jamendo - FREE Full Streaming!)',
      music: '/api/music (Combined from all sources)',
      playlists: '/api/playlists',
      health: '/api/health'
    },
    features: [
      'Search across all platforms: /api/music/search?query=piano',
      'Get instrumental: /api/music/instrumental',
      'Get recommendations: /api/music/recommendations?genre=lofi',
      'Check sources: /api/music/sources',
      'Jamendo full streaming: /api/jamendo/search?query=lofi'
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🎵 Dhunn Server Running`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('🔴 Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});
