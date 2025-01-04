# Configuration Management

This project uses environment variables for configuration. Create a `.env` file in the project root based on `.env.example`.

## Required Configuration

- API_KEY: Your Google AI Studio API key
- API_BASE_URL: WebSocket endpoint (default: wss://generativelanguage.googleapis.com/ws)
- API_VERSION: API version (default: v1alpha)
- API_MODEL_NAME: Model name (default: models/gemini-2.0-flash-exp)

## Optional Configuration

- SYSTEM_INSTRUCTION_TEXT: System instruction for the assistant
- VOICE_NAME: Voice name for audio output
- AUDIO_INPUT_SAMPLE_RATE: Audio input sample rate (default: 16000)
- AUDIO_OUTPUT_SAMPLE_RATE: Audio output sample rate (default: 24000)
- AUDIO_BUFFER_SIZE: Audio buffer size (default: 7680)
- AUDIO_CHANNELS: Audio channels (default: 1)

## Validation

Configuration is validated at startup. Invalid values will throw errors with detailed messages.
