import Playlist from '../models/playlist.js';
import Song from '../models/song.js';

/**
 * @desc    Create a new playlist
 * @route   POST /api/playlists
 * @access  Private
 */
export const createPlaylist = async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Playlist name is required'
      });
    }

    const playlist = await Playlist.create({
      name,
      description: description || '',
      userId: req.user._id,
      isPublic: isPublic || false,
      songs: []
    });

    res.status(201).json({
      success: true,
      data: playlist,
      message: 'Playlist created successfully'
    });
  } catch (error) {
    console.error('Create playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating playlist',
      error: error.message
    });
  }
};

/**
 * @desc    Get all playlists for a user
 * @route   GET /api/playlists/user/:userId
 * @access  Private
 */
export const getUserPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure user can only get their own playlists
    if (userId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access these playlists'
      });
    }

    const playlists = await Playlist.find({ userId })
      .populate('songs')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: playlists.length,
      data: playlists
    });
  } catch (error) {
    console.error('Get user playlists error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching playlists',
      error: error.message
    });
  }
};

/**
 * @desc    Get playlist by ID
 * @route   GET /api/playlists/:id
 * @access  Private
 */
export const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findById(id)
      .populate('songs')
      .populate('userId', 'username email');

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check if user owns the playlist or if it's public
    if (playlist.userId._id.toString() !== req.user._id.toString() && !playlist.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this playlist'
      });
    }

    res.status(200).json({
      success: true,
      data: playlist
    });
  } catch (error) {
    console.error('Get playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching playlist',
      error: error.message
    });
  }
};

/**
 * @desc    Update playlist
 * @route   PUT /api/playlists/:id
 * @access  Private
 */
export const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isPublic } = req.body;

    let playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check ownership
    if (playlist.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this playlist'
      });
    }

    // Update fields
    if (name) playlist.name = name;
    if (description !== undefined) playlist.description = description;
    if (isPublic !== undefined) playlist.isPublic = isPublic;

    await playlist.save();

    res.status(200).json({
      success: true,
      data: playlist,
      message: 'Playlist updated successfully'
    });
  } catch (error) {
    console.error('Update playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating playlist',
      error: error.message
    });
  }
};

/**
 * @desc    Delete playlist
 * @route   DELETE /api/playlists/:id
 * @access  Private
 */
export const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check ownership
    if (playlist.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this playlist'
      });
    }

    await playlist.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Playlist deleted successfully'
    });
  } catch (error) {
    console.error('Delete playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting playlist',
      error: error.message
    });
  }
};

/**
 * @desc    Add song to playlist
 * @route   POST /api/playlists/:id/songs
 * @access  Private
 */
export const addSongToPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const songData = req.body;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check ownership
    if (playlist.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this playlist'
      });
    }

    // Find or create song - check for multiple ID types
    const songIdentifier = songData.spotifyId || songData.jiosaavnId || songData.id;
    let song = await Song.findOne({
      $or: [
        { spotifyId: songIdentifier },
        { jiosaavnId: songIdentifier },
        { id: songIdentifier }
      ]
    });
    
    if (!song) {
      song = await Song.create(songData);
    }

    // Check if song already in playlist
    if (playlist.songs.includes(song._id)) {
      return res.status(400).json({
        success: false,
        message: 'Song already in playlist'
      });
    }

    playlist.songs.push(song._id);
    await playlist.save();

    const updatedPlaylist = await Playlist.findById(id).populate('songs');

    res.status(200).json({
      success: true,
      data: updatedPlaylist,
      message: 'Song added to playlist'
    });
  } catch (error) {
    console.error('Add song to playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding song to playlist',
      error: error.message
    });
  }
};

/**
 * @desc    Remove song from playlist
 * @route   DELETE /api/playlists/:id/songs/:songId
 * @access  Private
 */
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { id, songId } = req.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check ownership
    if (playlist.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this playlist'
      });
    }

    // Find the song by external ID (spotifyId, jiosaavnId, or id)
    const song = await Song.findOne({
      $or: [
        { spotifyId: songId },
        { jiosaavnId: songId },
        { id: songId },
        { _id: songId } // Also support MongoDB _id
      ]
    });

    if (song) {
      playlist.songs = playlist.songs.filter(s => s.toString() !== song._id.toString());
      await playlist.save();
    }

    const updatedPlaylist = await Playlist.findById(id).populate('songs');

    res.status(200).json({
      success: true,
      data: updatedPlaylist,
      message: 'Song removed from playlist'
    });
  } catch (error) {
    console.error('Remove song from playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing song from playlist',
      error: error.message
    });
  }
};
