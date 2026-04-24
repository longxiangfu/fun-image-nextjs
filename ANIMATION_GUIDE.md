# 动画系统说明文档

## 概述

本项目实现了一个完整的交互式动画系统，基于AI识别结果触发各种精美的动画效果。系统包含面部区域动画、物体特定动画、创意效果动画和手部动画。

## 动画分类

### 1. 面部区域动画

当用户点击图片中的人脸不同部位时，会触发相应的动画效果：

#### 眼睛动画 (`animEyeBlink`)
- **触发区域**: 左眼、右眼
- **动画效果**: 
  - 眼睛眨眼动画
  - 眼睑覆盖效果
  - 睫毛细节
  - 星星粒子闪烁

#### 嘴巴动画 (`animMouthTalk`)
- **触发区域**: 嘴巴
- **动画效果**:
  - 嘴巴开合动画
  - 牙齿显示
  - 舌头摆动
  - 声波粒子扩散

#### 鼻子动画 (`animNoseSneeze`)
- **触发区域**: 鼻子
- **动画效果**:
  - 鼻子摆动
  - 小丑鼻子效果
  - 喷嚏粒子喷射
  - "阿嚏!"文字效果

#### 耳朵动画 (`animEarWiggle`)
- **触发区域**: 左耳、右耳
- **动画效果**:
  - 耳朵摆动
  - 耳朵emoji显示
  - 声波环扩散
  - 音乐符号粒子

#### 眉毛动画 (`animEyebrowExpress`)
- **触发区域**: 左眉、右眉
- **动画效果**:
  - 眉毛抬起/皱眉
  - 生气符号
  - "哼!"文字效果
  - 火焰粒子

#### 额头动画 (`animForeheadThink`)
- **触发区域**: 额头
- **动画效果**:
  - 发光效果
  - 灯泡emoji
  - 思考粒子
  - "嗯..."文字效果

#### 下巴动画 (`animChinWobble`)
- **触发区域**: 下巴
- **动画效果**:
  - 下巴摆动
  - 胡须生长效果
  - 胡须粒子
  - "嘟~"文字效果

#### 脸部整体动画 (`animFaceBlush`)
- **触发区域**: 脸部整体
- **动画效果**:
  - 脸红效果
  - 心形粒子
  - "害羞~"文字效果
  - 😊表情符号

### 2. 物体特定动画

根据AI识别的物体类型触发不同的动画：

#### 动物动画 (`animAnimalBounce`)
- **支持物体**: 猫、狗、鸟、马、羊、牛、大象、熊、斑马、长颈鹿
- **动画效果**:
  - 弹跳动画
  - 爪印粒子
  - 动物叫声文字
  - 绿色霓虹边框

#### 食物动画 (`animFoodShake`)
- **支持物体**: 香蕉、苹果、三明治、橙子、披萨、甜甜圈、蛋糕、热狗、西兰花、胡萝卜、碗、杯子、瓶子、酒杯
- **动画效果**:
  - 摇晃动画
  - 美食表情符号
  - "好吃!"文字效果
  - 黄色霓虹边框

#### 车辆动画 (`animVehicleSpeed`)
- **支持物体**: 汽车、自行车、摩托车、公交车、卡车、火车、飞机、船、滑板、冲浪板
- **动画效果**:
  - 速度线效果
  - 倾斜动画
  - "嗖~!"文字效果
  - 橙色霓虹边框

#### 电子产品动画 (`animElectronicsGlitch`)
- **支持物体**: 电视、笔记本电脑、手机、键盘、鼠标、微波炉、冰箱
- **动画效果**:
  - 故障闪烁效果
  - 二进制代码雨
  - 色相旋转
  - 青色霓虹边框

#### 人物动画 (`animPersonDance`)
- **支持物体**: 人物（非面部区域）
- **动画效果**:
  - 舞蹈动画
  - 音乐符号粒子
  - 摇摆效果
  - 粉色霓虹边框

#### 通用动画 (`animGenericFun`)
- **适用**: 其他所有物体
- **动画效果**:
  - 弹出动画
  - 表情符号爆发
  - 紫色霓虹边框
  - 多彩粒子效果

