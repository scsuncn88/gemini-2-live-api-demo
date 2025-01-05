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
  
  return {
    API: {
      KEY: env.API_KEY || 'default_api_key',
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
  }
};

export const CONFIG = loadConfig();

export default CONFIG;
