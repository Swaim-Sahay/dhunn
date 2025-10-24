import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  spotifyId: {
    type: String,
    sparse: true,
    index: true
  },
  jiosaavnId: {
    type: String,
    sparse: true,
    index: true
  },
  youtubeId: {
    type: String,
    sparse: true,
    index: true
  },
  id: {
    type: String,
    sparse: true,
    index: true
  },
  source: {
    type: String,
    enum: ['spotify', 'jiosaavn', 'youtube', 'jamendo', 'soundcloud'],
    default: 'spotify'
  },
  title: {
    type: String,
    required: [true, 'Song title is required'],
    trim: true
  },
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true
  },
  album: {
    type: String,
    trim: true
  },
  albumArt: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  previewUrl: {
    type: String,
    default: ''
  },
  streamUrl: {
    type: String,
    default: ''
  },
  instrumentalUrl: {
    type: String,
    default: ''
  },
  instrumentalness: {
    type: Number,
    min: 0,
    max: 1,
    default: 0
  },
  energy: {
    type: Number,
    min: 0,
    max: 1,
    default: 0
  },
  valence: {
    type: Number,
    min: 0,
    max: 1,
    default: 0
  },
  tempo: {
    type: Number,
    default: 0
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for searching
songSchema.index({ title: 'text', artist: 'text', album: 'text' });

const Song = mongoose.models.Song || mongoose.model('Song', songSchema);

export default Song;
