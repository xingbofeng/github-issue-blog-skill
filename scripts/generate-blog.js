#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * 生成基于 GitHub Issues 的博客
 *
 * 用法：
 *   node generate-blog.js <repo-owner> <repo-name> [选项]
 *
 * 选项：
 *   --output <路径>       输出目录（默认：./blog）
 *   --title <标题>        博客标题（默认：仓库名）
 *   --author <名称>       作者名称（默认：仓库所有者）
 *   --avatar <url>        头像 URL（默认：GitHub 头像）
 */

function parseArgs() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.error('用法: node generate-blog.js <repo-owner> <repo-name> [选项]');
        console.error('');
        console.error('选项:');
        console.error('  --output <路径>       输出目录（默认：./blog）');
        console.error('  --title <标题>        博客标题（默认："<owner> 的博客"）');
        console.error('  --author <名称>       作者名称（默认：仓库所有者）');
        console.error('  --avatar <url>        头像 URL（默认：GitHub 头像）');
        process.exit(1);
    }

    const config = {
        repoOwner: args[0],
        repoName: args[1],
        outputDir: './blog',
        blogTitle: null,
        authorName: null,
        avatarUrl: null
    };

    for (let i = 2; i < args.length; i++) {
        switch (args[i]) {
            case '--output':
                config.outputDir = args[++i];
                break;
            case '--title':
                config.blogTitle = args[++i];
                break;
            case '--author':
                config.authorName = args[++i];
                break;
            case '--avatar':
                config.avatarUrl = args[++i];
                break;
        }
    }

    // Set defaults
    config.blogTitle = config.blogTitle || `${config.repoOwner} 的博客`;
    config.authorName = config.authorName || config.repoOwner;
    config.avatarUrl = config.avatarUrl || `https://avatars.githubusercontent.com/${config.repoOwner}`;

    return config;
}

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'GitHub-Blog-Generator'
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                } else {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        }).on('error', reject);
    });
}

async function generateBlog(config) {
    console.log('正在生成 GitHub Issues 博客...');
    console.log(`仓库: ${config.repoOwner}/${config.repoName}`);
    console.log(`输出: ${config.outputDir}`);
    console.log('');

    // Create output directory
    if (!fs.existsSync(config.outputDir)) {
        fs.mkdirSync(config.outputDir, { recursive: true });
    }

    // Read template
    const templatePath = path.join(__dirname, '../assets/blog-template.html');
    let template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders
    template = template.replace(/\{\{BLOG_TITLE\}\}/g, config.blogTitle);
    template = template.replace(/\{\{AUTHOR_NAME\}\}/g, config.authorName);
    template = template.replace(/\{\{AVATAR_URL\}\}/g, config.avatarUrl);
    template = template.replace(/\{\{REPO_OWNER\}\}/g, config.repoOwner);
    template = template.replace(/\{\{REPO_NAME\}\}/g, config.repoName);
    template = template.replace(/\{\{GITHUB_REPO_URL\}\}/g, `https://github.com/${config.repoOwner}/${config.repoName}`);

    // Write index.html
    const outputPath = path.join(config.outputDir, 'index.html');
    fs.writeFileSync(outputPath, template);

    console.log(`✓ 已生成: ${outputPath}`);
    console.log('');
    console.log('博客生成成功！');
    console.log('');
    console.log('下一步:');
    console.log(`  1. 在浏览器中打开 ${outputPath} 查看博客`);
    console.log(`  2. 将 ${config.outputDir} 目录部署到 GitHub Pages 或任何静态托管服务`);
    console.log('');
    console.log('注意: 博客会从 GitHub API 动态获取 issues。');
    console.log('      请确保你的仓库有打开状态的 issues 以显示为博客文章。');
}

// Main execution
const config = parseArgs();
generateBlog(config).catch(err => {
    console.error('错误:', err.message);
    process.exit(1);
});