### 3. 创意效果动画

当点击未知区域或随机触发时，会播放创意动画效果：

#### 魔法棒效果 (`effectMagicWand`)
- 魔法轨迹
- 星星爆发
- "✨变!"文字效果
- 彩色粒子

#### 像素爆炸 (`effectPixelExplosion`)
- 40个粒子爆炸
- 随机方向和速度
- 重力效果
- 霓虹色彩

#### 涟漪扩散 (`effectRipplePop`)
- 多层环形扩散
- 逐渐变大
- 间隔触发
- 彩色光环

#### 色彩喷溅 (`effectColorSplash`)
- 6种颜色依次喷溅
- 15个粒子每色
- 重力效果
- 渐变色彩

#### 漫画爆发 (`effectComicBurst`)
- 星形爆发
- 漫画文字效果
- 砰、嘭、哇等
- 黄色粉色配色

#### 烟花效果 (`effectFirework`)
- 延迟触发
- 40个粒子爆炸
- 向上发射效果
- 多彩星星

#### 表情符号爆发 (`effectEmojiBurst`)
- 12种有趣表情
- 圆形扩散
- 轻微重力
- 霓虹色彩

#### 星星效果 (`effectStars`)
- 20个星星粒子
- 随机方向
- 轻微重力
- 闪烁效果

#### 螺旋效果 (`effectSpiral`)
- 50个粒子
- 螺旋轨迹
- 逐渐扩散
- 优雅动画

#### 礼花效果 (`effectConfetti`)
- 40个礼花粒子
- 向上喷射
- 重力下落
- 多彩纸屑

#### 爆炸效果 (`effectExplosion`)
- 30个粒子
- 圆形爆炸
- 重力效果
- 星形圆形混合

### 4. 手部动画

当识别到人物手部区域时触发：

#### 手部动画 (`animHandAction`)
包含4种随机动作：

1. **挥手** (`wave`)
   - 挥手emoji
   - 波浪轨迹
   - "嗨~"文字效果
   - 绿色霓虹边框

2. **击掌** (`highfive`)
   - 冲击粒子
   - "击掌!"文字效果
   - 环形冲击波
   - 黄色霓虹效果

3. **魔法** (`magic`)
   - 魔法粒子
   - 闪烁星星
   - "魔法!"文字效果
   - 紫色霓虹边框

4. **拳头** (`fist`)
   - 力量粒子
   - 💪表情符号
   - 力量线条
   - 橙色霓虹边框

## 粒子系统

### 粒子类型

- **圆形** (`circle`): 基础圆形粒子
- **星形** (`star`): 五角星粒子
- **心形** (`heart`): 爱心形状
- **环形** (`ring`): 空心圆环
- **文字** (`text`): 显示文字或emoji
- **闪电** (`lightning`): 闪电形状

### 粒子属性

- **位置** (x, y): 粒子坐标
- **速度** (vx, vy): 粒子速度向量
- **生命周期** (life): 粒子存活时间 (0-1)
- **衰减** (decay): 生命周期衰减速度
- **大小** (size): 粒子尺寸
- **颜色** (color): 粒子颜色
- **重力** (gravity): 重力加速度
- **形状** (shape): 粒子形状
- **旋转** (rotation): 旋转角度
- **旋转速度** (rotSpeed): 旋转速度
- **文字** (text): 文字内容（仅文字粒子）

### 霓虹色彩

系统使用8种霓虹色彩：
- `#ff2d95` - 霓虹粉
- `#00f0ff` - 霓虹青
- `#f5f520` - 霓虹黄
- `#39ff14` - 霓虹绿
- `#b026ff` - 霓虹紫
- `#ff6600` - 霓虹橙
- `#ff4444` - 红色
- `#44ffff` - 青色

## 交互逻辑

### 点击处理流程

1. **坐标转换**: 将屏幕坐标转换为图片内坐标
2. **区域检测**: 检查点击位置所在的区域
3. **优先级判断**:
   - 面部区域（最高优先级）
   - 物体区域
   - 手部区域（人物检测子区域）
   - 未知区域
