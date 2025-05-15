'use client';

import { useEffect, useRef, useState } from 'react';

// Define the types of crypto icons we'll animate
type CryptoType = 'BTC' | 'ETH' | 'SOL';

// Define the structure for our animated elements
type AnimatedElement = {
  type: CryptoType;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number; // Angle in radians
  opacity: number;
};

// Define the structure for blockchain blocks
type Block = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  hash: string;
  blockNumber: number;
  previousHash: string;
  nextBlock?: Block;
};

export default function AnimatedBlockchainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cryptoElements, setCryptoElements] = useState<AnimatedElement[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [time, setTime] = useState(0);

  // Load crypto icons
  const [icons, setIcons] = useState<Record<CryptoType, HTMLImageElement | null>>({
    BTC: null,
    ETH: null,
    SOL: null
  });

  // Generate a deterministic hash based on block number
  const generateHash = (blockNumber: number) => {
    return '0x' + Array.from({ length: 10 }, (_, i) =>
      ((blockNumber * 7 + i * 13) % 16).toString(16)
    ).join('');
  };

  // Initialize the animation
  useEffect(() => {
    // Load the crypto icons
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all([
      loadImage('/icons/crypto/btc.svg'),
      loadImage('/icons/crypto/eth.svg'),
      loadImage('/icons/crypto/sol.svg')
    ]).then(([btcIcon, ethIcon, solIcon]) => {
      setIcons({
        BTC: btcIcon,
        ETH: ethIcon,
        SOL: solIcon
      });
    }).catch(error => {
      console.error('Failed to load crypto icons:', error);
    });

    // Initialize crypto elements
    const initialElements: AnimatedElement[] = [];
    const cryptoTypes: CryptoType[] = ['BTC', 'ETH', 'SOL'];

    // Calculate number of icons based on screen size (further reduced density for more visible icons)
    const iconCount = Math.max(5, Math.floor((window.innerWidth * window.innerHeight) / 200000));

    for (let i = 0; i < iconCount; i++) {
      initialElements.push({
        type: cryptoTypes[i % cryptoTypes.length],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 30, // 30-50px (further increased size)
        speed: Math.random() * 0.3 + 0.1, // 0.1-0.4
        direction: Math.random() * Math.PI * 2, // 0-2π radians
        opacity: Math.random() * 0.25 + 0.25 // 0.25-0.5 (significantly increased opacity)
      });
    }

    setCryptoElements(initialElements);

    // Initialize blockchain blocks
    const initialBlocks: Block[] = [];
    const colors = ['#00ff9d', '#00c3ff', '#f7931a', '#627eea', '#14f195'];

    // Create a chain of blocks
    let prevX = window.innerWidth * 0.1;
    let prevY = window.innerHeight * 0.2;
    let prevHash = '0x0000000000000000000000000000000000000000';

    // Create 5 blocks in a chain
    for (let i = 0; i < 5; i++) {
      const hash = generateHash(i + 1);
      const block: Block = {
        x: prevX + 150,
        y: prevY + (i % 2 === 0 ? 80 : -80), // Zigzag pattern
        width: 120,
        height: 60,
        color: colors[i % colors.length],
        hash,
        blockNumber: i + 1,
        previousHash: prevHash
      };

      initialBlocks.push(block);

      // Update for next block
      prevX = block.x;
      prevY = block.y;
      prevHash = hash;
    }

    // Link blocks together
    for (let i = 0; i < initialBlocks.length - 1; i++) {
      initialBlocks[i].nextBlock = initialBlocks[i + 1];
    }

    setBlocks(initialBlocks);
  }, []);

  // Animation loop
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

    // Animation frame
    let animationFrameId: number;
    let lastTime = 0;

    const render = (timestamp: number) => {
      // Update time for animations
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      setTime(prev => prev + deltaTime * 0.001); // Convert to seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update crypto elements
      cryptoElements.forEach(element => {
        // Draw the element if icon is loaded
        const icon = icons[element.type];
        if (icon) {
          ctx.save();
          ctx.globalAlpha = element.opacity;
          ctx.drawImage(
            icon,
            element.x - element.size / 2,
            element.y - element.size / 2,
            element.size,
            element.size
          );
          ctx.restore();
        }
      });

      // Update crypto elements positions
      setCryptoElements(prevElements => {
        return prevElements.map(element => {
          // Calculate new position based on direction and speed
          const newX = element.x + Math.cos(element.direction) * element.speed;
          const newY = element.y + Math.sin(element.direction) * element.speed;

          // Wrap around screen
          const wrappedX = newX > canvas.width ? 0 : newX < 0 ? canvas.width : newX;
          const wrappedY = newY > canvas.height ? 0 : newY < 0 ? canvas.height : newY;

          return {
            ...element,
            x: wrappedX,
            y: wrappedY
          };
        });
      });

      // Draw blockchain blocks and connections
      blocks.forEach(block => {
        // Draw connection to next block if exists (with reduced opacity)
        if (block.nextBlock) {
          ctx.save();
          ctx.strokeStyle = block.color;
          ctx.globalAlpha = 0.3; // Reduced opacity for connections
          ctx.lineWidth = 1; // Thinner line
          ctx.setLineDash([5, 3]);

          // Draw line from this block to next block
          ctx.beginPath();
          ctx.moveTo(block.x + block.width, block.y + block.height / 2);
          ctx.lineTo(block.nextBlock.x, block.nextBlock.y + block.height / 2);
          ctx.stroke();

          // Draw animated data packets along the connection (fewer packets)
          const packetCount = 2; // Reduced from 3
          for (let p = 0; p < packetCount; p++) {
            // Calculate position along the line based on time
            const t = ((time * 0.3) + (p / packetCount)) % 1;
            const packetX = block.x + block.width + (block.nextBlock.x - block.x - block.width) * t;
            const packetY = block.y + block.height / 2 + (block.nextBlock.y - block.y) * t;

            ctx.fillStyle = block.color;
            ctx.beginPath();
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2); // Smaller packets
            ctx.fill();
          }

          ctx.restore();
        }

        // Draw the block
        ctx.save();

        // Draw block background with reduced opacity
        ctx.fillStyle = '#121212';
        ctx.globalAlpha = 0.4; // Reduced from 0.7
        ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.globalAlpha = 1;

        // Draw block outline with thinner line and reduced opacity
        ctx.strokeStyle = block.color;
        ctx.globalAlpha = 0.4; // Added opacity to outline
        ctx.lineWidth = 1; // Reduced from 2
        ctx.strokeRect(block.x, block.y, block.width, block.height);

        // Draw block header with reduced opacity
        ctx.fillStyle = block.color;
        ctx.globalAlpha = 0.1; // Reduced from 0.2
        ctx.fillRect(block.x, block.y, block.width, 16);
        ctx.globalAlpha = 0.4; // Set lower opacity for all text

        // Draw block number with smaller font
        ctx.font = '8px monospace'; // Reduced from 10px
        ctx.fillStyle = block.color;
        ctx.textAlign = 'left';
        ctx.fillText(`Block #${block.blockNumber}`, block.x + 5, block.y + 12);

        // Draw hash above the block with smaller font and reduced opacity
        ctx.font = '7px monospace'; // Reduced from 8px
        ctx.fillStyle = block.color;
        ctx.textAlign = 'center';
        ctx.fillText(
          block.hash.substring(0, 12) + '...', // Shortened hash display
          block.x + block.width / 2,
          block.y - 5
        );

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [icons, blocks, cryptoElements, time]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-50"
      style={{ pointerEvents: 'none' }}
    />
  );
}
