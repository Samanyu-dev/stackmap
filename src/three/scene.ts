import * as THREE from 'three';

export interface SceneSetup {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  resize: () => void;
  cleanup: () => void;
}

export function initScene(canvas: HTMLCanvasElement): SceneSetup {
  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;

  // Scene setup with cosmic background color and exponential fog
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020208, 0.001); // Deeper fog matching abyss

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Camera - perspective, positioned above the map coordinates
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
  camera.position.set(0, 100, 220);

  // Handle resizing of the canvas container
  const resize = () => {
    const parent = canvas.parentElement;
    const w = parent ? parent.clientWidth : window.innerWidth;
    const h = parent ? parent.clientHeight : window.innerHeight;
    
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    
    renderer.setSize(w, h, false);
  };

  const cleanup = () => {
    renderer.dispose();
  };

  return { scene, camera, renderer, resize, cleanup };
}
