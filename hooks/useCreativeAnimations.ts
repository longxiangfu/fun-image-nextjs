import { useAnimations } from './useAnimations';

export const useCreativeAnimations = () => {
  const { createParticle } = useAnimations();

  const randomNeon = () => {
    const colors = ['#ff2d95', '#00f0ff', '#f5f520', '#39ff14', '#b026ff', '#ff6600', '#ff4444', '#44ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const animUnknownRegion = (screenX: number, screenY: number) => {
    const creativeEffects = [
      effectMagicWand,
      effectPixelExplosion,
      effectConfetti,
      effectFirework,
      effectEmojiBurst,
      effectStars,
      effectSpiral,
      effectRipplePop,
      effectColorSplash,
      effectComicBurst
    ];
    const fn = creativeEffects[Math.floor(Math.random() * creativeEffects.length)];
    fn(screenX, screenY);
  };

  const effectMagicWand = (x: number, y: number) => {
    // Wand trail
    for (let i = 0; i < 20; i++) {
      const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.5;
      const speed = 2 + i * 0.3;
      createParticle(x - i * 3, y + i * 2, {
        vx: Math.cos(angle) * speed * 0.3, vy: Math.sin(angle) * speed * 0.3,
        size: 3 + Math.random() * 4, decay: 0.01, shape: 'star',
        color: ['#f5f520', '#ff2d95', '#00f0ff', '#39ff14'][i % 4]
      });
    }

    // Sparkle burst at tip
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      createParticle(x, y, {
        vx: Math.cos(angle) * (3 + Math.random() * 4), vy: Math.sin(angle) * (3 + Math.random() * 4),
        size: 2 + Math.random() * 4, decay: 0.012, shape: Math.random() > 0.5 ? 'star' : 'circle',
        color: randomNeon()
      });
    }

    // "变!" text
    createParticle(x, y - 30, {
      vx: 0, vy: -1.5, size: 7, decay: 0.008, shape: 'text', text: '✨变!', color: '#f5f520'
    });
  };

  const effectPixelExplosion = (x: number, y: number) => {
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      createParticle(x, y, {
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 5, gravity: 0.08, decay: 0.01,
        shape: 'circle', color: randomNeon()
      });
    }
  };

  const effectRipplePop = (x: number, y: number) => {
    for (let ring = 0; ring < 6; ring++) {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          const angle = (Math.PI * 2 / 20) * i;
          const speed = 2 + ring * 1.5;
          createParticle(x, y, {
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            size: 8 + ring * 5, decay: 0.015, shape: 'ring', color: randomNeon()
          });
        }
      }, ring * 80);
    }
  };

  const effectColorSplash = (x: number, y: number) => {
    const colors = ['#ff2d95', '#00f0ff', '#f5f520', '#39ff14', '#b026ff', '#ff6600'];
    for (let c = 0; c < 6; c++) {
      setTimeout(() => {
        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 5;
          createParticle(x, y, {
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            size: 3 + Math.random() * 5, gravity: 0.1, decay: 0.008,
            shape: 'circle', color: colors[c]
          });
        }
      }, c * 60);
    }
  };

  const effectComicBurst = (x: number, y: number) => {
    // Star burst shape
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 / 16) * i;
      const speed = 4 + Math.random() * 3;
      createParticle(x, y, {
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 5 + Math.random() * 6, decay: 0.015, shape: 'star',
        color: i % 2 === 0 ? '#f5f520' : '#ff2d95'
      });
    }

    // Comic text
    const texts = ['砰!', '嘭!', '哇!', '哈!', '咻!'];
    createParticle(x, y - 25, {
      vx: 0, vy: -2, size: 10, decay: 0.006, shape: 'text',
      text: texts[Math.floor(Math.random() * texts.length)], color: '#f5f520'
    });
  };

  const effectExplosion = (x: number, y: number) => {
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 / 30) * i;
      const speed = 3 + Math.random() * 5;
      createParticle(x, y, {
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4, gravity: 0.05,
        shape: Math.random() > 0.5 ? 'circle' : 'star'
      });
    }
  };

  const effectConfetti = (x: number, y: number) => {
    for (let i = 0; i < 40; i++) {
      createParticle(x, y, {
        vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 10 - 2,
        size: 3 + Math.random() * 4, gravity: 0.15, decay: 0.006,
        color: randomNeon(), shape: Math.random() > 0.3 ? 'circle' : 'star'
      });
    }
  };

  const effectFirework = (x: number, y: number) => {
    setTimeout(() => {
      for (let i = 0; i < 40; i++) {
        const angle = (Math.PI * 2 / 40) * i;
        const speed = 2 + Math.random() * 4;
        createParticle(x, y - 60, {
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3, gravity: 0.06, decay: 0.01,
          shape: Math.random() > 0.5 ? 'star' : 'circle', color: randomNeon()
        });
      }
    }, 200);
  };

  const effectEmojiBurst = (x: number, y: number) => {
    const emojis = ['😂', '🤣', '😜', '🤪', '💥', '🔥', '✨', '🎉', '🤯', '😎', '👻', '🥳'];
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 / 10) * i;
      const speed = 2 + Math.random() * 3;
      createParticle(x, y, {
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 3, gravity: 0.04, decay: 0.008,
        shape: 'text', text: emojis[Math.floor(Math.random() * emojis.length)], color: randomNeon()
      });
    }
  };

  const effectStars = (x: number, y: number) => {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      createParticle(x, y, {
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 5, gravity: 0.02, decay: 0.01,
        shape: 'star', color: randomNeon()
      });
    }
  };

  const effectSpiral = (x: number, y: number) => {
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 6;
      const radius = i * 0.7;
      createParticle(x, y, {
        vx: Math.cos(angle) * radius * 0.15, vy: Math.sin(angle) * radius * 0.15,
        size: 2 + Math.random() * 2, decay: 0.008, shape: 'circle'
      });
    }
  };

  return {
    animUnknownRegion
  };
};
