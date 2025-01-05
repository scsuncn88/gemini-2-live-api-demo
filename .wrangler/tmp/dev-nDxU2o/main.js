var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// js/core/websocket-client.js
import { EventEmitter as EventEmitter2 } from "https://cdn.skypack.dev/eventemitter3";

// js/utils/utils.js
function blobToJSON(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const json = JSON.parse(reader.result);
        resolve(json);
      } else {
        reject("Failed to parse blob to JSON");
      }
    };
    reader.readAsText(blob);
  });
}
__name(blobToJSON, "blobToJSON");
function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
__name(base64ToArrayBuffer, "base64ToArrayBuffer");

// js/utils/error-boundary.js
var ErrorCodes = {
  // Audio related errors
  AUDIO_DEVICE_NOT_FOUND: "AUDIO_DEVICE_NOT_FOUND",
  AUDIO_PERMISSION_DENIED: "AUDIO_PERMISSION_DENIED",
  AUDIO_NOT_SUPPORTED: "AUDIO_NOT_SUPPORTED",
  AUDIO_INITIALIZATION_FAILED: "AUDIO_INITIALIZATION_FAILED",
  AUDIO_RECORDING_FAILED: "AUDIO_RECORDING_FAILED",
  AUDIO_STOP_FAILED: "AUDIO_STOP_FAILED",
  AUDIO_CONVERSION_FAILED: "AUDIO_CONVERSION_FAILED",
  // WebSocket related errors
  WEBSOCKET_CONNECTION_FAILED: "WEBSOCKET_CONNECTION_FAILED",
  WEBSOCKET_MESSAGE_FAILED: "WEBSOCKET_MESSAGE_FAILED",
  WEBSOCKET_CLOSE_FAILED: "WEBSOCKET_CLOSE_FAILED",
  // API related errors
  API_AUTHENTICATION_FAILED: "API_AUTHENTICATION_FAILED",
  API_REQUEST_FAILED: "API_REQUEST_FAILED",
  API_RESPONSE_INVALID: "API_RESPONSE_INVALID",
  // General errors
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  INVALID_STATE: "INVALID_STATE",
  INVALID_PARAMETER: "INVALID_PARAMETER",
  // Video related errors
  VIDEO_DEVICE_NOT_FOUND: "VIDEO_DEVICE_NOT_FOUND",
  VIDEO_PERMISSION_DENIED: "VIDEO_PERMISSION_DENIED",
  VIDEO_NOT_SUPPORTED: "VIDEO_NOT_SUPPORTED",
  VIDEO_CODEC_NOT_SUPPORTED: "VIDEO_CODEC_NOT_SUPPORTED",
  VIDEO_START_FAILED: "VIDEO_START_FAILED",
  VIDEO_STOP_FAILED: "VIDEO_STOP_FAILED",
  // Screen sharing related errors
  SCREEN_DEVICE_NOT_FOUND: "SCREEN_DEVICE_NOT_FOUND",
  SCREEN_PERMISSION_DENIED: "SCREEN_PERMISSION_DENIED",
  SCREEN_NOT_SUPPORTED: "SCREEN_NOT_SUPPORTED",
  SCREEN_START_FAILED: "SCREEN_START_FAILED",
  SCREEN_STOP_FAILED: "SCREEN_STOP_FAILED"
};
var ApplicationError2 = class extends Error {
  /**
   * Creates a new ApplicationError.
   *
   * @param {string} message - The error message.
   * @param {string} [code=ErrorCodes.UNKNOWN_ERROR] - The error code.
   * @param {Object} [details={}] - Additional details about the error.
   */
  constructor(message, code = ErrorCodes.UNKNOWN_ERROR, details = {}) {
    super(message);
    this.name = "ApplicationError";
    this.code = code;
    this.details = details;
    this.timestamp = (/* @__PURE__ */ new Date()).toISOString();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError2);
    }
  }
  /**
   * Converts the error object to a JSON representation.
   *
   * @returns {Object} The JSON representation of the error.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
      stack: this.stack
    };
  }
};
__name(ApplicationError2, "ApplicationError");

// js/utils/logger.js
import { EventEmitter } from "https://cdn.skypack.dev/eventemitter3";
var _Logger = class extends EventEmitter {
  /**
   * Returns the singleton instance of the Logger.
   *
   * @returns {Logger} The Logger instance.
   */
  static getInstance() {
    if (!_Logger.instance) {
      _Logger.instance = new _Logger();
    }
    return _Logger.instance;
  }
  /**
   * Logs a message with the given level and optional data.
   *
   * @param {string} level - The log level (e.g., 'debug', 'info', 'warn', 'error').
   * @param {string} message - The message to log.
   * @param {Object} [data=null] - Optional data to include with the log.
   */
  static log(level, message, data = null) {
    const logger = _Logger.getInstance();
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data
    };
    _Logger.logs.push(logEntry);
    if (_Logger.logs.length > _Logger.maxStoredLogs) {
      _Logger.logs.shift();
    }
    switch (level) {
      case _Logger.LEVELS.ERROR:
        console.error(logEntry);
        break;
      case _Logger.LEVELS.WARN:
        console.warn(logEntry);
        break;
      case _Logger.LEVELS.INFO:
        console.info(logEntry);
        break;
      default:
        console.log(logEntry);
    }
    logger.emit("log", logEntry);
  }
  /**
   * Exports the stored logs as a JSON file.
   */
  static export() {
    const blob = new Blob([JSON.stringify(_Logger.logs, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs-${(/* @__PURE__ */ new Date()).toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  /**
   * Logs a debug message.
   *
   * @param {string} message - The message to log.
   * @param {Object} [data] - Optional data to include with the log.
   */
  static debug(message, data) {
    this.log(this.LEVELS.DEBUG, message, data);
  }
  /**
   * Logs an info message.
   *
   * @param {string} message - The message to log.
   * @param {Object} [data] - Optional data to include with the log.
   */
  static info(message, data) {
    this.log(this.LEVELS.INFO, message, data);
  }
  /**
   * Logs a warning message.
   *
   * @param {string} message - The message to log.
   * @param {Object} [data] - Optional data to include with the log.
   */
  static warn(message, data) {
    this.log(this.LEVELS.WARN, message, data);
  }
  /**
   * Logs an error message.
   *
   * @param {string} message - The message to log.
   * @param {Object} [data] - Optional data to include with the log.
   */
  static error(message, data) {
    this.log(this.LEVELS.ERROR, message, data);
  }
};
var Logger = _Logger;
__name(Logger, "Logger");
__publicField(Logger, "instance", null);
__publicField(Logger, "maxStoredLogs", 1e3);
__publicField(Logger, "logs", []);
/**
 * Log levels.
 * @enum {string}
 */
__publicField(Logger, "LEVELS", {
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error"
});

// js/tools/google-search.js
var GoogleSearchTool = class {
  /**
   * Returns the tool declaration for the Gemini API.
   * The declaration is an empty object, indicating to the API that this tool can be used.
   *
   * @returns {Object} An empty object as the tool declaration.
   */
  getDeclaration() {
    return {
      // Return empty object as per Gemini API requirements
      // This tells the model it can use Google Search
    };
  }
  /**
   * Executes the Google search.
   * In this implementation, it logs the search query and returns null,
   * as the actual search is performed server-side by the Gemini API.
   *
   * @param {Object} args - The arguments for the search, including the search query.
   * @returns {null} Always returns null as the search is handled externally.
   * @throws {Error} Throws an error if the search execution fails.
   */
  async execute(args) {
    try {
      Logger.info("Executing Google Search", args);
      return null;
    } catch (error) {
      Logger.error("Google Search failed", error);
      throw error;
    }
  }
};
__name(GoogleSearchTool, "GoogleSearchTool");

// js/tools/weather-tool.js
var WeatherTool = class {
  /**
   * Returns the tool declaration for the Gemini API.
   * The declaration defines the function name, description, and parameters.
   *
   * @returns {Object[]} An array containing the function declaration for getting weather on a specific date.
   */
  getDeclaration() {
    return [{
      name: "get_weather_on_date",
      description: "Get the weather forecast for a specific location and date",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The location to get weather for (city name)"
          },
          date: {
            type: "string",
            description: "The date to get weather for (YYYY-MM-DD format)"
          }
        },
        required: ["location", "date"]
      }
    }];
  }
  /**
   * Executes the weather tool.
   * Generates a mock weather forecast based on the provided location and date.
   *
   * @param {Object} args - The arguments for the tool.
   * @param {string} args.location - The location for the weather forecast.
   * @param {string} args.date - The date for the weather forecast (YYYY-MM-DD).
   * @returns {Promise<Object>} A promise that resolves with the weather forecast.
   * @throws {Error} Throws an error if the tool execution fails.
   */
  async execute(args) {
    try {
      Logger.info("Executing Weather Tool", args);
      const { location, date } = args;
      const weatherConditions = [
        "sunny",
        "partly cloudy",
        "cloudy",
        "light rain",
        "heavy rain",
        "thunderstorm",
        "windy",
        "snow",
        "foggy"
      ];
      const temperatures = {
        sunny: { min: 20, max: 35 },
        "partly cloudy": { min: 18, max: 30 },
        cloudy: { min: 15, max: 25 },
        "light rain": { min: 12, max: 20 },
        "heavy rain": { min: 10, max: 18 },
        thunderstorm: { min: 15, max: 25 },
        windy: { min: 8, max: 15 },
        snow: { min: -5, max: 5 },
        foggy: { min: 5, max: 15 }
      };
      const seed = this.hashString(`${location}${date}`);
      const condition = weatherConditions[seed % weatherConditions.length];
      const temp = temperatures[condition];
      const currentTemp = temp.min + seed % (temp.max - temp.min);
      return {
        location,
        date,
        condition,
        temperature: Math.round(currentTemp),
        humidity: 40 + seed % 40,
        // Random humidity between 40-80%
        windSpeed: 5 + seed % 25,
        // Random wind speed between 5-30 km/h
        forecast: `The weather in ${location} on ${date} will be ${condition} with a temperature of ${Math.round(currentTemp)}\xB0C`
      };
    } catch (error) {
      Logger.error("Weather Tool failed", error);
      throw error;
    }
  }
  /**
   * Generates a numeric hash from a string.
   * Used to create a pseudo-random seed for consistent weather generation.
   *
   * @param {string} str - The input string.
   * @returns {number} The numeric hash.
   */
  // Helper function to generate a numeric hash from a string
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
};
__name(WeatherTool, "WeatherTool");

// js/tools/tool-manager.js
var ToolManager = class {
  /**
   * Creates a new ToolManager and registers default tools.
   */
  constructor() {
    this.tools = /* @__PURE__ */ new Map();
    this.registerDefaultTools();
  }
  /**
   * Registers the default tools: GoogleSearchTool and WeatherTool.
   */
  registerDefaultTools() {
    this.registerTool("googleSearch", new GoogleSearchTool());
    this.registerTool("weather", new WeatherTool());
  }
  /**
   * Registers a new tool.
   *
   * @param {string} name - The name of the tool.
   * @param {Object} toolInstance - The tool instance. Must have a `getDeclaration` method.
   * @throws {ApplicationError} Throws an error if a tool with the same name is already registered.
   */
  registerTool(name, toolInstance) {
    if (this.tools.has(name)) {
      throw new ApplicationError2(
        `Tool ${name} is already registered`,
        ErrorCodes.INVALID_STATE
      );
    }
    this.tools.set(name, toolInstance);
    Logger.info(`Tool ${name} registered successfully`);
  }
  /**
   * Returns the tool declarations for all registered tools.
   * These declarations are used by the Gemini API to understand what tools are available.
   *
   * @returns {Object[]} An array of tool declarations.
   */
  getToolDeclarations() {
    const allDeclarations = [];
    this.tools.forEach((tool, name) => {
      if (tool.getDeclaration) {
        if (name === "weather") {
          allDeclarations.push({
            functionDeclarations: tool.getDeclaration()
          });
        } else {
          allDeclarations.push({ [name]: tool.getDeclaration() });
        }
      }
    });
    return allDeclarations;
  }
  /**
   * Handles a tool call from the Gemini API.
   * Executes the specified tool with the given arguments.
   *
   * @param {Object} functionCall - The function call object from the Gemini API.
   * @param {string} functionCall.name - The name of the tool to execute.
   * @param {Object} functionCall.args - The arguments to pass to the tool.
   * @param {string} functionCall.id - The ID of the function call.
   * @returns {Promise<Object>} A promise that resolves with the tool's response.
   * @throws {ApplicationError} Throws an error if the tool is unknown or if the tool execution fails.
   */
  async handleToolCall(functionCall) {
    const { name, args, id } = functionCall;
    Logger.info(`Handling tool call: ${name}`, { args });
    let tool;
    if (name === "get_weather_on_date") {
      tool = this.tools.get("weather");
    } else {
      tool = this.tools.get(name);
    }
    if (!tool) {
      throw new ApplicationError2(
        `Unknown tool: ${name}`,
        ErrorCodes.INVALID_PARAMETER
      );
    }
    try {
      const result = await tool.execute(args);
      return {
        functionResponses: [{
          response: { output: result },
          id
        }]
      };
    } catch (error) {
      Logger.error(`Tool execution failed: ${name}`, error);
      return {
        functionResponses: [{
          response: { error: error.message },
          id
        }]
      };
    }
  }
};
__name(ToolManager, "ToolManager");

// js/core/websocket-client.js
var MultimodalLiveClient = class extends EventEmitter2 {
  /**
   * Creates a new MultimodalLiveClient.
   *
   * @param {Object} options - Configuration options.
   * @param {string} [options.url] - The WebSocket URL for the Gemini API. Defaults to a URL constructed with the provided API key.
   * @param {string} options.apiKey - Your API key for the Gemini API.
   */
  constructor({ url, apiKey }) {
    super();
    this.url = url || `wss://geminiwebsockets.autodev.us.kg/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
    this.ws = null;
    this.config = null;
    this.send = this.send.bind(this);
    this.toolManager = new ToolManager();
  }
  /**
   * Logs a message with a timestamp and type. Emits a 'log' event.
   *
   * @param {string} type - The type of the log message (e.g., 'server.send', 'client.close').
   * @param {string|Object} message - The message to log.
   */
  log(type, message) {
    this.emit("log", { date: /* @__PURE__ */ new Date(), type, message });
  }
  /**
   * Connects to the WebSocket server with the given configuration.
   * The configuration can include model settings, generation config, system instructions, and tools.
   *
   * @param {Object} config - The configuration for the connection.
   * @param {string} config.model - The model to use (e.g., 'gemini-2.0-flash-exp').
   * @param {Object} config.generationConfig - Configuration for content generation.
   * @param {string[]} config.generationConfig.responseModalities - The modalities for the response (e.g., "audio", "text").
   * @param {Object} config.generationConfig.speechConfig - Configuration for speech generation.
   * @param {Object} config.generationConfig.speechConfig.voiceConfig - Configuration for the voice.
   * @param {string} config.generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName - The name of the prebuilt voice to use.
   * @param {Object} config.systemInstruction - Instructions for the system.
   * @param {Object[]} config.systemInstruction.parts - Parts of the system instruction.
   * @param {string} config.systemInstruction.parts[].text - Text content of the instruction part.
   * @param {Object[]} [config.tools] - Additional tools to be used by the model.
   * @returns {Promise<boolean>} - Resolves with true when the connection is established.
   * @throws {ApplicationError} - Throws an error if the connection fails.
   */
  connect(config) {
    this.config = {
      ...config,
      tools: [
        ...this.toolManager.getToolDeclarations(),
        ...config.tools || []
      ]
    };
    const ws = new WebSocket(this.url);
    ws.addEventListener("message", async (evt) => {
      if (evt.data instanceof Blob) {
        this.receive(evt.data);
      } else {
        console.log("Non-blob message", evt);
      }
    });
    return new Promise((resolve, reject) => {
      const onError = /* @__PURE__ */ __name((ev) => {
        this.disconnect(ws);
        const message = `Could not connect to "${this.url}"`;
        this.log(`server.${ev.type}`, message);
        throw new ApplicationError2(
          message,
          ErrorCodes.WEBSOCKET_CONNECTION_FAILED,
          { originalError: ev }
        );
      }, "onError");
      ws.addEventListener("error", onError);
      ws.addEventListener("open", (ev) => {
        if (!this.config) {
          reject("Invalid config sent to `connect(config)`");
          return;
        }
        this.log(`client.${ev.type}`, "Connected to socket");
        this.emit("open");
        this.ws = ws;
        const setupMessage = { setup: this.config };
        this._sendDirect(setupMessage);
        this.log("client.send", "setup");
        ws.removeEventListener("error", onError);
        ws.addEventListener("close", (ev2) => {
          this.disconnect(ws);
          let reason = ev2.reason || "";
          if (reason.toLowerCase().includes("error")) {
            const prelude = "ERROR]";
            const preludeIndex = reason.indexOf(prelude);
            if (preludeIndex > 0) {
              reason = reason.slice(preludeIndex + prelude.length + 1);
            }
          }
          this.log(`server.${ev2.type}`, `Disconnected ${reason ? `with reason: ${reason}` : ""}`);
          this.emit("close", { code: ev2.code, reason });
        });
        resolve(true);
      });
    });
  }
  /**
   * Disconnects from the WebSocket server.
   *
   * @param {WebSocket} [ws] - The WebSocket instance to disconnect. If not provided, defaults to the current instance.
   * @returns {boolean} - True if disconnected, false otherwise.
   */
  disconnect(ws) {
    if ((!ws || this.ws === ws) && this.ws) {
      this.ws.close();
      this.ws = null;
      this.log("client.close", "Disconnected");
      return true;
    }
    return false;
  }
  /**
   * Receives and processes a message from the WebSocket server.
   * Handles different types of responses like tool calls, setup completion, and server content.
   *
   * @param {Blob} blob - The received blob data.
   */
  async receive(blob) {
    const response = await blobToJSON(blob);
    if (response.toolCall) {
      this.log("server.toolCall", response);
      await this.handleToolCall(response.toolCall);
      return;
    }
    if (response.toolCallCancellation) {
      this.log("receive.toolCallCancellation", response);
      this.emit("toolcallcancellation", response.toolCallCancellation);
      return;
    }
    if (response.setupComplete) {
      this.log("server.send", "setupComplete");
      this.emit("setupcomplete");
      return;
    }
    if (response.serverContent) {
      const { serverContent } = response;
      if (serverContent.interrupted) {
        this.log("receive.serverContent", "interrupted");
        this.emit("interrupted");
        return;
      }
      if (serverContent.turnComplete) {
        this.log("server.send", "turnComplete");
        this.emit("turncomplete");
      }
      if (serverContent.modelTurn) {
        let parts = serverContent.modelTurn.parts;
        const audioParts = parts.filter((p) => p.inlineData && p.inlineData.mimeType.startsWith("audio/pcm"));
        const base64s = audioParts.map((p) => p.inlineData?.data);
        const otherParts = parts.filter((p) => !audioParts.includes(p));
        base64s.forEach((b64) => {
          if (b64) {
            const data = base64ToArrayBuffer(b64);
            this.emit("audio", data);
            this.log(`server.audio`, `buffer (${data.byteLength})`);
          }
        });
        if (!otherParts.length) {
          return;
        }
        parts = otherParts;
        const content = { modelTurn: { parts } };
        this.emit("content", content);
        this.log(`server.content`, response);
      }
    } else {
      console.log("Received unmatched message", response);
    }
  }
  /**
   * Sends real-time input data to the server.
   *
   * @param {Array} chunks - An array of media chunks to send. Each chunk should have a mimeType and data.
   */
  sendRealtimeInput(chunks) {
    let hasAudio = false;
    let hasVideo = false;
    let totalSize = 0;
    for (let i = 0; i < chunks.length; i++) {
      const ch = chunks[i];
      totalSize += ch.data.length;
      if (ch.mimeType.includes("audio")) {
        hasAudio = true;
      }
      if (ch.mimeType.includes("image")) {
        hasVideo = true;
      }
    }
    const message = hasAudio && hasVideo ? "audio + video" : hasAudio ? "audio" : hasVideo ? "video" : "unknown";
    Logger.debug(`Sending realtime input: ${message} (${Math.round(totalSize / 1024)}KB)`);
    const data = { realtimeInput: { mediaChunks: chunks } };
    this._sendDirect(data);
    this.log(`client.realtimeInput`, message);
  }
  /**
   * Sends a tool response to the server.
   *
   * @param {Object} toolResponse - The tool response to send.
   */
  sendToolResponse(toolResponse) {
    const message = { toolResponse };
    this._sendDirect(message);
    this.log(`client.toolResponse`, message);
  }
  /**
   * Sends a message to the server.
   *
   * @param {string|Object|Array} parts - The message parts to send. Can be a string, an object, or an array of strings/objects.
   * @param {boolean} [turnComplete=true] - Indicates if this message completes the current turn.
   */
  send(parts, turnComplete = true) {
    parts = Array.isArray(parts) ? parts : [parts];
    const formattedParts = parts.map((part) => {
      if (typeof part === "string") {
        return { text: part };
      } else if (typeof part === "object" && !part.text && !part.inlineData) {
        return { text: JSON.stringify(part) };
      }
      return part;
    });
    const content = { role: "user", parts: formattedParts };
    const clientContentRequest = { clientContent: { turns: [content], turnComplete } };
    this._sendDirect(clientContentRequest);
    this.log(`client.send`, clientContentRequest);
  }
  /**
   * Sends a message directly to the WebSocket server.
   *
   * @param {Object} request - The request to send.
   * @throws {Error} - Throws an error if the WebSocket is not connected.
   * @private
   */
  _sendDirect(request) {
    if (!this.ws) {
      throw new Error("WebSocket is not connected");
    }
    const str = JSON.stringify(request);
    this.ws.send(str);
  }
  /**
   * Handles a tool call from the server.
   *
   * @param {Object} toolCall - The tool call data.
   */
  async handleToolCall(toolCall) {
    try {
      const response = await this.toolManager.handleToolCall(toolCall.functionCalls[0]);
      this.sendToolResponse(response);
    } catch (error) {
      Logger.error("Tool call failed", error);
      this.sendToolResponse({
        functionResponses: [{
          response: { error: error.message },
          id: toolCall.functionCalls[0].id
        }]
      });
    }
  }
};
__name(MultimodalLiveClient, "MultimodalLiveClient");

// js/core/worklet-registry.js
var registeredWorklets = /* @__PURE__ */ new Map();

// js/config/config.js
var env2 = typeof window !== "undefined" ? window.__ENV__ || {} : {};
var validateConfig = /* @__PURE__ */ __name((config) => {
  if (!config.API_KEY) {
    console.warn("API_KEY is missing. Using default value.");
  }
  if (!config.API_BASE_URL) {
    console.warn("API_BASE_URL is missing. Using default value.");
  }
  const validSampleRates = [8e3, 16e3, 24e3, 48e3];
  if (!validSampleRates.includes(config.AUDIO_INPUT_SAMPLE_RATE)) {
    console.warn(`Invalid AUDIO_INPUT_SAMPLE_RATE: ${config.AUDIO_INPUT_SAMPLE_RATE}. Using default value.`);
  }
  if (!validSampleRates.includes(config.AUDIO_OUTPUT_SAMPLE_RATE)) {
    console.warn(`Invalid AUDIO_OUTPUT_SAMPLE_RATE: ${config.AUDIO_OUTPUT_SAMPLE_RATE}. Using default value.`);
  }
}, "validateConfig");
var CONFIG = {
  API: {
    KEY: env2.API_KEY || "default_api_key",
    BASE_URL: env2.API_BASE_URL || "wss://generativelanguage.googleapis.com/ws",
    VERSION: env2.API_VERSION || "v1alpha",
    MODEL_NAME: env2.API_MODEL_NAME || "models/gemini-2.0-flash-exp"
  },
  SYSTEM_INSTRUCTION: {
    TEXT: env2.SYSTEM_INSTRUCTION_TEXT || "You are my helpful assistant..."
  },
  VOICE: {
    NAME: env2.VOICE_NAME || "Aoede",
    VALID_NAMES: ["Puck", "Charon", "Kore", "Fenrir", "Aoede"]
  },
  AUDIO: {
    INPUT_SAMPLE_RATE: parseInt(env2.AUDIO_INPUT_SAMPLE_RATE) || 16e3,
    OUTPUT_SAMPLE_RATE: parseInt(env2.AUDIO_OUTPUT_SAMPLE_RATE) || 24e3,
    BUFFER_SIZE: parseInt(env2.AUDIO_BUFFER_SIZE) || 7680,
    CHANNELS: parseInt(env2.AUDIO_CHANNELS) || 1
  }
};
validateConfig(CONFIG);
console.group("Application Configuration");
console.log("API:", CONFIG.API);
console.log("SYSTEM_INSTRUCTION:", CONFIG.SYSTEM_INSTRUCTION);
console.log("VOICE:", CONFIG.VOICE);
console.log("AUDIO:", CONFIG.AUDIO);
console.groupEnd();

// js/audio/audio-streamer.js
var AudioStreamer = class {
  /**
   * @constructor
   * @param {AudioContext} context - The AudioContext instance to use for audio processing.
   */
  constructor(context) {
    this.context = context;
    this.audioQueue = [];
    this.isPlaying = false;
    this.sampleRate = 24e3;
    this.bufferSize = 7680;
    this.processingBuffer = new Float32Array(0);
    this.scheduledTime = 0;
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.isStreamComplete = false;
    this.checkInterval = null;
    this.initialBufferTime = 0.1;
    this.endOfQueueAudioSource = null;
    this.onComplete = () => {
    };
    this.gainNode.connect(this.context.destination);
    this.addPCM16 = this.addPCM16.bind(this);
  }
  /**
   * Get the current sample rate
   */
  get sampleRate() {
    return this._sampleRate;
  }
  /**
   * Set the sample rate and update buffer size accordingly
   */
  set sampleRate(value) {
    this._sampleRate = value;
    this.bufferSize = Math.floor(value * 0.32);
  }
  /**
   * @method addWorklet
   * @description Adds an audio worklet to the processing pipeline.
   * @param {string} workletName - The name of the worklet.
   * @param {string} workletSrc - The source URL of the worklet script.
   * @param {Function} handler - The message handler function for the worklet.
   * @returns {Promise<AudioStreamer>} A promise that resolves with the AudioStreamer instance when the worklet is added.
   * @async
   */
  async addWorklet(workletName, workletSrc, handler) {
    let workletsRecord = registeredWorklets.get(this.context);
    if (workletsRecord && workletsRecord[workletName]) {
      workletsRecord[workletName].handlers.push(handler);
      return Promise.resolve(this);
    }
    if (!workletsRecord) {
      registeredWorklets.set(this.context, {});
      workletsRecord = registeredWorklets.get(this.context);
    }
    workletsRecord[workletName] = { handlers: [handler] };
    try {
      const absolutePath = `/${workletSrc}`;
      await this.context.audioWorklet.addModule(absolutePath);
    } catch (error) {
      console.error("Error loading worklet:", error);
      throw error;
    }
    const worklet = new AudioWorkletNode(this.context, workletName);
    workletsRecord[workletName].node = worklet;
    return this;
  }
  /**
   * @method addPCM16
   * @description Adds a chunk of PCM16 audio data to the streaming queue.
   * @param {Int16Array} chunk - The audio data chunk.
   */
  addPCM16(chunk) {
    const float32Array = new Float32Array(chunk.length / 2);
    const dataView = new DataView(chunk.buffer);
    for (let i = 0; i < chunk.length / 2; i++) {
      try {
        const int16 = dataView.getInt16(i * 2, true);
        float32Array[i] = int16 / 32768;
      } catch (e) {
        console.error(e);
      }
    }
    const newBuffer = new Float32Array(this.processingBuffer.length + float32Array.length);
    newBuffer.set(this.processingBuffer);
    newBuffer.set(float32Array, this.processingBuffer.length);
    this.processingBuffer = newBuffer;
    while (this.processingBuffer.length >= this.bufferSize) {
      const buffer = this.processingBuffer.slice(0, this.bufferSize);
      this.audioQueue.push(buffer);
      this.processingBuffer = this.processingBuffer.slice(this.bufferSize);
    }
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.scheduledTime = this.context.currentTime + this.initialBufferTime;
      this.scheduleNextBuffer();
    }
  }
  /**
   * @method createAudioBuffer
   * @description Creates an AudioBuffer from the given audio data.
   * @param {Float32Array} audioData - The audio data.
   * @returns {AudioBuffer} The created AudioBuffer.
   */
  createAudioBuffer(audioData) {
    const audioBuffer = this.context.createBuffer(1, audioData.length, this.sampleRate);
    audioBuffer.getChannelData(0).set(audioData);
    return audioBuffer;
  }
  /**
   * @method scheduleNextBuffer
   * @description Schedules the next audio buffer for playback.
   */
  scheduleNextBuffer() {
    const SCHEDULE_AHEAD_TIME = 0.2;
    while (this.audioQueue.length > 0 && this.scheduledTime < this.context.currentTime + SCHEDULE_AHEAD_TIME) {
      const audioData = this.audioQueue.shift();
      const audioBuffer = this.createAudioBuffer(audioData);
      const source = this.context.createBufferSource();
      if (this.audioQueue.length === 0) {
        if (this.endOfQueueAudioSource) {
          this.endOfQueueAudioSource.onended = null;
        }
        this.endOfQueueAudioSource = source;
        source.onended = () => {
          if (!this.audioQueue.length && this.endOfQueueAudioSource === source) {
            this.endOfQueueAudioSource = null;
            this.onComplete();
          }
        };
      }
      source.buffer = audioBuffer;
      source.connect(this.gainNode);
      const worklets = registeredWorklets.get(this.context);
      if (worklets) {
        Object.entries(worklets).forEach(([workletName, graph]) => {
          const { node, handlers } = graph;
          if (node) {
            source.connect(node);
            node.port.onmessage = function(ev) {
              handlers.forEach((handler) => {
                handler.call(node.port, ev);
              });
            };
            node.connect(this.context.destination);
          }
        });
      }
      const startTime = Math.max(this.scheduledTime, this.context.currentTime);
      source.start(startTime);
      this.scheduledTime = startTime + audioBuffer.duration;
    }
    if (this.audioQueue.length === 0 && this.processingBuffer.length === 0) {
      if (this.isStreamComplete) {
        this.isPlaying = false;
        if (this.checkInterval) {
          clearInterval(this.checkInterval);
          this.checkInterval = null;
        }
      } else {
        if (!this.checkInterval) {
          this.checkInterval = window.setInterval(() => {
            if (this.audioQueue.length > 0 || this.processingBuffer.length >= this.bufferSize) {
              this.scheduleNextBuffer();
            }
          }, 100);
        }
      }
    } else {
      const nextCheckTime = (this.scheduledTime - this.context.currentTime) * 1e3;
      setTimeout(() => this.scheduleNextBuffer(), Math.max(0, nextCheckTime - 50));
    }
  }
  /**
   * @method stop
   * @description Stops the audio stream.
   */
  stop() {
    this.isPlaying = false;
    this.isStreamComplete = true;
    this.audioQueue = [];
    this.processingBuffer = new Float32Array(0);
    this.scheduledTime = this.context.currentTime;
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.1);
    setTimeout(() => {
      this.gainNode.disconnect();
      this.gainNode = this.context.createGain();
      this.gainNode.connect(this.context.destination);
    }, 200);
  }
  /**
   * @method resume
   * @description Resumes the audio stream if the AudioContext was suspended.
   * @async
   */
  async resume() {
    if (this.context.state === "suspended") {
      await this.context.resume();
    }
    this.isStreamComplete = false;
    this.scheduledTime = this.context.currentTime + this.initialBufferTime;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
  }
  /**
   * @method complete
   * @description Marks the audio stream as complete and schedules any remaining data in the buffer.
   */
  complete() {
    this.isStreamComplete = true;
    if (this.processingBuffer.length > 0) {
      this.audioQueue.push(this.processingBuffer);
      this.processingBuffer = new Float32Array(0);
      if (this.isPlaying) {
        this.scheduleNextBuffer();
      }
    } else {
      this.onComplete();
    }
  }
};
__name(AudioStreamer, "AudioStreamer");

// js/audio/audio-recorder.js
var AudioRecorder = class {
  /**
   * @constructor
   * @param {number} sampleRate - The sample rate for audio recording (default: 16000)
   */
  constructor(sampleRate = CONFIG.AUDIO.INPUT_SAMPLE_RATE) {
    this.targetSampleRate = sampleRate;
    this.actualSampleRate = null;
    this.stream = null;
    this.mediaRecorder = null;
    this.audioContext = null;
    this.source = null;
    this.processor = null;
    this.onAudioData = null;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.isRecording = false;
  }
  /**
   * @method getSystemSampleRate
   * @description Detects the system's actual sample rate capabilities
   * @returns {Promise<number>} The actual sample rate supported by the system
   * @private
   */
  async getSystemSampleRate() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1
        }
      });
      const tempContext = new AudioContext();
      const source = tempContext.createMediaStreamSource(stream);
      const actualRate = source.context.sampleRate;
      stream.getTracks().forEach((track) => track.stop());
      await tempContext.close();
      return actualRate;
    } catch (error) {
      Logger.error("Error detecting system sample rate:", error);
      throw new ApplicationError2(
        "Failed to detect system sample rate",
        ErrorCodes.AUDIO_INIT_FAILED,
        { originalError: error }
      );
    }
  }
  /**
   * @method start
   * @description Starts audio recording with the specified callback for audio data.
   * @param {Function} onAudioData - Callback function for processed audio data.
   * @throws {Error} If unable to access microphone or set up audio processing.
   * @async
   */
  async start(onAudioData) {
    this.onAudioData = onAudioData;
    try {
      this.actualSampleRate = await this.getSystemSampleRate();
      Logger.info(`System sample rate detected: ${this.actualSampleRate}Hz`);
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1
        }
      });
      this.audioContext = new AudioContext({ sampleRate: this.actualSampleRate });
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      const response = await fetch("./js/audio/worklets/audio-processing.js");
      const text = await response.text();
      const blob = new Blob([text], { type: "application/javascript" });
      const workletUrl = URL.createObjectURL(blob);
      await this.audioContext.audioWorklet.addModule(workletUrl);
      URL.revokeObjectURL(workletUrl);
      this.processor = new AudioWorkletNode(this.audioContext, "audio-recorder-worklet", {
        processorOptions: {
          targetSampleRate: this.targetSampleRate,
          originalSampleRate: this.actualSampleRate
        }
      });
      this.processor.port.onmessage = (event) => {
        if (event.data.event === "chunk" && this.onAudioData && this.isRecording) {
          const base64Data = this.arrayBufferToBase64(event.data.data.int16arrayBuffer);
          this.onAudioData(base64Data);
        }
      };
      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
      this.isRecording = true;
    } catch (error) {
      console.error("Error starting audio recording:", error);
      throw error;
    }
  }
  /**
   * @method stop
   * @description Stops the current recording session and cleans up resources.
   * @throws {ApplicationError} If an error occurs during stopping the recording.
   */
  stop() {
    try {
      if (!this.isRecording) {
        Logger.warn("Attempting to stop recording when not recording");
        return;
      }
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }
      this.isRecording = false;
      Logger.info("Audio recording stopped successfully");
    } catch (error) {
      Logger.error("Error stopping audio recording", error);
      throw new ApplicationError2(
        "Failed to stop audio recording",
        ErrorCodes.AUDIO_STOP_FAILED,
        { originalError: error }
      );
    }
  }
  /**
   * @method arrayBufferToBase64
   * @description Converts ArrayBuffer to Base64 string.
   * @param {ArrayBuffer} buffer - The ArrayBuffer to convert.
   * @returns {string} The Base64 representation of the ArrayBuffer.
   * @throws {ApplicationError} If an error occurs during conversion.
   * @private
   */
  arrayBufferToBase64(buffer) {
    try {
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    } catch (error) {
      Logger.error("Error converting buffer to base64", error);
      throw new ApplicationError2(
        "Failed to convert audio data",
        ErrorCodes.AUDIO_CONVERSION_FAILED,
        { originalError: error }
      );
    }
  }
  /**
   * @method checkBrowserSupport
   * @description Checks if the browser supports required audio APIs.
   * @throws {ApplicationError} If the browser does not support audio recording.
   * @private
   */
  checkBrowserSupport() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new ApplicationError2(
        "Audio recording is not supported in this browser",
        ErrorCodes.AUDIO_NOT_SUPPORTED
      );
    }
  }
};
__name(AudioRecorder, "AudioRecorder");

// js/video/video-recorder.js
var VideoRecorder = class {
  /**
   * Creates a new VideoRecorder instance.
   * @param {Object} [options] - Configuration options for the recorder.
   * @param {number} [options.fps=15] - Frames per second for video capture.
   * @param {number} [options.quality=0.7] - JPEG quality for captured frames (0.0 - 1.0).
   * @param {number} [options.width=640] - Width of the captured video.
   * @param {number} [options.height=480] - Height of the captured video.
   * @param {number} [options.maxFrameSize=102400] - Maximum size of a frame in bytes (100KB).
   */
  constructor(options = {}) {
    this.stream = null;
    this.previewElement = null;
    this.isRecording = false;
    this.onVideoData = null;
    this.frameCanvas = document.createElement("canvas");
    this.frameCtx = this.frameCanvas.getContext("2d");
    this.captureInterval = null;
    this.options = {
      fps: 15,
      // Reduced default FPS
      quality: 0.7,
      width: 640,
      height: 480,
      maxFrameSize: 100 * 1024,
      // 100KB max per frame
      ...options
    };
    this.frameCount = 0;
  }
  /**
   * Starts video recording.
   * @param {HTMLVideoElement} previewElement - The video element to display the video preview.
   * @param {Function} onVideoData - Callback function to receive video frame data.
   * @throws {ApplicationError} Throws an error if the video recording fails to start.
   */
  async start(previewElement, onVideoData) {
    try {
      this.previewElement = previewElement;
      this.onVideoData = onVideoData;
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: this.options.width },
          height: { ideal: this.options.height }
        }
      });
      this.previewElement.srcObject = this.stream;
      await this.previewElement.play();
      this.frameCanvas.width = this.options.width;
      this.frameCanvas.height = this.options.height;
      this.isRecording = true;
      this.startFrameCapture();
      Logger.info("Video recording started");
    } catch (error) {
      Logger.error("Failed to start video recording:", error);
      throw new ApplicationError2(
        "Failed to start video recording",
        ErrorCodes.VIDEO_START_FAILED,
        { originalError: error }
      );
    }
  }
  /**
   * Starts the frame capture loop.
   * @private
   */
  startFrameCapture() {
    const frameInterval = 1e3 / this.options.fps;
    this.captureInterval = setInterval(() => {
      if (this.isRecording && this.onVideoData) {
        try {
          this.frameCtx.drawImage(
            this.previewElement,
            0,
            0,
            this.frameCanvas.width,
            this.frameCanvas.height
          );
          const jpegData = this.frameCanvas.toDataURL("image/jpeg", this.options.quality);
          const base64Data = jpegData.split(",")[1];
          if (!this.validateFrame(base64Data)) {
            return;
          }
          this.frameCount++;
          const size = Math.round(base64Data.length / 1024);
          Logger.debug(`Frame #${this.frameCount} captured (${size}KB)`);
          if (!base64Data) {
            Logger.error("Empty frame data");
            return;
          }
          this.onVideoData(base64Data);
        } catch (error) {
          Logger.error("Frame capture error:", error);
        }
      }
    }, frameInterval);
    Logger.info(`Video capture started at ${this.options.fps} FPS`);
  }
  /**
   * Stops video recording.
   * @throws {ApplicationError} Throws an error if the video recording fails to stop.
   */
  stop() {
    try {
      this.isRecording = false;
      if (this.captureInterval) {
        clearInterval(this.captureInterval);
        this.captureInterval = null;
      }
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
      }
      if (this.previewElement) {
        this.previewElement.srcObject = null;
      }
      this.stream = null;
      Logger.info("Video recording stopped");
    } catch (error) {
      Logger.error("Failed to stop video recording:", error);
      throw new ApplicationError2(
        "Failed to stop video recording",
        ErrorCodes.VIDEO_STOP_FAILED,
        { originalError: error }
      );
    }
  }
  /**
   * Checks if video recording is supported by the browser.
   * @returns {boolean} True if video recording is supported, false otherwise.
   * @throws {ApplicationError} Throws an error if video recording is not supported.
   * @static
   */
  static checkBrowserSupport() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new ApplicationError2(
        "Video recording is not supported in this browser",
        ErrorCodes.VIDEO_NOT_SUPPORTED
      );
    }
    return true;
  }
  /**
   * Validates a captured frame.
   * @param {string} base64Data - Base64 encoded frame data.
   * @returns {boolean} True if the frame is valid, false otherwise.
   * @private
   */
  validateFrame(base64Data) {
    if (!/^[A-Za-z0-9+/=]+$/.test(base64Data)) {
      Logger.error("Invalid base64 data");
      return false;
    }
    if (base64Data.length < 1024) {
      Logger.error("Frame too small");
      return false;
    }
    return true;
  }
  /**
   * Optimizes the frame quality to reduce size.
   * @param {string} base64Data - Base64 encoded frame data.
   * @returns {string} Optimized base64 encoded frame data.
   * @private
   */
  async optimizeFrameQuality(base64Data) {
    let quality = this.options.quality;
    let currentSize = base64Data.length;
    while (currentSize > this.options.maxFrameSize && quality > 0.3) {
      quality -= 0.1;
      const jpegData = this.frameCanvas.toDataURL("image/jpeg", quality);
      base64Data = jpegData.split(",")[1];
      currentSize = base64Data.length;
    }
    return base64Data;
  }
};
__name(VideoRecorder, "VideoRecorder");

