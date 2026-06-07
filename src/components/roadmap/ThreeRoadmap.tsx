"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useRoadmapStore, RoadmapNodeData } from "@/store/useRoadmapStore";
import { initScene } from "@/three/scene";
import { createStarfield } from "@/three/starfield";
import { createNode, createPath, get3DPosition, NodeStatus, NodeObject, PathObject } from "@/three/nodes";
import { initControls } from "@/three/controls";
import NodeLabel from "./NodeLabel";

interface ThreeRoadmapProps {
  nodesData: RoadmapNodeData[];
  onSelectNode: (node: RoadmapNodeData) => void;
}

interface LabelCoordinate {
  slug: string;
  x: number;
  y: number;
  visible: boolean;
}

export default function ThreeRoadmap({ nodesData, onSelectNode }: ThreeRoadmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  
  const { completedNodes } = useRoadmapStore();
  const [labelCoords, setLabelCoords] = useState<LabelCoordinate[]>([]);
  const [activeNodeSlug, setActiveNodeSlug] = useState<string | null>(null);

  // Identify the current active milestone index
  const activeNodeIndex = React.useMemo(() => {
    const idx = nodesData.findIndex(n => {
      return !completedNodes[n.slug];
    });
    return idx !== -1 ? idx : 0;
  }, [nodesData, completedNodes]);

  const activeId = nodesData[activeNodeIndex]?.slug || null;

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Initialize Scene, Camera, and Renderer (Clock removed to avoid deprecation warnings)
    const { scene, camera, renderer, resize, cleanup: sceneCleanup } = initScene(canvasRef.current);
    
    // Grid helper for spatial reference in Swiss Brutalist style
    const gridHelper = new THREE.GridHelper(300, 40, 0x1A1A35, 0x111120);
    gridHelper.position.y = -10;
    scene.add(gridHelper);

    // 2. Initialize Starfield Particle System
    const starField = createStarfield(scene);

    // 3. Nodes Layout & Instantiation
    const nodeObjects: NodeObject[] = [];
    const pathObjects: PathObject[] = [];
    const nodeMeshes: { mesh: THREE.Mesh; nodeGroup: THREE.Group; data: RoadmapNodeData }[] = [];
    
    const total = nodesData.length;
    const positions = nodesData.map((_, i) => get3DPosition(i, total));

    const getStatus = (index: number, slug: string): NodeStatus => {
      if (completedNodes[slug]) return "complete";
      if (slug === activeId) return "active";
      return "locked";
    };

    nodesData.forEach((node, i) => {
      const pos = positions[i];
      const status = getStatus(i, node.slug);
      
      const nodeObj = createNode(node, pos, status);
      scene.add(nodeObj.group);
      nodeObjects.push(nodeObj);
      
      // Save reference for raycasting intersects
      nodeMeshes.push({
        mesh: nodeObj.core,
        nodeGroup: nodeObj.group,
        data: node
      });
    });

    // 4. Create Constellation Paths
    for (let i = 0; i < total - 1; i++) {
      const fromPos = positions[i];
      const toPos = positions[i + 1];
      const fromStatus = getStatus(i, nodesData[i].slug);
      const toStatus = getStatus(i + 1, nodesData[i + 1].slug);
      
      let pathStatus: "complete" | "active" | "locked" = "locked";
      if (fromStatus === "complete" && toStatus === "complete") {
        pathStatus = "complete";
      } else if (fromStatus === "complete" && toStatus === "active") {
        pathStatus = "active";
      }
      
      const pathObj = createPath(scene, fromPos, toPos, pathStatus);
      pathObjects.push(pathObj);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(30, 45, 50);
    scene.add(dirLight);

    // 5. Initialize Controls
    let isWarping = false;

    const handleNodeClick = (node: RoadmapNodeData, nodeGroup: THREE.Group) => {
      if (isWarping) return;
      isWarping = true;
      setActiveNodeSlug(node.slug);

      const target = nodeGroup.position.clone();

      // Screen warp flash effect (nova violet tint)
      if (flashRef.current) {
        gsap.timeline()
          .to(flashRef.current, { opacity: 0.9, duration: 0.12, ease: "power2.out" })
          .to(flashRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
      }

      // Camera Warp fly-to targeting clicked node closer with horizontal perspective
      gsap.to(camera.position, {
        x: target.x + 10,
        y: target.y - 8,
        z: target.z + 45,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          camera.lookAt(target);
        }
      });

      // Update orbit controls focal anchor target to this node
      gsap.to(controlsSetup.controls.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => {
          isWarping = false;
          onSelectNode(node);
        }
      });
    };

    const controlsSetup = initControls(camera, renderer, nodeMeshes, handleNodeClick);

    // Set camera closer and horizontally aligned to avoid vanishing-point clumping at bottom center
    if (positions[activeNodeIndex]) {
      const initTarget = positions[activeNodeIndex];
      camera.position.set(initTarget.x + 12, initTarget.y - 10, initTarget.z + 55);
      controlsSetup.controls.target.copy(initTarget);
      controlsSetup.controls.update();
    }

    // 6. Animation loop using performance.now() to avoid THREE.Clock deprecation warnings
    let animationFrameId: number;
    const startTime = performance.now();
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      // Twinkle stars
      starField.rotation.y = t * 0.0001;

      // Animate pulsing outer node rings
      nodeObjects.forEach((obj, idx) => {
        const ring = obj.ring;
        const status = getStatus(idx, nodesData[idx].slug);
        
        ring.rotation.z = t * 0.4 + idx;
        const pulseFactor = 1.0 + Math.sin(t * 1.8 + idx) * (status === "active" ? 0.08 : 0.04);
        ring.scale.setScalar(pulseFactor);
      });

      // Project coordinates
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const coords = nodesData.map((node, i) => {
          const group = nodeObjects[i].group;
          const worldPos = new THREE.Vector3();
          group.getWorldPosition(worldPos);
          
          worldPos.project(camera);

          const x = (worldPos.x * 0.5 + 0.5) * width;
          const y = (-(worldPos.y * 0.5) + 0.5) * height;
          const visible = worldPos.z < 1.0;

          return {
            slug: node.slug,
            x,
            y,
            visible
          };
        });
        
        setLabelCoords(coords);
      }

      controlsSetup.update();
      renderer.render(scene, camera);
    };
    
    animate();

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      
      nodeObjects.forEach(obj => obj.cleanup());
      pathObjects.forEach(obj => obj.cleanup());
      
      starField.geometry.dispose();
      (starField.material as THREE.Material).dispose();
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
      
      sceneCleanup();
      controlsSetup.cleanup();
    };
  }, [nodesData, completedNodes, onSelectNode, activeId, activeNodeIndex]);

  // Minimap height calculation (max 200px)
  const minimapHeight = Math.min(nodesData.length * 8, 200);

  return (
    <div ref={containerRef} className="canvas-wrap w-full h-[650px] relative overflow-hidden glass-panel border border-rim">
      {/* Warp visual overlay flash */}
      <div ref={flashRef} className="warp-flash" />

      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Minimap overlay */}
      <div className="minimap hidden sm:flex">
        <svg width="20" height={minimapHeight}>
          <line x1="10" y1="0" x2="10" y2={minimapHeight} stroke="#1A1A35" strokeWidth="1" />
          {nodesData.map((node, i) => {
            const isComplete = completedNodes[node.slug];
            const isActive = node.slug === activeId;
            return (
              <circle
                key={node.slug}
                cx="10"
                cy={i * (minimapHeight / nodesData.length) + 4}
                r={isActive ? 5 : isComplete ? 3.5 : 2.5}
                fill={isActive ? "#9B8BFF" : isComplete ? "#00E5CC" : "#2A2A50"}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
      </div>

      {/* Controls helper panel */}
      <div className="canvas-hint">
        <span>🖱 Drag to orbit</span>
        <span>⚲ Scroll to zoom</span>
        <span>Click a node to explore</span>
      </div>

      {/* Floating projected labels */}
      <div className="node-label-container">
        {labelCoords.map((coord, idx) => {
          const node = nodesData[idx];
          if (!coord.visible) return null;
          
          const isComplete = completedNodes[node.slug];
          const isActive = node.slug === activeId;
          const status = isComplete ? "complete" : isActive ? "active" : "locked";

          return (
            <NodeLabel
              key={node.slug}
              milestone={node}
              status={status}
              x={coord.x}
              y={coord.y}
              onClick={() => {
                const nodeObj = canvasRef.current;
                if (nodeObj) {
                  const event = new MouseEvent("click", {
                    clientX: coord.x + nodeObj.getBoundingClientRect().left,
                    clientY: coord.y + nodeObj.getBoundingClientRect().top
                  });
                  nodeObj.dispatchEvent(event);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
