import axios from 'axios';

// Proxy audio stream to bypass CORS
export const proxyAudioStream = async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ message: 'URL parameter is required' });
    }

    console.log('🎵 Proxying audio stream from:', url.substring(0, 80) + '...');

    // Stream the audio from external source through our server
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': '*/*',
      },
      timeout: 30000, // 30 seconds timeout
    });

    // Set proper headers for audio streaming with CORS
    res.setHeader('Content-Type', response.headers['content-type'] || 'audio/mp4');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range');
    
    if (response.headers['content-length']) {
      res.setHeader('Content-Length', response.headers['content-length']);
    }

    // Pipe the audio stream to the response
    response.data.pipe(res);

    // Handle stream errors
    response.data.on('error', (error) => {
      console.error('❌ Stream error:', error.message);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Stream error' });
      }
    });

  } catch (error) {
    console.error('❌ Error proxying stream:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to proxy audio stream', error: error.message });
    }
  }
};
