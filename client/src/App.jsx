import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <div className="min-h-screen bg-dark-950">
            <Routes>
              {/* Auth Routes (without layout) */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Main App Routes (with layout) */}
              <Route
                path="/*"
                element={
                  <div className="flex flex-col h-screen">
                    <Navbar />
                    <div className="flex flex-1 pt-16 overflow-hidden">
                      <Sidebar />
                      <main className="flex-1 ml-64 overflow-y-auto custom-scrollbar p-6 pb-32">
                        <Routes>
                          <Route
                            path="/"
                            element={
                                <Home />
                            }
                          />
                          <Route
                            path="/search"
                            element={
                                <Search />
                            }
                          />
                          <Route
                            path="/library"
                            element={
                                <Library />
                            }
                          />
                          <Route
                            path="/playlist/:id"
                            element={
                                <Playlist />
                            }
                          />
                        </Routes>
                      </main>
                    </div>
                    <MusicPlayer />
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;
