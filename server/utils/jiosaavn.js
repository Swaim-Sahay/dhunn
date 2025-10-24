import axios from 'axios';

/**
 * JioSaavn API Integration
 * Uses unofficial API endpoints
 */

const JIOSAAVN_BASE_URL = 'https://www.jiosaavn.com/api.php';

/**
 * Search for songs on JioSaavn
 */
export const searchJioSaavnTracks = async (query, limit = 20) => {
  try {
    const response = await axios.get(JIOSAAVN_BASE_URL, {
      params: {
        __call: 'autocomplete.get',
        _format: 'json',
        _marker: '0',
        cc: 'in',
        includeMetaTags: '1',
        query: query
      }
    });

    const songs = response.data.songs?.data || [];
    
    // Get detailed info for each song
    const detailedSongs = await Promise.all(
      songs.slice(0, limit).map(song => getJioSaavnSongDetails(song.id))
    );

    return detailedSongs.filter(song => song !== null);
  } catch (error) {
    console.error('Error searching JioSaavn tracks:', error.message);
    throw new Error('Failed to search JioSaavn tracks');
  }
};

/**
 * Get song details by ID
 */
export const getJioSaavnSongDetails = async (songId) => {
  try {
    const response = await axios.get(JIOSAAVN_BASE_URL, {
      params: {
        __call: 'song.getDetails',
        cc: 'in',
        _marker: '0?_marker=0',
        _format: 'json',
        pids: songId
      }
    });

    const song = response.data[songId];
    if (!song) return null;

    // Clean up the image URL
    const albumArt = song.image?.replace('150x150', '500x500') || song.image;
    
    // Get streaming URL
    const streamUrl = await getStreamingUrl(song.encrypted_media_url);

    return {
      jiosaavnId: song.id,
      title: decodeHtmlEntities(song.song),
      artist: decodeHtmlEntities(song.primary_artists || song.singers),
      album: decodeHtmlEntities(song.album || 'JioSaavn'),
      albumArt: albumArt,
      duration: parseInt(song.duration) || 0,
      year: song.year,
      language: song.language,
      streamUrl: streamUrl,
      previewUrl: streamUrl, // JioSaavn allows full streaming
      downloadUrl: song.media_url,
      hasLyrics: song.has_lyrics === 'true',
      copyright: song.copyright_text,
      instrumentalness: 0.1, // Most JioSaavn songs have vocals
      energy: 0.7,
      valence: 0.6,
      tempo: 120
    };
  } catch (error) {
    console.error('Error getting JioSaavn song details:', error.message);
    return null;
  }
};

/**
 * Get streaming URL from encrypted media URL
 */
const getStreamingUrl = async (encryptedUrl) => {
  try {
    const response = await axios.get(JIOSAAVN_BASE_URL, {
      params: {
        __call: 'song.generateAuthToken',
        url: encryptedUrl,
        bitrate: '320',
        _format: 'json',
        _marker: '0'
      }
    });

    return response.data.auth_url || encryptedUrl;
  } catch (error) {
    console.error('Error getting streaming URL:', error.message);
    return encryptedUrl;
  }
};

/**
 * Get trending/featured songs
 */
export const getJioSaavnTrending = async (limit = 20) => {
  try {
    const response = await axios.get(JIOSAAVN_BASE_URL, {
      params: {
        __call: 'content.getTrending',
        _format: 'json',
        _marker: '0',
        entity_type: 'song',
        entity_language: 'hindi'
      }
    });

    const songs = response.data || [];
    const detailedSongs = await Promise.all(
      songs.slice(0, limit).map(song => getJioSaavnSongDetails(song.id))
    );

    return detailedSongs.filter(song => song !== null);
  } catch (error) {
    console.error('Error getting JioSaavn trending:', error.message);
    throw new Error('Failed to get trending songs');
  }
};

/**
 * Get songs by album
 */
export const getJioSaavnAlbum = async (albumId) => {
  try {
    const response = await axios.get(JIOSAAVN_BASE_URL, {
      params: {
        __call: 'content.getAlbumDetails',
        _format: 'json',
        cc: 'in',
        _marker: '0',
        albumid: albumId
      }
    });

    const songs = response.data.list || [];
    return Promise.all(songs.map(song => getJioSaavnSongDetails(song.id)));
  } catch (error) {
    console.error('Error getting JioSaavn album:', error.message);
    throw new Error('Failed to get album details');
  }
};

/**
 * Search for instrumental music on JioSaavn
 */
export const getJioSaavnInstrumental = async (limit = 20) => {
  const instrumentalQueries = [
    'piano instrumental',
    'guitar instrumental', 
    'violin instrumental',
    'flute instrumental',
    'saxophone instrumental',
    'classical instrumental music',
    'acoustic instrumental',
    'ambient instrumental',
    'meditation instrumental',
    'study music instrumental',
    'relaxing instrumental',
    'lofi instrumental beats'
  ];

  const randomQuery = instrumentalQueries[Math.floor(Math.random() * instrumentalQueries.length)];
  console.log('🎵 Fetching instrumental music with query:', randomQuery);
  return searchJioSaavnTracks(randomQuery, limit);
};

/**
 * Decode HTML entities
 */
const decodeHtmlEntities = (text) => {
  if (!text) return '';
  return text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
};
