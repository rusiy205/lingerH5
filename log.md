# 2024-06-09

- 创建 index.html，包含顶部卡包图标、角色名、视频播放器、聊天区、输入框和语音按钮。
- 创建 style.css，适配手机竖屏，布局美化。
- 创建 main.js，实现本地聊天消息显示、语音输入（Web Speech API）、卡包按钮预留。
- 新建 log.md 记录日志。
- 约定视频文件为 assets/linger.mp4。

# 2024-06-10

- 自动创建 assets 文件夹，方便用户放置视频。
- 大幅美化 style.css，采用苹果iOS风格（圆角、毛玻璃、渐变、阴影、优雅字体、简洁气泡、现代输入区等）。

# 2024-06-11

- 接入阿里通义千问角色扮演专用 qwen-plus-character 模型，用户输入后自动请求API并显示灵儿的真实回复。
- 新增 api/qwen.js，作为vercel serverless function代理阿里千问API，解决CORS问题，前端fetch地址改为/api/qwen。
- 修正前端解析阿里千问新版API返回格式，支持data.output.text，灵儿回复可正常显示。
- 优化布局，视频区加.video-wrapper，chat-area最大高度限制，保证灵儿视频主视觉始终可见。
- 优化视频体验：默认自动循环播放且不显示播放进度条。 