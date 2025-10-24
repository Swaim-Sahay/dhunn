/**
 * Filter to ensure only instrumental music is shown
 * Removes songs with vocals or non-instrumental indicators
 */

// Keywords that indicate a song likely has vocals (should be EXCLUDED)
const VOCAL_KEYWORDS = [
  'lyrics',
  'karaoke',
  'vocal',
  'singing',
  'song version',
  'official video',
  'music video',
  'ft.',
  'feat.',
  'featuring',
  'remix with vocals',
  'live performance',
  'concert'
];

// Keywords that indicate instrumental music (should be INCLUDED)
const INSTRUMENTAL_KEYWORDS = [
  'instrumental',
  'piano',
  'guitar',
  'violin',
  'saxophone',
  'flute',
  'drum',
  'orchestra',
  'classical',
  'jazz',
  'lofi',
  'beats',
  'ambient',
  'meditation',
  'relaxing',
  'study music',
  'background music',
  'bgm',
  'ost',
  'soundtrack',
  'acoustic',
  'cover instrumental'
];

/**
 * Check if a song is instrumental based on title and metadata
 */
export const isInstrumental = (song) => {
  if (!song) return false;

  const title = (song.title || '').toLowerCase();
  const artist = (song.artist || '').toLowerCase();
  const album = (song.album || '').toLowerCase();
  const fullText = `${title} ${artist} ${album}`;

  // Check if title explicitly has "instrumental"
  if (title.includes('instrumental')) return true;

  // Check if title has vocal indicators - EXCLUDE these
  const hasVocalKeyword = VOCAL_KEYWORDS.some(keyword => 
    fullText.includes(keyword.toLowerCase())
  );
  
  if (hasVocalKeyword) {
    console.log('🚫 Filtered out (has vocals):', song.title);
    return false;
  }

  // Check if it has instrumental indicators
  const hasInstrumentalKeyword = INSTRUMENTAL_KEYWORDS.some(keyword => 
    fullText.includes(keyword.toLowerCase())
  );

  // If song has lyrics indicator in metadata, exclude it
  if (song.hasLyrics === true || song.hasLyrics === 'true') {
    console.log('🚫 Filtered out (has lyrics metadata):', song.title);
    return false;
  }

  // If instrumentalness score is provided and low, exclude
  if (typeof song.instrumentalness === 'number' && song.instrumentalness < 0.5) {
    console.log('🚫 Filtered out (low instrumentalness):', song.title, song.instrumentalness);
    return false;
  }

  return hasInstrumentalKeyword;
};

/**
 * Filter an array of songs to only include instrumental tracks
 */
export const filterInstrumentalSongs = (songs) => {
  if (!Array.isArray(songs)) return [];
  
  const filtered = songs.filter(isInstrumental);
  
  console.log(`🎵 Filtered: ${songs.length} songs → ${filtered.length} instrumental tracks`);
  
  return filtered;
};
