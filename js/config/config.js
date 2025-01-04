export const CONFIG = {
  API: {
    KEY: process.env.API_KEY || 'default_api_key',
    BASE_URL: process.env.API_BASE_URL || 'wss://generativelanguage.googleapis.com/ws',
    VERSION: process.env.API_VERSION || 'v1alpha',
    MODEL_NAME: process.env.API_MODEL_NAME || 'models/gemini-2.0-flash-exp',
  },
  SYSTEM_INSTRUCTION: {
    TEXT: process.env.SYSTEM_INSTRUCTION_TEXT || 'You are my helpful assistant...',
  },
  VOICE: {
    NAME: process.env.VOICE_NAME || 'Aoede',
  },
  AUDIO: {
    INPUT_SAMPLE_RATE: parseInt(process.env.AUDIO_INPUT_SAMPLE_RATE) || 16000,
    OUTPUT_SAMPLE_RATE: parseInt(process.env.AUDIO_OUTPUT_SAMPLE_RATE) || 24000,
    BUFFER_SIZE: parseInt(process.env.AUDIO_BUFFER_SIZE) || 7680,
    CHANNELS: parseInt(process.env.AUDIO_CHANNELS) || 1,
  },
};

console.log('API_KEY:', CONFIG.API.KEY);
console.log('API_BASE_URL:', CONFIG.API.BASE_URL);
console.log('API_VERSION:', CONFIG.API.VERSION);
console.log('API_MODEL_NAME:', CONFIG.API.MODEL_NAME);
console.log('SYSTEM_INSTRUCTION_TEXT:', CONFIG.SYSTEM_INSTRUCTION.TEXT);
console.log('VOICE_NAME:', CONFIG.VOICE.NAME);
console.log('AUDIO_INPUT_SAMPLE_RATE:', CONFIG.AUDIO.INPUT_SAMPLE_RATE);
console.log('AUDIO_OUTPUT_SAMPLE_RATE:', CONFIG.AUDIO.OUTPUT_SAMPLE_RATE);
console.log('AUDIO_BUFFER_SIZE:', CONFIG.AUDIO.BUFFER_SIZE);
console.log('AUDIO_CHANNELS:', CONFIG.AUDIO.CHANNELS);

export default CONFIG;