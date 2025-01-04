export const CONFIG = {
    API: {
        KEY: import.meta.env.API_KEY,
        BASE_URL: import.meta.env.API_BASE_URL || 'wss://generativelanguage.googleapis.com/ws',
        VERSION: import.meta.env.API_VERSION || 'v1alpha',
        MODEL_NAME: import.meta.env.API_MODEL_NAME || 'models/gemini-2.0-flash-exp'
    },
    SYSTEM_INSTRUCTION: {
        TEXT: import.meta.env.SYSTEM_INSTRUCTION_TEXT || 'You are my helpful assistant. You can see and hear me, and respond with voice and text. If you are asked about things you do not know, you can use the google search tool to find the answer.',
    },
    VOICE: {
        NAME: import.meta.env.VOICE_NAME || 'Aoede'
    },
    AUDIO: {
        INPUT_SAMPLE_RATE: parseInt(import.meta.env.AUDIO_INPUT_SAMPLE_RATE) || 16000,
        OUTPUT_SAMPLE_RATE: parseInt(import.meta.env.AUDIO_OUTPUT_SAMPLE_RATE) || 24000,
        BUFFER_SIZE: parseInt(import.meta.env.AUDIO_BUFFER_SIZE) || 7680,
        CHANNELS: parseInt(import.meta.env.AUDIO_CHANNELS) || 1
    },
  };
  
  export default CONFIG;
