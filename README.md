# 🎵 Dhunn - Instrumental Music Streaming Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) music streaming application that focuses on instrumental music without vocals. Built with modern web technologies and integrates with Spotify Web API for music discovery.

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Protected routes for authenticated users
- Persistent login sessions

### 🎶 Music Features
- Search songs by title, artist, or album using Spotify API
- Filter and discover highly instrumental tracks (instrumentalness > 0.5)
- Play 30-second song previews
- Audio player with play, pause, next, previous controls
- Volume control and mute/unmute functionality
- Seek/scrub through songs with progress bar
- Shuffle and repeat modes
- Queue management

### 📚 Playlist Management
- Create custom playlists
- Add/remove songs from playlists
- Edit playlist details (name, description)
- Delete playlists
- Public/private playlist settings
- View all user playlists in library

### ❤️ Additional Features
- Favorite songs functionality
- Recommended instrumental tracks
- Responsive design for mobile and desktop
- Modern dark theme UI with Tailwind CSS
- Smooth animations and transitions
- Real-time music player with album art display

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### External APIs
- **Spotify Web API** - Music data and previews

## 📁 Project Structure

```
dhunn/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SongCard.jsx
│   │   │   ├── PlaylistCard.jsx
│   │   │   ├── MusicPlayer.jsx
│   │   │   ├── CreatePlaylistModal.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Library.jsx
│   │   │   ├── Playlist.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── context/        # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── MusicContext.jsx
│   │   ├── utils/          # Helper functions
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                 # Backend Node.js application
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Song.js
│   │   └── Playlist.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── songRoutes.js
│   │   └── playlistRoutes.js
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── songController.js
│   │   └── playlistController.js
│   ├── middleware/         # Custom middleware
│   │   └── auth.js
│   ├── utils/              # Utility functions
│   │   ├── db.js
│   │   └── spotify.js
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Spotify Developer Account** - [Sign up](https://developer.spotify.com/dashboard)

### Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app details:
   - App Name: "Dhunn"
   - App Description: "Instrumental music streaming app"
   - Redirect URI: `http://localhost:5173` (for development)
5. After creation, note down:
   - **Client ID**
   - **Client Secret**

### Installation

#### 1. Clone the Repository

```bash
cd /Users/swaimsahay/Documents/dhunn
```

#### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
MONGODB_URI=mongodb://localhost:27017/dhunn
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
CLIENT_URL=http://localhost:5173
```

#### 3. Frontend Setup

```bash
# Navigate to client directory (from root)
cd ../client

# Install dependencies
npm install
```

#### 4. Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**
- Use the connection string from MongoDB Atlas in your `.env` file
- Format: `mongodb+srv://username:password@cluster.mongodb.net/dhunn`

#### 5. Run the Application

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```

Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd client
npm run dev
```

Frontend will run on `http://localhost:5173`

#### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📖 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "token": "jwt_token"
  }
}
```

#### POST `/api/auth/login`
Login existing user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Get current user profile (Protected)

**Headers:** `Authorization: Bearer <token>`

### Song Endpoints

#### GET `/api/songs/search?query=<searchTerm>&limit=20`
Search for songs

#### GET `/api/songs/instrumental?limit=50`
Get highly instrumental tracks

#### GET `/api/songs/recommended?limit=20`
Get recommended instrumental tracks

### Playlist Endpoints (All Protected)

#### POST `/api/playlists`
Create a new playlist

**Request Body:**
```json
{
  "name": "My Playlist",
  "description": "Description here",
  "isPublic": false
}
```

#### GET `/api/playlists/user/:userId`
Get all playlists for a user

#### GET `/api/playlists/:id`
Get playlist by ID

#### POST `/api/playlists/:id/songs`
Add song to playlist

#### DELETE `/api/playlists/:id/songs/:songId`
Remove song from playlist

#### DELETE `/api/playlists/:id`
Delete playlist

## 🎨 UI Components

### Main Components

- **Navbar** - Top navigation with logo and user menu
- **Sidebar** - Left sidebar with main navigation and playlists
- **MusicPlayer** - Bottom fixed music player with controls
- **SongCard** - Display song with album art and controls
- **PlaylistCard** - Display playlist information
- **CreatePlaylistModal** - Modal for creating new playlists

### Pages

- **Home** - Featured instrumental and recommended tracks
- **Search** - Search functionality with real-time results
- **Library** - User's playlists and favorites
- **Playlist** - Individual playlist view with songs table
- **Login/Signup** - Authentication forms

## 🔒 Environment Variables

### Server (.env)

```env
MONGODB_URI=           # MongoDB connection string
JWT_SECRET=            # Secret for JWT token generation
PORT=5000              # Server port
NODE_ENV=development   # Environment (development/production)
SPOTIFY_CLIENT_ID=     # Spotify API Client ID
SPOTIFY_CLIENT_SECRET= # Spotify API Client Secret
CLIENT_URL=            # Frontend URL for CORS
```

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Create a new web service
2. Connect your repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables from `.env`

### Frontend Deployment (Vercel/Netlify)

1. Create new project from repository
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL=<your_backend_url>`

### Database (MongoDB Atlas)

1. Create cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGODB_URI` in production environment

## 📝 Usage Guide

### For Users

1. **Sign Up/Login**
   - Create an account or login
   - Your session persists across page refreshes

2. **Discover Music**
   - Browse instrumental tracks on home page
   - Use search to find specific songs

3. **Create Playlists**
   - Click "Create Playlist" in library
   - Add songs from search results
   - Manage your playlists in library

4. **Play Music**
   - Click play on any song card
   - Use bottom player for controls
   - Shuffle, repeat, and adjust volume

### For Developers

1. **Adding New Features**
   - Frontend: Create components in `client/src/components`
   - Backend: Add routes/controllers in respective folders
   - Update API calls in `client/src/utils/api.js`

2. **Styling**
   - Use Tailwind CSS utility classes
   - Custom styles in `client/src/index.css`
   - Color scheme in `tailwind.config.js`

3. **State Management**
   - Use AuthContext for user state
   - Use MusicContext for player state
   - Create new contexts as needed

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access in MongoDB Atlas

**Spotify API Errors:**
- Verify Client ID and Secret
- Check API rate limits
- Ensure proper authentication flow

**CORS Errors:**
- Update `CLIENT_URL` in backend `.env`
- Check CORS configuration in `server.js`

**Build Errors:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Built with ❤️ by [Your Name]

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [React Icons](https://react-icons.github.io/react-icons/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

## 📧 Contact

For questions or support, please contact [your-email@example.com]

---

**Happy Listening! 🎵**
