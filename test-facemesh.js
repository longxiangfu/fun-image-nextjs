#!/usr/bin/env node

/**
 * FaceMesh修复验证脚本
 * 用于验证FaceMesh相关修复是否正确实施
 */

console.log('=== FaceMesh修复验证测试 ===\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, condition, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✓ ${name}`);
    if (details) console.log(`  ${details}`);
  } else {
    failedTests++;
    console.log(`✗ ${name}`);
    if (details) console.log(`  ${details}`);
  }
}

console.log('测试1: 验证FaceMesh初始化调试增强');
const fs = require('fs');
const pagePath = './app/page.tsx';
const pageContent = fs.readFileSync(pagePath, 'utf8');

test('包含"开始初始化FaceMesh"日志', 
  pageContent.includes("console.log('开始初始化FaceMesh...')"),
  'FaceMesh初始化开始日志已添加');

test('包含"FaceMesh脚本已加载"日志', 
  pageContent.includes("console.log('FaceMesh脚本已加载')"),
  '脚本加载确认日志已添加');

test('包含"创建FaceMesh实例"日志', 
  pageContent.includes("console.log('创建FaceMesh实例...')"),
  '实例创建日志已添加');

test('包含"FaceMesh初始化完成"日志', 
  pageContent.includes("console.log('FaceMesh初始化完成')"),
  '初始化完成日志已添加');

console.log('\n测试2: 验证FaceMesh结果回调调试增强');
test('包含"FaceMesh结果回调触发"日志', 
  pageContent.includes("console.log('FaceMesh结果回调触发:'"),
  '结果回调触发日志已添加');

test('包含"检测到面部关键点"日志', 
  pageContent.includes("console.log('检测到面部关键点:'"),
  '人脸检测成功日志已添加');

test('包含"面部关键点数量"日志', 
  pageContent.includes("console.log('面部关键点数量:'"),
  '关键点数量日志已添加');

test('包含"未检测到面部关键点"日志', 
  pageContent.includes("console.log('未检测到面部关键点')"),
  '检测失败日志已添加');

console.log('\n测试3: 验证detectFaceLandmarks函数调试增强');
test('包含"detectFaceLandmarks调用"日志', 
  pageContent.includes("console.log('detectFaceLandmarks调用:'"),
  '函数调用日志已添加');

test('包含"FaceMesh实例未初始化"警告', 
  pageContent.includes("console.warn('FaceMesh实例未初始化')"),
  '实例未初始化警告已添加');

test('包含"FaceMesh未就绪"警告', 
  pageContent.includes("console.warn('FaceMesh未就绪，等待初始化...')"),
  '未就绪警告已添加');

test('包含"开始发送图片到FaceMesh"日志', 
  pageContent.includes("console.log('开始发送图片到FaceMesh...')"),
  '图片发送日志已添加');

test('包含"FaceMesh send完成"日志', 
  pageContent.includes("console.log('FaceMesh send完成')"),
  '发送完成日志已添加');

console.log('\n测试4: 验证图片上传流程调试增强');
test('包含"图片加载完成"日志', 
  pageContent.includes("console.log('图片加载完成')"),
  '图片加载日志已添加');

test('包含"图片尺寸"日志', 
  pageContent.includes("console.log('图片尺寸:'"),
  '图片尺寸日志已添加');

test('包含"开始AI识别"日志', 
  pageContent.includes("console.log('开始AI识别...')"),
  'AI识别开始日志已添加');

test('包含"当前FaceMesh状态"日志', 
  pageContent.includes("console.log('当前FaceMesh状态:'"),
  'FaceMesh状态日志已添加');

test('包含"面部检测完成"日志', 
  pageContent.includes("console.log('面部检测完成，当前faceLandmarks:'"),
  '面部检测完成日志已添加');

console.log('\n测试5: 验证异步延迟处理');
test('移除了阻塞式的直接返回', 
  !pageContent.includes('if (!faceMeshReady) return;'),
  '阻塞式返回已移除');

test('添加了异步延迟处理', 
  pageContent.includes("await new Promise(resolve => setTimeout(resolve, 1000))"),
  '异步延迟已添加');

test('添加了延迟后的状态检查', 
  pageContent.includes("console.log('FaceMesh状态:'"),
  '延迟后状态检查已添加');

console.log('\n测试6: 验证调试文件完整性');
const filesToCheck = [
  'QUICK_FIX_FACEMESH.md',
  'FACEMESH_DEBUG.md',
  'TESTING_DEBUG.md'
];

filesToCheck.forEach(file => {
  test(`调试文件存在: ${file}`, 
    fs.existsSync(file),
    `${file} 文件已创建`);
});

console.log('\n测试7: 验证FaceMesh初始化逻辑');
test('FaceMesh脚本加载等待逻辑正确', 
  pageContent.includes("for (let i = 0; i < 50; i++") &&
  pageContent.includes("if (typeof (window as any).FaceMesh !== 'undefined')"),
  '脚本加载等待循环已正确实现');

test('FaceMesh未加载时的警告', 
  pageContent.includes("console.warn('MediaPipe FaceMesh not loaded, face detection disabled')"),
  'MediaPipe未加载警告已添加');

test('FaceMesh实例创建使用正确CDN', 
  pageContent.includes("https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/"),
  'FaceMesh CDN配置正确');

console.log('\n测试8: 验证FaceMesh选项配置');
test('maxNumFaces选项已设置', 
  pageContent.includes('maxNumFaces: 3'),
  '最大人脸数选项已配置');

test('refineLandmarks选项已设置', 
  pageContent.includes('refineLandmarks: true'),
  '关键点精炼选项已配置');

test('minDetectionConfidence选项已设置', 
  pageContent.includes('minDetectionConfidence: 0.5'),
  '检测置信度选项已配置');

test('minTrackingConfidence选项已设置', 
  pageContent.includes('minTrackingConfidence: 0.5'),
  '跟踪置信度选项已配置');

console.log('\n测试9: 验证错误处理');
test('FaceMesh初始化try-catch块', 
  pageContent.includes('try {') && pageContent.includes("console.warn('FaceMesh init failed:'"),
  '初始化错误处理已添加');

test('FaceMesh send try-catch块', 
  pageContent.includes("try {") && pageContent.includes("console.warn('FaceMesh send failed:'"),
  '发送错误处理已添加');

console.log('\n=== 测试结果汇总 ===');
console.log(`总测试数: ${totalTests}`);
console.log(`通过: ${passedTests}`);
console.log(`失败: ${failedTests}`);
console.log(`通过率: ${((passedTests / totalTests) * 100).toFixed(2)}%`);

if (failedTests === 0) {
  console.log('\n✅ 所有FaceMesh修复验证测试通过！');
  console.log('\n🎯 预期效果:');
  console.log('1. 控制台将显示详细的FaceMesh初始化过程');
  console.log('2. 控制台将显示FaceMesh结果回调的详细信息');
  console.log('3. 控制台将显示detectFaceLandmarks的执行过程');
  console.log('4. 控制台将显示图片上传和识别的完整流程');
  console.log('5. 如果FaceMesh未就绪，会自动等待1秒后重试');
  console.log('\n📋 下一步:');
  console.log('1. 刷新浏览器页面 (Ctrl+Shift+R)');
  console.log('2. 打开开发者工具 (F12)');
  console.log('3. 上传包含清晰人脸的图片');
  console.log('4. 查看控制台输出的详细日志');
  console.log('5. 确认faceLandmarks不再为null');
  console.log('6. 点击眼睛测试动画效果');
} else {
  console.log('\n⚠️ 部分测试失败，请检查修复实现');
  process.exit(1);
}
