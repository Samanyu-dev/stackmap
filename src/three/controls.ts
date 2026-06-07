import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoadmapNodeData } from '@/store/useRoadmapStore';

export interface ControlsSetup {
  controls: OrbitControls;
  update: () => void;
  cleanup: () => void;
}

export function initControls(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  nodeMeshes: { mesh: THREE.Mesh; nodeGroup: THREE.Group; data: RoadmapNodeData }[],
  onNodeClick: (node: RoadmapNodeData, nodeGroup: THREE.Group) => void
): ControlsSetup {
  // Orbit Controls setup with damping to feel smooth
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.04;
  controls.minDistance = 30;
  controls.maxDistance = 450;
  controls.maxPolarAngle = Math.PI / 1.8; // Prevent looking below the constellation floor

  // Raycasting for interactive mouse interactions
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoveredMesh: THREE.Mesh | null = null;

  // Helper to get normalized mouse coordinate inside canvas
  const getMousePos = (e: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    return { x, y };
  };

  const handleMouseMove = (e: MouseEvent) => {
    const pos = getMousePos(e);
    mouse.x = pos.x;
    mouse.y = pos.y;

    raycaster.setFromCamera(mouse, camera);
    const meshes = nodeMeshes.map(n => n.mesh);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const intersectedMesh = intersects[0].object as THREE.Mesh;
      if (hoveredMesh !== intersectedMesh) {
        // Reset scale of previous hover node
        if (hoveredMesh) {
          const match = nodeMeshes.find(n => n.mesh === hoveredMesh);
          if (match) {
            import('gsap').then(({ default: gsap }) => {
              gsap.to(match.nodeGroup.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: 'power2.out' });
            });
          }
        }
        // Scale up new hovered node
        hoveredMesh = intersectedMesh;
        const match = nodeMeshes.find(n => n.mesh === hoveredMesh);
        if (match) {
          import('gsap').then(({ default: gsap }) => {
            gsap.to(match.nodeGroup.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.3, ease: 'back.out' });
          });
        }
      }
      
      // Update cursor class
      document.body.classList.add('cursor-pointer-active');
      document.body.style.cursor = 'pointer';
    } else {
      // If hover left, scale node back down
      if (hoveredMesh) {
        const match = nodeMeshes.find(n => n.mesh === hoveredMesh);
        if (match) {
          import('gsap').then(({ default: gsap }) => {
            gsap.to(match.nodeGroup.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: 'power2.out' });
          });
        }
        hoveredMesh = null;
      }
      
      document.body.classList.remove('cursor-pointer-active');
      document.body.style.cursor = 'default';
    }
  };

  const handleClick = (e: MouseEvent) => {
    const pos = getMousePos(e);
    mouse.x = pos.x;
    mouse.y = pos.y;

    raycaster.setFromCamera(mouse, camera);
    const meshes = nodeMeshes.map(n => n.mesh);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object as THREE.Mesh;
      const match = nodeMeshes.find(n => n.mesh === clickedMesh);
      if (match) {
        onNodeClick(match.data, match.nodeGroup);
      }
    }
  };

  const domElement = renderer.domElement;
  domElement.addEventListener('mousemove', handleMouseMove);
  domElement.addEventListener('click', handleClick);

  const update = () => {
    controls.update();
  };

  const cleanup = () => {
    domElement.removeEventListener('mousemove', handleMouseMove);
    domElement.removeEventListener('click', handleClick);
    controls.dispose();
  };

  return { controls, update, cleanup };
}
