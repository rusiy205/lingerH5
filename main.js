// 聊天区和表单
const chatArea = document.getElementById('chatArea');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const voiceBtn = document.getElementById('voiceBtn');

// 角色设定
const role = {
  name: '灵儿',
  prompt: '你是灵儿，一个爱学习、热爱天文的小女孩。请用活泼、好奇的语气回答问题。',
  video: 'assets/linger.mp4'
};

// 聊天消息渲染
function addMessage(text, sender = 'user') {
  const msg = document.createElement('div');
  msg.className = 'msg ' + sender;
  msg.innerText = text;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// 发送消息
chatForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  chatInput.value = '';
  addMessage('灵儿思考中...', 'bot');
  const botMsgDiv = chatArea.querySelector('.msg.bot:last-child');
  try {
    const reply = await fetchQwenCharacterAPI(text);
    botMsgDiv.innerText = reply;
  } catch (err) {
    botMsgDiv.innerText = '出错了，请稍后重试';
  }
});

// 语音输入（Web Speech API）
let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'zh-CN';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
  };
  recognition.onerror = function() {
    alert('语音识别出错，请重试');
  };
}
voiceBtn.addEventListener('click', function() {
  if (recognition) {
    recognition.start();
  } else {
    alert('当前浏览器不支持语音输入');
  }
});

// 卡包按钮（预留，暂不弹窗）
document.getElementById('cardpackBtn').addEventListener('click', function() {
  alert('当前只有灵儿一个角色，后续可扩展更多角色！');
});

// 调用阿里通义千问角色扮演API
async function fetchQwenCharacterAPI(userInput) {
  const res = await fetch('/api/qwen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInput })
  });
  if (!res.ok) throw new Error('API请求失败');
  const data = await res.json();
  // 兼容新版API返回格式
  if (data && data.output && data.output.text) {
    return data.output.text.trim();
  } else {
    throw new Error('API返回格式异常');
  }
} 