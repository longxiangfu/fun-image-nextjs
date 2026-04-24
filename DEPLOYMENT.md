# Vercel 部署指南

本文档介绍如何将搞怪图片互动乐园部署到Vercel。

## 方法一：通过Vercel Dashboard部署

1. **准备代码**
   - 将项目代码推送到GitHub、GitLab或Bitbucket仓库
   - 确保仓库包含所有必要的文件

2. **导入项目到Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 登录或注册账户
   - 点击"Add New Project"
   - 选择你的Git仓库并导入

3. **配置项目**
   - Vercel会自动检测Next.js项目
   - 构建设置通常不需要修改：
     ```
     Build Command: npm run build
     Output Directory: .next
     Install Command: npm install
     ```
   - 点击"Deploy"按钮开始部署

4. **部署完成**
   - 等待部署完成（通常需要1-2分钟）
   - Vercel会提供一个URL，如：`https://your-project.vercel.app`
   - 你可以自定义域名

## 方法二：通过Vercel CLI部署

1. **安装Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   cd fun-image-nextjs
   vercel
   ```

4. **按照提示操作**
   - 选择部署范围（个人账户或团队）
   - 确认项目设置
   - 等待部署完成

5. **生产环境部署**
   ```bash
   vercel --prod
   ```

## 环境变量配置

如果需要配置环境变量（如API密钥），在Vercel Dashboard中：

1. 进入项目设置
2. 选择"Environment Variables"
3. 添加环境变量：
   - Name: 变量名
   - Value: 变量值
   - 选择环境（Production, Preview, Development）

## 自定义域名

1. 在Vercel Dashboard中进入项目设置
2. 选择"Domains"
3. 添加你的域名（如：`fun-image.yourdomain.com`）
4. 按照提示配置DNS记录

## 监控和日志

- **实时日志**: 在Vercel Dashboard查看实时部署日志
- **函数日志**: 查看Serverless函数的执行日志
- **分析**: 查看访问量、性能指标等

## 性能优化建议

1. **启用CDN**: Vercel默认提供全球CDN加速
2. **图片优化**: 使用Next.js Image组件优化图片加载
3. **代码分割**: Next.js自动进行代码分割
4. **缓存策略**: 合理设置缓存头

## 常见问题

### Q: 部署失败怎么办？
A: 检查构建日志，常见原因：
- 依赖安装失败
- TypeScript类型错误
- 构建超时

### Q: 如何回滚到之前的版本？
A: 
1. 进入项目Dashboard
2. 选择"Deployments"
3. 找到之前的部署版本
4. 点击"..."菜单选择"Promote to Production"

### Q: 如何设置自动部署？
A: 
- Vercel默认会在每次Git push时自动部署
- 可以在设置中配置GitHub Actions集成

### Q: 免费版有什么限制？
A: 
- 每月100GB带宽
- 无限构建
- 100个边缘函数调用/天
- 团队协作功能有限

## 成本估算

- **Hobby版（免费）**: 适合个人项目和小型应用
- **Pro版（$20/月）**: 适合生产环境，提供更多资源
- **Enterprise版**: 定制方案，适合大型企业

## 更新部署

每次代码更新后：

1. 推送代码到Git仓库
2. Vercel自动触发部署
3. 或手动触发：
   ```bash
   vercel --prod
   ```

## 支持

如有问题，可以：
- 查看[Vercel文档](https://vercel.com/docs)
- 联系Vercel支持团队
- 在社区寻求帮助

## 安全建议

1. **API密钥保护**: 使用环境变量存储敏感信息
2. **HTTPS**: Vercel默认提供HTTPS
3. **访问控制**: 可以配置密码保护或白名单
4. **定期更新**: 保持依赖包更新
