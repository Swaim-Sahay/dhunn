# 🎵 Dhunn - Instrumental Music Streaming Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) music streaming application that focuses on instrumental music without vocals. Built with modern web technologies and integrates with Spotify Web API for music discovery.

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Protected routes for authenticated users
- Persistent login sessions

### � Music Features
- Search songs by title, artist, or album using Spotify API
- Filter and discover highly instrumental tracks
- Play 30-second song previews
- Audio player with full controls (play, pause, next, previous)
- Volume control and seek functionality
- Queue management with shuffle and repeat modes

### 📚 Playlist Management
- Create custom playlists
- Add/remove songs from playlists
- Edit playlist details
- Public/private playlist settings
- View all user playlists in library

### 🎨 UI/UX
- Responsive design for mobile and desktop
- Modern dark theme with Tailwind CSS
- Smooth animations and transitions
- Real-time music player with album art

## 🛠️ Tech Stack

### Frontend
- React.js 18 + Vite
- React Router DOM
- Tailwind CSS
- Axios + Context API

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- CORS + dotenv

### External APIs
- Spotify Web API
- JioSaavn API
- Jamendo API

## 🚀 Quick Start

### Automated Setup (Recommended)

```bash
# Run the setup script
./setup.sh

# Update server/.env with your API credentials
# Then start both servers
npm run dev
```

### Manual Setup

#### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Spotify Developer account

#### 1. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or install individually
cd server && npm install
cd ../client && npm install
```

#### 2. Configure Environment Variables

**Backend (`server/.env`)**
```bash
cp server/.env.example server/.env
```

Update `server/.env` with:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=generate_with_crypto_random_bytes
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
CLIENT_URL=http://localhost:5173
```

**Frontend (`client/.env`)**
```bash
cp client/.env.example client/.env
```

For development, the default values work fine (uses Vite proxy).

#### 3. Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 4. Run the Application

**Development Mode:**
```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 5173).

**Or run separately:**
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
cd client && npm run dev
```

#### 5. Access the App

Open your browser to: **http://localhost:5173**

## 📖 API Documentation

### Base URLs
- Development: `http://localhost:5000/api`
- Production: Set via `VITE_API_URL` environment variable

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| GET | `/auth/me` | Get current user | ✅ |

### Music Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/songs/search?query=...&limit=20` | Search songs | ✅ |
| GET | `/songs/instrumental?limit=50` | Get instrumental tracks | ✅ |
| GET | `/jiosaavn/search?query=...` | Search JioSaavn | ✅ |
| GET | `/jamendo/instrumental` | Get Jamendo instrumentals | ✅ |
| GET | `/music/search?query=...` | Search all sources | ✅ |

### Playlist Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/playlists` | Create playlist | ✅ |
| GET | `/playlists/user/:userId` | Get user playlists | ✅ |
| GET | `/playlists/:id` | Get playlist | ✅ |
| PUT | `/playlists/:id` | Update playlist | ✅ |
| DELETE | `/playlists/:id` | Delete playlist | ✅ |
| POST | `/playlists/:id/songs` | Add song to playlist | ✅ |
| DELETE | `/playlists/:id/songs/:songId` | Remove song | ✅ |

## 🚢 Production Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for comprehensive deployment instructions.

### Quick Deployment Checklist

#### Backend (Railway/Render/Heroku)
1. Set environment variables from `server/.env.example`
2. Build command: `cd server && npm install`
3. Start command: `cd server && npm start`

#### Frontend (Vercel/Netlify)
1. Build command: `cd client && npm run build:prod`
2. Output directory: `client/dist`
3. Set environment variable:
   - `VITE_API_URL=https://your-backend-url.com/api`

#### Database (MongoDB Atlas)
1. Create cluster and database user
2. Whitelist IP addresses
3. Copy connection string to `MONGODB_URI`

## 🔒 Environment Variables

### Required Backend Variables
```env
MONGODB_URI          # MongoDB connection string (required)
JWT_SECRET           # 32+ character random string (required)
SPOTIFY_CLIENT_ID    # From Spotify Developer Dashboard (required)
SPOTIFY_CLIENT_SECRET # From Spotify Developer Dashboard (required)
YOUTUBE_API_KEY      # From Google Cloud Console (required)
CLIENT_URL           # Frontend URL for CORS (required in production)
```

