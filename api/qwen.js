export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    let userInput = '';
    // 兼容vercel的req.body解析
    if (req.body && typeof req.body === 'object') {
      userInput = req.body.userInput;
    } else {
      // 兼容raw body
      const body = await new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => resolve(JSON.parse(data)));
      });
      userInput = body.userInput;
    }
    const body = {
      model: 'qwen-plus-character',
      input: {
        messages: [
          { role: 'system', content: '你是灵儿，一个爱学习、热爱天文的小女孩。请用活泼、好奇的语气回答问题。' },
          { role: 'user', content: userInput }
        ]
      }
    };
    const apiRes = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer sk-8013e1fe9a3340829050082feb3eb4ce`
      },
      body: JSON.stringify(body)
    });
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
} 