const fs = require('fs');
const path = require('path');

// 读取环境变量
const envVars = {
  API_KEY: process.env.API_KEY,
  API_BASE_URL: process.env.API_BASE_URL,
  API_VERSION: process.env.API_VERSION,
  API_MODEL_NAME: process.env.API_MODEL_NAME,
  SYSTEM_INSTRUCTION_TEXT: process.env.SYSTEM_INSTRUCTION_TEXT,
  VOICE_NAME: process.env.VOICE_NAME,
  AUDIO_INPUT_SAMPLE_RATE: process.env.AUDIO_INPUT_SAMPLE_RATE,
  AUDIO_OUTPUT_SAMPLE_RATE: process.env.AUDIO_OUTPUT_SAMPLE_RATE,
  AUDIO_BUFFER_SIZE: process.env.AUDIO_BUFFER_SIZE,
  AUDIO_CHANNELS: process.env.AUDIO_CHANNELS
};

// 读取 index.html
const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 替换占位符
for (const [key, value] of Object.entries(envVars)) {
  const placeholder = `%%${key}%%`;
  content = content.replace(new RegExp(placeholder, 'g'), value);
}

// 写入修改后的内容
fs.writeFileSync(indexPath, content);

console.log('Environment variables injected successfully');
