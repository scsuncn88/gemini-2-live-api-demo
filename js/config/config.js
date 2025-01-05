/**
 * Application Configuration
 * 
 * Configuration is handled via direct reference to window.__ENV__ in
 * the front-end and env for server-side. This allows seamless switching between
 * environments and flexible configuration management.
 */

const loadConfig = () => {
  // 使用window.__ENV__来加载前端的环境参数
  let env;
  if (typeof window !== 'undefined') {
    env = window.__ENV__ || {};
  } else if (typeof global !== 'undefined' && typeof global.env !== 'undefined') {
    env = global.env;
  } else {
    console.error("Environment variable context is missing.");
    env = {};
  }
  
  const config = {
    API: {
      KEY: env.API_KEY || 'AIzaSyCRLOMDyI9t0_eEkgBgfVxuhnTktmqZzDo',
      HOST: env.API_HOST || 'wss://generativelanguage.googleapis.com/ws',
      VERSION: env.API_VERSION || 'v1alpha',
      MODEL_NAME: env.API_MODEL_NAME || 'models/gemini-2.0-flash-exp',
    },
    SYSTEM_INSTRUCTION: {
      TEXT: env.SYSTEM_INSTRUCTION_TEXT || 'You are my helpful assistant...',
    },
    VOICE: {
      NAME: env.VOICE_NAME || 'Aoede',
      VALID_NAMES: ['Puck', 'Charon', 'Kore', 'Fenrir', 'Aoede']
    },
    AUDIO: {
      INPUT_SAMPLE_RATE: parseInt(env.AUDIO_INPUT_SAMPLE_RATE) || 16000,
      OUTPUT_SAMPLE_RATE: parseInt(env.AUDIO_OUTPUT_SAMPLE_RATE) || 24000,
      BUFFER_SIZE: parseInt(env.AUDIO_BUFFER_SIZE) || 7680,
      CHANNELS: parseInt(env.AUDIO_CHANNELS) || 1,
    },
  };

  // Validate required configuration
  const validateConfig = (config) => {
    if (!config.API.KEY) {
      console.warn('API_KEY is missing. Using default value.');
    }
    
    if (!config.API.HOST) {
      console.warn('API_BASE_URL is missing. Using default value.');
    }

    // Validate audio settings
    const validSampleRates = [8000, 16000, 24000, 48000];
    if (!validSampleRates.includes(config.AUDIO.INPUT_SAMPLE_RATE)) {
      console.warn(`Invalid AUDIO_INPUT_SAMPLE_RATE: ${config.AUDIO.INPUT_SAMPLE_RATE}. Using default value.`);
    }
    
    if (!validSampleRates.includes(config.AUDIO.OUTPUT_SAMPLE_RATE)) {
      console.warn(`Invalid AUDIO_OUTPUT_SAMPLE_RATE: ${config.AUDIO.OUTPUT_SAMPLE_RATE}. Using default value.`);
    }
  };

  validateConfig(config);

  return config;
};

export const CONFIG = loadConfig();

export default CONFIG;
