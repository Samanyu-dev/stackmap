import * as THREE from 'three';

export function createStarfield(scene: THREE.Scene): THREE.Points {
  const count = 15000;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(count * 3);
  const starColors = new Float32Array(count * 3);

  // Distribute stars randomly in a large shell around the galaxy center
  for (let i = 0; i < count * 3; i += 3) {
    const radius = 600 + Math.random() * 1200;
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    
    starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starPositions[i + 2] = radius * Math.cos(phi);

    // Distribute star colors among white, electric violet, and pulsar cyan
    const r = Math.random();
    if (r < 0.6) {
      // Pure White/Starlight
      starColors[i] = 0.95;
      starColors[i + 1] = 0.95;
      starColors[i + 2] = 1.0;
    } else if (r < 0.85) {
      // Nova Violet (#A78BFA tint)
      starColors[i] = 0.65;
      starColors[i + 1] = 0.55;
      starColors[i + 2] = 0.98;
    } else {
      // Pulsar Cyan (#06D6C7 tint)
      starColors[i] = 0.02;
      starColors[i + 1] = 0.84;
      starColors[i + 2] = 0.78;
    }
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 1.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  return starField;
}