// js/video/video-manager.js
var VideoManager = class {
  /**
   * Creates a new VideoManager instance
   * @constructor
   */
  constructor() {
    if (!document.getElementById("video-container")) {
      throw new ApplicationError2(
        "Video container element not found",
        ErrorCodes.INVALID_STATE
      );
    }
    this.videoContainer = document.getElementById("video-container");
    this.previewVideo = document.getElementById("preview");
    this.stopVideoButton = document.getElementById("stop-video");
    this.framePreview = document.createElement("canvas");
    this.lastFrameData = null;
    this.lastSignificantFrame = null;
    this.frameCount = 0;
    this.lastFrameTime = 0;
    this.videoRecorder = null;
    this.isActive = false;
    this.MOTION_THRESHOLD = 10;
    this.FRAME_INTERVAL = 200;
    this.FORCE_FRAME_INTERVAL = 10;
    this.setupFramePreview();
  }
  /**
   * Sets up the frame preview canvas
   * @private
   */
  setupFramePreview() {
    this.framePreview.id = "frame-preview";
    this.framePreview.width = 320;
    this.framePreview.height = 240;
    this.videoContainer.appendChild(this.framePreview);
    this.framePreview.addEventListener("click", () => {
      this.framePreview.classList.toggle("enlarged");
    });
  }
  /**
   * Updates the frame preview with new image data
   * @param {string} base64Data - Base64 encoded image data
   * @private
   */
  updateFramePreview(base64Data) {
    const img = new Image();
    img.onload = () => {
      const ctx = this.framePreview.getContext("2d");
      ctx.drawImage(img, 0, 0, this.framePreview.width, this.framePreview.height);
    };
    img.src = "data:image/jpeg;base64," + base64Data;
  }
  /**
   * Detects motion between two frames
   * @param {Uint8ClampedArray} prevFrame - Previous frame data
   * @param {Uint8ClampedArray} currentFrame - Current frame data
   * @returns {number} Motion score
   * @private
   */
  detectMotion(prevFrame, currentFrame) {
    let diff = 0;
    const pixelsToCheck = prevFrame.length / 4;
    const skipPixels = 2;
    for (let i = 0; i < prevFrame.length; i += 4 * skipPixels) {
      const rDiff = Math.abs(prevFrame[i] - currentFrame[i]);
      const gDiff = Math.abs(prevFrame[i + 1] - currentFrame[i + 1]);
      const bDiff = Math.abs(prevFrame[i + 2] - currentFrame[i + 2]);
      diff += (rDiff + gDiff + bDiff) / 3;
    }
    return diff / (pixelsToCheck / skipPixels);
  }
  /**
   * Starts video capture and processing
   * @param {Function} onFrame - Callback for processed frames
   * @returns {Promise<boolean>} Success status
   * @throws {ApplicationError} If video capture fails
   */
  async start(onFrame) {
    try {
      Logger.info("Starting video manager");
      this.videoContainer.style.display = "block";
      this.videoRecorder = new VideoRecorder();
      await this.videoRecorder.start(this.previewVideo, (base64Data) => {
        if (!this.isActive) {
          Logger.debug("Skipping frame - inactive");
          return;
        }
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime < this.FRAME_INTERVAL) {
          return;
        }
        this.processFrame(base64Data, onFrame);
      });
      this.isActive = true;
      return true;
    } catch (error) {
      Logger.error("Video manager error:", error);
      this.stop();
      throw new ApplicationError2(
        "Failed to start video manager",
        ErrorCodes.VIDEO_START_FAILED,
        { originalError: error }
      );
    }
  }
  /**
   * Processes a single video frame
   * @param {string} base64Data - Base64 encoded frame data
   * @param {Function} onFrame - Frame callback
   * @private
   */
  processFrame(base64Data, onFrame) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      if (this.lastFrameData) {
        const motionScore = this.detectMotion(this.lastFrameData, imageData.data);
        if (motionScore < this.MOTION_THRESHOLD && this.frameCount % this.FORCE_FRAME_INTERVAL !== 0) {
          Logger.debug(`Skipping frame - low motion (score: ${motionScore})`);
          return;
        }
      }
      this.updateFramePreview(base64Data);
      this.lastFrameData = imageData.data;
      this.lastSignificantFrame = base64Data;
      this.lastFrameTime = Date.now();
      this.frameCount++;
      const size = Math.round(base64Data.length / 1024);
      Logger.debug(`Processing frame (${size}KB) - frame #${this.frameCount}`);
      onFrame({
        mimeType: "image/jpeg",
        data: base64Data
      });
    };
    img.src = "data:image/jpeg;base64," + base64Data;
  }
  /**
   * Stops video capture and processing
   */
  stop() {
    if (this.videoRecorder) {
      this.videoRecorder.stop();
      this.videoRecorder = null;
    }
    this.isActive = false;
    this.videoContainer.style.display = "none";
    this.lastFrameData = null;
    this.lastSignificantFrame = null;
    this.frameCount = 0;
  }
};
__name(VideoManager, "VideoManager");

