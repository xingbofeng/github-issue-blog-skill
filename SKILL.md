---
name: github-blog-generator
description: 根据 GitHub Issues 生成精美的博客网站。当用户想要基于 GitHub Issues 创建博客、将 issues 转换为博客站点，或使用 GitHub 作为 CMS 构建个人博客时使用。支持基于 Vue.js 的单页应用，具有 Markdown 渲染、搜索、筛选和响应式设计功能。
---

# GitHub Issues 博客生成器

根据 GitHub Issues 生成精美、响应式的博客网站。此技能创建一个基于 Vue.js 的单页应用，动态获取并展示 GitHub Issues 作为博客文章。

## 功能特性

- **动态加载 Issues**：实时从 GitHub API 获取 issues
- **Markdown 支持**：完整的 Markdown 渲染和语法高亮
- **搜索与筛选**：按标题/内容搜索，按标签筛选文章
- **响应式设计**：使用 Tailwind CSS 的移动端友好布局
- **单页应用**：Vue.js 驱动的 SPA，支持基于 hash 的路由
- **简洁 UI**：现代简约设计，流畅的过渡动画

## 工作流程

### 步骤 1：收集仓库信息

询问用户以下信息：
- GitHub 仓库所有者（用户名或组织名）
- GitHub 仓库名称
- 博客标题（可选，默认为 "{owner} 的博客"）
- 作者名称（可选，默认为仓库所有者）
- 头像 URL（可选，默认为 GitHub 头像）
- GitHub Personal Access Token（可选，用于提高 API 速率限制）

### 步骤 2：生成博客

使用 `scripts/generate-blog.js` 脚本生成博客：

```bash
node scripts/generate-blog.js <repo-owner> <repo-name> [选项]
```

选项：
- `--output <路径>`：输出目录（默认：./blog）
- `--title <标题>`：博客标题
- `--author <名称>`：作者名称
- `--avatar <url>`：头像 URL
- `--token <token>`：GitHub Personal Access Token（可选）

示例：
```bash
node scripts/generate-blog.js xingbofeng xingbofeng.github.io --output ./my-blog --title "Counterxing 的博客"
```

使用 token 提高 API 速率限制：
```bash
node scripts/generate-blog.js xingbofeng xingbofeng.github.io --token ghp_xxxxxxxxxxxx --output ./my-blog
```

### 步骤 3：验证并指导用户

生成后：
1. 确认博客创建成功
2. 说明博客从 GitHub API 动态获取 issues
3. 提醒用户 issues 必须是"打开"状态才会显示为博客文章
4. 提供部署说明（GitHub Pages、Netlify、Vercel 等）

## 重要说明

### GitHub Issues 作为博客文章

- 只有**打开状态**的 issues 会显示为博客文章
- Pull requests 会自动过滤掉
- Issue 正文会渲染为 Markdown
- Issue 标签会成为文章标签
- Issue 创建日期即为文章发布日期

### 自定义

生成的博客可以通过以下方式自定义：
- 直接编辑 `index.html` 文件
- 修改 `<style>` 部分的 CSS 样式
- 调整 `<script>` 部分的 Vue.js 逻辑
- 更改 Tailwind CSS 类名

### 部署

博客是一个静态 HTML 文件，可以部署到：
- **GitHub Pages**：推送到 `gh-pages` 分支或 `docs/` 文件夹
- **Netlify**：拖放输出文件夹
- **Vercel**：导入仓库
- **任何静态托管**：上传 HTML 文件

## 使用示例

**用户**："帮我根据 GitHub issues 创建一个博客"

**助手**：
1. 询问仓库详情（所有者、名称）
2. 使用适当的参数运行生成脚本
3. 验证输出
4. 提供部署指导

**用户**："为我的仓库 'username/blog-repo' 生成一个博客，标题为 '我的技术博客'"

**助手**：
```bash
node scripts/generate-blog.js username blog-repo --title "我的技术博客" --output ./blog
```

## 故障排除

### 没有文章显示
- 确保仓库有打开状态的 issues
- 检查 issues 不是 pull requests
- 验证仓库是公开的或已配置 API 访问权限

### 样式问题
- 博客使用 CDN 托管的库（Tailwind、Vue、Marked、DOMPurify）
- 确保有互联网连接以加载 CDN 资源
- 检查浏览器控制台是否有错误

### API 速率限制

- GitHub API 有速率限制：
  - **未认证请求**：每小时 60 次
  - **使用 token 认证**：每小时 5000 次
- 推荐为生产环境配置 GitHub Personal Access Token
- 创建 token：GitHub Settings → Developer settings → Personal access tokens → Generate new token
- Token 只需要 `public_repo` 权限（如果是公开仓库）
- 使用 `--token` 参数传入 token 即可提高限制
