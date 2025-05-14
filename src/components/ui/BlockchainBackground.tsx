'use client';

import { useEffect, useRef, useState } from 'react';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isBlock?: boolean;
};

export default function BlockchainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create nodes and connections
    const nodes: Node[] = [];
    const nodeCount = Math.floor(window.innerWidth * window.innerHeight / 25000);

    // Create regular nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 1,
        color: `rgba(0, ${Math.floor(Math.random() * 155) + 100}, ${Math.floor(Math.random() * 100) + 157}, ${Math.random() * 0.3 + 0.2})`
      });
    }

    // Create "block" nodes (larger, more prominent)
    const blockCount = Math.max(3, Math.floor(nodeCount / 15)); // Ensure at least 3 blocks
    for (let i = 0; i < blockCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: 4,
        color: 'rgba(0, 255, 157, 0.8)',
        isBlock: true
      });
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Determine connection distance based on node types
          const connectionDistance = (nodes[i].isBlock || nodes[j].isBlock) ? 200 : 150;

          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - (distance / connectionDistance);

            // Determine if this is a connection between blocks
            const isBlockConnection = nodes[i].isBlock && nodes[j].isBlock;

            // Set line style
            ctx.strokeStyle = isBlockConnection
              ? `rgba(0, 255, 157, ${opacity * 0.8})`
              : `rgba(0, 255, 157, ${opacity * 0.15})`;

            ctx.lineWidth = isBlockConnection ? 2 : 1;

            // Draw connection
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // If it's a block connection, draw data packets moving along the line
            if (isBlockConnection) {
              const packetCount = 2;
              const time = Date.now() / 1000;

              for (let p = 0; p < packetCount; p++) {
                const t = (time * 0.5 + p / packetCount) % 1;
                const packetX = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
                const packetY = nodes[i].y + (nodes[j].y - nodes[i].y) * t;

                ctx.fillStyle = 'rgba(0, 255, 157, 0.8)';
                ctx.beginPath();
                ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // Draw nodes and handle mouse interaction
      for (const node of nodes) {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Handle mouse interaction
        if (mousePosition) {
          const dx = mousePosition.x - node.x;
          const dy = mousePosition.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Interaction radius depends on node type
          const interactionRadius = node.isBlock ? 150 : 100;

          // If mouse is close to a node, create effects
          if (distance < interactionRadius) {
            const angle = Math.atan2(dy, dx);

            if (node.isBlock) {
              // Blocks are attracted to the cursor
              const attractForce = (interactionRadius - distance) / 2000;
              node.vx += Math.cos(angle) * attractForce;
              node.vy += Math.sin(angle) * attractForce;

              // Draw connection to mouse with gradient
              const gradient = ctx.createLinearGradient(
                node.x, node.y,
                mousePosition.x, mousePosition.y
              );
              gradient.addColorStop(0, 'rgba(0, 255, 157, 0.5)');
              gradient.addColorStop(1, 'rgba(0, 195, 255, 0.1)');

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(mousePosition.x, mousePosition.y);
              ctx.stroke();

              // Draw small data packets moving from block to cursor
              const packetCount = 3;
              const time = Date.now() / 1000;

              for (let p = 0; p < packetCount; p++) {
                const t = ((time * 0.5) + (p / packetCount)) % 1;
                const packetX = node.x + (mousePosition.x - node.x) * t;
                const packetY = node.y + (mousePosition.y - node.y) * t;

                ctx.fillStyle = 'rgba(0, 255, 157, 0.8)';
                ctx.beginPath();
                ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
                ctx.fill();
              }
            } else {
              // Regular nodes are pushed away from cursor
              const repelForce = (interactionRadius - distance) / 1000;
              node.vx -= Math.cos(angle) * repelForce;
              node.vy -= Math.sin(angle) * repelForce;
            }
          }
        }

        // Draw node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // If it's a block node, draw a hexagon around it
        if (node.isBlock) {
          // Pulsating effect for hexagons
          const time = Date.now() / 1000;
          const pulseScale = 1 + Math.sin(time * 2) * 0.1; // Pulsate between 0.9 and 1.1 size

          ctx.strokeStyle = 'rgba(0, 255, 157, 0.5)';
          ctx.lineWidth = 1;
          ctx.beginPath();

          // Draw hexagon with pulsating effect
          const baseHexSize = node.size * 2.5;
          const hexSize = baseHexSize * pulseScale;

          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = node.x + hexSize * Math.cos(angle);
            const y = node.y + hexSize * Math.sin(angle);

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.closePath();
          ctx.stroke();

          // Draw inner hexagon for a more complex look
          ctx.beginPath();
          const innerHexSize = hexSize * 0.7;

          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + (time * 0.3); // Rotate inner hexagon
            const x = node.x + innerHexSize * Math.cos(angle);
            const y = node.y + innerHexSize * Math.sin(angle);

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.closePath();
          ctx.strokeStyle = 'rgba(0, 195, 255, 0.3)'; // Use secondary color
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-25"
      style={{ pointerEvents: 'none' }}
    />
  );
}
