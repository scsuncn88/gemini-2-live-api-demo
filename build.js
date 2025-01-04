const fs = require('fs');
const path = require('path');

// 读取 index.html
const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 注入环境变量到 window.__ENV__
// 检查并记录缺失的环境变量
const requiredEnvVars = [
  'API_KEY',
  'API_BASE_URL',
  'API_VERSION',
  'API_MODEL_NAME',
  'SYSTEM_INSTRUCTION_TEXT',
  'VOICE_NAME',
  'AUDIO_INPUT_SAMPLE_RATE',
  'AUDIO_OUTPUT_SAMPLE_RATE',
  'AUDIO_BUFFER_SIZE',
  'AUDIO_CHANNELS'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.warn(`Warning: Environment variable ${envVar} is missing`);
  }
});

const envVars = {
  API_KEY: process.env.API_KEY || 'default_api_key',
  API_BASE_URL: process.env.API_BASE_URL || 'wss://generativelanguage.googleapis.com/ws',
  API_VERSION: process.env.API_VERSION || 'v1alpha',
  API_MODEL_NAME: process.env.API_MODEL_NAME || 'models/gemini-2.0-flash-exp',
  SYSTEM_INSTRUCTION_TEXT: process.env.SYSTEM_INSTRUCTION_TEXT || 'You are my helpful assistant...',
  VOICE_NAME: process.env.VOICE_NAME || 'Aoede',
  AUDIO_INPUT_SAMPLE_RATE: process.env.AUDIO_INPUT_SAMPLE_RATE || 16000,
  AUDIO_OUTPUT_SAMPLE_RATE: process.env.AUDIO_OUTPUT_SAMPLE_RATE || 24000,
  AUDIO_BUFFER_SIZE: process.env.AUDIO_BUFFER_SIZE || 7680,
  AUDIO_CHANNELS: process.env.AUDIO_CHANNELS || 1
};

const envScript = `
  <script>
    window.__ENV__ = ${JSON.stringify(envVars)};
  </script>
`;

// 在head标签结束前插入环境变量脚本
content = content.replace('</head>', `${envScript}</head>`);

// 写入修改后的内容
fs.writeFileSync(indexPath, content);

console.log('Environment variables injected successfully');
