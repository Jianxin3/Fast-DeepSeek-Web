# DeepSeek 极速CSS优化 (自动底部)

这是一个轻量级用户脚本，利用现代 CSS 属性 `content-visibility` 大幅提升 DeepSeek 网页版长对话的滚动性能，并在页面加载后自动跳转到底部（最新消息），同时保留所有原生功能（复制按钮、点赞等）。

## ✨ 功能特点

- **丝滑滚动** – 使用 `content-visibility: auto` 跳过视口外消息的渲染，大幅减少布局和绘制计算。
- **自动跳转底部** – 页面加载完成后自动滚动到最新消息，无需手动操作。
- **零干扰** – 仅针对真实的消息元素进行优化，输入框、侧边栏、动态指示器（如思考中）不受影响。
- **兼容性强** – 基于你提供的精确哈希类名 `ca1ef5b2` 定位，并提供常量供懂技术的用户自行修改。
- **轻量无副作用** – 纯 CSS 优化，不修改 DOM 结构，所有按钮功能完好。

## 📦 安装方法

1. 安装用户脚本管理器，如 [Tampermonkey](https://www.tampermonkey.net/)（支持 Chrome/Edge/Firefox）或 [Greasemonkey](https://www.greasespot.net/)（Firefox）。
2. 点击 [此处](https://github.com/Jianxin3/Fast-DeepSeek-Web/raw/main/script.user.js) 直接安装，或新建脚本并粘贴上方提供的代码。
3. 打开 [DeepSeek 聊天页面](https://chat.deepseek.com/)，享受流畅的对话体验。

## 🛠️ 使用方法

安装后脚本自动生效，无需任何配置。如果遇到某些动态元素（如“思考中”指示器）出现闪烁，可以手动添加 CSS 排除规则，详见下方“故障排除”。

## ⚙️ 工作原理

脚本注入了一段简单的 CSS 规则：

```css
div.ca1ef5b2.ds-scroll-area > div:first-child > div {
    content-visibility: auto !important;
    contain-intrinsic-size: 0 200px;
}
```

- `content-visibility: auto` 告诉浏览器只渲染靠近视口的消息，极大减少渲染工作量。
- `contain-intrinsic-size` 为未渲染的消息提供预估高度，防止滚动条抖动。
- 附加规则处理包含代码块的消息（`:has(pre)`），提高预估高度。
- 一小段 JavaScript 代码等待对话加载完成后自动滚动到底部。

## 🔍 故障排除

### “思考中”指示器闪烁
如果发送消息后出现闪烁，请按以下步骤解决：
1. 打开浏览器开发者工具（F12 → 元素面板）。
2. 点击左上角元素选择器，单击闪烁的指示器元素。
3. 查看其类名（例如 `._5ab5d64`），然后在脚本的 `injectStyles` 函数中添加一条 CSS 排除规则，例如：
   ```css
   ._5ab5d64 {
       content-visibility: visible !important;
   }
   ```
4. 保存脚本并刷新页面。

### 脚本似乎没有生效
- 确认已安装最新版本脚本。
- 打开浏览器控制台（F12 → 控制台），查看是否有 `✅ CSS优化已注入` 的日志。如果没有，说明脚本未运行。
- 检查类名 `ca1ef5b2` 是否仍然有效（DeepSeek 页面更新可能导致哈希类名变化）。如有变化，请修改脚本开头的 `MSG_SCROLL_AREA_ID` 常量为新的类名。

## 🌐 兼容性

- **浏览器**：Chrome 85+、Edge 85+、Firefox 125+（需启用 `layout.css.content-visibility.enabled` 标志）—— 所有现代浏览器均支持。
- **DeepSeek 网页版**：基于当前页面结构（2025年初）测试通过。若未来页面更新，可能需要调整哈希类名。

## 🤝 贡献

如果你发现 DeepSeek 页面结构变化导致脚本失效，或有更好的优化思路，欢迎提交 Issue 或 Pull Request 至 [GitHub 仓库](https://github.com/Jianxin3/Fast-DeepSeek-Web)。

提交问题时请提供：
- 浏览器版本。
- 问题截图。
- 控制台错误信息（如有）。

## 📄 许可证

本项目采用 MIT 许可证，详情请见 [LICENSE](LICENSE) 文件。

## 👤 作者

**Jianxin223**  
- GitHub：[@Jianxin3](https://github.com/Jianxin3)

如果这个脚本对你有帮助，欢迎给仓库点个 Star ⭐ 或分享给更多人！

---

*Happy chatting! 🚀*
