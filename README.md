# 🎵 Dhunn - Instrumental Music Streaming Platform

> **A modern full-stack music streaming application focusing on instrumental tracks from multiple sources**

Dhunn is a comprehensive MERN stack (MongoDB, Express.js, React.js, Node.js) music streaming platform that curates and delivers high-quality instrumental music. With integrations to Spotify, YouTube, Jamendo, and JioSaavn APIs, Dhunn provides a vast library of instrumental tracks for focus, relaxation, and creativity.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Usage Guide](#-usage-guide)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Contact](#-contact)
---

## � Live Demo

### Deployment Links

🚀 **Frontend (Client)**: [Coming Soon - Deploy to Vercel/Netlify]  
🔧 **Backend (API)**: [Coming Soon - Deploy to Render/Railway]  
📊 **Database**: MongoDB Atlas (Cloud)

### Demo Credentials (When Deployed)
```
Email: demo@dhunn.com
Password: demo123
```

> **Note**: The application is currently in development. Deployment links will be added once the project is hosted on production servers.

---

## ▶️ Running the Application

### Development Mode

#### Start Backend Server

Open a terminal and run:

```bash
# Navigate to server directory
cd server

# Start development server with hot-reload
npm run dev

# Expected output:
# 🔄 Connecting to MongoDB...
# ✅ MongoDB Connected Successfully
# 🎵 Dhunn Backend Server Running on http://localhost:5000
# ✨ Environment: development
```

**Available Scripts:**
- `npm run dev` - Start with nodemon (auto-restart on file changes)
- `npm start` - Start without nodemon (production mode)
- `npm test` - Run tests (if configured)

#### Start Frontend Server

Open a **new terminal** and run:

```bash
# Navigate to client directory
cd client

# Start Vite development server
npm run dev

# Expected output:
#   VITE v4.4.5  ready in 500 ms
#
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
#   ➜  press h to show help
```

**Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Access the Application

1. **Frontend**: Open browser to [http://localhost:5173](http://localhost:5173)
2. **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
3. **API Documentation**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs) (if Swagger is configured)

### Development Workflow

```bash
# Recommended: Use two terminal windows/tabs

# Terminal 1 (Backend)
cd server && npm run dev

# Terminal 2 (Frontend)
cd client && npm run dev
```

### Stopping the Servers

- Press `Ctrl + C` in each terminal to stop the servers
- Or close the terminal windows

### Production Build

```bash
# Build frontend for production
cd client
npm run build

# Output will be in client/dist directory
```

---

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
- [ ] Redirect URI added (optional for development)

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


---

## ✨ Features

### 🎧 Multi-Source Music Integration
- **Spotify Integration** - Access to millions of tracks with 30-second previews
- **YouTube Integration** - Stream full-length instrumental tracks via YouTube API
- **Jamendo** - Discover free, legal music from independent artists
- **JioSaavn** - Popular Indian music streaming service integration
- Advanced instrumental filtering (instrumentalness > 0.5)
- Smart vocal detection to ensure instrumental-only content

### 🔐 User Authentication & Security
- JWT-based authentication with secure token management
- Password encryption using bcrypt (10 rounds)
- Protected routes for authenticated users
- Persistent login sessions with localStorage
- Secure HTTP-only cookie support
- Session management and auto-logout on token expiration

### 🎶 Advanced Music Player
- **Playback Controls**: Play, pause, skip, previous, shuffle, repeat
- **YouTube Player**: Full-length playback with react-player integration
- **Spotify Previews**: 30-second high-quality audio previews
- **Progress Bar**: Real-time seek and scrub functionality
- **Volume Control**: Fine-grained volume adjustment with mute toggle
- **Queue Management**: Dynamic playlist queue with reordering
- **Album Artwork**: High-resolution cover art display
- **Now Playing**: Real-time track information display

### 📚 Playlist Management
- Create unlimited custom playlists
- Add/remove songs with drag-and-drop support
- Edit playlist metadata (name, description, cover art)
- Delete playlists with confirmation
- Public/private playlist visibility settings
- Share playlists with unique URLs
- Collaborative playlist support
- Playlist analytics (total duration, track count)

### 🔍 Smart Search & Discovery
- Real-time search across all integrated platforms
- Search by song title, artist, album, or genre
- Autocomplete suggestions
- Search history tracking
- Filter by source (Spotify, YouTube, Jamendo, JioSaavn)
- Advanced filters (duration, release year, popularity)

### ❤️ Personalization Features
- Favorite/Like songs across all sources
- Recently played history
- Personalized recommendations based on listening habits
- Custom radio stations
- Daily mix playlists
- Mood-based playlists (Focus, Relax, Energize)

### 🎨 Modern UI/UX
- Responsive design for mobile, tablet, and desktop
- Dark mode theme with eye-friendly colors
- Smooth animations and transitions
- Loading states and skeleton screens
- Toast notifications for user feedback
- Accessibility features (ARIA labels, keyboard navigation)
- Progressive Web App (PWA) support

---

## 🛠️ Tech Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.2.0 | UI Library & Component Framework |
| Vite | 4.4.5 | Build Tool & Dev Server |
| React Router DOM | 6.15.0 | Client-Side Routing |
| Tailwind CSS | 3.3.3 | Utility-First CSS Framework |
| Axios | 1.5.0 | HTTP Client for API Requests |
| React Icons | 4.11.0 | Icon Library |
| React Player | 2.13.0 | YouTube Video/Audio Player |
| Context API | Built-in | Global State Management |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 16+ | JavaScript Runtime |
| Express.js | 4.18.2 | Web Application Framework |
| MongoDB | 5+ | NoSQL Database |
| Mongoose | 7.5.0 | MongoDB ODM |
| JWT | 9.0.2 | Authentication Tokens |
| bcryptjs | 2.4.3 | Password Hashing |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| dotenv | 16.3.1 | Environment Variables |

### External APIs & Services
| Service | Purpose | Documentation |
|---------|---------|---------------|
| Spotify Web API | Music metadata & 30s previews | [Docs](https://developer.spotify.com/documentation/web-api/) |
| YouTube Data API v3 | Video search & playback | [Docs](https://developers.google.com/youtube/v3) |
| Jamendo API | Free instrumental music | [Docs](https://developer.jamendo.com/v3.0) |
| JioSaavn API | Indian music streaming | Unofficial API |
| MongoDB Atlas | Cloud Database Hosting | [Docs](https://www.mongodb.com/docs/atlas/) |

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Postman** - API testing
- **Git** - Version control
- **VS Code** - Code editor

---

## 📁 Project Structure

```
dhunn/
├── 📂 client/                      # React Frontend Application
│   ├── 📂 public/                 # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/         # Reusable UI Components
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── Sidebar.jsx        # Left sidebar navigation
│   │   │   ├── SongCard.jsx       # Individual song display
│   │   │   ├── PlaylistCard.jsx   # Playlist preview card
│   │   │   ├── MusicPlayer.jsx    # Bottom music player
│   │   │   ├── YouTubePlayer.jsx  # YouTube playback component
│   │   │   ├── CreatePlaylistModal.jsx  # Playlist creation modal
│   │   │   ├── AddToPlaylistModal.jsx   # Add song to playlist
│   │   │   ├── ProtectedRoute.jsx # Auth route wrapper
│   │   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   │   └── PlayerDebug.jsx    # Debug player component
│   │   ├── 📂 pages/              # Page Components
│   │   │   ├── Home.jsx           # Landing/Home page
│   │   │   ├── Search.jsx         # Search interface
│   │   │   ├── Library.jsx        # User library
│   │   │   ├── Playlist.jsx       # Playlist detail view
│   │   │   ├── Login.jsx          # Login form
│   │   │   └── Signup.jsx         # Registration form
│   │   ├── 📂 context/            # React Context Providers
│   │   │   ├── AuthContext.jsx    # Authentication state
│   │   │   └── MusicContext.jsx   # Music player state
│   │   ├── 📂 utils/              # Helper Functions
│   │   │   ├── api.js             # API client configuration
│   │   │   ├── helpers.js         # Utility functions
│   │   │   └── instrumentalFilter.js  # Vocal detection
│   │   ├── App.jsx                # Main application component
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── postcss.config.js          # PostCSS configuration
│   └── index.html                 # HTML template
│
├── 📂 server/                      # Node.js Backend Application
│   ├── 📂 models/                 # Mongoose Data Models
│   │   ├── User.js                # User schema
│   │   ├── Song.js                # Song schema
│   │   └── Playlist.js            # Playlist schema
│   ├── 📂 routes/                 # Express Route Definitions
│   │   ├── authRoutes.js          # Authentication routes
│   │   ├── songRoutes.js          # Song routes
│   │   ├── musicRoutes.js         # Music search routes
│   │   ├── playlistRoutes.js      # Playlist CRUD routes
│   │   ├── jamendoRoutes.js       # Jamendo API routes
│   │   ├── jiosaavnRoutes.js      # JioSaavn routes
│   │   ├── soundcloudRoutes.js    # SoundCloud routes
│   │   ├── proxyRoutes.js         # Proxy routes
│   │   └── spotifyRoutes.js       # Spotify integration (TBD)
│   ├── 📂 controllers/            # Route Controller Logic
│   │   ├── authController.js      # Auth logic
│   │   ├── songController.js      # Song operations
│   │   ├── musicController.js     # Music search logic
│   │   ├── playlistController.js  # Playlist operations
│   │   ├── jamendoController.js   # Jamendo API logic
│   │   ├── jiosaavnController.js  # JioSaavn logic
│   │   ├── soundcloudController.js # SoundCloud logic
│   │   └── proxyController.js     # Proxy logic
│   ├── 📂 middleware/             # Express Middleware
│   │   └── auth.js                # JWT verification
│   ├── 📂 utils/                  # Utility Functions
│   │   ├── db.js                  # Database connection
│   │   ├── spotify.js             # Spotify API client
│   │   ├── jamendo.js             # Jamendo API client
│   │   ├── jiosaavn.js            # JioSaavn API client
│   │   └── soundcloud.js          # SoundCloud API client
│   ├── server.js                  # Express server entry point
│   ├── package.json               # Backend dependencies
│   └── .env.example               # Environment template
│
├── 📂 documentation/               # Project Documentation
│   ├── README.md                  # Main documentation (this file)
│   ├── SETUP_CHECKLIST.md         # Step-by-step setup guide
│   ├── QUICKSTART.md              # Quick start guide
│   ├── PROJECT_SUMMARY.md         # Project overview
│   ├── MULTI_API_INTEGRATION.md   # API integration docs
│   ├── JAMENDO_INTEGRATION.md     # Jamendo setup
│   ├── JAMENDO_QUICKSTART.md      # Jamendo quick guide
│   ├── YOUTUBE_API_SETUP.md       # YouTube API guide
│   ├── YOUTUBE_INTEGRATION_COMPLETE.md  # YouTube docs
│   ├── SPOTIFY_PREVIEW_LIMITATIONS.md   # Spotify limitations
│   ├── TESTING_MUSIC_PLAYBACK.md  # Testing guide
│   └── FIXES_APPLIED.md           # Bug fixes log
│
├── .gitignore                     # Git ignore rules
├── LICENSE                        # MIT License
└── README.md                      # This file
```

### Key Directories Explained

- **`/client`**: Contains the entire React frontend application with components, pages, and styling
- **`/server`**: Houses the Express.js backend with API routes, database models, and business logic
- **`/models`**: Mongoose schemas defining the structure of MongoDB documents
- **`/routes`**: API endpoint definitions and HTTP method handlers
- **`/controllers`**: Business logic separated from routes for better organization
- **`/utils`**: Reusable helper functions and API client configurations
- **`/context`**: React Context API for global state management (auth, music player)

---

## � Prerequisites

Before you begin, ensure your development environment meets these requirements:

### Required Software

| Software | Minimum Version | Download Link | Purpose |
|----------|----------------|---------------|---------|
| **Node.js** | v16.0.0 or higher | [Download](https://nodejs.org/) | JavaScript runtime |
| **npm** | v8.0.0 or higher | Included with Node.js | Package manager |
| **MongoDB** | v5.0 or higher | [Download](https://www.mongodb.com/try/download/community) | Database |
| **Git** | v2.30 or higher | [Download](https://git-scm.com/) | Version control |

### API Accounts Required

1. **Spotify Developer Account** (Required)
   - Sign up at [Spotify for Developers](https://developer.spotify.com/dashboard)
   - Free tier provides adequate API access
   - Used for music metadata and 30-second previews

2. **YouTube Data API** (Required)
   - Create project at [Google Cloud Console](https://console.cloud.google.com/)
   - Enable YouTube Data API v3
   - Used for full-length instrumental playback

3. **Jamendo Developer Account** (Optional but Recommended)
   - Sign up at [Jamendo Developer](https://developer.jamendo.com/)
   - Free music API access
   - Used for additional instrumental tracks

4. **MongoDB Atlas** (Optional - Alternative to Local MongoDB)
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Free tier (M0) provides 512MB storage
   - Cloud database hosting

### System Requirements

- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 500MB free space
- **Internet**: Stable connection required for API calls

### Verify Installation

Check if prerequisites are installed:

```bash
# Check Node.js version
node --version  # Should be v16.0.0 or higher

# Check npm version
npm --version   # Should be v8.0.0 or higher

# Check MongoDB (if using local)
mongod --version  # Should be v5.0 or higher

# Check Git
git --version   # Should be v2.30 or higher
```

---

## ⚙️ Configuration

### API Setup Guide

#### 1. Spotify API Configuration

**Step 1: Create Spotify App**
1. Navigate to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account (create one if needed)
3. Click **"Create an App"**
4. Fill in the application details:
   - **App Name**: `Dhunn Music Streaming`
   - **App Description**: `Instrumental music streaming platform`
   - **Redirect URIs**: `http://localhost:5173` (for development)
5. Accept the Terms of Service and click **"Create"**

**Step 2: Get API Credentials**
1. Once created, click on your app to open the dashboard
2. Click **"Settings"** in the top right
3. Copy the **Client ID**
4. Click **"View client secret"** and copy the **Client Secret**
5. Save both credentials securely - you'll need them for `.env` configuration

**Rate Limits:**
- Spotify allows approximately 100 requests per minute
- Preview URLs are valid for a limited time

#### 2. YouTube Data API Configuration

**Step 1: Create Google Cloud Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter project name: `Dhunn-Music-App`
4. Click **"Create"**

**Step 2: Enable YouTube Data API**
1. In the left sidebar, navigate to **"APIs & Services"** → **"Library"**
2. Search for **"YouTube Data API v3"**
3. Click on it and press **"Enable"**

**Step 3: Create API Key**
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"API Key"**
3. Copy the generated API key
4. (Optional) Click **"Restrict Key"** to add security restrictions:
   - API restrictions: Select "YouTube Data API v3"
   - Website restrictions: Add your domain

**Quota Limits:**
- YouTube provides 10,000 quota units/day (free tier)
- Each search request costs approximately 100 units

#### 3. Jamendo API Configuration (Optional)

**Step 1: Register for API Access**
1. Visit [Jamendo Developer Portal](https://developer.jamendo.com/)
2. Sign up for a developer account
3. Navigate to **"My Applications"**
4. Click **"Create Application"**

**Step 2: Get Client ID**
1. Fill in application details
2. Copy the generated **Client ID**
3. No client secret required for Jamendo

**Rate Limits:**
- 10,000 requests/month (free tier)
- No authentication required for basic endpoints

#### 4. MongoDB Atlas Setup (Cloud Database)

**Step 1: Create Atlas Account**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Choose **"Free"** tier (M0 Sandbox)

**Step 2: Create Cluster**
1. Select cloud provider (AWS recommended)
2. Choose region closest to your location
3. Click **"Create Cluster"** (takes 3-5 minutes)

**Step 3: Configure Database Access**
1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Create username and strong password (save these!)
4. Set privileges to **"Read and write to any database"**

**Step 4: Configure Network Access**
1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. For production: Add specific IP addresses

**Step 5: Get Connection String**
1. Go to **"Clusters"** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Select **"Node.js"** as driver and version **"4.1 or later"**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `dhunn` (or your preferred database name)

Example connection string:
```
mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/dhunn?retryWrites=true&w=majority
```

---

## 🚀 Installation & Setup

### Quick Start Guide

Follow these steps to get Dhunn running on your local machine:

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/dhunn.git

# OR using SSH
git clone git@github.com:yourusername/dhunn.git

# Navigate to project directory
cd dhunn
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install all backend dependencies
npm install

# Create environment file from template
cp .env.example .env
```

**Edit the `.env` file** with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/dhunn
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dhunn?retryWrites=true&w=majority

# Security
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long_change_in_production

# Spotify API Credentials
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

# YouTube API (Optional)
YOUTUBE_API_KEY=your_youtube_api_key_here

# Jamendo API (Optional)
JAMENDO_CLIENT_ID=your_jamendo_client_id_here
```

**Generate a secure JWT_SECRET:**

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OR using OpenSSL
openssl rand -hex 32
```

### Step 3: Frontend Setup

```bash
# Navigate to client directory (from project root)
cd ../client

# Install all frontend dependencies
npm install
```

**Configure API endpoint** (if different from default):

Edit `client/src/utils/api.js` if your backend runs on a different port:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Step 4: Database Setup

#### Option A: Local MongoDB

**Start MongoDB Service:**

```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Windows (Command Prompt as Administrator)
net start MongoDB
```

**Verify MongoDB is running:**

```bash
mongosh  # or mongo for older versions
# Should connect to MongoDB shell
```

#### Option B: MongoDB Atlas (Cloud)

- Use the connection string from Atlas in your `.env` file
- No local MongoDB installation required
- See [Configuration Section](#️-configuration) for Atlas setup

### Step 5: Verify Installation

**Check backend dependencies:**

```bash
cd server
npm list --depth=0
# Should show all installed packages without errors
```

**Check frontend dependencies:**

```bash
cd client
npm list --depth=0
# Should show all installed packages without errors
```

---

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

## � Deployment

### Deployment Options Overview

| Platform | Best For | Free Tier | Build Time |
|----------|----------|-----------|------------|
| **Vercel** | Frontend | ✅ Yes | ~2 min |
| **Netlify** | Frontend | ✅ Yes | ~2 min |
| **Render** | Backend | ✅ Yes (limited) | ~5 min |
| **Railway** | Backend | ✅ Yes (trial) | ~3 min |
| **Heroku** | Full-stack | ❌ No (paid only) | ~5 min |
| **MongoDB Atlas** | Database | ✅ Yes (512MB) | ~5 min |

---

### 🎨 Frontend Deployment

#### Option 1: Vercel (Recommended)

**Prerequisites:**
- GitHub/GitLab/Bitbucket account
- Push your code to a repository

**Step-by-Step:**

1. **Sign up at [Vercel](https://vercel.com)**
   - Use GitHub/GitLab sign-in

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your repository
   - Vercel auto-detects Vite configuration

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   - Add `VITE_API_URL` = `https://your-backend-url.com/api`
   - Click "Deploy"

5. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS as instructed

**Deployment Command (Vercel CLI):**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to client directory
cd client

# Deploy
vercel --prod
```

#### Option 2: Netlify

**Step-by-Step:**

1. **Sign up at [Netlify](https://www.netlify.com)**

2. **Deploy via Git**
   - Click "Add new site" → "Import an existing project"
   - Connect to Git provider
   - Select repository

3. **Build Settings**
   ```
   Base directory: client
   Build command: npm run build
   Publish directory: client/dist
   ```

4. **Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add: `VITE_API_URL=https://your-backend-url.com/api`

5. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes

**Deployment Command (Netlify CLI):**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to client
cd client

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

---

### 🔧 Backend Deployment

#### Option 1: Render (Recommended for Free Tier)

**Step-by-Step:**

1. **Sign up at [Render](https://render.com)**

2. **Create New Web Service**
   - Dashboard → "New +" → "Web Service"
   - Connect GitHub repository

3. **Configure Service**
   ```
   Name: dhunn-backend
   Environment: Node
   Region: Choose closest to you
   Branch: main
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables**
   - Click "Advanced" → "Add Environment Variable"
   - Add all variables from `.env`:
     ```
     NODE_ENV=production
     PORT=5000
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_production_jwt_secret
     SPOTIFY_CLIENT_ID=your_spotify_client_id
     SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
     YOUTUBE_API_KEY=your_youtube_api_key
     CLIENT_URL=https://your-frontend-url.vercel.app
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-7 minutes for first deploy
   - Note the URL: `https://dhunn-backend.onrender.com`

**Important Notes:**
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds (cold start)
- For 24/7 uptime, upgrade to paid plan

#### Option 2: Railway

**Step-by-Step:**

1. **Sign up at [Railway](https://railway.app)**

2. **New Project**
   - Dashboard → "New Project"
   - "Deploy from GitHub repo"
   - Select repository

3. **Configure**
   - Railway auto-detects Node.js
   - Set root directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Environment Variables**
   - Settings → Variables
   - Add all `.env` variables

5. **Generate Domain**
   - Settings → Networking
   - "Generate Domain"
   - Copy the URL

**Railway CLI Deployment:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

#### Option 3: Heroku (Paid)

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create dhunn-backend

# Set buildpack
heroku buildpacks:set heroku/nodejs

# Add environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
# ... add all other env vars

# Deploy from server directory
git subtree push --prefix server heroku main

# Open app
heroku open
```

---

### 🗄️ Database Deployment (MongoDB Atlas)

**Already Covered in [Configuration Section](#️-configuration)**

**Production Checklist:**
- ✅ Network access restricted to specific IPs (or 0.0.0.0/0 for serverless)
- ✅ Strong database user password
- ✅ Connection string uses DNS Seedlist (`mongodb+srv://`)
- ✅ Database name matches production environment
- ✅ Backup schedule configured (Atlas automatically backs up M10+ clusters)

**Update Backend `.env`:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dhunn-production?retryWrites=true&w=majority
```

---

### 🔗 Connecting Frontend to Backend

**After deploying both:**

1. **Get Backend URL**
   - Example: `https://dhunn-backend.onrender.com`

2. **Update Frontend Environment**
   - Vercel/Netlify → Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://dhunn-backend.onrender.com/api`

3. **Update Backend CORS**
   - In `server/.env` (production):
     ```env
     CLIENT_URL=https://dhunn.vercel.app
     ```
   - Or update `server/server.js` CORS configuration:
     ```javascript
     app.use(cors({
       origin: process.env.CLIENT_URL || 'http://localhost:5173',
       credentials: true
     }));
     ```

4. **Redeploy**
   - Trigger new deployment on both platforms
   - Verify connection in browser console

---

### 📊 Post-Deployment Checklist

- [ ] Frontend accessible and loads correctly
- [ ] Backend API responds to health check
- [ ] Database connection successful
- [ ] User registration works
- [ ] User login works
- [ ] Search functionality works
- [ ] Music playback works
- [ ] Playlist creation works
- [ ] All environment variables set
- [ ] CORS configured properly
- [ ] HTTPS enabled (automatic on Vercel/Netlify/Render)
- [ ] Error logs monitored
- [ ] Performance acceptable

---

### 🔍 Monitoring & Debugging

**Frontend (Vercel):**
- Dashboard → Your Project → Deployments → View Logs
- Real-time function logs
- Analytics available

**Backend (Render):**
- Dashboard → Your Service → Logs
- Real-time server logs
- Metrics available on paid plans

**Database (MongoDB Atlas):**
- Clusters → Metrics
- Monitor connections, operations, network traffic
- Set up alerts for high usage

**Health Check Endpoints:**

Add to `server/server.js`:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});
```

Test: `https://your-backend-url.com/health`

---

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

Built with ❤️ by Swaim Sahay

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [React Icons](https://react-icons.github.io/react-icons/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities


**Happy Listening! 🎵**