### Optional Backend Variables
```env
PORT                 # Server port (default: 5000)
NODE_ENV             # development | production
ALLOWED_ORIGINS      # Comma-separated additional CORS origins
```

### Frontend Variables
```env
VITE_API_URL         # Backend API URL (leave empty for dev proxy)
VITE_APP_NAME        # App name (default: Dhunn)
VITE_NODE_ENV        # development | production
```

## 🗂️ Project Structure

```
dhunn/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── utils/         # API calls and helpers
│   │   └── App.jsx        # Main app component
│   ├── .env               # Frontend environment variables
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend Express application
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utilities and configs
│   ├── .env              # Backend environment variables
│   └── server.js         # Express server entry point
│
├── setup.sh              # Automated setup script
├── DEPLOYMENT.md         # Deployment guide
├── package.json          # Root package.json for scripts
└── README.md             # This file
```

## 🧪 Testing

```bash
# Run linter (client)
cd client && npm run lint

# Test production build locally
cd client && npm run build && npm run serve
```

## 📝 Scripts Reference

### Root Directory
```bash
npm run dev          # Start both backend and frontend
npm run install:all  # Install all dependencies
npm run build        # Build frontend for production
npm run clean        # Remove all node_modules
```

### Backend (server/)
```bash
npm run dev          # Start with nodemon (development)
npm start            # Start production server
```

### Frontend (client/)
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run build:prod   # Build with production env
npm run preview      # Preview production build
```

## 🐛 Troubleshooting

### CORS Errors
- Verify `CLIENT_URL` in backend `.env` matches frontend URL
- Check `ALLOWED_ORIGINS` for production deployments
- Ensure credentials: true in axios config

### Database Connection Failed
- Verify MongoDB Atlas IP whitelist includes your IP
- Check connection string format
- Ensure database user has proper permissions

### API Not Working
- Check backend is running on port 5000
- Verify `VITE_API_URL` in frontend (production)
- Check browser console and network tab for errors

### Build Failures
- Clear `node_modules` and reinstall
- Check Node.js version (18+ required)
- Verify all environment variables are set

## 👤 Author

Built by **Swaim Sahay**

## 📄 License

MIT License - feel free to use this project for learning and development

## 🙏 Acknowledgments

- Spotify Web API for music data
- JioSaavn and Jamendo for additional music sources
- React and Vite communities
- Tailwind CSS

---

**Happy Listening! 🎵**

Use this checklist to ensure everything is configured correctly.

## ☐ Prerequisites

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] MongoDB installed OR MongoDB Atlas account created
- [ ] Git installed (optional, for version control)

## ☐ Spotify API Setup

- [ ] Spotify account created
- [ ] Logged into https://developer.spotify.com/dashboard
- [ ] New app created with name "Dhunn"
- [ ] Client ID copied
- [ ] Client Secret copied

## ☐ Backend Configuration

- [ ] Navigated to `/server` directory
- [ ] Ran `npm install` successfully
- [ ] Created `.env` file (copied from `.env.example`)
- [ ] Added `SPOTIFY_CLIENT_ID` to `.env`
- [ ] Added `SPOTIFY_CLIENT_SECRET` to `.env`
- [ ] Set `MONGODB_URI` (local: `mongodb://localhost:27017/dhunn`)
- [ ] Set `JWT_SECRET` (random string, at least 32 characters)
- [ ] Verified all dependencies installed without errors

## ☐ Frontend Configuration

- [ ] Navigated to `/client` directory
- [ ] Ran `npm install` successfully
- [ ] Verified all dependencies installed without errors
- [ ] No build errors in terminal

## ☐ Database Setup

### MongoDB Atlas (Cloud)
- [ ] MongoDB Atlas account created
- [ ] Cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0 for development)
- [ ] Connection string copied
- [ ] Connection string added to `.env` as `MONGODB_URI`

## ☐ Running the Application

### Backend
- [ ] Opened terminal in `/server` directory
- [ ] Ran `npm run dev`
- [ ] Server started on port 5000
- [ ] Saw "✅ MongoDB Connected" message
- [ ] Saw "🎵 Dhunn Server Running" message
- [ ] No error messages in console