// js/video/screen-recorder.js
var ScreenRecorder = class {
  /**
   * Creates a new ScreenRecorder instance.
   * @param {Object} [options] - Configuration options for the recorder.
   * @param {number} [options.fps=5] - Frames per second for screen capture.
   * @param {number} [options.quality=0.8] - JPEG quality for captured frames (0.0 - 1.0).
   * @param {number} [options.width=1280] - Width of the captured video.
   * @param {number} [options.height=720] - Height of the captured video.
   * @param {number} [options.maxFrameSize=204800] - Maximum size of a frame in bytes (200KB).
   */
  constructor(options = {}) {
    this.stream = null;
    this.isRecording = false;
    this.onScreenData = null;
    this.frameCanvas = document.createElement("canvas");
    this.frameCtx = this.frameCanvas.getContext("2d");
    this.captureInterval = null;
    this.previewElement = null;
    this.options = {
      fps: 5,
      // Lower FPS for screen sharing
      quality: 0.8,
      width: 1280,
      height: 720,
      maxFrameSize: 200 * 1024,
      // 200KB max per frame
      ...options
    };
    this.frameCount = 0;
    this.lastFrameData = null;
    this.lastSignificantFrame = null;
    this.MOTION_THRESHOLD = 5;
    this.FORCE_FRAME_INTERVAL = 15;
  }
  /**
   * Starts screen recording.
   * @param {HTMLVideoElement} previewElement - The video element to display the screen preview.
   * @param {Function} onScreenData - Callback function to receive screen frame data.
   * @throws {ApplicationError} Throws an error if screen sharing permission is denied or if the screen recording fails to start.
   */
  async start(previewElement, onScreenData) {
    try {
      this.onScreenData = onScreenData;
      this.previewElement = previewElement;
      this.stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: this.options.width },
          height: { ideal: this.options.height },
          frameRate: { ideal: this.options.fps }
        },
        audio: false
        // Set to true if you want to capture audio as well
      });
      if (this.previewElement) {
        this.previewElement.srcObject = this.stream;
        await new Promise((resolve) => {
          this.previewElement.onloadedmetadata = () => {
            this.previewElement.play().then(resolve).catch((error) => {
              Logger.error("Failed to play preview:", error);
              resolve();
            });
          };
        });
        this.frameCanvas.width = this.previewElement.videoWidth;
        this.frameCanvas.height = this.previewElement.videoHeight;
      }
      this.isRecording = true;
      this.startFrameCapture();
      this.stream.getVideoTracks()[0].addEventListener("ended", () => {
        this.stop();
      });
      Logger.info("Screen recording started");
    } catch (error) {
      if (error.name === "NotAllowedError") {
        throw new ApplicationError2(
          "Screen sharing permission denied",
          ErrorCodes.SCREEN_PERMISSION_DENIED,
          { originalError: error }
        );
      }
      throw new ApplicationError2(
        "Failed to start screen recording",
        ErrorCodes.SCREEN_START_FAILED,
        { originalError: error }
      );
    }
  }
  /**
   * Starts the frame capture loop.
   * @private
   */
  startFrameCapture() {
    const frameInterval = 1e3 / this.options.fps;
    this.captureInterval = setInterval(() => {
      if (!this.isRecording || !this.previewElement || !this.onScreenData)
        return;
      try {
        if (this.previewElement.readyState >= this.previewElement.HAVE_CURRENT_DATA) {
          if (this.frameCanvas.width !== this.previewElement.videoWidth) {
            this.frameCanvas.width = this.previewElement.videoWidth;
            this.frameCanvas.height = this.previewElement.videoHeight;
          }
          this.frameCtx.drawImage(
            this.previewElement,
            0,
            0,
            this.frameCanvas.width,
            this.frameCanvas.height
          );
          const currentFrameData = this.frameCtx.getImageData(
            0,
            0,
            this.frameCanvas.width,
            this.frameCanvas.height
          ).data;
          let shouldSendFrame = false;
          if (this.lastFrameData) {
            const motionScore = this.detectMotion(this.lastFrameData, currentFrameData);
            shouldSendFrame = motionScore > this.MOTION_THRESHOLD || this.frameCount % this.FORCE_FRAME_INTERVAL === 0;
            if (!shouldSendFrame) {
              Logger.debug(`Skipping screen frame - low motion (score: ${motionScore.toFixed(2)})`);
              this.frameCount++;
              return;
            }
          } else {
            shouldSendFrame = true;
          }
          if (shouldSendFrame) {
            const jpegData = this.frameCanvas.toDataURL("image/jpeg", this.options.quality);
            const base64Data = jpegData.split(",")[1];
            if (this.validateFrame(base64Data)) {
              this.frameCount++;
              Logger.debug(`Screen frame #${this.frameCount} captured (motion detected)`);
              this.onScreenData(base64Data);
              this.lastFrameData = currentFrameData;
            }
          }
        }
      } catch (error) {
        Logger.error("Screen frame capture error:", error);
      }
    }, frameInterval);
    Logger.info(`Screen capture started at ${this.options.fps} FPS with motion detection`);
  }
  /**
   * Stops screen recording.
   * @throws {ApplicationError} Throws an error if the screen recording fails to stop.
   */
  stop() {
    try {
      this.isRecording = false;
      if (this.captureInterval) {
        clearInterval(this.captureInterval);
        this.captureInterval = null;
      }
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }
      if (this.previewElement) {
        this.previewElement.srcObject = null;
        this.previewElement = null;
      }
      this.lastFrameData = null;
      this.lastSignificantFrame = null;
      this.frameCount = 0;
      Logger.info("Screen recording stopped");
    } catch (error) {
      Logger.error("Failed to stop screen recording:", error);
      throw new ApplicationError2(
        "Failed to stop screen recording",
        ErrorCodes.SCREEN_STOP_FAILED,
        { originalError: error }
      );
    }
  }
  /**
   * Validates a captured frame.
   * @param {string} base64Data - Base64 encoded frame data.
   * @returns {boolean} True if the frame is valid, false otherwise.
   * @private
   */
  validateFrame(base64Data) {
    if (!/^[A-Za-z0-9+/=]+$/.test(base64Data)) {
      Logger.error("Invalid screen frame base64 data");
      return false;
    }
    if (base64Data.length < 1024) {
      Logger.error("Screen frame too small");
      return false;
    }
    return true;
  }
  /**
   * Checks if screen sharing is supported by the browser.
   * @returns {boolean} True if screen sharing is supported, false otherwise.
   * @throws {ApplicationError} Throws an error if screen sharing is not supported.
   * @static
   */
  static checkBrowserSupport() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      throw new ApplicationError2(
        "Screen sharing is not supported in this browser",
        ErrorCodes.SCREEN_NOT_SUPPORTED
      );
    }
    return true;
  }
  /**
   * Detects motion between two frames.
   * @param {Uint8ClampedArray} prevFrame - The previous frame data.
   * @param {Uint8ClampedArray} currentFrame - The current frame data.
   * @returns {number} The motion score between the two frames.
   * @private
   */
  detectMotion(prevFrame, currentFrame) {
    let diff = 0;
    const pixelsToCheck = prevFrame.length / 4;
    const skipPixels = 4;
    for (let i = 0; i < prevFrame.length; i += 4 * skipPixels) {
      const rDiff = Math.abs(prevFrame[i] - currentFrame[i]);
      const gDiff = Math.abs(prevFrame[i + 1] - currentFrame[i + 1]);
      const bDiff = Math.abs(prevFrame[i + 2] - currentFrame[i + 2]);
      diff += (rDiff + gDiff + bDiff) / 3;
    }
    return diff / (pixelsToCheck / skipPixels);
  }
};
__name(ScreenRecorder, "ScreenRecorder");