4. **动画触发**: 根据识别结果触发相应动画
5. **效果计数**: 更新魔法释放次数

### 区域识别算法

#### 面部区域识别
- 使用MediaPipe Face Mesh的468个面部关键点
- 计算每个区域的边界框
- 添加适当的内边距以提高识别准确度
- 支持多张人脸同时识别

#### 物体区域识别
- 使用DETR物体检测结果
- 将检测框缩放到显示尺寸
- 支持多个物体同时识别
- 根据物体标签匹配特定动画

#### 手部区域识别
- 基于人物检测框推断手部位置
- 左手：人物左侧，肩膀以下
- 右手：人物右侧，肩膀以下
- 支持挥手、击掌等手势动画

## 性能优化

### 粒子优化
- 使用requestAnimationFrame进行动画循环
- 自动清理死亡粒子
- 限制最大粒子数量
- 使用Canvas 2D API进行高效渲染

### 内存管理
- 及时移除DOM元素
- 清理定时器和动画帧
- 使用useRef避免不必要的重渲染
- 组件卸载时清理资源

### 渲染优化
- 使用CSS动画而非JS动画
- 硬件加速（transform和opacity）
- 避免布局抖动
- 使用will-change提示浏览器优化

## 使用示例

### 基本使用

```typescript
import { useAnimations } from '../hooks/useAnimations';
import { useObjectAnimations } from '../hooks/useObjectAnimations';
import { useCreativeAnimations } from '../hooks/useCreativeAnimations';

function MyComponent() {
  const { triggerFaceAnimation } = useAnimations();
  const { animObjectAction } = useObjectAnimations();
  const { animUnknownRegion } = useCreativeAnimations();

  const handleClick = (x: number, y: number, region: any) => {
    if (region.type === 'faceRegion') {
      triggerFaceAnimation(region, x, y);
    } else if (region.type === 'object') {
      animObjectAction(region, x, y);
    } else {
      animUnknownRegion(x, y);
    }
  };

  return <div onClick={handleClick}>点击我</div>;
}
```

### 自定义动画

```typescript
// 创建自定义粒子效果
const { createParticle } = useAnimations();

const customEffect = (x: number, y: number) => {
  for (let i = 0; i < 20; i++) {
    createParticle(x, y, {
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      size: 2 + Math.random() * 4,
      color: '#ff0000',
      shape: 'star',
      gravity: 0.1,
      decay: 0.02
    });
  }
};
```

## 扩展指南

### 添加新的面部动画

1. 在 `useAnimations.ts` 中添加新函数
2. 实现动画逻辑和粒子效果
3. 在 `triggerFaceAnimation` 中添加case分支
4. 更新CSS动画定义（如需要）

### 添加新的物体动画

1. 在 `useObjectAnimations.ts` 中添加新函数
2. 在 `animObjectAction` 中添加物体类型判断
3. 实现特定的动画效果
4. 更新物体标签映射

### 添加新的创意效果

1. 在 `useCreativeAnimations.ts` 中添加新函数
2. 实现创意粒子效果
3. 在 `animUnknownRegion` 的效果列表中添加
4. 测试效果和性能

## 注意事项

1. **性能**: 避免同时创建过多粒子，建议控制在100个以内
2. **兼容性**: 确保动画在不同浏览器中正常工作
3. **可访问性**: 为动画提供适当的替代文本
4. **电池**: 在移动设备上注意功耗优化
5. **网络**: AI模型需要CDN加载，首次使用可能有延迟

## 未来改进

- [ ] 添加更多粒子形状
- [ ] 支持自定义粒子纹理
- [ ] 添加粒子物理引擎
- [ ] 支持动画预设和配置
- [ ] 添加动画录制和回放功能
- [ ] 支持多人协作动画
- [ ] 添加VR/AR支持

## 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **动画**: CSS Animations + Canvas 2D
- **AI**: MediaPipe Face Mesh, HuggingFace DETR
- **渲染**: HTML5 Canvas

## 许可证

MIT License

---

**享受创造的乐趣！** ✨🎨🎭
