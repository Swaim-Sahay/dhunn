import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { jiosaavnAPI, jamendoAPI } from '../utils/api';
import { getErrorMessage, debounce } from '../utils/helpers';
import { filterInstrumentalSongs } from '../utils/instrumentalFilter';
import SongCard from '../components/SongCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AddToPlaylistModal from '../components/AddToPlaylistModal';
import { useAuth } from '../context/AuthContext';

const Search = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSongs([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      setHasSearched(true);

      const instrumentalQuery = searchQuery.toLowerCase().includes('instrumental') 
        ? searchQuery 
        : `${searchQuery} instrumental`;

      console.log('🎵 Searching across all platforms for:', instrumentalQuery);

      const searchPromises = [
        jiosaavnAPI.search(instrumentalQuery, 30).catch(err => {
          console.warn('JioSaavn search failed:', err.message);
          return { data: { data: [] } };
        }),
        jamendoAPI.search(instrumentalQuery, 30).catch(err => {
          console.warn('Jamendo search failed:', err.message);
          return { data: { data: [] } };
        })
      ];

      const results = await Promise.all(searchPromises);
      
      const jiosaavnSongs = results[0]?.data?.data || [];
      const jamendoSongs = results[1]?.data?.data || [];
      
      const allSongs = [...jiosaavnSongs, ...jamendoSongs];
      
      const instrumentalOnly = filterInstrumentalSongs(allSongs);
      
      console.log(`✅ Found ${jiosaavnSongs.length} JioSaavn + ${jamendoSongs.length} Jamendo = ${allSongs.length} total`);
      console.log(`🎵 After filtering: ${instrumentalOnly.length} instrumental songs`);
      
      if (instrumentalOnly.length === 0) {
        setError('No instrumental songs found. Try different keywords like: piano, guitar, classical, lofi');
      }
      
      setSongs(instrumentalOnly);
    } catch (err) {
      setError(getErrorMessage(err));
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleAddToPlaylist = (song) => {
    setSelectedSong(song);
    setShowAddToPlaylist(true);
  };

  const handleCloseModal = () => {
    setShowAddToPlaylist(false);
    setSelectedSong(null);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Search Music</h1>
        <p className="text-gray-400">
          Search any song - we'll find the instrumental version! 🎹
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search song by name or singer"
            className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-700 rounded-full text-lg focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {!loading && hasSearched && (
        <div className="mt-8">
          {songs.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Found {songs.length} result{songs.length !== 1 ? 's' : ''}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {songs.map((song) => (
                  <SongCard 
                    key={song.spotifyId || song.jiosaavnId || song.id} 
                    song={song}
                    showAddToPlaylist={true}
                    onAddToPlaylist={handleAddToPlaylist}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No results found for "{query}"
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try different keywords or check your spelling
              </p>
            </div>
          )}
        </div>
      )}

      {!loading && !hasSearched && (
        <div className="text-center py-12">
          <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            Start typing to search for music
          </p>
        </div>
      )}

      {showAddToPlaylist && selectedSong && (
        <AddToPlaylistModal 
          song={selectedSong}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Search;
