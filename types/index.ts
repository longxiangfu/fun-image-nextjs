// Global type declarations for MediaPipe and other external libraries
declare global {
  interface Window {
    FaceMesh?: any;
    createParticle?: (x: number, y: number, options: any) => void;
  }
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  color: string;
  gravity: number;
  shape: string;
  rotation: number;
  rotSpeed: number;
  text: string;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface DetectionBox {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

export interface Detection {
  label: string;
  labelZh: string;
  score: number;
  box: DetectionBox;
}

export interface FaceLandmark {
  x: number;
  y: number;
  z: number;
}

export interface FaceRegion {
  type: string;
  region: string;
  label: string;
  centerX: number;
  centerY: number;
  bbox: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  landmarks?: FaceLandmark[];
  allFaceLandmarks?: FaceLandmark[];
}

export interface ObjectRegion {
  type: string;
  label: string;
  labelEn: string;
  score: number;
  centerX: number;
  centerY: number;
  bbox: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}