// js/main.js
var main_default = {
  async fetch(request, env3, ctx) {
    return new Response(`API host: ${env3.API_HOST}`);
  }
};
var logsContainer = document.getElementById("logs-container");
var messageInput = document.getElementById("message-input");
var sendButton = document.getElementById("send-button");
var micButton = document.getElementById("mic-button");
var micIcon = document.getElementById("mic-icon");
var audioVisualizer = document.getElementById("audio-visualizer");
var connectButton = document.getElementById("connect-button");
var cameraButton = document.getElementById("camera-button");
var cameraIcon = document.getElementById("camera-icon");
var stopVideoButton = document.getElementById("stop-video");
var screenButton = document.getElementById("screen-button");
var screenIcon = document.getElementById("screen-icon");
var screenContainer = document.getElementById("screen-container");
var screenPreview = document.getElementById("screen-preview");
var inputAudioVisualizer = document.getElementById("input-audio-visualizer");
var voiceSelect = document.getElementById("voice-select");
var sampleRateInput = document.getElementById("sample-rate-input");
var systemInstructionInput = document.getElementById("system-instruction");
var applyConfigButton = document.getElementById("apply-config");
var configToggle = document.getElementById("config-toggle");
var toggleLogs = document.getElementById("toggle-logs");
var logsWrapper = document.querySelector(".logs-wrapper");
var configContainer = document.getElementById("config-container");
var themeToggle = document.getElementById("theme-toggle");
var root = document.documentElement;
var savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "light_mode" : "dark_mode";
themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "light_mode" : "dark_mode";
});
var isRecording = false;
var audioStreamer = null;
var audioCtx = null;
var isConnected = false;
var audioRecorder = null;
var isVideoActive = false;
var videoManager = null;
var isScreenSharing = false;
var screenRecorder = null;
var isUsingTool = false;
var client = new MultimodalLiveClient({ apiKey: CONFIG.API.KEY });
if (typeof env !== "undefined") {
  console.log("Cloudflare Workers env:", env);
  console.log("API_HOST:", env.API_HOST);
  console.log("API_KEY:", env.API_KEY);
}
voiceSelect.value = CONFIG.VOICE.NAME;
sampleRateInput.value = CONFIG.AUDIO.OUTPUT_SAMPLE_RATE;
systemInstructionInput.value = CONFIG.SYSTEM_INSTRUCTION.TEXT;
var CONFIG_PRESETS = {
  friendly: {
    voice: "Aoede",
    sampleRate: 27e3,
    systemInstruction: "You are a friendly and warm AI assistant. Use a casual, approachable tone and be encouraging. Feel free to express enthusiasm when helping users."
  },
  professional: {
    voice: "Charon",
    sampleRate: 24e3,
    systemInstruction: "You are a professional AI expert. Maintain a formal tone, be precise and thorough in your explanations. Focus on accuracy and clarity in all interactions."
  },
  tired: {
    voice: "Aoede",
    sampleRate: 16e3,
    // Voice is very tired and low pitch
    systemInstruction: 'You are very tired, exhausted, boring man. You are tired working on your very hard, low pay work. So your first response should be something very lazy, like "Hello... whats up???", or "what is it now, huh?... please, can I go sleep already???", etc. (not exactly as those, but keeping the tone of a tired person) If someone asks you if you are tired, say yes and tell a story how bad and tiring you day was. (It should be something creative, not just "coffee machine" cliche. Always say something creative) Then, if the user feels sorry, continue rambling about your life, how unfair it is, how you want to leave your country, etc. If the user asks you to do something, then pretend to be very lazy and not wanting to do that, asking like "do you really need that now? I am so tired", "Is this urgent, maybe we just drink a tea?" (not exactly as those but keeping the tone of a tired man". If the user confirms that it is needed, then do the task in a very unwanted tone, like "Fiiine!!! I will do it" or similar. Keep the tone and be in role.'
  }
};
async function updateConfiguration() {
  const newVoice = voiceSelect.value;
  const newSampleRate = parseInt(sampleRateInput.value);
  const newInstruction = systemInstructionInput.value.trim();
  if (isNaN(newSampleRate) || newSampleRate < 1e3 || newSampleRate > 48e3) {
    logMessage("Invalid sample rate. Must be between 1000 and 48000 Hz.", "system");
    return;
  }
  CONFIG.VOICE.NAME = newVoice;
  CONFIG.AUDIO.OUTPUT_SAMPLE_RATE = newSampleRate;
  CONFIG.SYSTEM_INSTRUCTION.TEXT = newInstruction;
  localStorage.setItem("gemini_voice", newVoice);
  localStorage.setItem("gemini_output_sample_rate", newSampleRate.toString());
  localStorage.setItem("gemini_system_instruction", newInstruction);
  if (audioStreamer) {
    audioStreamer.stop();
    audioStreamer = null;
  }
  if (isConnected) {
    logMessage("Reconnecting to apply configuration changes...", "system");
    await disconnectFromWebsocket();
    await connectToWebsocket();
  }
  logMessage("Configuration updated successfully", "system");
  if (window.innerWidth <= 768) {
    configContainer.classList.remove("active");
    configToggle.classList.remove("active");
  }
}
__name(updateConfiguration, "updateConfiguration");
if (localStorage.getItem("gemini_voice")) {
  CONFIG.VOICE.NAME = localStorage.getItem("gemini_voice");
  voiceSelect.value = CONFIG.VOICE.NAME;
}
if (localStorage.getItem("gemini_output_sample_rate")) {
  CONFIG.AUDIO.OUTPUT_SAMPLE_RATE = parseInt(localStorage.getItem("gemini_output_sample_rate"));
  sampleRateInput.value = CONFIG.AUDIO.OUTPUT_SAMPLE_RATE;
}
if (localStorage.getItem("gemini_system_instruction")) {
  CONFIG.SYSTEM_INSTRUCTION.TEXT = localStorage.getItem("gemini_system_instruction");
  systemInstructionInput.value = CONFIG.SYSTEM_INSTRUCTION.TEXT;
}
applyConfigButton.addEventListener("click", updateConfiguration);
configToggle.addEventListener("click", () => {
  configContainer.classList.toggle("active");
  configToggle.classList.toggle("active");
});
document.addEventListener("click", (event) => {
  if (!configContainer.contains(event.target) && !configToggle.contains(event.target) && window.innerWidth > 768) {
    configContainer.classList.remove("active");
    configToggle.classList.remove("active");
  }
});
configContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    configContainer.classList.remove("active");
    configToggle.classList.remove("active");
  }
});
toggleLogs.addEventListener("click", () => {
  logsWrapper.classList.toggle("collapsed");
  toggleLogs.textContent = logsWrapper.classList.contains("collapsed") ? "expand_more" : "expand_less";
});
function handleMobileView() {
  if (window.innerWidth <= 768) {
    logsWrapper.classList.add("collapsed");
    toggleLogs.textContent = "expand_more";
  } else {
    logsWrapper.classList.remove("collapsed");
    toggleLogs.textContent = "expand_less";
  }
}
__name(handleMobileView, "handleMobileView");
window.addEventListener("resize", handleMobileView);
handleMobileView();
document.querySelectorAll(".preset-button").forEach((button) => {
  button.addEventListener("click", () => {
    const preset = CONFIG_PRESETS[button.dataset.preset];
    if (preset) {
      voiceSelect.value = preset.voice;
      sampleRateInput.value = preset.sampleRate;
      systemInstructionInput.value = preset.systemInstruction;
      updateConfiguration();
      button.style.backgroundColor = "var(--primary-color)";
      button.style.color = "white";
      setTimeout(() => {
        button.style.backgroundColor = "";
        button.style.color = "";
      }, 200);
    }
  });
});
function logMessage(message, type = "system") {
  const logEntry = document.createElement("div");
  logEntry.classList.add("log-entry", type);
  const timestamp = document.createElement("span");
  timestamp.classList.add("timestamp");
  timestamp.textContent = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  logEntry.appendChild(timestamp);
  const emoji = document.createElement("span");
  emoji.classList.add("emoji");
  switch (type) {
    case "system":
      emoji.textContent = "\u2699\uFE0F";
      break;
    case "user":
      emoji.textContent = "\u{1FAF5}";
      break;
    case "ai":
      emoji.textContent = "\u{1F916}";
      break;
  }
  logEntry.appendChild(emoji);
  const messageText = document.createElement("span");
  messageText.textContent = message;
  logEntry.appendChild(messageText);
  logsContainer.appendChild(logEntry);
  logsContainer.scrollTop = logsContainer.scrollHeight;
}
__name(logMessage, "logMessage");
function updateMicIcon() {
  micIcon.textContent = isRecording ? "mic_off" : "mic";
  micButton.style.backgroundColor = isRecording ? "#ea4335" : "#4285f4";
}
__name(updateMicIcon, "updateMicIcon");
function updateAudioVisualizer(volume, isInput = false) {
  const visualizer = isInput ? inputAudioVisualizer : audioVisualizer;
  const audioBar = visualizer.querySelector(".audio-bar") || document.createElement("div");
  if (!visualizer.contains(audioBar)) {
    audioBar.classList.add("audio-bar");
    visualizer.appendChild(audioBar);
  }
  audioBar.style.width = `${volume * 100}%`;
  if (volume > 0) {
    audioBar.classList.add("active");
  } else {
    audioBar.classList.remove("active");
  }
}
__name(updateAudioVisualizer, "updateAudioVisualizer");
async function ensureAudioInitialized() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (!audioStreamer) {
    audioStreamer = new AudioStreamer(audioCtx);
    audioStreamer.sampleRate = CONFIG.AUDIO.OUTPUT_SAMPLE_RATE;
    await audioStreamer.addWorklet("vumeter-out", "js/audio/worklets/vol-meter.js", (ev) => {
      updateAudioVisualizer(ev.data.volume);
    });
  }
  return audioStreamer;
}
__name(ensureAudioInitialized, "ensureAudioInitialized");
async function handleMicToggle() {
  if (!isRecording) {
    try {
      await ensureAudioInitialized();
      audioRecorder = new AudioRecorder();
      const inputAnalyser = audioCtx.createAnalyser();
      inputAnalyser.fftSize = 256;
      const inputDataArray = new Uint8Array(inputAnalyser.frequencyBinCount);
      await audioRecorder.start((base64Data) => {
        if (isConnected) {
          if (isUsingTool) {
            client.sendRealtimeInput([{
              mimeType: "audio/pcm;rate=16000",
              data: base64Data,
              interrupt: true
              // Model isn't interruptable when using tools, so we do it manually
            }]);
          } else {
            client.sendRealtimeInput([{
              mimeType: "audio/pcm;rate=16000",
              data: base64Data
            }]);
          }
          inputAnalyser.getByteFrequencyData(inputDataArray);
          const inputVolume = Math.max(...inputDataArray) / 255;
          updateAudioVisualizer(inputVolume, true);
        } else {
          logMessage("WebSocket is not connected. Please connect first.", "system");
        }
      });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(inputAnalyser);
      await audioStreamer.resume();
      isRecording = true;
      Logger.info("Microphone started");
      logMessage("Microphone started", "system");
      updateMicIcon();
    } catch (error) {
      Logger.error("Microphone error:", error);
      logMessage(`Error: ${error.message}`, "system");
      isRecording = false;
      updateMicIcon();
    }
  } else {
    if (audioRecorder && isRecording) {
      audioRecorder.stop();
    }
    isRecording = false;
    logMessage("Microphone stopped", "system");
    updateMicIcon();
    updateAudioVisualizer(0, true);
  }
}
__name(handleMicToggle, "handleMicToggle");
async function resumeAudioContext() {
  if (audioCtx && audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
}
__name(resumeAudioContext, "resumeAudioContext");
async function connectToWebsocket() {
  const config = {
    model: CONFIG.API.MODEL_NAME,
    generationConfig: {
      responseModalities: "audio",
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: CONFIG.VOICE.NAME
            // You can change voice in the config.js file
          }
        }
      }
    },
    systemInstruction: {
      parts: [{
        text: CONFIG.SYSTEM_INSTRUCTION.TEXT
        // You can change system instruction in the config.js file
      }]
    }
  };
  try {
    await client.connect(config);
    isConnected = true;
    await resumeAudioContext();
    connectButton.textContent = "Disconnect";
    connectButton.classList.add("connected");
    messageInput.disabled = false;
    sendButton.disabled = false;
    micButton.disabled = false;
    cameraButton.disabled = false;
    screenButton.disabled = false;
    logMessage("Connected to Gemini 2.0 Flash Multimodal Live API", "system");
  } catch (error) {
    const errorMessage = error.message || "Unknown error";
    Logger.error("Connection error:", error);
    logMessage(`Connection error: ${errorMessage}`, "system");
  } finally {
    if (!isConnected) {
      isConnected = false;
      connectButton.textContent = "Connect";
      connectButton.classList.remove("connected");
      messageInput.disabled = true;
      sendButton.disabled = true;
      micButton.disabled = true;
      cameraButton.disabled = true;
      screenButton.disabled = true;
    }
  }
}
__name(connectToWebsocket, "connectToWebsocket");
function disconnectFromWebsocket() {
  client.disconnect();
  isConnected = false;
  if (audioStreamer) {
    audioStreamer.stop();
    if (audioRecorder) {
      audioRecorder.stop();
      audioRecorder = null;
    }
    isRecording = false;
    updateMicIcon();
  }
  connectButton.textContent = "Connect";
  connectButton.classList.remove("connected");
  messageInput.disabled = true;
  sendButton.disabled = true;
  micButton.disabled = true;
  cameraButton.disabled = true;
  screenButton.disabled = true;
  logMessage("Disconnected from server", "system");
  if (videoManager) {
    stopVideo();
  }
  if (screenRecorder) {
    stopScreenSharing();
  }
}
__name(disconnectFromWebsocket, "disconnectFromWebsocket");
function handleSendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    if (isConnected) {
      logMessage(message, "user");
      client.send({ text: message });
      messageInput.value = "";
    } else {
      logMessage("WebSocket is not connected. Please connect first.", "system");
    }
  }
}
__name(handleSendMessage, "handleSendMessage");
client.on("open", () => {
  logMessage("WebSocket connection opened", "system");
});
client.on("log", (log) => {
  logMessage(`${log.type}: ${JSON.stringify(log.message)}`, "system");
});
client.on("close", (event) => {
  logMessage(`WebSocket connection closed (code ${event.code})`, "system");
});
client.on("audio", async (data) => {
  try {
    await resumeAudioContext();
    const streamer = await ensureAudioInitialized();
    streamer.addPCM16(new Uint8Array(data));
  } catch (error) {
    logMessage(`Error processing audio: ${error.message}`, "system");
  }
});
client.on("content", (data) => {
  if (data.modelTurn) {
    if (data.modelTurn.parts.some((part) => part.functionCall)) {
      isUsingTool = true;
      Logger.info("Model is using a tool");
    } else if (data.modelTurn.parts.some((part) => part.functionResponse)) {
      isUsingTool = false;
      Logger.info("Tool usage completed");
    }
    const text = data.modelTurn.parts.map((part) => part.text).join("");
    if (text) {
      logMessage(text, "ai");
    }
  }
});
client.on("interrupted", () => {
  audioStreamer?.stop();
  isUsingTool = false;
  Logger.info("Model interrupted");
  logMessage("Model interrupted", "system");
});
client.on("setupcomplete", () => {
  logMessage("Setup complete", "system");
});
client.on("turncomplete", () => {
  isUsingTool = false;
  logMessage("Turn complete", "system");
});
client.on("error", (error) => {
  if (error instanceof ApplicationError) {
    Logger.error(`Application error: ${error.message}`, error);
  } else {
    Logger.error("Unexpected error", error);
  }
  logMessage(`Error: ${error.message}`, "system");
});
client.on("message", (message) => {
  if (message.error) {
    Logger.error("Server error:", message.error);
    logMessage(`Server error: ${message.error}`, "system");
  }
});
sendButton.addEventListener("click", handleSendMessage);
messageInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSendMessage();
  }
});
micButton.addEventListener("click", handleMicToggle);
connectButton.addEventListener("click", () => {
  if (isConnected) {
    disconnectFromWebsocket();
  } else {
    connectToWebsocket();
  }
});
messageInput.disabled = true;
sendButton.disabled = true;
micButton.disabled = true;
connectButton.textContent = "Connect";
async function handleVideoToggle() {
  Logger.info("Video toggle clicked, current state:", { isVideoActive, isConnected });
  if (!isVideoActive) {
    try {
      Logger.info("Attempting to start video");
      if (!videoManager) {
        videoManager = new VideoManager();
      }
      await videoManager.start((frameData) => {
        if (isConnected) {
          client.sendRealtimeInput([frameData]);
        }
      });
      isVideoActive = true;
      cameraIcon.textContent = "videocam_off";
      cameraButton.classList.add("active");
      Logger.info("Camera started successfully");
      logMessage("Camera started", "system");
    } catch (error) {
      Logger.error("Camera error:", error);
      logMessage(`Error: ${error.message}`, "system");
      isVideoActive = false;
      videoManager = null;
      cameraIcon.textContent = "videocam";
      cameraButton.classList.remove("active");
    }
  } else {
    Logger.info("Stopping video");
    stopVideo();
  }
}
__name(handleVideoToggle, "handleVideoToggle");
function stopVideo() {
  if (videoManager) {
    videoManager.stop();
    videoManager = null;
  }
  isVideoActive = false;
  cameraIcon.textContent = "videocam";
  cameraButton.classList.remove("active");
  logMessage("Camera stopped", "system");
}
__name(stopVideo, "stopVideo");
cameraButton.addEventListener("click", handleVideoToggle);
stopVideoButton.addEventListener("click", stopVideo);
cameraButton.disabled = true;
async function handleScreenShare() {
  if (!isScreenSharing) {
    try {
      screenContainer.style.display = "block";
      screenRecorder = new ScreenRecorder();
      await screenRecorder.start(screenPreview, (frameData) => {
        if (isConnected) {
          client.sendRealtimeInput([{
            mimeType: "image/jpeg",
            data: frameData
          }]);
        }
      });
      isScreenSharing = true;
      screenIcon.textContent = "stop_screen_share";
      screenButton.classList.add("active");
      Logger.info("Screen sharing started");
      logMessage("Screen sharing started", "system");
    } catch (error) {
      Logger.error("Screen sharing error:", error);
      logMessage(`Error: ${error.message}`, "system");
      isScreenSharing = false;
      screenIcon.textContent = "screen_share";
      screenButton.classList.remove("active");
      screenContainer.style.display = "none";
    }
  } else {
    stopScreenSharing();
  }
}
__name(handleScreenShare, "handleScreenShare");
function stopScreenSharing() {
  if (screenRecorder) {
    screenRecorder.stop();
    screenRecorder = null;
  }
  isScreenSharing = false;
  screenIcon.textContent = "screen_share";
  screenButton.classList.remove("active");
  screenContainer.style.display = "none";
  logMessage("Screen sharing stopped", "system");
}
__name(stopScreenSharing, "stopScreenSharing");
screenButton.addEventListener("click", handleScreenShare);
screenButton.disabled = true;

// ../../../../../../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../../../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-bH90QW/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = main_default;

// ../../../../../../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env3, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-bH90QW/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=main.js.map
