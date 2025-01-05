/**
 * Application Configuration
 * 
 * Configuration is directly loaded from Cloudflare environment variables
 * available in the env parameter. Default values are provided for all settings.
 */

export default {
  async fetch(request, env, ctx) {
    const API_KEY = env.API_KEY || 'default_api_key';
    const API_HOST = env.API_HOST || 'wss://generativelanguage.googleapis.com/ws';
    const API_VERSION = env.API_VERSION || 'v1alpha';
    const API_MODEL_NAME = env.API_MODEL_NAME || 'models/gemini-2.0-flash-exp';
    const SYSTEM_INSTRUCTION_TEXT = env.SYSTEM_INSTRUCTION_TEXT || 'You are my helpful assistant...';
    const VOICE_NAME = env.VOICE_NAME || 'Aoede';
    const AUDIO_INPUT_SAMPLE_RATE = parseInt(env.AUDIO_INPUT_SAMPLE_RATE) || 16000;
    const AUDIO_OUTPUT_SAMPLE_RATE = parseInt(env.AUDIO_OUTPUT_SAMPLE_RATE) || 24000;
    const AUDIO_BUFFER_SIZE = parseInt(env.AUDIO_BUFFER_SIZE) || 7680;
    const AUDIO_CHANNELS = parseInt(env.AUDIO_CHANNELS) || 1;

    return new Response(JSON.stringify({
      API: {
        KEY: API_KEY,
        HOST: API_HOST,
        VERSION: API_VERSION,
        MODEL_NAME: API_MODEL_NAME,
      },
      SYSTEM_INSTRUCTION: {
        TEXT: SYSTEM_INSTRUCTION_TEXT,
      },
      VOICE: {
        NAME: VOICE_NAME,
        VALID_NAMES: ['Puck', 'Charon', 'Kore', 'Fenrir', 'Aoede']
      },
      AUDIO: {
        INPUT_SAMPLE_RATE: AUDIO_INPUT_SAMPLE_RATE,
        OUTPUT_SAMPLE_RATE: AUDIO_OUTPUT_SAMPLE_RATE,
        BUFFER_SIZE: AUDIO_BUFFER_SIZE,
        CHANNELS: AUDIO_CHANNELS,
      },
    }, null, 2), { headers: { 'Content-Type': 'application/json' } });
  }
};
