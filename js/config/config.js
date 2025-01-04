export const CONFIG = {
    API: {
        KEY: 'AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        BASE_URL: 'wss://generativelanguage.googleapis.com/ws',
        VERSION: 'v1alpha',
        MODEL_NAME: 'models/gemini-2.0-flash-exp',
    },
    SYSTEM_INSTRUCTION: {
        TEXT: 'You are my helpful assistant. You can see and hear me, and respond with voice and text. If you are asked about things you do not know, you can use the google search tool to find the answer.',
    },
    VOICE: {
        NAME: 'Aoede',
    },
    AUDIO: {
        INPUT_SAMPLE_RATE: 16000,
        OUTPUT_SAMPLE_RATE: 24000,
        BUFFER_SIZE: 7680,
        CHANNELS: 1,
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
