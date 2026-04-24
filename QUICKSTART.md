# 快速开始指南

## 5分钟快速部署

### 第一步：本地运行

```bash
# 1. 进入项目目录
cd fun-image-nextjs

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

打开浏览器访问：http://localhost:3000

### 第二步：部署到Vercel

#### 方法A：通过Git仓库（推荐）

1. **推送到GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/fun-image-nextjs.git
git push -u origin main
```

2. **在Vercel部署**
   - 访问 https://vercel.com
   - 点击 "Add New Project"
   - 选择你的GitHub仓库
   - 点击 "Deploy"

#### 方法B：通过Vercel CLI

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 生产环境部署
vercel --prod
```

## 项目结构说明

```
fun-image-nextjs/
├── app/
│   ├── page.tsx          # 主页面（所有核心逻辑）
│   ├── layout.tsx        # 页面布局
│   └── globals.css       # 全局样式
├── types/
│   └── index.ts          # TypeScript类型定义
├── public/               # 静态资源
├── vercel.json          # Vercel配置
└── package.json         # 项目配置
```

## 核心功能

### ✅ 已实现
- 图片上传（点击/拖拽）
- AI人脸识别
- 物体检测
- 粒子系统基础框架
- 响应式设计

### 🚧 待完善
- 点击交互动画
- 更多粒子效果
- 手势识别

## 常用命令

```bash
# 开发
npm run dev          # 启动开发服务器

# 构建
npm run build        # 构建生产版本
npm start           # 运行生产版本

# 代码检查
npm run lint        # 运行ESLint

# 部署
vercel             # 预览部署
vercel --prod      # 生产部署
```

## 配置说明

### 环境变量（可选）

创建 `.env.local` 文件：
```env
# 如果需要使用自己的HuggingFace API密钥
HUGGINGFACE_API_KEY=your_api_key_here
```

### 自定义域名

在Vercel Dashboard中：
1. 进入项目设置
2. 选择 "Domains"
3. 添加你的域名

## 故障排除

### 问题：端口被占用
```bash
# 使用其他端口
npm run dev -- -p 3001
```

### 问题：依赖安装失败
```bash
# 清除缓存重新安装
rm -rf node_modules package-lock.json
npm install
```

### 问题：构建失败
```bash
# 清除.next目录
rm -rf .next
npm run build
```

## 下一步

1. **完善动画系统**
   - 查看 `MIGRATION_SUMMARY.md` 了解待实现功能
   - 参考 `fun-image.html` 中的动画函数

2. **添加新功能**
   - 用户认证
   - 图片保存
   - 社交分享

3. **性能优化**
   - 图片压缩
   - 懒加载
   - 缓存策略

## 获取帮助

- 📖 查看 `README.md` 了解详细文档
- 🚀 查看 `DEPLOYMENT.md` 了解部署详情
- 📝 查看 `MIGRATION_SUMMARY.md` 了解迁移过程

## 技术支持

如有问题，请：
1. 查看项目文档
2. 检查Vercel部署日志
3. 在GitHub创建Issue

---

**享受你的Next.js之旅！** 🚀
