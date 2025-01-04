export const CONFIG = {
    API: {
        KEY: import.meta.env?.API_KEY || 'default_api_key',
        BASE_URL: import.meta.env?.API_BASE_URL || 'wss://generativelanguage.googleapis.com/ws',
        VERSION: import.meta.env?.API_VERSION || 'v1alpha',
        MODEL_NAME: import.meta.env?.API_MODEL_NAME || 'models/gemini-2.0-flash-exp',
    },
    SYSTEM_INSTRUCTION: {
        TEXT: import.meta.env?.SYSTEM_INSTRUCTION_TEXT || 'You are my helpful assistant. You can see and hear me, and respond with voice and text. If you are asked about things you do not know, you can use the google search tool to find the answer.',
    },
    VOICE: {
        NAME: import.meta.env?.VOICE_NAME || 'Aoede',
    },
    AUDIO: {
        INPUT_SAMPLE_RATE: parseInt(import.meta.env?.AUDIO_INPUT_SAMPLE_RATE) || 16000,
        OUTPUT_SAMPLE_RATE: parseInt(import.meta.env?.AUDIO_OUTPUT_SAMPLE_RATE) || 24000,
        BUFFER_SIZE: parseInt(import.meta.env?.AUDIO_BUFFER_SIZE) || 7680,
        CHANNELS: parseInt(import.meta.env?.AUDIO_CHANNELS) || 1,
    },
};

  console.log('API_KEY:', import.meta.env?.API_KEY);
  console.log('API_BASE_URL:', import.meta.env?.API_BASE_URL);
  console.log('API_VERSION:', import.meta.env?.API_VERSION);
  console.log('API_MODEL_NAME:', import.meta.env?.API_MODEL_NAME);
  console.log('SYSTEM_INSTRUCTION_TEXT:', import.meta.env?.SYSTEM_INSTRUCTION_TEXT);
  console.log('VOICE_NAME:', import.meta.env?.VOICE_NAME);
  console.log('AUDIO_INPUT_SAMPLE_RATE:', import.meta.env?.AUDIO_INPUT_SAMPLE_RATE);
  console.log('AUDIO_OUTPUT_SAMPLE_RATE:', import.meta.env?.AUDIO_OUTPUT_SAMPLE_RATE);
  console.log('AUDIO_BUFFER_SIZE:', import.meta.env?.AUDIO_BUFFER_SIZE);
  console.log('AUDIO_CHANNELS:', import.meta.env?.AUDIO_CHANNELS);
  export default CONFIG;
