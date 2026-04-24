import { useEffect, useRef } from 'react';
import { FaceRegion, ObjectRegion } from '../types';

export const useAnimations = () => {
  const particlesRef = useRef<any[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    canvasRef.current = document.getElementById('particleCanvas') as HTMLCanvasElement;
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  const randomNeon = () => {
    const colors = ['#ff2d95', '#00f0ff', '#f5f520', '#39ff14', '#b026ff', '#ff6600', '#ff4444', '#44ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const createParticle = (x: number, y: number, options: any = {}) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particle = {
      x,
      y,
      vx: options.vx || (Math.random() - 0.5) * 8,
      vy: options.vy || (Math.random() - 0.5) * 8,
      life: options.life || 1,
      decay: options.decay || (0.01 + Math.random() * 0.02),
      size: options.size || (2 + Math.random() * 4),
      color: options.color || randomNeon(),
      gravity: options.gravity || 0,
      shape: options.shape || 'circle',
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      text: options.text || '',
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life -= this.decay;
        this.rotation += this.rotSpeed;
        this.vx *= 0.99;
      },
      draw(context: CanvasRenderingContext2D) {
        if (this.life <= 0) return;
        context.save();
        context.globalAlpha = Math.max(0, this.life);
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = 10;

        if (this.shape === 'circle') {
          context.beginPath();
          context.arc(0, 0, this.size, 0, Math.PI * 2);
          context.fill();
        } else if (this.shape === 'star') {
          drawStar(context, 0, 0, 5, this.size, this.size / 2);
          context.fill();
        } else if (this.shape === 'text') {
          context.shadowBlur = 6;
          context.font = `bold ${this.size * 3}px sans-serif`;
          context.textAlign = 'center';
          context.fillText(this.text, 0, 0);
        } else if (this.shape === 'ring') {
          context.shadowBlur = 12;
          context.lineWidth = 2;
          context.beginPath();
          context.arc(0, 0, this.size, 0, Math.PI * 2);
          context.stroke();
        } else if (this.shape === 'heart') {
          drawHeart(context, 0, 0, this.size);
          context.fill();
        } else if (this.shape === 'lightning') {
          context.shadowBlur = 15;
          context.lineWidth = 2;
          drawLightningBolt(context, 0, 0, this.size * 3);
        }
        context.restore();
      }
    };

    particlesRef.current.push(particle);
    startParticleLoop();
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, sp: number, oR: number, iR: number) => {
    let r = Math.PI / 2 * 3, s = Math.PI / sp;
    ctx.beginPath();
    ctx.moveTo(cx, cy - oR);
    for (let i = 0; i < sp; i++) {
      ctx.lineTo(cx + Math.cos(r) * oR, cy + Math.sin(r) * oR);
      r += s;
      ctx.lineTo(cx + Math.cos(r) * iR, cy + Math.sin(r) * iR);
      r += s;
    }
    ctx.closePath();
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + s * 0.3);
    ctx.bezierCurveTo(cx, cy - s * 0.3, cx - s, cy - s * 0.3, cx - s, cy + s * 0.1);
    ctx.bezierCurveTo(cx - s, cy + s * 0.6, cx, cy + s, cx, cy + s * 1.2);
    ctx.bezierCurveTo(cx, cy + s, cx + s, cy + s * 0.6, cx + s, cy + s * 0.1);
    ctx.bezierCurveTo(cx + s, cy - s * 0.3, cx, cy - s * 0.3, cx, cy + s * 0.3);
    ctx.closePath();
  };

  const drawLightningBolt = (ctx: CanvasRenderingContext2D, x: number, y: number, l: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    let cx = x, cy = y;
    for (let i = 0; i < 6; i++) {
      cx += (Math.random() - 0.5) * l * 0.4;
      cy += l / 6;
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  };

  const startParticleLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.width === 0 || canvas.height === 0) {
      canvas.width = window.innerWidth || 1;
      canvas.height = window.innerHeight || 1;
    }

    if (!animFrameIdRef.current) {
      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesRef.current = particlesRef.current.filter((p: any) => p.life > 0);
        particlesRef.current.forEach((p: any) => {
          p.update();
          p.draw(ctx);
        });

        if (particlesRef.current.length > 0) {
          animFrameIdRef.current = requestAnimationFrame(animateParticles);
        } else {
          animFrameIdRef.current = null;
        }
      };
      animFrameIdRef.current = requestAnimationFrame(animateParticles);
    }
  };

  // 面部区域动画
  const animEyeBlink = (region: FaceRegion, screenX: number, screenY: number) => {
    console.log('开始眼睛眨眼动画', region);
    const wrapper = document.getElementById('imageWrapper');
    if (!wrapper) {
      console.log('未找到imageWrapper元素');
      return;
    }

    // 使用屏幕坐标计算相对于wrapper的位置
    const wrapperRect = wrapper.getBoundingClientRect();
    const relX = screenX - wrapperRect.left;
    const relY = screenY - wrapperRect.top;

    console.log('眼睛动画参数:', { relX, relY, screenX, screenY });

    const eyelid = document.createElement('div');
    eyelid.className = 'region-anim';
    eyelid.style.cssText = `
      left: ${relX - 18}px; top: ${relY - 10}px;
      width: 36px; height: 20px;
      background: linear-gradient(180deg, rgba(255,200,200,0.9) 0%, rgba(255,220,220,0.95) 50%, rgba(255,200,200,0.9) 100%);
      transform-origin: center center;
      animation: eyelidBlink 1.2s ease-in-out;
      border-radius: 50%;
      overflow: hidden;
    `;

    for (let i = 0; i < 5; i++) {
      const lash = document.createElement('div');
      lash.style.cssText = `
        position: absolute; bottom: 0; left: ${10 + i * 20}%;
        width: 2px; height: ${4 + Math.random() * 6}px;
        background: #333; transform: rotate(${-10 + Math.random() * 20}deg);
      `;
      eyelid.appendChild(lash);
    }

    wrapper.appendChild(eyelid);
    console.log('眼睑元素已添加到wrapper');

    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      createParticle(screenX + Math.cos(angle) * 20, screenY + Math.sin(angle) * 20, {
        vx: Math.cos(angle) * 2, vy: Math.sin(angle) * 2,
        size: 2 + Math.random() * 3, decay: 0.02, shape: 'star', color: '#f5f520'
      });
    }

    setTimeout(() => eyelid.remove(), 1300);
  };

  const animMouthTalk = (region: FaceRegion, screenX: number, screenY: number) => {
    const wrapper = document.getElementById('imageWrapper');
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const relX = screenX - wrapperRect.left;
    const relY = screenY - wrapperRect.top;

    const mouth = document.createElement('div');
    mouth.className = 'region-anim';
    mouth.style.cssText = `
      left: ${relX - 20}px; top: ${relY - 8}px;
      width: 40px; height: 16px;
      border-radius: 0 0 50% 50%;
      background: radial-gradient(ellipse at center, #8B0000 0%, #5C0000 60%, #3A0000 100%);
      transform-origin: center top;
      animation: mouthTalk 1.5s ease-in-out;
      overflow: hidden;
    `;

    const teeth = document.createElement('div');
    teeth.style.cssText = `
      position: absolute; top: 0; left: 15%; right: 15%; height: 30%;
      background: white; border-radius: 0 0 40% 40%;
      display: flex; justify-content: space-around; padding: 0 4px;
    `;
    for (let i = 0; i < 6; i++) {
      const tooth = document.createElement('div');
      tooth.style.cssText = `flex:1; background:white; border:1px solid #ddd; border-radius:0 0 3px 3px; margin:0 1px;`;
      teeth.appendChild(tooth);
    }
    mouth.appendChild(teeth);

    const tongue = document.createElement('div');
    tongue.style.cssText = `
      position: absolute; bottom: 5%; left: 25%; width: 50%; height: 40%;
      background: #FF6B6B; border-radius: 50%;
      animation: tongueWiggle 0.5s ease-in-out infinite alternate;
    `;
    mouth.appendChild(tongue);

    wrapper.appendChild(mouth);

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI * 2 / 6) * j;
          createParticle(screenX, screenY, {
            vx: Math.cos(angle) * (2 + i * 0.5),
            vy: Math.sin(angle) * (2 + i * 0.5),
            size: 6 + i * 3, decay: 0.03, shape: 'ring', color: '#ff2d95'
          });
        }
      }, i * 150);
    }

    setTimeout(() => mouth.remove(), 1600);
  };

  const animNoseSneeze = (region: FaceRegion, screenX: number, screenY: number) => {
    const wrapper = document.getElementById('imageWrapper');
    if (!wrapper) return;

    // 使用屏幕坐标计算相对于wrapper的位置，避免border/padding偏移
    const wrapperRect = wrapper.getBoundingClientRect();
    const relX = screenX - wrapperRect.left;
    const relY = screenY - wrapperRect.top;

    const noseOverlay = document.createElement('div');
    noseOverlay.className = 'region-anim';
    noseOverlay.style.cssText = `
      left: ${relX - 25}px; top: ${relY - 25}px;
      width: 50px; height: 50px;
      border: 3px solid var(--neon-pink);
      border-radius: 50%;
      animation: noseWiggle 1.2s ease-in-out;
      box-shadow: 0 0 20px rgba(255,45,149,0.6), inset 0 0 15px rgba(255,45,149,0.2);
      background: radial-gradient(ellipse, rgba(255,45,149,0.15) 0%, transparent 70%);
    `;
    wrapper.appendChild(noseOverlay);

    const clownNose = document.createElement('div');
    clownNose.className = 'region-anim';
    clownNose.style.cssText = `
      left: ${relX - 12}px; top: ${relY - 10}px;
      width: 24px; height: 20px;
      background: radial-gradient(ellipse, #ff2222 0%, #cc0000 60%, #990000 100%);
      border-radius: 50%;
      animation: clownNosePop 1.5s ease-in-out;
      box-shadow: 0 0 15px rgba(255,0,0,0.5), 2px 2px 5px rgba(0,0,0,0.3);
      z-index: 7;
    `;
    wrapper.appendChild(clownNose);

    setTimeout(() => {
      for (let i = 0; i < 50; i++) {
        createParticle(screenX, screenY, {
          vx: (Math.random() - 0.3) * 10,
          vy: (Math.random() - 0.5) * 6 + 3,
          size: 1 + Math.random() * 4,
          gravity: 0.08,
          decay: 0.012,
          color: Math.random() > 0.3 ? '#00f0ff' : '#ffffff',
          shape: 'circle'
        });
      }
      createParticle(screenX, screenY - 40, {
        vx: 0, vy: -2, size: 8, decay: 0.008,
        shape: 'text', text: '阿嚏!', color: '#ff2d95'
      });
      createParticle(screenX + 30, screenY - 20, {
        vx: 1, vy: -1.5, size: 6, decay: 0.01,
        shape: 'text', text: '🤧', color: '#ffffff'
      });
    }, 400);

    setTimeout(() => noseOverlay.remove(), 1300);
    setTimeout(() => clownNose.remove(), 1600);
  };

  const animEarWiggle = (region: FaceRegion, screenX: number, screenY: number) => {
    const wrapper = document.getElementById('imageWrapper');
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const relX = screenX - wrapperRect.left;
    const relY = screenY - wrapperRect.top;

    const earOverlay = document.createElement('div');
    earOverlay.className = 'region-anim';
    earOverlay.style.cssText = `
      left: ${relX - 20}px; top: ${relY - 20}px;
      width: 40px; height: 40px;
      border: 3px solid var(--neon-purple);
      border-radius: 50%;
      animation: earWiggle 1.2s ease-in-out;
      box-shadow: 0 0 20px rgba(176,38,255,0.6), inset 0 0 15px rgba(176,38,255,0.2);
      background: radial-gradient(ellipse, rgba(176,38,255,0.15) 0%, transparent 70%);
    `;
    wrapper.appendChild(earOverlay);

    const earEmoji = document.createElement('div');
    earEmoji.className = 'region-anim';
    earEmoji.style.cssText = `
      left: ${relX - 14}px; top: ${relY - 14}px;
      width: 28px; height: 28px;
      font-size: 24px; line-height: 28px; text-align: center;
      animation: earEmojiPop 1.5s ease-in-out;
      z-index: 7;
    `;
    earEmoji.textContent = '👂';
    wrapper.appendChild(earEmoji);

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        for (let j = 0; j < 16; j++) {
          const angle = (Math.PI * 2 / 16) * j;
          createParticle(screenX, screenY, {
            vx: Math.cos(angle) * (2 + i * 1.2),
            vy: Math.sin(angle) * (2 + i * 1.2),
            size: 6 + i * 5, decay: 0.018, shape: 'ring', color: i % 2 === 0 ? '#b026ff' : '#ff2d95'
          });
        }
      }, i * 100);
    }

    const notes = ['♪', '♫', '♬', '🎵'];
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        createParticle(screenX + (Math.random() - 0.5) * 30, screenY, {
          vx: (Math.random() - 0.5) * 3, vy: -2 - Math.random() * 2,
          size: 4 + Math.random() * 3, gravity: -0.02, decay: 0.01,
          shape: 'text', text: notes[Math.floor(Math.random() * notes.length)], color: '#b026ff'
        });
      }, i * 200);
    }

    setTimeout(() => earOverlay.remove(), 1300);
    setTimeout(() => earEmoji.remove(), 1600);
  };

  const animEyebrowExpress = (region: FaceRegion, screenX: number, screenY: number) => {
    const wrapper = document.getElementById('imageWrapper');
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const relX = screenX - wrapperRect.left;
    const relY = screenY - wrapperRect.top;

    const browOverlay = document.createElement('div');
    browOverlay.className = 'region-anim';
    browOverlay.style.cssText = `
      left: ${relX - 25}px; top: ${relY - 15}px;
      width: 50px; height: 30px;
      border: 2px solid var(--neon-orange);
      border-radius: 8px;
      animation: browRaise 1.5s ease-in-out;
      box-shadow: 0 0 15px rgba(255,102,0,0.4);
      background: linear-gradient(180deg, rgba(255,102,0,0.1) 0%, transparent 100%);
    `;

    const angryMark = document.createElement('div');
    angryMark.style.cssText = `
      position: absolute; top: -12px; right: -12px;
      font-size: 28px; font-weight: bold; color: #ff4444;
      animation: angryPop 0.8s ease 0.2s both;
    `;
    angryMark.textContent = '💢';
    browOverlay.appendChild(angryMark);

    const humph = document.createElement('div');
    humph.style.cssText = `
      position: absolute; top: -25px; left: 50%; transform: translateX(-50%);
      font-size: 16px; font-weight: bold; color: var(--neon-orange);
      animation: humphPop 1.2s ease 0.3s both;
      white-space: nowrap;
    `;
    humph.textContent = '哼!';
    browOverlay.appendChild(humph);

    wrapper.appendChild(browOverlay);

    for (let i = 0; i < 15; i++) {
      createParticle(screenX + (Math.random() - 0.5) * 50, screenY, {
        vx: (Math.random() - 0.5) * 4, vy: -3 - Math.random() * 4,
        size: 2 + Math.random() * 4, gravity: -0.05, decay: 0.015,
        shape: Math.random() > 0.5 ? 'star' : 'circle', color: Math.random() > 0.5 ? '#ff6600' : '#ff2d95'
      });
    }

    setTimeout(() => browOverlay.remove(), 1600);
  };

  const animForeheadThink = (region: FaceRegion, screenX: number, screenY: number) => {
    const wrapper = document.getElementById('imageWrapper');
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const relX = screenX - wrapperRect.left;
    const relY = screenY - wrapperRect.top;

    const glowOverlay = document.createElement('div');
    glowOverlay.className = 'region-anim';
    glowOverlay.style.cssText = `
      left: ${relX - 25}px; top: ${relY - 25}px;
      width: 50px; height: 50px;
      border: 2px solid var(--neon-yellow);
      border-radius: 50%;
      animation: foreheadGlow 1.5s ease-in-out;
      box-shadow: 0 0 25px rgba(245,245,32,0.5);
      background: radial-gradient(ellipse, rgba(245,245,32,0.2) 0%, transparent 70%);
    `;
    wrapper.appendChild(glowOverlay);

    const bulb = document.createElement('div');
    bulb.className = 'region-anim';
    bulb.style.cssText = `
      left: ${relX - 18}px; top: ${relY - 40}px;
      width: 36px; height: 36px;
      font-size: 30px; line-height: 36px; text-align: center;
      animation: bulbPop 1.8s ease-in-out;
      z-index: 7;
    `;
    bulb.textContent = '💡';
    wrapper.appendChild(bulb);

    createParticle(screenX, screenY - 50, {
      vx: 0, vy: -0.8, size: 8, decay: 0.004, shape: 'text', text: '💡', color: '#f5f520'
    });

    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        createParticle(screenX + (i - 1.5) * 12, screenY - 25, {
          vx: 0, vy: -1.5, size: 5, decay: 0.012, shape: 'text', text: '.', color: '#f5f520'
        });
      }, i * 250);
    }

    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      createParticle(screenX, screenY, {
        vx: Math.cos(angle) * 4, vy: Math.sin(angle) * 4 - 1,
        size: 2 + Math.random() * 4, decay: 0.012, shape: 'star', color: '#f5f520'
      });
    }

    createParticle(screenX, screenY - 60, {
      vx: 0, vy: -1, size: 6, decay: 0.008, shape: 'text', text: '嗯...', color: '#f5f520'
    });

    setTimeout(() => glowOverlay.remove(), 1600);
    setTimeout(() => bulb.remove(), 1900);
  };

  const animChinWobble = (region: FaceRegion, screenX: number, screenY: number) => {
    const wrapper = document.getElementById('imageWrapper');
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const relX = screenX - wrapperRect.left;
    const relY = screenY - wrapperRect.top;

    const chinOverlay = document.createElement('div');
    chinOverlay.className = 'region-anim';
    chinOverlay.style.cssText = `
      left: ${relX - 20}px; top: ${relY - 10}px;
      width: 40px; height: 30px;
      border: 3px solid var(--neon-cyan);
      border-radius: 0 0 50% 50%;
      animation: chinWobble 1.2s ease-in-out;
      box-shadow: 0 0 20px rgba(0,240,255,0.5);
      background: radial-gradient(ellipse at center bottom, rgba(0,240,255,0.15) 0%, transparent 70%);
    `;
    wrapper.appendChild(chinOverlay);

    const goatee = document.createElement('div');
    goatee.className = 'region-anim';
    goatee.style.cssText = `
      left: ${relX - 10}px; top: ${relY}px;
      width: 20px; height: 25px;
      background: linear-gradient(180deg, #8B4513 0%, #654321 100%);
      border-radius: 0 0 50% 50%;
      animation: goateeGrow 1.5s ease-in-out;
      z-index: 7;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    `;
    wrapper.appendChild(goatee);

    for (let i = 0; i < 35; i++) {
      createParticle(screenX + (Math.random() - 0.5) * 50, screenY + Math.random() * 30, {
        vx: (Math.random() - 0.5) * 1, vy: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2, decay: 0.015, color: Math.random() > 0.5 ? '#8B4513' : '#654321', shape: 'circle'
      });
    }

    createParticle(screenX, screenY - 20, {
      vx: 0, vy: -1.5, size: 6, decay: 0.01, shape: 'text', text: '嘟~', color: '#00f0ff'
    });

    setTimeout(() => chinOverlay.remove(), 1300);
    setTimeout(() => goatee.remove(), 1600);
  };

  const animFaceBlush = (region: FaceRegion, screenX: number, screenY: number) => {
    const wrapper = document.getElementById('imageWrapper');
    if (!wrapper) return;

    const allLm = region.allFaceLandmarks;
    if (!allLm) return;

    const img = document.getElementById('mainImage') as HTMLImageElement;
    if (!img) return;

    const imgW = img.offsetWidth;
    const imgH = img.offsetHeight;

    const leftCheekIdx = [234, 93, 132, 127, 162, 50, 280, 351];
    const rightCheekIdx = [454, 323, 361, 356, 389, 280, 50, 121];

    ([[leftCheekIdx, 'left'], [rightCheekIdx, 'right']] as [number[], string][]).forEach(([indices, side]) => {
      const pts = indices.map((i: number) => allLm[i]).filter((p: any) => p);
      if (pts.length > 0) {
        const cx = pts.reduce((a: number, p: any) => a + p.x, 0) / pts.length * imgW;
        const cy = pts.reduce((a: number, p: any) => a + p.y, 0) / pts.length * imgH;
        const blush = document.createElement('div');
        blush.className = 'region-anim';
        blush.style.cssText = `
          left: ${cx - 35}px; top: ${cy - 28}px;
          width: 70px; height: 56px;
          background: radial-gradient(ellipse, rgba(255,80,80,0.7) 0%, rgba(255,100,100,0.4) 40%, transparent 70%);
          border-radius: 50%;
          animation: blushFade 2s ease-in-out;
          box-shadow: 0 0 15px rgba(255,80,80,0.3);
        `;
        wrapper.appendChild(blush);
        setTimeout(() => blush.remove(), 2100);
      }
    });

    for (let i = 0; i < 15; i++) {
      createParticle(screenX + (Math.random() - 0.5) * 50, screenY + (Math.random() - 0.5) * 30, {
        vx: (Math.random() - 0.5) * 4, vy: -1.5 - Math.random() * 3,
        size: 4 + Math.random() * 5, gravity: -0.03, decay: 0.008,
        shape: 'heart', color: Math.random() > 0.5 ? '#ff2d95' : '#ff4444'
      });
    }

    createParticle(screenX, screenY - 40, {
      vx: 0, vy: -1.5, size: 6, decay: 0.008, shape: 'text', text: '害羞~', color: '#ff2d95'
    });

    createParticle(screenX + 25, screenY - 30, {
      vx: 0.5, vy: -1, size: 5, decay: 0.01, shape: 'text', text: '😊', color: '#ff2d95'
    });
  };

  // 触发面部动画
  const triggerFaceAnimation = (region: FaceRegion, screenX: number, screenY: number) => {
    console.log('触发面部动画:', region.region, region.label);
    switch (region.region) {
      case 'leftEye':
      case 'rightEye':
        console.log('执行眼睛眨眼动画');
        animEyeBlink(region, screenX, screenY);
        break;
      case 'mouth':
        console.log('执行嘴巴说话动画');
        animMouthTalk(region, screenX, screenY);
        break;
      case 'nose':
        console.log('执行鼻子喷嚏动画');
        animNoseSneeze(region, screenX, screenY);
        break;
      case 'leftEar':
      case 'rightEar':
        console.log('执行耳朵摆动动画');
        animEarWiggle(region, screenX, screenY);
        break;
      case 'leftEyebrow':
      case 'rightEyebrow':
        console.log('执行眉毛表情动画');
        animEyebrowExpress(region, screenX, screenY);
        break;
      case 'forehead':
        console.log('执行额头思考动画');
        animForeheadThink(region, screenX, screenY);
        break;
      case 'chin':
        console.log('执行下巴摆动动画');
        animChinWobble(region, screenX, screenY);
        break;
      case 'face':
        console.log('执行脸部害羞动画');
        animFaceBlush(region, screenX, screenY);
        break;
      default:
        console.log('未知的面部区域:', region.region);
        break;
    }
  };

  return {
    createParticle,
    triggerFaceAnimation
  };
};
