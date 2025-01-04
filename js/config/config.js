/**
 * Application Configuration
 * 
 * Configuration is loaded from window.__ENV__ which is injected by build.js
 * from environment variables. Default values are provided for all settings.
 */

const env = window.__ENV__ || {};

// Validate required configuration
const validateConfig = (config) => {
  if (!config.API_KEY) {
    console.warn('API_KEY is missing. Using default value.');
  }
  
  if (!config.API_BASE_URL) {
    console.warn('API_BASE_URL is missing. Using default value.');
  }

  // Validate audio settings
  const validSampleRates = [8000, 16000, 24000, 48000];
  if (!validSampleRates.includes(config.AUDIO_INPUT_SAMPLE_RATE)) {
    console.warn(`Invalid AUDIO_INPUT_SAMPLE_RATE: ${config.AUDIO_INPUT_SAMPLE_RATE}. Using default value.`);
  }
  
  if (!validSampleRates.includes(config.AUDIO_OUTPUT_SAMPLE_RATE)) {
    console.warn(`Invalid AUDIO_OUTPUT_SAMPLE_RATE: ${config.AUDIO_OUTPUT_SAMPLE_RATE}. Using default value.`);
  }
};

export const CONFIG = {
  API: {
    KEY: env.API_KEY || 'default_api_key',
    BASE_URL: env.API_BASE_URL || 'wss://generativelanguage.googleapis.com/ws',
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

// Validate configuration
validateConfig(CONFIG);

// Log configuration
console.group('Application Configuration');
console.log('API:', CONFIG.API);
console.log('SYSTEM_INSTRUCTION:', CONFIG.SYSTEM_INSTRUCTION);
console.log('VOICE:', CONFIG.VOICE);
console.log('AUDIO:', CONFIG.AUDIO);
console.groupEnd();

export default CONFIG;
