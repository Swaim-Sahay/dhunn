// Environment Configuration Validator
// Validates required environment variables are present

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
  'YOUTUBE_API_KEY'
];

const optionalEnvVars = [
  'PORT',
  'NODE_ENV',
  'CLIENT_URL',
  'ALLOWED_ORIGINS'
];

export const validateEnv = () => {
  const missing = [];
  const warnings = [];

  // Check required variables
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  // Check optional but recommended variables
  optionalEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(varName);
    }
  });

  // Log results
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\n⚠️  Please check your .env file');
    process.exit(1);
  }

  if (warnings.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  Missing recommended environment variables:');
    warnings.forEach(varName => console.warn(`   - ${varName}`));
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.warn('⚠️  JWT_SECRET is weak (less than 32 characters). Generate a stronger one!');
  }

  console.log('✅ Environment variables validated successfully');
};

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development'
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY
  },
  cors: {
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    allowedOrigins: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
      : []
  }
};

export default config;
