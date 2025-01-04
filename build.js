const fs = require('fs');
const path = require('path');

// 读取 index.html
const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 注入环境变量到 window.__ENV__
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
