import { useState, useEffect } from 'react';
import { jiosaavnAPI, jamendoAPI } from '../utils/api';
import { getErrorMessage } from '../utils/helpers';
import { filterInstrumentalSongs } from '../utils/instrumentalFilter';
import SongCard from '../components/SongCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AddToPlaylistModal from '../components/AddToPlaylistModal';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [instrumentalSongs, setInstrumentalSongs] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('🎵 Fetching instrumental music from Jamendo and JioSaavn...');

      // Fetch from Jamendo and JioSaavn (platforms with full playback support)
      const fetchPromises = [
        jamendoAPI.getInstrumental(30).catch(err => {
          console.warn('Jamendo instrumental failed:', err.message);
          return { data: { data: [] } };
        }),
        jiosaavnAPI.getInstrumental(20).catch(err => {
          console.warn('JioSaavn instrumental failed:', err.message);
          return { data: { data: [] } };
        }),
        jiosaavnAPI.search('relaxing piano instrumental', 20).catch(err => {
          console.warn('JioSaavn search failed:', err.message);
          return { data: { data: [] } };
        })
      ];

      const results = await Promise.all(fetchPromises);
      
      // Combine instrumental songs from Jamendo and JioSaavn
      const jamendoInstrumental = results[0]?.data?.data || [];
      const jiosaavnInstrumental = results[1]?.data?.data || [];
      const allInstrumental = [...jamendoInstrumental, ...jiosaavnInstrumental];
      
      // Get recommended/relaxing songs
      const jiosaavnRelaxing = results[2]?.data?.data || [];
      const allRecommended = [...jiosaavnRelaxing];
      
      // CRITICAL: Filter both sections to ensure ONLY instrumental songs
      const filteredInstrumental = filterInstrumentalSongs(allInstrumental);
      const filteredRecommended = filterInstrumentalSongs(allRecommended);
      
      console.log(`✅ Instrumental: ${jamendoInstrumental.length} Jamendo + ${jiosaavnInstrumental.length} JioSaavn = ${allInstrumental.length} total → ${filteredInstrumental.length} instrumental`);
      console.log(`✅ Recommended: ${jiosaavnRelaxing.length} JioSaavn → ${filteredRecommended.length} instrumental`);

      setInstrumentalSongs(filteredInstrumental);
      setRecommendedSongs(filteredRecommended);
      
      if (filteredInstrumental.length === 0 && filteredRecommended.length === 0) {
        setError('Unable to load instrumental songs. Please try refreshing.');
      }
    } catch (err) {
      setError(getErrorMessage(err));
      console.error('Error fetching songs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlaylist = (song) => {
    setSelectedSong(song);
    setShowAddToPlaylist(true);
  };

  const handleCloseModal = () => {
    setShowAddToPlaylist(false);
    setSelectedSong(null);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Dhunn
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-4">
          Your ultimate destination for instrumental music. We search across multiple platforms to find the best instrumental versions - no vocals, just pure melody! 🎹
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {/* Instrumental Tracks Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Highly Instrumental</h2>
          <button
            onClick={fetchSongs}
            className="text-primary-500 hover:text-primary-400 text-sm font-semibold"
          >
            Refresh
          </button>
        </div>
        
        {instrumentalSongs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {instrumentalSongs.map((song, index) => (
              <SongCard 
                key={song.spotifyId || song.youtubeId || song.id || `instrumental-${index}`} 
                song={song}
                showAddToPlaylist={true}
                onAddToPlaylist={handleAddToPlaylist}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No instrumental tracks found</p>
        )}
      </section>

      {/* Recommended Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Recommended for You</h2>
        </div>
        
        {recommendedSongs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recommendedSongs.map((song, index) => (
              <SongCard 
                key={song.spotifyId || song.youtubeId || song.id || `recommended-${index}`} 
                song={song}
                showAddToPlaylist={true}
                onAddToPlaylist={handleAddToPlaylist}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No recommendations available</p>
        )}
      </section>

      {/* Add to Playlist Modal */}
      {showAddToPlaylist && selectedSong && (
        <AddToPlaylistModal 
          song={selectedSong}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
