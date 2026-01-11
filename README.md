# GitHub Issues 博客生成器

一个用于根据 GitHub Issues 自动生成精美博客网站的 Claude Code Skill。

## 功能特性

- 🚀 **动态加载** - 实时从 GitHub API 获取 issues
- 📝 **Markdown 支持** - 完整的 Markdown 渲染和语法高亮
- 🔍 **搜索筛选** - 按标题/内容搜索，按标签筛选
- 📱 **响应式设计** - 移动端友好的 Tailwind CSS 布局
- ⚡ **单页应用** - Vue.js 驱动的流畅体验
- 🎨 **简洁美观** - 现代简约设计风格

## 快速开始

### 安装 Skill

将 `github-blog-generator.skill` 文件安装到 Claude Code。

### 使用方法

在 Claude Code 中，直接告诉 Claude：

```
帮我根据 GitHub issues 创建一个博客
```

或者更具体地：

```
为我的仓库 xingbofeng/xingbofeng.github.io 生成一个博客，标题为 "Counterxing 的博客"
```

### 手动使用脚本

你也可以直接使用生成脚本：

```bash
node scripts/generate-blog.js <repo-owner> <repo-name> [选项]
```

**选项：**
- `--output <路径>` - 输出目录（默认：./blog）
- `--title <标题>` - 博客标题（默认："{owner} 的博客"）
- `--author <名称>` - 作者名称（默认：仓库所有者）
- `--avatar <url>` - 头像 URL（默认：GitHub 头像）
- `--token <token>` - GitHub Personal Access Token（可选，提高 API 速率限制）

**示例：**

```bash
node scripts/generate-blog.js xingbofeng xingbofeng.github.io \
  --title "Counterxing 的博客" \
  --output ./my-blog
```

**使用 token 避免速率限制：**

```bash
node scripts/generate-blog.js xingbofeng xingbofeng.github.io \
  --token ghp_xxxxxxxxxxxx \
  --output ./my-blog
```

## 部署

生成的博客是一个静态 HTML 文件，可以部署到：

- **GitHub Pages** - 推送到 `gh-pages` 分支或 `docs/` 文件夹
- **Netlify** - 拖放输出文件夹
- **Vercel** - 导入仓库
- **任何静态托管服务**

## 工作原理

1. 博客从 GitHub API 动态获取 issues
2. 只显示打开状态的 issues（自动过滤 PR）
3. Issue 正文渲染为 Markdown
4. Issue 标签成为文章标签
5. 支持搜索、筛选和详情页查看

## 技术栈

- **Vue.js 3** - 响应式框架
- **Tailwind CSS** - 样式框架
- **Marked.js** - Markdown 渲染
- **DOMPurify** - XSS 防护
- **GitHub API** - 数据源

## 注意事项

- 仓库必须有打开状态的 issues 才会显示文章
- GitHub API 速率限制：
  - 未认证：60 次/小时
  - 使用 token：5000 次/小时
- 推荐为生产环境配置 GitHub Personal Access Token
- 创建 token：GitHub Settings → Developer settings → Personal access tokens
- Token 只需要 `public_repo` 权限（公开仓库）

## 示例

查看示例博客：[Counterxing's Blog](https://xingbofeng.github.io)

## 许可证

MIT License

## 作者

Created with ❤️ by Claude Code
