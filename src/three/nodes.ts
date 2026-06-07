import * as THREE from 'three';
import gsap from 'gsap';
import { RoadmapNodeData } from '@/store/useRoadmapStore';

export type NodeStatus = 'complete' | 'active' | 'locked';

export interface NodeObject {
  group: THREE.Group;
  core: THREE.Mesh;
  ring: THREE.Mesh;
  halo: THREE.Sprite;
  floatTween: gsap.core.Tween;
  cleanup: () => void;
}

// Lays out nodes on a vertical spine winding path to match editorial astronomy diagrams
export function get3DPosition(index: number, total: number): THREE.Vector3 {
  const x = Math.sin(index * 0.8) * 12; // sinusoidal X drift
  const y = -index * 15; // descend vertically as roadmap progresses
  const z = Math.cos(index * 0.5) * 4; // Z depth variation
  return new THREE.Vector3(x, y, z);
}

// Radial glow canvas textures with pulsar and nova accents
function createHaloTexture(status: NodeStatus): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    if (status === 'complete') {
      // Pulsar Cyan glow (#00E5CC)
      grad.addColorStop(0, 'rgba(0, 229, 204, 0.75)');
      grad.addColorStop(0.35, 'rgba(0, 229, 204, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (status === 'active') {
      // Intense Nova Violet glow (#6E54F7)
      grad.addColorStop(0, 'rgba(110, 84, 247, 0.85)');
      grad.addColorStop(0.35, 'rgba(110, 84, 247, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      // Locked - dim starlight grey glow
      grad.addColorStop(0, 'rgba(238, 238, 255, 0.15)');
      grad.addColorStop(0.5, 'rgba(238, 238, 255, 0.02)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createNode(milestone: RoadmapNodeData, position: THREE.Vector3, status: NodeStatus): NodeObject {
  const group = new THREE.Group();
  group.position.copy(position);

  // 1. Core Sphere Mesh
  const coreGeo = new THREE.SphereGeometry(1.6, 32, 32);
  
  let coreColor = 0x1A1A35; // Locked gray-blue
  let emissiveColor = 0x000000;
  let emissiveIntensity = 0.0;

  if (status === 'complete') {
    coreColor = 0x00E5CC; // Pulsar Cyan
    emissiveColor = 0x00E5CC;
    emissiveIntensity = 0.5;
  } else if (status === 'active') {
    coreColor = 0x6e54f7; // Nova Violet
    emissiveColor = 0x6e54f7;
    emissiveIntensity = 0.9;
  }

  const coreMat = new THREE.MeshStandardMaterial({
    color: coreColor,
    emissive: emissiveColor,
    emissiveIntensity: emissiveIntensity,
    roughness: 0.05,
    metalness: 0.95
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  // 2. Spinning outer torus ring
  const ringGeo = new THREE.TorusGeometry(2.2, 0.07, 6, 64);
  
  let ringColor = 0x2A2A50; // Locked dark grey-blue
  let ringOpacity = 0.3;

  if (status === 'complete') {
    ringColor = 0x00E5CC; // Pulsar Cyan
    ringOpacity = 0.9;
  } else if (status === 'active') {
    ringColor = 0x9B8BFF; // Nova Bright
    ringOpacity = 0.9;
  }

  const ringMat = new THREE.MeshBasicMaterial({
    color: ringColor,
    transparent: true,
    opacity: ringOpacity
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // 3. Glow Sprite Halo
  const haloTex = createHaloTexture(status);
  const haloMat = new THREE.SpriteMaterial({
    map: haloTex,
    transparent: true,
    opacity: status === 'active' ? 0.85 : status === 'complete' ? 0.6 : 0.3,
    depthWrite: false
  });
  const halo = new THREE.Sprite(haloMat);
  
  // Set scale based on status
  const haloScale = status === 'active' ? 18 : status === 'complete' ? 14 : 10;
  halo.scale.set(haloScale, haloScale, 1);
  group.add(halo);

  // 4. Floating animation using GSAP
  // Float nodes slightly on Y axis over time to simulate zero-gravity
  const floatTween = gsap.to(group.position, {
    y: position.y + 0.6,
    duration: 2 + Math.random() * 1.5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  const cleanup = () => {
    floatTween.kill();
    coreGeo.dispose();
    coreMat.dispose();
    ringGeo.dispose();
    ringMat.dispose();
    haloTex.dispose();
    haloMat.dispose();
  };

  return {
    group,
    core,
    ring,
    halo,
    floatTween,
    cleanup
  };
}

export interface PathObject {
  line: THREE.LineSegments;
  spark?: THREE.Mesh;
  sparkTween?: gsap.core.Tween;
  cleanup: () => void;
}

export function createPath(
  scene: THREE.Scene, 
  from: THREE.Vector3, 
  to: THREE.Vector3, 
  pathStatus: 'complete' | 'active' | 'locked'
): PathObject {
  // Compute curved Bezier curve connecting nodes
  const mid = new THREE.Vector3(
    (from.x + to.x) / 2 + 5,
    (from.y + to.y) / 2,
    (from.z + to.z) / 2 + 3
  );
  
  const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
  const pointsCount = 50;
  const pts = curve.getPoints(pointsCount);

  // Build dashed segment arrays
  const positions: number[] = [];
  pts.forEach((p, i) => {
    if (i < pts.length - 1 && i % 2 === 0) {
      positions.push(p.x, p.y, p.z);
      positions.push(pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
    }
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));

  let lineColor = 0x1A1A35; // locked dark gray-blue
  let opacity = 0.8;

  if (pathStatus === 'complete') {
    lineColor = 0x00E5CC; // Completed path glows Pulsar Cyan
    opacity = 0.9;
  } else if (pathStatus === 'active') {
    lineColor = 0x6e54f7; // Active path glows Nova Violet
    opacity = 0.9;
  }

  const mat = new THREE.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: opacity
  });

  const line = new THREE.LineSegments(geo, mat);
  scene.add(line);

  // If path is active, render the traveling bead spark
  let spark: THREE.Mesh | undefined;
  let sparkTween: gsap.core.Tween | undefined;

  if (pathStatus === 'active') {
    const sparkGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const sparkMat = new THREE.MeshBasicMaterial({ 
      color: 0x9B8BFF, // Nova Bright
    });
    spark = new THREE.Mesh(sparkGeo, sparkMat);
    scene.add(spark);

    // Animate along path using GSAP loop
    const animObj = { progress: 0 };
    sparkTween = gsap.to(animObj, {
      progress: 1,
      duration: 5,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        if (spark) {
          const pt = curve.getPointAt(animObj.progress);
          spark.position.copy(pt);
        }
      }
    });
  }

  const cleanup = () => {
    geo.dispose();
    mat.dispose();
    if (spark) {
      scene.remove(spark);
      spark.geometry.dispose();
      (spark.material as THREE.Material).dispose();
    }
    if (sparkTween) {
      sparkTween.kill();
    }
  };

  return {
    line,
    spark,
    sparkTween,
    cleanup
  };
}
