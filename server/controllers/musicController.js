import { searchSpotifyTracks, getAudioFeatures } from '../utils/spotify.js';
import { searchJioSaavnTracks, getJioSaavnInstrumental } from '../utils/jiosaavn.js';
import { searchSoundCloudTracks, getSoundCloudInstrumental } from '../utils/soundcloud.js';
import { searchJamendoTracks, getJamendoInstrumental } from '../utils/jamendo.js';

/**
 * Combined Music Search - Search across all 4 platforms
 */
export const searchAllPlatforms = async (req, res) => {
  try {
    const { query, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    console.log(`🔍 Searching all platforms for: "${query}"`);

    // Search all platforms in parallel (without YouTube)
    const [spotifyResults, jiosaavnResults, soundcloudResults, jamendoResults] = await Promise.allSettled([
      searchSpotifyTracks(query, parseInt(limit)).catch(err => {
        console.warn('Spotify search failed:', err.message);
        return [];
      }),
      searchJioSaavnTracks(query, parseInt(limit)).catch(err => {
        console.warn('JioSaavn search failed:', err.message);
        return [];
      }),
      searchSoundCloudTracks(query, parseInt(limit)).catch(err => {
        console.warn('SoundCloud search failed:', err.message);
        return [];
      }),
      searchJamendoTracks(query, parseInt(limit)).catch(err => {
        console.warn('Jamendo search failed:', err.message);
        return [];
      })
    ]);

    // Format results from each platform
    const spotify = formatSpotifyResults(spotifyResults.status === 'fulfilled' ? spotifyResults.value : []);
    const jiosaavn = formatJioSaavnResults(jiosaavnResults.status === 'fulfilled' ? jiosaavnResults.value : []);
    const soundcloud = formatSoundCloudResults(soundcloudResults.status === 'fulfilled' ? soundcloudResults.value : []);
    const jamendo = jamendoResults.status === 'fulfilled' ? jamendoResults.value : [];

    // Combine all results
    const allTracks = [
      ...spotify,
      ...jiosaavn,
      ...soundcloud,
      ...jamendo
    ];

    res.json({
      success: true,
      query,
      totalResults: allTracks.length,
      sources: {
        spotify: spotify.length,
        jiosaavn: jiosaavn.length,
        soundcloud: soundcloud.length,
        jamendo: jamendo.length
      },
      tracks: allTracks
    });
  } catch (error) {
    console.error('Error in searchAllPlatforms:', error);
    res.status(500).json({ 
      error: 'Failed to search across platforms',
      message: error.message 
    });
  }
};

/**
 * Get instrumental music from all platforms
 */
export const getInstrumentalFromAll = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    console.log('🎹 Getting instrumental music from all platforms');

    // Get instrumental from all platforms in parallel (without YouTube)
    const [jiosaavnResults, soundcloudResults, spotifyResults, jamendoResults] = await Promise.allSettled([
      getJioSaavnInstrumental(parseInt(limit)).catch(err => {
        console.warn('JioSaavn instrumental failed:', err.message);
        return [];
      }),
      getSoundCloudInstrumental(parseInt(limit)).catch(err => {
        console.warn('SoundCloud instrumental failed:', err.message);
        return [];
      }),
      searchSpotifyTracks('instrumental ambient', parseInt(limit)).catch(err => {
        console.warn('Spotify instrumental failed:', err.message);
        return [];
      }),
      getJamendoInstrumental(parseInt(limit)).catch(err => {
        console.warn('Jamendo instrumental failed:', err.message);
        return [];
      })
    ]);

    // Format results
    const jiosaavn = formatJioSaavnResults(jiosaavnResults.status === 'fulfilled' ? jiosaavnResults.value : []);
    const soundcloud = formatSoundCloudResults(soundcloudResults.status === 'fulfilled' ? soundcloudResults.value : []);
    const spotify = formatSpotifyResults(spotifyResults.status === 'fulfilled' ? spotifyResults.value : []);
    const jamendo = jamendoResults.status === 'fulfilled' ? jamendoResults.value : [];

    // Combine all results
    const allTracks = [
      ...jiosaavn,
      ...soundcloud,
      ...spotify,
      ...jamendo
    ];

    // Shuffle the results for variety
    const shuffled = allTracks.sort(() => Math.random() - 0.5);

    res.json({
      success: true,
      totalResults: shuffled.length,
      sources: {
        spotify: spotify.length,
        jiosaavn: jiosaavn.length,
        soundcloud: soundcloud.length,
        jamendo: jamendo.length
      },
      tracks: shuffled
    });
  } catch (error) {
    console.error('Error in getInstrumentalFromAll:', error);
    res.status(500).json({ 
      error: 'Failed to get instrumental music',
      message: error.message 
    });
  }
};

/**
 * Get recommendations from multiple platforms
 */
