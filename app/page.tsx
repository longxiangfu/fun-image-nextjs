'use client';

import { useEffect, useRef, useState } from 'react';
import './globals.css';
import { useAnimations } from '../hooks/useAnimations';
import { useObjectAnimations } from '../hooks/useObjectAnimations';
import { useCreativeAnimations } from '../hooks/useCreativeAnimations';
import { useHandAnimations } from '../hooks/useHandAnimations';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [effectCount, setEffectCount] = useState(0);
  const [originalSrc, setOriginalSrc] = useState('');
  const [detections, setDetections] = useState<any[]>([]);
  const [faceLandmarks, setFaceLandmarks] = useState<any>(null);
  const [aiReady, setAiReady] = useState(false);
  const [faceMeshReady, setFaceMeshReady] = useState(false);
  const [imageNaturalW, setImageNaturalW] = useState(0);
  const [imageNaturalH, setImageNaturalH] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const faceMeshInstance = useRef<any>(null);
  
  const mainImageRef = useRef<HTMLImageElement>(null);
  const detectionCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageStageRef = useRef<HTMLDivElement>(null);
  
  // 使用所有的动画hooks
  const { triggerFaceAnimation } = useAnimations();
  const { animObjectAction } = useObjectAnimations();
  const { animUnknownRegion } = useCreativeAnimations();
  const { animHandAction } = useHandAnimations();

  // COCO label map
  const COCO_LABELS = {
    1:'person',2:'bicycle',3:'car',4:'motorcycle',5:'airplane',6:'bus',7:'train',8:'truck',9:'boat',
    10:'traffic light',11:'fire hydrant',13:'stop sign',14:'parking meter',15:'bench',16:'bird',17:'cat',
    18:'dog',19:'horse',20:'sheep',21:'cow',22:'elephant',23:'bear',24:'zebra',25:'giraffe',27:'backpack',
    28:'umbrella',31:'handbag',32:'tie',33:'suitcase',34:'frisbee',35:'skis',36:'snowboard',37:'sports ball',
    38:'kite',39:'baseball bat',40:'baseball glove',41:'skateboard',42:'surfboard',43:'tennis racket',
    44:'bottle',46:'wine glass',47:'cup',48:'fork',49:'knife',50:'spoon',51:'bowl',52:'banana',53:'apple',
    54:'sandwich',55:'orange',56:'broccoli',57:'carrot',58:'hot dog',59:'pizza',60:'donut',61:'cake',
    62:'chair',63:'couch',64:'potted plant',65:'bed',67:'dining table',70:'toilet',72:'tv',73:'laptop',
    74:'mouse',75:'remote',76:'keyboard',77:'cell phone',78:'microwave',79:'oven',80:'toaster',
    81:'sink',82:'refrigerator',84:'book',85:'clock',86:'vase',87:'scissors',88:'teddy bear',
    89:'hair drier',90:'toothbrush'
  };

  const LABEL_ZH = {
    'person':'人物','bicycle':'自行车','car':'汽车','motorcycle':'摩托车','airplane':'飞机',
    'bus':'公交车','train':'火车','truck':'卡车','boat':'船','bird':'鸟','cat':'猫','dog':'狗',
    'horse':'马','sheep':'羊','cow':'牛','elephant':'大象','bear':'熊','zebra':'斑马','giraffe':'长颈鹿',
    'bottle':'瓶子','cup':'杯子','bowl':'碗','banana':'香蕉','apple':'苹果','sandwich':'三明治',
    'orange':'橙子','pizza':'披萨','donut':'甜甜圈','cake':'蛋糕','chair':'椅子','couch':'沙发',
    'potted plant':'盆栽','bed':'床','tv':'电视','laptop':'笔记本电脑','cell phone':'手机',
    'book':'书','clock':'时钟','vase':'花瓶','teddy bear':'泰迪熊','umbrella':'雨伞',
    'handbag':'手提包','tie':'领带','suitcase':'行李箱','skateboard':'滑板','sports ball':'球',
    'fork':'叉子','knife':'刀','spoon':'勺子','hot dog':'热狗','broccoli':'西兰花','carrot':'胡萝卜',
    'traffic light':'红绿灯','fire hydrant':'消防栓','stop sign':'停止标志','bench':'长椅',
    'backpack':'背包','frisbee':'飞盘','skis':'滑雪板','snowboard':'单板','kite':'风筝',
    'baseball bat':'棒球棒','baseball glove':'棒球手套','surfboard':'冲浪板','tennis racket':'网球拍',
    'wine glass':'酒杯','microwave':'微波炉','oven':'烤箱','toaster':'烤面包机','sink':'水槽',
    'refrigerator':'冰箱','scissors':'剪刀','hair drier':'吹风机','toothbrush':'牙刷','keyboard':'键盘',
    'mouse':'鼠标','remote':'遥控器','dining table':'餐桌','toilet':'马桶'
  };

  const FACE_INDICES = {
    leftEye: [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246],
    rightEye: [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398],
    leftEyebrow: [70, 63, 105, 66, 107],
    rightEyebrow: [336, 296, 334, 293, 300],
    nose: [1, 2, 98, 327, 326, 219, 440, 439, 94, 141, 61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61, 185],
    noseTip: [1],
    mouthOuter: [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185],
    mouthInner: [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311, 312, 13, 82, 81, 80, 191],
    leftEar: [234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152],
    rightEar: [454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 389],
    faceOutline: [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109],
    forehead: [10, 109, 67, 103, 54, 21, 162],
    chin: [152, 148, 176, 149, 150, 136, 172],
  };

  // Load MediaPipe & Initialize FaceMesh (合并为一个流程，确保顺序正确)
  useEffect(() => {
    const loadAndInitFaceMesh = async () => {
      console.log('=== 开始MediaPipe完整初始化流程 ===');

      // 第1步：加载face_mesh.js脚本
      const loadScript = (src: string, name: string): Promise<boolean> => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
          script.crossOrigin = 'anonymous';
          script.onload = () => {
            console.log(`[1] ${name} 加载成功`);
            resolve(true);
          };
          script.onerror = () => {
            console.warn(`[1] ${name} 加载失败`);
            resolve(false);
          };
          document.head.appendChild(script);
        });
      };

      const cdnUrls = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/face_mesh.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/face_mesh.js',
        'https://unpkg.com/@mediapipe/face_mesh@0.4.1633559619/face_mesh.js',
      ];

      let scriptLoaded = false;
      for (const url of cdnUrls) {
        console.log(`[1] 尝试加载: ${url}`);
        const ok = await loadScript(url, 'face_mesh.js');
        if (ok) { scriptLoaded = true; break; }
      }

      if (!scriptLoaded) {
        console.error('[1] 所有CDN都无法加载face_mesh.js');
        return;
      }

      // 第2步：等待FaceMesh全局对象可用
      console.log('[2] 等待FaceMesh全局对象...');
      for (let i = 0; i < 100; i++) {
        if (typeof (window as any).FaceMesh !== 'undefined') {
          console.log('[2] FaceMesh全局对象已可用');
          break;
        }
        if (i === 99) {
          console.error('[2] FaceMesh全局对象未找到');
          return;
        }
        await new Promise(r => setTimeout(r, 100));
      }

      // 第3步：创建FaceMesh实例
      try {
        console.log('[3] 创建FaceMesh实例...');
        faceMeshInstance.current = new (window as any).FaceMesh({
          locateFile: (file: string) => {
            console.log(`[3] locateFile请求: ${file}`);
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`;
          }
        });

        // 第4步：设置选项
        console.log('[4] 设置FaceMesh选项...');
        faceMeshInstance.current.setOptions({
          maxNumFaces: 3,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        // 第5步：设置结果回调（全局唯一，不会被覆盖）
        console.log('[5] 设置FaceMesh结果回调...');
        faceMeshInstance.current.onResults((results: any) => {
          console.log('[5] FaceMesh onResults回调触发!', results);
          if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            console.log('[5] 检测到面部关键点:', results.multiFaceLandmarks.length, '张脸,',
              results.multiFaceLandmarks[0].length, '个关键点');
            setFaceLandmarks(results.multiFaceLandmarks);
            // 如果detectFaceLandmarks在等待结果，通知它
            if (faceMeshResultResolve.current) {
              faceMeshResultResolve.current(results.multiFaceLandmarks);
              faceMeshResultResolve.current = null;
            }
          } else {
            console.log('[5] onResults: 未检测到面部关键点');
            setFaceLandmarks(null);
            // 如果detectFaceLandmarks在等待结果，通知它
            if (faceMeshResultResolve.current) {
              faceMeshResultResolve.current(null);
              faceMeshResultResolve.current = null;
            }
          }
        });

        // 第6步：初始化FaceMesh（发送一个空图片来触发WASM加载）
        console.log('[6] 初始化FaceMesh WASM...');
        const testCanvas = document.createElement('canvas');
        testCanvas.width = 1;
        testCanvas.height = 1;
        try {
          await faceMeshInstance.current.send({ image: testCanvas });
          console.log('[6] FaceMesh WASM初始化成功');
        } catch (initErr) {
          console.warn('[6] FaceMesh WASM初始化警告(可忽略):', initErr);
        }

        setFaceMeshReady(true);
        console.log('=== MediaPipe完整初始化流程完成 ===');
      } catch (e) {
        console.error('[3-6] FaceMesh初始化失败:', e);
      }
    };

    loadAndInitFaceMesh();
  }, []);

  // Canvas resize
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const w = window.innerWidth || document.documentElement.clientWidth || 1;
        const h = window.innerHeight || document.documentElement.clientHeight || 1;
        if (w > 0 && h > 0) {
          canvas.width = w;
          canvas.height = h;
        }
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Object detection
  const detectObjects = async (imageSrc: string) => {
    try {
      const blob = await (await fetch(imageSrc)).blob();
      const response = await fetch('https://api-inference.huggingface.co/models/facebook/detr-resnet-50', {
        method: 'POST',
        headers: { 'Content-Type': blob.type },
        body: blob
      });
      if (!response.ok) {
        console.warn('DETR API failed:', response.status);
        return [];
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        return data.map((d: any) => ({
          label: d.label,
          labelZh: LABEL_ZH[d.label] || d.label,
          score: d.score,
          box: {
            xmin: d.box.xmin, ymin: d.box.ymin,
            xmax: d.box.xmax, ymax: d.box.ymax
          }
        }));
      }
      return [];
    } catch (e) {
      console.warn('Object detection failed:', e);
      return [];
    }
  };

  // 用于等待FaceMesh检测结果的回调
  const faceMeshResultResolve = useRef<((value: any[] | null) => void) | null>(null);

  const detectFaceLandmarks = async (imgElement: HTMLImageElement): Promise<any[] | null> => {
    console.log('detectFaceLandmarks调用:', { faceMeshInstance: !!faceMeshInstance.current, faceMeshReady });
    
    if (!faceMeshInstance.current) {
      console.warn('FaceMesh实例未初始化，跳过面部检测');
      return null;
    }
    
    if (!faceMeshReady) {
      console.warn('FaceMesh未就绪，等待初始化...');
      for (let i = 0; i < 30; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (faceMeshReady) break;
      }
      if (!faceMeshReady) {
        console.error('FaceMesh等待超时，跳过面部检测');
        return null;
      }
    }
    
    try {
      console.log('发送图片到FaceMesh进行检测...');
      
      // 创建一个Promise来等待onResults回调
      const resultPromise = new Promise<any[] | null>((resolve) => {
        faceMeshResultResolve.current = resolve;
        // 设置超时，5秒后如果没收到结果就返回null
        setTimeout(() => {
          if (faceMeshResultResolve.current === resolve) {
            console.warn('FaceMesh检测超时(5秒)');
            faceMeshResultResolve.current = null;
            resolve(null);
          }
        }, 5000);
      });

      await faceMeshInstance.current.send({ image: imgElement });
      console.log('FaceMesh send()已返回，等待onResults回调...');
      
      const landmarks = await resultPromise;
      console.log('面部检测完成，landmarks:', landmarks ? `${landmarks.length}张脸` : 'null');
      return landmarks;
    } catch (e) {
      console.warn('FaceMesh send failed:', e);
      return null;
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const src = e.target?.result as string;
      setOriginalSrc(src);
      setIsImageLoaded(true);
      
      // 等待React渲染图片元素后再进行检测
      // 使用requestAnimationFrame和延迟确保DOM已更新
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 等待mainImageRef可用
      let imgEl = mainImageRef.current;
      for (let i = 0; i < 50; i++) {
        if (imgEl) break;
        await new Promise(resolve => setTimeout(resolve, 100));
        imgEl = mainImageRef.current;
      }
      
      if (!imgEl) {
        console.error('图片元素未找到');
        return;
      }
      
      // 等待图片完全加载
      if (!imgEl.complete) {
        console.log('等待图片加载...');
        await new Promise<void>((resolve) => {
          imgEl!.onload = () => resolve();
          imgEl!.onerror = () => resolve();
        });
      }
      
      console.log('图片加载完成');
      setImageNaturalW(imgEl.naturalWidth);
      setImageNaturalH(imgEl.naturalHeight);
      console.log('图片尺寸:', { naturalWidth: imgEl.naturalWidth, naturalHeight: imgEl.naturalHeight });

      if (detectionCanvasRef.current) {
        detectionCanvasRef.current.width = imgEl.offsetWidth;
        detectionCanvasRef.current.height = imgEl.offsetHeight;
      }

      showToast('AI正在识别图片内容...');
      console.log('开始AI识别...');
      
      console.log('当前FaceMesh状态:', { faceMeshReady, faceMeshInstance: !!faceMeshInstance.current });
      const detectedLandmarks = await detectFaceLandmarks(imgEl);
      console.log('面部检测完成，检测到的landmarks:', detectedLandmarks ? `${detectedLandmarks.length}张脸` : 'null');
      
      const detectedObjects = await detectObjects(src);
      setDetections(detectedObjects);
      console.log('物体检测完成:', detectedObjects.length, '个物体');

      if (detectedObjects.length > 0 || detectedLandmarks) {
        const faceCount = detectedLandmarks ? detectedLandmarks.length : 0;
        const objCount = detectedObjects.length;
        let msg = '识别完成！';
        if (faceCount > 0) msg += ` 检测到${faceCount}张脸`;
        if (objCount > 0) msg += ` ${objCount}个物体`;
        console.log('识别结果:', msg);
        showToast(msg);
        drawDetections(detectedObjects);
      } else {
        console.log('未检测到人脸或物体');
        showToast('点击图片任意位置释放魔法');
      }
    };
    reader.readAsDataURL(file);
  };

  const drawDetections = (dets: any[]) => {
    const canvas = detectionCanvasRef.current;
    const img = mainImageRef.current;
    if (!canvas || !img) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imgW = img.offsetWidth;
    const imgH = img.offsetHeight;
    const scaleX = imgW / imageNaturalW;
    const scaleY = imgH / imageNaturalH;

    dets.forEach(det => {
      const x = det.box.xmin * scaleX;
      const y = det.box.ymin * scaleY;
      const w = (det.box.xmax - det.box.xmin) * scaleX;
      const h = (det.box.ymax - det.box.ymin) * scaleY;

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([]);
    });
  };

  const showToast = (message: string) => {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const resetImage = () => {
    setOriginalSrc('');
    setDetections([]);
    setFaceLandmarks(null);
    setEffectCount(0);
    setIsImageLoaded(false);
  };

  const changeImage = () => {
    document.getElementById('fileInput')?.click();
  };

  const randomBarrage = () => {
    if (!imageStageRef.current) return;
    const rect = imageStageRef.current.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        animUnknownRegion(x, y);
      }, i * 100);
    }
    setEffectCount(prev => prev + 5);
  };

  // 面部区域识别
  const identifyFaceRegion = (clickX: number, clickY: number, imgW: number, imgH: number, landmarks: any) => {
    console.log('identifyFaceRegion调用:', { clickX, clickY, imgW, imgH, landmarks });
    
    if (!landmarks || landmarks.length === 0) {
      console.log('没有面部关键点数据');
      return null;
    }

    console.log('开始处理面部关键点，数量:', landmarks.length);
    
    for (const faceLm of landmarks) {
      const regions = [
        // 检测顺序：从小区域到大区域，优先匹配更精确的小区域
        // 眉毛在眼睛之前检测，避免眼睛padding覆盖眉毛
        { name: 'leftEyebrow', label: '左眉', indices: FACE_INDICES.leftEyebrow, padding: 12 },
        { name: 'rightEyebrow', label: '右眉', indices: FACE_INDICES.rightEyebrow, padding: 12 },
        { name: 'leftEye', label: '左眼', indices: FACE_INDICES.leftEye, padding: 10 },
        { name: 'rightEye', label: '右眼', indices: FACE_INDICES.rightEye, padding: 10 },
        { name: 'nose', label: '鼻子', indices: FACE_INDICES.nose, padding: 15 },
        { name: 'mouth', label: '嘴巴', indices: [...FACE_INDICES.mouthOuter, ...FACE_INDICES.mouthInner], padding: 12 },
        { name: 'leftEar', label: '左耳', indices: FACE_INDICES.leftEar, padding: 15 },
        { name: 'rightEar', label: '右耳', indices: FACE_INDICES.rightEar, padding: 15 },
        { name: 'forehead', label: '额头', indices: FACE_INDICES.forehead, padding: 20 },
        { name: 'chin', label: '下巴', indices: FACE_INDICES.chin, padding: 15 },
      ];

      for (const region of regions) {
        const pts = region.indices.map((i: number) => faceLm[i]).filter((p: any) => p);
        console.log(`检查区域 ${region.name}:`, { ptsCount: pts.length, indicesCount: region.indices.length });
        
        if (pts.length < 2) continue;

        const pad = region.padding || 15;
        const xs = pts.map((p: any) => p.x * imgW);
        const ys = pts.map((p: any) => p.y * imgH);
        const minX = Math.min(...xs) - pad;
        const maxX = Math.max(...xs) + pad;
        const minY = Math.min(...ys) - pad;
        const maxY = Math.max(...ys) + pad;

        console.log(`区域 ${region.name} 边界:`, { minX, maxX, minY, maxY, clickX, clickY });
        console.log(`区域 ${region.name} 点击检查:`, clickX >= minX && clickX <= maxX && clickY >= minY && clickY <= maxY);

        if (clickX >= minX && clickX <= maxX && clickY >= minY && clickY <= maxY) {
          const cx = xs.reduce((a: number, b: number) => a + b, 0) / xs.length;
          const cy = ys.reduce((a: number, b: number) => a + b, 0) / ys.length;
          console.log(`✅ 匹配到区域: ${region.name}`, { cx, cy });
          return {
            type: 'faceRegion', region: region.name, label: region.label,
            centerX: cx, centerY: cy,
            bbox: { minX, maxX, minY, maxY },
            landmarks: pts, allFaceLandmarks: faceLm
          };
        }
      }

      // 脸部整体
      const facePts = FACE_INDICES.faceOutline.map((i: number) => faceLm[i]).filter((p: any) => p);
      if (facePts.length > 0) {
        const fxs = facePts.map((p: any) => p.x * imgW);
        const fys = facePts.map((p: any) => p.y * imgH);
        const fMinX = Math.min(...fxs) - 5;
        const fMaxX = Math.max(...fxs) + 5;
        const fMinY = Math.min(...fys) - 5;
        const fMaxY = Math.max(...fys) + 5;
        
        if (clickX >= fMinX && clickX <= fMaxX && clickY >= fMinY && clickY <= fMaxY) {
          console.log('✅ 匹配到脸部整体区域');
          return {
            type: 'faceRegion', region: 'face', label: '脸部',
            centerX: clickX, centerY: clickY,
            bbox: { minX: fMinX, maxX: fMaxX, minY: fMinY, maxY: fMaxY },
            allFaceLandmarks: faceLm
          };
        }
      }
    }
    
    console.log('❌ 没有匹配到任何面部区域');
    return null;
  };

  // 物体区域识别
  const identifyObjectRegion = (clickX: number, clickY: number, imgW: number, imgH: number) => {
    for (const det of detections) {
      const b = det.box;
      const scaleX = imgW / imageNaturalW;
      const scaleY = imgH / imageNaturalH;
      const minX = b.xmin * scaleX;
      const maxX = b.xmax * scaleX;
      const minY = b.ymin * scaleY;
      const maxY = b.ymax * scaleY;

      if (clickX >= minX && clickX <= maxX && clickY >= minY && clickY <= maxY) {
        return {
          type: 'object',
          label: det.labelZh || det.label,
          labelEn: det.label,
          score: det.score,
          centerX: (minX + maxX) / 2,
          centerY: (minY + maxY) / 2,
          bbox: { minX, maxX, minY, maxY }
        };
      }
    }
    return null;
  };

  // 手部区域识别
  const identifyHandRegion = (clickX: number, clickY: number, imgW: number, imgH: number, personRegion: any) => {
    const bbox = personRegion.bbox;
    const w = bbox.maxX - bbox.minX;
    const h = bbox.maxY - bbox.minY;

    const topShoulder = bbox.minY + h * 0.25;
    const bottomHip = bbox.minY + h * 0.85;
    const leftSide = bbox.minX;
    const rightSide = bbox.maxX;
    const centerLeft = bbox.minX + w * 0.35;
    const centerRight = bbox.minX + w * 0.65;

    if (clickX >= leftSide && clickX <= centerLeft && clickY >= topShoulder && clickY <= bottomHip) {
      return {
        type: 'hand', label: '左手', side: 'left',
        centerX: clickX, centerY: clickY,
        bbox: { minX: leftSide, maxX: centerLeft, minY: topShoulder, maxY: bottomHip }
      };
    }

    if (clickX >= centerRight && clickX <= rightSide && clickY >= topShoulder && clickY <= bottomHip) {
      return {
        type: 'hand', label: '右手', side: 'right',
        centerX: clickX, centerY: clickY,
        bbox: { minX: centerRight, maxX: rightSide, minY: topShoulder, maxY: bottomHip }
      };
    }

    return null;
  };

  // 点击处理
  const handleImageClick = (e: React.MouseEvent) => {
    if (!mainImageRef.current) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const screenX = e.clientX;
    const screenY = e.clientY;
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    const imgW = mainImageRef.current.offsetWidth;
    const imgH = mainImageRef.current.offsetHeight;

    const inImage = localX >= 0 && localX <= imgW && localY >= 0 && localY <= imgH;

    console.log('点击信息:', { localX, localY, imgW, imgH, inImage, faceLandmarks: !!faceLandmarks, faceLandmarksCount: faceLandmarks?.length });

    if (!inImage) {
      console.log('点击在图片外部，触发创意动画');
      animUnknownRegion(screenX, screenY);
      setEffectCount(prev => prev + 1);
      return;
    }

    // 检查面部区域
    console.log('开始面部区域识别，faceLandmarks:', faceLandmarks);
    const faceRegion = identifyFaceRegion(localX, localY, imgW, imgH, faceLandmarks);
    if (faceRegion) {
      console.log('面部区域识别成功:', faceRegion.region, faceRegion.label);
      showDetectLabel(localX, localY, faceRegion.label, 'face');
      triggerFaceAnimation(faceRegion, screenX, screenY);
      setEffectCount(prev => prev + 1);
      return;
    }

    // 检查物体区域
    const objRegion = identifyObjectRegion(localX, localY, imgW, imgH);
    if (objRegion) {
      console.log('物体区域识别成功:', objRegion.label);
      if (objRegion.labelEn === 'person') {
        const handResult = identifyHandRegion(localX, localY, imgW, imgH, objRegion);
        if (handResult) {
          console.log('手部区域识别成功:', handResult.label);
          showDetectLabel(localX, localY, handResult.label, 'face');
          animHandAction(handResult, screenX, screenY);
          setEffectCount(prev => prev + 1);
          return;
        }
        console.log('人物身体（非面部/手部），触发创意动画');
        animUnknownRegion(screenX, screenY);
        setEffectCount(prev => prev + 1);
        return;
      }
      console.log('物体区域识别成功:', objRegion.label);
      showDetectLabel(localX, localY, objRegion.label, 'object');
      animObjectAction(objRegion, screenX, screenY);
      setEffectCount(prev => prev + 1);
      return;
    }

    // 未知区域
    console.log('未知区域，触发创意动画');
    animUnknownRegion(screenX, screenY);
    setEffectCount(prev => prev + 1);
  };

  const showDetectLabel = (x: number, y: number, text: string, type: string) => {
    const wrapper = imageWrapperRef.current;
    if (!wrapper) return;

    const label = document.createElement('div');
    label.className = 'detect-label';
    label.style.cssText = `
      left: ${x}px; top: ${y - 30}px;
    `;
    label.textContent = text;
    wrapper.appendChild(label);

    setTimeout(() => label.remove(), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e0e0e8] overflow-x-hidden font-sans">
      <div className="scanlines"></div>
      <canvas ref={canvasRef} id="particleCanvas" className="fixed inset-0 pointer-events-none z-[9999]"></canvas>

      <header className="header text-center py-[30px] px-5 relative z-[1]">
        <h1 className="text-[clamp(24px,4.5vw,48px)] font-black bg-gradient-to-r from-[#ff2d95] via-[#00f0ff] to-[#f5f520] bg-clip-text text-transparent tracking-[2px] animate-titleGlitch">
          搞怪图片互动乐园
        </h1>
        <p className="text-[#6a6a7a] text-[14px] mt-[6px] tracking-[3px]">AI识别 · 智能互动 · 搞怪魔法</p>
      </header>

      <div className="ai-status text-center py-[10px] relative z-[1] text-[13px] text-[#6a6a7a] hidden">
        AI模型加载中<span className="loading-dot">.</span><span className="loading-dot">.</span><span className="loading-dot">.</span>
      </div>

      <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleFileSelect} />
      
      {!isImageLoaded && (
        <div 
          className="upload-zone max-w-[600px] mx-[20px] my-5 py-[40px] px-[30px] border-2 border-dashed border-[#00f0ff] rounded-[16px] bg-[rgba(0,240,255,0.03)] text-center cursor-pointer transition-all hover:border-[#ff2d95] hover:bg-[rgba(255,45,149,0.05)] hover:shadow-[0_0_30px_rgba(255,45,149,0.15)] hover:scale-[1.02]"
          onClick={() => document.getElementById('fileInput')?.click()}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }}
          onDragLeave={(e) => e.currentTarget.classList.remove('dragover')}
          onDrop={handleDrop}
        >
          <span className="upload-icon text-[56px] block mb-3 animate-floatIcon">📸</span>
          <h2 className="text-[20px] text-[#00f0ff] mb-2">拖拽图片到这里，或点击上传</h2>
          <span className="text-[#6a6a7a] text-[13px]">支持 JPG / PNG / GIF / WEBP</span>
        </div>
      )}

      {isImageLoaded && (
        <div ref={imageStageRef} className="image-stage max-w-[900px] mx-5 my-5 py-0 px-5 relative z-[1] block cursor-crosshair">
          <div id="imageWrapper" ref={imageWrapperRef} className="image-wrapper relative inline-block border-2 border-[#00f0ff] rounded-[12px] overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)] cursor-crosshair transition-shadow hover:shadow-[0_0_40px_rgba(0,240,255,0.35)]">
            <img 
              ref={mainImageRef} 
              src={originalSrc} 
              alt="互动图片" 
              className="block max-w-full max-h-[65vh] select-none" 
              onClick={handleImageClick}
            />
            <canvas ref={detectionCanvasRef} id="detectionCanvas" className="absolute inset-0 pointer-events-none z-[5]"></canvas>
          </div>
          <div className="hint text-center mt-[14px] text-[#f5f520] text-[13px] animate-blink tracking-[2px]">
            👆 点击图片任意位置，AI将识别内容并释放搞怪魔法！
          </div>
          <div className="effect-counter text-center mt-[10px] text-[#6a6a7a] text-[13px]">
            已释放 <strong className="text-[#ff2d95] text-[18px]">{effectCount}</strong> 次魔法
          </div>
          <div className="controls flex justify-center gap-[10px] mt-[16px] flex-wrap">
            <button onClick={resetImage} className="btn py-2 px-5 border border-[#00f0ff] rounded-[8px] bg-[rgba(0,240,255,0.08)] text-[#00f0ff] text-[13px] font-semibold cursor-pointer transition-all hover:bg-[rgba(0,240,255,0.2)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:-translate-y-[2px]">
              🔄 重置
            </button>
            <button onClick={randomBarrage} className="btn pink py-2 px-5 border border-[#ff2d95] rounded-[8px] bg-[rgba(255,45,149,0.08)] text-[#ff2d95] text-[13px] font-semibold cursor-pointer transition-all hover:bg-[rgba(255,45,149,0.2)] hover:shadow-[0_0_15px_rgba(255,45,149,0.3)] hover:-translate-y-[2px]">
              🎉 随机连击
            </button>
            <button onClick={changeImage} className="btn py-2 px-5 border border-[#00f0ff] rounded-[8px] bg-[rgba(0,240,255,0.08)] text-[#00f0ff] text-[13px] font-semibold cursor-pointer transition-all hover:bg-[rgba(0,240,255,0.2)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:-translate-y-[2px]">
              🖼️ 换一张
            </button>
          </div>
        </div>
      )}

      <div id="toast" className="toast fixed bottom-[30px] left-1/2 transform -translate-x-1/2 translate-y-[100px] py-3 px-7 rounded-[10px] bg-[#12121a] border border-[#39ff14] text-[#39ff14] text-[14px] z-[10000] transition-transform shadow-[0_0_20px_rgba(57,255,20,0.2)]"></div>
    </div>
  );
}
