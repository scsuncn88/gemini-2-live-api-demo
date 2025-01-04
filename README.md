# Gemini 2.0 Flash Multimodal Live API Client

A lightweight vanilla JavaScript implementation of the Gemini 2.0 Flash Multimodal Live API client. This project provides real-time interaction with Gemini's API through text, audio, video, and screen sharing capabilities.

This is a simplified version of [Google's original React implementation](https://github.com/google-gemini/multimodal-live-api-web-console), created in response to [this issue](https://github.com/google-gemini/multimodal-live-api-web-console/issues/19).

## Live Demo on GitHub Pages

[Live Demo](https://viaanthroposbenevolentia.github.io/gemini-2-live-api-demo/)

## Key Features

- Real-time text chat with Gemini API
- Audio input/output with visualization
- Motion-detected video streaming
- Screen sharing capabilities
- Function calling support
- Built with vanilla JavaScript (no dependencies)

## Prerequisites

- Modern web browser with WebRTC, WebSocket, and Web Audio API support
- Google AI Studio API key
- Python 3.0+ OR `npx http-server` (for local development server)

## Quick Start

1. Clone the repository
2. Set up your environment variables:

   Create a `.env` file in the project root:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:

   ```bash
   API_KEY=your_api_key_here
   API_BASE_URL=wss://generativelanguage.googleapis.com/ws
   API_VERSION=v1alpha
   API_MODEL_NAME=models/gemini-2.0-flash-exp
   SYSTEM_INSTRUCTION_TEXT=You are my helpful assistant...
   VOICE_NAME=Aoede
   AUDIO_INPUT_SAMPLE_RATE=16000
   AUDIO_OUTPUT_SAMPLE_RATE=24000
   AUDIO_BUFFER_SIZE=7680
   AUDIO_CHANNELS=1
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Start the development server:

   ```bash
   python -m http.server 8000
   ```

   or 
   
   ```bash
   npx http-server 8000
   ```

4. Access the application at `http://localhost:8000`

## Project Structure

```plaintext
├── js/
│ ├── audio/ # Audio processing and management
│ ├── config/ # Configuration files
│ ├── core/ # Core functionality (WebSocket, worklets)
│ ├── tools/ # Function calling implementations
│ ├── utils/ # Utility functions
│ ├── video/ # Video and screen sharing
│ └── main.js # Application entry point
├── css/ # Styling
└── index.html # Main HTML file
```

## Usage Guide

1. Click "Connect" to establish API connection
2. Use the interface to:
   - Send text messages
   - Toggle microphone for audio input
   - Enable webcam for video streaming
   - Share your screen
3. Monitor the logs panel for real-time feedback

## Development

### Adding Custom Tools

Custom tools can be added to extend functionality. See `js/tools/README.md` for implementation details.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