export const getRecommendations = async (req, res) => {
  try {
    const { genre = 'instrumental', limit = 10 } = req.query;

    console.log(`🎵 Getting recommendations for genre: ${genre}`);

    const queries = {
      instrumental: 'instrumental music',
      piano: 'piano solo',
      lofi: 'lofi chill beats',
      ambient: 'ambient soundscape',
      classical: 'classical music',
      jazz: 'smooth jazz',
      electronic: 'electronic instrumental',
      acoustic: 'acoustic guitar'
    };

    const searchQuery = queries[genre.toLowerCase()] || genre;

    const [spotifyResults, jiosaavnResults, soundcloudResults, jamendoResults] = await Promise.allSettled([
      searchSpotifyTracks(searchQuery, parseInt(limit)).catch(() => []),
      searchJioSaavnTracks(searchQuery, parseInt(limit)).catch(() => []),
      searchSoundCloudTracks(searchQuery, parseInt(limit)).catch(() => []),
      searchJamendoTracks(searchQuery, parseInt(limit)).catch(() => [])
    ]);

    const spotify = formatSpotifyResults(spotifyResults.status === 'fulfilled' ? spotifyResults.value : []);
    const jiosaavn = formatJioSaavnResults(jiosaavnResults.status === 'fulfilled' ? jiosaavnResults.value : []);
    const soundcloud = formatSoundCloudResults(soundcloudResults.status === 'fulfilled' ? soundcloudResults.value : []);
    const jamendo = jamendoResults.status === 'fulfilled' ? jamendoResults.value : [];

    const allTracks = [...spotify, ...jiosaavn, ...soundcloud, ...jamendo];
    const shuffled = allTracks.sort(() => Math.random() - 0.5);

    res.json({
      success: true,
      genre,
      totalResults: shuffled.length,
      tracks: shuffled.slice(0, parseInt(limit) * 2)
    });
  } catch (error) {
    console.error('Error in getRecommendations:', error);
    res.status(500).json({ 
      error: 'Failed to get recommendations',
      message: error.message 
    });
  }
};

/**
 * Format Spotify results to unified format
 */
const formatSpotifyResults = (tracks) => {
  return tracks.map(track => ({
    id: track.id,
    source: 'spotify',
    title: track.name,
    artist: track.artists?.map(a => a.name).join(', ') || 'Unknown',
    album: track.album?.name || '',
    albumArt: track.album?.images?.[0]?.url || '',
    duration: Math.floor(track.duration_ms / 1000),
    previewUrl: track.preview_url,
    externalUrl: track.external_urls?.spotify,
    popularity: track.popularity || 0,
    instrumentalness: 0.5,
    isPlayable: !!track.preview_url
  }));
};

/**
 * Format JioSaavn results to unified format
 */
const formatJioSaavnResults = (tracks) => {
  return tracks.map(track => ({
    id: track.jiosaavnId,
    source: 'jiosaavn',
    title: track.title,
    artist: track.artist,
    album: track.album,
    albumArt: track.albumArt,
    duration: track.duration,
    previewUrl: track.previewUrl,
    streamUrl: track.streamUrl,
    language: track.language,
    year: track.year,
    instrumentalness: track.instrumentalness || 0.3,
    isPlayable: !!track.streamUrl
  }));
};

/**
 * Format SoundCloud results to unified format
 */
const formatSoundCloudResults = (tracks) => {
  return tracks.map(track => ({
    id: track.soundcloudId,
    source: 'soundcloud',
    title: track.title,
    artist: track.artist,
    album: track.album,
    albumArt: track.albumArt,
    duration: track.duration,
    previewUrl: track.previewUrl,
    streamUrl: track.streamUrl,
    permalink: track.permalink,
    playbackCount: track.playbackCount,
    likesCount: track.likesCount,
    genre: track.genre,
    instrumentalness: track.instrumentalness || 0.5,
    isPlayable: !!track.streamUrl || !!track.previewUrl
  }));
};

/**
 * Get statistics about available music sources
 */
export const getSourcesStats = async (req, res) => {
  try {
    // Test each API with a simple search (without YouTube)
    const testQuery = 'test';
    const [spotifyTest, jiosaavnTest, soundcloudTest, jamendoTest] = await Promise.allSettled([
      searchSpotifyTracks(testQuery, 1).then(() => ({ available: true, name: 'Spotify' })),
      searchJioSaavnTracks(testQuery, 1).then(() => ({ available: true, name: 'JioSaavn' })),
      searchSoundCloudTracks(testQuery, 1).then(() => ({ available: true, name: 'SoundCloud' })),
      searchJamendoTracks(testQuery, 1).then(() => ({ available: true, name: 'Jamendo' }))
    ]);

    const sources = {
      spotify: {
        available: spotifyTest.status === 'fulfilled' && spotifyTest.value.available,
        name: 'Spotify',
        features: ['Preview', 'Search', 'Audio Features']
      },
      jiosaavn: {
        available: jiosaavnTest.status === 'fulfilled' && jiosaavnTest.value.available,
        name: 'JioSaavn',
        features: ['Full Streaming', 'Search', 'Instrumental Filter']
      },
      soundcloud: {
        available: soundcloudTest.status === 'fulfilled' && soundcloudTest.value.available,
        name: 'SoundCloud',
        features: ['Streaming', 'Search', 'User Content']
      },
      jamendo: {
        available: jamendoTest.status === 'fulfilled' && jamendoTest.value.available,
        name: 'Jamendo',
        features: ['Full Streaming', 'Search', 'Royalty-Free', 'No Subscription']
      }
    };

    const availableCount = Object.values(sources).filter(s => s.available).length;

    res.json({
      success: true,
      totalSources: 4,
      availableSources: availableCount,
      sources
    });
  } catch (error) {
    console.error('Error in getSourcesStats:', error);
    res.status(500).json({ 
      error: 'Failed to get sources stats',
      message: error.message 
    });
  }
};
