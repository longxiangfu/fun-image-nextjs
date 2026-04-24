# 搞怪图片互动乐园 - AI智能版

一个基于Next.js和Vercel部署的AI图片互动应用，支持人脸识别、物体检测和丰富的动画效果。

## 功能特点

- 🤖 **AI智能识别**：使用MediaPipe Face Mesh进行人脸识别，HuggingFace DETR进行物体检测
- 🎭 **丰富动画效果**：针对不同面部区域和物体类型的专门动画
- ✨ **粒子系统**：精美的粒子特效系统
- 📱 **响应式设计**：支持桌面和移动设备
- 🚀 **Next.js框架**：基于React 18和Next.js的最新特性

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + 自定义CSS
- **AI模型**: 
  - MediaPipe Face Mesh (人脸识别)
  - HuggingFace DETR ResNet-50 (物体检测)
- **部署**: Vercel

## 本地开发

1. 安装依赖：
```bash
npm install
```

2. 运行开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 构建部署

### 构建项目
```bash
npm run build
```

### 部署到Vercel

1. 将代码推送到Git仓库
2. 在Vercel中导入项目
3. Vercel会自动检测Next.js并配置构建设置
4. 点击部署即可

或使用Vercel CLI：
```bash
npm install -g vercel
vercel
```

## 使用说明

1. 点击上传区域或拖拽图片到页面
2. AI会自动识别图片中的人脸和物体
3. 点击图片的不同区域会触发相应的动画效果：
   - **眼睛**：眨眼动画
   - **嘴巴**：说话动画
   - **鼻子**：打喷嚏动画
   - **耳朵**：摆动动画
   - **眉毛**：表情动画
   - **额头**：思考动画
   - **下巴**：摆动动画
   - **脸部**：害羞动画
   - **物体**：根据物体类型显示不同动画

## 项目结构

```
fun-image-nextjs/
├── app/
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 主页面组件
├── types/
│   └── index.ts             # TypeScript类型定义
├── public/                  # 静态资源
├── vercel.json             # Vercel配置
├── package.json            # 项目依赖
├── tsconfig.json           # TypeScript配置
└── tailwind.config.ts      # Tailwind CSS配置
```

## 依赖说明

主要依赖：
- `next`: Next.js框架
- `react`: React库
- `react-dom`: React DOM
- `typescript`: TypeScript支持
- `tailwindcss`: CSS框架

## 注意事项

1. **AI模型加载**：MediaPipe和HuggingFace模型通过CDN加载，首次使用可能需要一些时间
2. **API限制**：HuggingFace免费API有使用限制，建议在生产环境中配置自己的API密钥
3. **浏览器兼容性**：建议使用现代浏览器（Chrome、Firefox、Safari、Edge）

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

## 联系方式

如有问题或建议，请通过Issue联系我们。
