import { ObjectRegion } from '../types';
import { useAnimations } from './useAnimations';

export const useObjectAnimations = () => {
  const { createParticle } = useAnimations();

  const animObjectAction = (objRegion: ObjectRegion, screenX: number, screenY: number) => {
    const label = (objRegion.labelEn || objRegion.label || '').toLowerCase();
    const bbox = objRegion.bbox;
    const wrapper = document.getElementById('imageWrapper');

    // 动物动画
    if (['cat', 'dog', 'bird', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe'].includes(label)) {
      animAnimalBounce(objRegion, screenX, screenY, wrapper);
      return;
    }

    // 食物动画
    if (['banana', 'apple', 'sandwich', 'orange', 'pizza', 'donut', 'cake', 'hot dog', 'broccoli', 'carrot', 'bowl', 'cup', 'bottle', 'wine glass'].includes(label)) {
      animFoodShake(objRegion, screenX, screenY, wrapper);
      return;
    }

    // 车辆动画
    if (['car', 'bicycle', 'motorcycle', 'bus', 'truck', 'train', 'airplane', 'boat', 'skateboard', 'surfboard'].includes(label)) {
      animVehicleSpeed(objRegion, screenX, screenY, wrapper);
      return;
    }

    // 电子产品动画
    if (['tv', 'laptop', 'cell phone', 'keyboard', 'mouse', 'microwave', 'refrigerator'].includes(label)) {
      animElectronicsGlitch(objRegion, screenX, screenY, wrapper);
      return;
    }

    // 人物动画
    if (label === 'person') {
      animPersonDance(objRegion, screenX, screenY, wrapper);
      return;
    }

    // 默认动画
    animGenericFun(objRegion, screenX, screenY, wrapper);
  };

  const animAnimalBounce = (objRegion: ObjectRegion, screenX: number, screenY: number, wrapper: HTMLElement | null) => {
    if (!wrapper) return;

    const bbox = objRegion.bbox;
    const label = (objRegion.labelEn || '').toLowerCase();

    const overlay = document.createElement('div');
    overlay.className = 'region-anim';
    overlay.style.cssText = `
      left: ${bbox.minX}px; top: ${bbox.minY}px;
      width: ${bbox.maxX - bbox.minX}px; height: ${bbox.maxY - bbox.minY}px;
      border: 2px solid var(--neon-green); border-radius: 8px;
      animation: animalBounce 1s ease-in-out;
      box-shadow: 0 0 15px rgba(57,255,20,0.4);
    `;
    wrapper.appendChild(overlay);

    const pawEmoji = label === 'bird' ? '🐾' : '🐾';
    for (let i = 0; i < 6; i++) {
      createParticle(screenX + (Math.random() - 0.5) * 60, screenY + 20 + i * 15, {
        vx: (Math.random() - 0.5) * 2, vy: 1 + Math.random(),
        size: 4, decay: 0.01, shape: 'text', text: pawEmoji, color: randomNeon()
      });
    }

    const sounds: { [key: string]: string } = {
      cat: '喵~', dog: '汪!', bird: '啾!', horse: '咴!', cow: '哞!', sheep: '咩~', bear: '嗷!'
    };
    const sound = sounds[label] || '嗷!';
    createParticle(screenX, screenY - 30, {
      vx: 0, vy: -1.5, size: 5, decay: 0.01, shape: 'text', text: sound, color: '#39ff14'
    });

    setTimeout(() => overlay.remove(), 1100);
  };

  const animFoodShake = (objRegion: ObjectRegion, screenX: number, screenY: number, wrapper: HTMLElement | null) => {
    if (!wrapper) return;

    const bbox = objRegion.bbox;

    const overlay = document.createElement('div');
    overlay.className = 'region-anim';
    overlay.style.cssText = `
      left: ${bbox.minX}px; top: ${bbox.minY}px;
      width: ${bbox.maxX - bbox.minX}px; height: ${bbox.maxY - bbox.minY}px;
      border: 2px solid var(--neon-yellow); border-radius: 8px;
      animation: foodShake 0.6s ease-in-out;
      box-shadow: 0 0 15px rgba(245,245,32,0.4);
    `;
    wrapper.appendChild(overlay);

    const foodEmojis = ['😋', '🤤', '✨', '⭐', '🌟'];
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      createParticle(screenX, screenY, {
        vx: Math.cos(angle) * 3, vy: Math.sin(angle) * 3 - 1,
        size: 4 + Math.random() * 3, gravity: 0.03, decay: 0.01,
        shape: 'text', text: foodEmojis[Math.floor(Math.random() * foodEmojis.length)], color: randomNeon()
      });
    }

    createParticle(screenX, screenY - 30, {
      vx: 0, vy: -1.5, size: 5, decay: 0.01, shape: 'text', text: '好吃!', color: '#f5f520'
    });

    setTimeout(() => overlay.remove(), 700);
  };

  const animVehicleSpeed = (objRegion: ObjectRegion, screenX: number, screenY: number, wrapper: HTMLElement | null) => {
    if (!wrapper) return;

    const bbox = objRegion.bbox;

    const overlay = document.createElement('div');
    overlay.className = 'region-anim';
    overlay.style.cssText = `
      left: ${bbox.minX}px; top: ${bbox.minY}px;
      width: ${bbox.maxX - bbox.minX}px; height: ${bbox.maxY - bbox.minY}px;
      border: 2px solid var(--neon-orange); border-radius: 8px;
      animation: vehicleSpeed 0.8s ease-in-out;
      box-shadow: 0 0 15px rgba(255,102,0,0.4);
    `;
    wrapper.appendChild(overlay);

    for (let i = 0; i < 15; i++) {
      createParticle(screenX - 30, screenY + (Math.random() - 0.5) * 40, {
        vx: -5 - Math.random() * 5, vy: (Math.random() - 0.5) * 2,
        size: 8 + Math.random() * 15, decay: 0.03, color: '#ff6600', shape: 'circle'
      });
    }

    createParticle(screenX, screenY - 30, {
      vx: 0, vy: -1.5, size: 5, decay: 0.01, shape: 'text', text: '嗖~!', color: '#ff6600'
    });

    setTimeout(() => overlay.remove(), 900);
  };

  const animElectronicsGlitch = (objRegion: ObjectRegion, screenX: number, screenY: number, wrapper: HTMLElement | null) => {
    if (!wrapper) return;

    const bbox = objRegion.bbox;

    const overlay = document.createElement('div');
    overlay.className = 'region-anim';
    overlay.style.cssText = `
      left: ${bbox.minX}px; top: ${bbox.minY}px;
      width: ${bbox.maxX - bbox.minX}px; height: ${bbox.maxY - bbox.minY}px;
      border: 2px solid var(--neon-cyan); border-radius: 4px;
      animation: electronicsGlitch 0.6s ease-in-out;
      box-shadow: 0 0 20px rgba(0,240,255,0.5);
    `;
    wrapper.appendChild(overlay);

    for (let i = 0; i < 20; i++) {
      createParticle(screenX + (Math.random() - 0.5) * 50, screenY - 20, {
        vx: 0, vy: 1 + Math.random() * 2, size: 3, decay: 0.01,
        shape: 'text', text: Math.random() > 0.5 ? '1' : '0', color: '#39ff14'
      });
    }

    setTimeout(() => overlay.remove(), 700);
  };

  const animPersonDance = (objRegion: ObjectRegion, screenX: number, screenY: number, wrapper: HTMLElement | null) => {
    if (!wrapper) return;

    const bbox = objRegion.bbox;

    const overlay = document.createElement('div');
    overlay.className = 'region-anim';
    overlay.style.cssText = `
      left: ${bbox.minX}px; top: ${bbox.minY}px;
      width: ${bbox.maxX - bbox.minX}px; height: ${bbox.maxY - bbox.minY}px;
      border: 2px solid var(--neon-pink); border-radius: 8px;
      animation: personDance 1s ease-in-out;
      box-shadow: 0 0 15px rgba(255,45,149,0.4);
    `;
    wrapper.appendChild(overlay);

    const notes = ['🎵', '🎶', '💃', '🕺'];
    for (let i = 0; i < 8; i++) {
      createParticle(screenX + (Math.random() - 0.5) * 40, screenY, {
        vx: (Math.random() - 0.5) * 3, vy: -2 - Math.random() * 3,
        size: 4 + Math.random() * 3, gravity: -0.02, decay: 0.01,
        shape: 'text', text: notes[Math.floor(Math.random() * notes.length)], color: randomNeon()
      });
    }

    setTimeout(() => overlay.remove(), 1100);
  };

  const animGenericFun = (objRegion: ObjectRegion, screenX: number, screenY: number, wrapper: HTMLElement | null) => {
    if (!wrapper) return;

    const bbox = objRegion.bbox;

    const overlay = document.createElement('div');
    overlay.className = 'region-anim';
    overlay.style.cssText = `
      left: ${bbox.minX}px; top: ${bbox.minY}px;
      width: ${bbox.maxX - bbox.minX}px; height: ${bbox.maxY - bbox.minY}px;
      border: 2px solid var(--neon-purple); border-radius: 8px;
      animation: genericPop 0.8s ease-in-out;
      box-shadow: 0 0 15px rgba(176,38,255,0.4);
    `;
    wrapper.appendChild(overlay);

    const emojis = ['💥', '✨', '🎉', '🪄', '⚡', '🔮'];
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      createParticle(screenX, screenY, {
        vx: Math.cos(angle) * 4, vy: Math.sin(angle) * 4,
        size: 4 + Math.random() * 3, gravity: 0.05, decay: 0.01,
        shape: 'text', text: emojis[Math.floor(Math.random() * emojis.length)], color: randomNeon()
      });
    }

    setTimeout(() => overlay.remove(), 900);
  };

  const randomNeon = () => {
    const colors = ['#ff2d95', '#00f0ff', '#f5f520', '#39ff14', '#b026ff', '#ff6600', '#ff4444', '#44ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return {
    animObjectAction
  };
};
