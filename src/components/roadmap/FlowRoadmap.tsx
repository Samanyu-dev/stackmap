"use client";

import React, { useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Edge,
  Node,
  MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./CustomNode";
import { RoadmapNodeData } from "@/store/useRoadmapStore";

const nodeTypes = {
  customNode: CustomNode
};

interface FlowRoadmapProps {
  nodesData: RoadmapNodeData[];
  onSelectNode: (node: RoadmapNodeData) => void;
}

export default function FlowRoadmap({ nodesData, onSelectNode }: FlowRoadmapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    // Generate React Flow nodes with vertical spacing layout
    const flowNodes: Node[] = nodesData.map((node, index) => {
      // Linear layout with slight alternating offsets for premium visualization
      const x = 150 + (index % 2 === 0 ? 15 : -15);
      const y = 50 + index * 180;
      
      return {
        id: node.slug,
        type: "customNode",
        position: { x, y },
        data: {
          slug: node.slug,
          title: node.title,
          description: node.description,
          difficulty: node.difficulty,
          estimatedTime: node.estimatedTime
        }
      };
    });

    // Generate React Flow edges connecting consecutive nodes
    const flowEdges: Edge[] = [];
    for (let i = 0; i < nodesData.length - 1; i++) {
      const source = nodesData[i].slug;
      const target = nodesData[i + 1].slug;
      
      flowEdges.push({
        id: `edge-${source}-${target}`,
        source,
        target,
        animated: true,
        style: { stroke: "#8b5cf6", strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15,
          color: "#8b5cf6"
        }
      });
    }

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [nodesData, setNodes, setEdges]);

  const onNodeClick = (_: React.MouseEvent, flowNode: Node) => {
    const rawNode = nodesData.find(n => n.slug === flowNode.id);
    if (rawNode) {
      onSelectNode(rawNode);
    }
  };

  return (
    <div className="h-[600px] w-full border border-border/80 rounded-2xl overflow-hidden glass-panel">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        fitViewOptions={{ padding: 0.3 }}
      >
        <Background color="#8b5cf6" gap={16} size={1} style={{ opacity: 0.15 }} />
        <Controls className="!bg-card !border-border !text-foreground fill-foreground" />
        <MiniMap
          zoomable
          pannable
          style={{ height: 100, width: 140 }}
          className="!bg-card/80 !border-border rounded-xl overflow-hidden"
          nodeColor={(n) => "#8b5cf6"}
        />
      </ReactFlow>
    </div>
  );
}
