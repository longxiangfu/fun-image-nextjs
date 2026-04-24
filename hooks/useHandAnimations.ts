import { useAnimations } from './useAnimations';

export const useHandAnimations = () => {
  const { createParticle } = useAnimations();

  const randomNeon = () => {
    const colors = ['#ff2d95', '#00f0ff', '#f5f520', '#39ff14', '#b026ff', '#ff6600', '#ff4444', '#44ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const animHandAction = (handRegion: any, screenX: number, screenY: number) => {
    const wrapper = document.getElementById('imageWrapper');
    if (!wrapper) return;

    const bbox = handRegion.bbox;
    const w = bbox.maxX - bbox.minX;
    const h = bbox.maxY - bbox.minY;

    const handOverlay = document.createElement('div');
    handOverlay.className = 'region-anim';
    handOverlay.style.cssText = `
      left: ${bbox.minX}px; top: ${bbox.minY}px;
      width: ${w}px; height: ${h}px;
      border: 3px solid var(--neon-green);
      border-radius: 12px;
      animation: handGlow 1.2s ease-in-out;
      box-shadow: 0 0 25px rgba(57,255,20,0.5);
      background: radial-gradient(ellipse, rgba(57,255,20,0.1) 0%, transparent 70%);
    `;
    wrapper.appendChild(handOverlay);

    // Random hand action
    const actions = ['wave', 'highfive', 'magic', 'fist'];
    const action = actions[Math.floor(Math.random() * actions.length)];

    if (action === 'wave') {
      // Waving hand emoji + motion
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createParticle(screenX + Math.sin(i * 0.8) * 20, screenY - 10 - i * 5, {
            vx: Math.sin(i * 0.8) * 2, vy: -1,
            size: 6, decay: 0.015, shape: 'text', text: '👋', color: '#39ff14'
          });
        }, i * 100);
      }
      createParticle(screenX, screenY - 40, {
        vx: 0, vy: -1.5, size: 6, decay: 0.008, shape: 'text', text: '嗨~', color: '#39ff14'
      });
    } else if (action === 'highfive') {
      // High five impact
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        createParticle(screenX, screenY, {
          vx: Math.cos(angle) * 5, vy: Math.sin(angle) * 5,
          size: 3 + Math.random() * 5, decay: 0.015, shape: 'star', color: randomNeon()
        });
      }
      createParticle(screenX, screenY - 20, {
        vx: 0, vy: -2, size: 8, decay: 0.006, shape: 'text', text: '击掌!', color: '#f5f520'
      });

      // Impact rings
      for (let r = 0; r < 3; r++) {
        setTimeout(() => {
          for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 / 12) * i;
            createParticle(screenX, screenY, {
              vx: Math.cos(angle) * (3 + r * 2), vy: Math.sin(angle) * (3 + r * 2),
              size: 8 + r * 5, decay: 0.02, shape: 'ring', color: '#f5f520'
            });
          }
        }, r * 80);
      }
    } else if (action === 'magic') {
      // Magic wand effect
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        createParticle(screenX, screenY, {
          vx: Math.cos(angle) * (2 + Math.random() * 4),
          vy: Math.sin(angle) * (2 + Math.random() * 4),
          size: 2 + Math.random() * 3, decay: 0.012,
          shape: Math.random() > 0.5 ? 'star' : 'circle',
          color: randomNeon()
        });
      }

      // Sparkle emojis
      const sparkles = ['✨', '💫', '⭐', '🌟'];
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createParticle(screenX + (Math.random() - 0.5) * 40, screenY - 20 - Math.random() * 30, {
            vx: (Math.random() - 0.5) * 2, vy: -1 - Math.random(),
            size: 5, decay: 0.01, shape: 'text',
            text: sparkles[Math.floor(Math.random() * sparkles.length)],
            color: randomNeon()
          });
        }, i * 100);
      }

      createParticle(screenX, screenY - 40, {
        vx: 0, vy: -1.5, size: 6, decay: 0.008, shape: 'text', text: '魔法!', color: '#b026ff'
      });
    } else if (action === 'fist') {
      // Fist pump
      for (let i = 0; i < 15; i++) {
        createParticle(screenX + (Math.random() - 0.5) * 30, screenY + (Math.random() - 0.5) * 30, {
          vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4,
          size: 3 + Math.random() * 4, decay: 0.015, shape: 'circle', color: '#ff6600'
        });
      }

      createParticle(screenX, screenY - 30, {
        vx: 0, vy: -2, size: 7, decay: 0.008, shape: 'text', text: '💪', color: '#ff6600'
      });

      // Power lines
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const angle = Math.random() * Math.PI * 2;
          createParticle(screenX, screenY, {
            vx: Math.cos(angle) * 3, vy: Math.sin(angle) * 3 - 2,
            size: 4 + Math.random() * 3, decay: 0.02, shape: 'ring', color: '#ff6600'
          });
        }, i * 80);
      }
    }

    setTimeout(() => handOverlay.remove(), 1300);
  };

  return {
    animHandAction
  };
};