### Frontend
- [ ] Opened NEW terminal in `/client` directory
- [ ] Ran `npm run dev`
- [ ] Dev server started on port 5173
- [ ] Saw Vite dev server URL
- [ ] No error messages in console

## ☐ Testing the Application

### Browser Access
- [ ] Opened http://localhost:5173 in browser
- [ ] Homepage loads without errors
- [ ] No console errors in browser developer tools
- [ ] Dhunn logo and navigation visible

### Authentication
- [ ] Clicked "Sign Up"
- [ ] Filled registration form
- [ ] Successfully created account
- [ ] Redirected to homepage
- [ ] User menu shows username
- [ ] Can logout successfully
- [ ] Can login again with same credentials

### Music Features
- [ ] Search bar works
- [ ] Typing in search shows results
- [ ] Song cards display with images
- [ ] Can click play on a song
- [ ] Music player appears at bottom
- [ ] Audio preview plays (if available)
- [ ] Player controls work (play/pause/next/previous)
- [ ] Volume slider works
- [ ] Progress bar shows current time

### Playlist Features
- [ ] Can navigate to Library page
- [ ] "Create Playlist" button works
- [ ] Modal opens for playlist creation
- [ ] Can create playlist with name and description
- [ ] Playlist appears in library
- [ ] Can click on playlist to view it
- [ ] Can add songs to playlist (from search)
- [ ] Songs appear in playlist
- [ ] Can remove songs from playlist
- [ ] Can delete playlist

## ☐ Troubleshooting (If Needed)

### Backend Issues
- [ ] Checked `.env` file has all required variables
- [ ] Verified MongoDB is running
- [ ] Checked port 5000 is not in use
- [ ] Reviewed server console for error messages
- [ ] Spotify credentials are correct

### Frontend Issues
- [ ] Cleared browser cache
- [ ] Checked browser console for errors
- [ ] Verified port 5173 is not in use
- [ ] Tried different browser
- [ ] Checked network tab for failed requests

### Database Issues
- [ ] MongoDB service is running
- [ ] Connection string is correct
- [ ] Network allows MongoDB connection
- [ ] Database user has proper permissions (Atlas)

### API Issues
- [ ] Spotify Client ID is correct
- [ ] Spotify Client Secret is correct
- [ ] No rate limiting from Spotify
- [ ] Backend can reach Spotify API

## ☐ Production Readiness (Optional)

- [ ] Changed `JWT_SECRET` to strong random value
- [ ] Set `NODE_ENV=production` for backend
- [ ] Built frontend (`npm run build`)
- [ ] Configured production MongoDB database
- [ ] Set up environment variables on hosting platform
- [ ] Tested production build locally
- [ ] Configured CORS for production domain

## ☐ Additional Setup (Optional)

- [ ] Initialized Git repository (`git init`)
- [ ] Created `.gitignore` (already provided)
- [ ] Made initial commit
- [ ] Set up GitHub/GitLab repository
- [ ] Pushed code to remote repository
- [ ] Set up CI/CD pipeline (optional)
- [ ] Configured hosting (Vercel, Netlify, Render, etc.)

## ✅ Success Criteria

You're successfully set up when:

1. ✅ Both frontend and backend running without errors
2. ✅ Can create account and login
3. ✅ Can search for songs and see results
4. ✅ Can play music previews
5. ✅ Can create and manage playlists
6. ✅ All player controls work
7. ✅ No error messages in any console

## 📞 Need Help?

If you're stuck on any step:

1. Check the error message carefully
2. Review the README.md troubleshooting section
3. Verify environment variables are set correctly
4. Check that all services are running
5. Look at browser and server console logs
6. Ensure ports are not blocked by firewall

## 🎉 Ready to Launch!

Once all checkboxes are ✅, you're ready to:
- Start building additional features
- Customize the design
- Add more functionality
- Deploy to production

---

**Status:** Ready for Development


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

## 👤 Author

Built by Swaim Sahay

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [React Icons](https://react-icons.github.io/react-icons/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities


**Happy Listening! 🎵**
