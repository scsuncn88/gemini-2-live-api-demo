export const CONFIG = {
    API: {
      KEY: API_KEY || 'default_api_key',
      BASE_URL: API_BASE_URL || 'wss://generativelanguage.googleapis.com/ws',
      VERSION: API_VERSION || 'v1alpha',
      MODEL_NAME: API_MODEL_NAME || 'models/gemini-2.0-flash-exp',
    },
    SYSTEM_INSTRUCTION: {
      TEXT: SYSTEM_INSTRUCTION_TEXT || 'You are my helpful assistant...',
    },
    VOICE: {
      NAME: VOICE_NAME || 'Aoede',
    },
    AUDIO: {
      INPUT_SAMPLE_RATE: parseInt(AUDIO_INPUT_SAMPLE_RATE) || 16000,
      OUTPUT_SAMPLE_RATE: parseInt(AUDIO_OUTPUT_SAMPLE_RATE) || 24000,
      BUFFER_SIZE: parseInt(AUDIO_BUFFER_SIZE) || 7680,
      CHANNELS: parseInt(AUDIO_CHANNELS) || 1,
    },
  };