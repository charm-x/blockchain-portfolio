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
  rotation: number;
  rotationSpeed: number;
  opacity: number;
};

// Define the structure for mining blocks
type MiningBlock = {
  x: number;
  y: number;
  width: number;
  height: number;
  progress: number; // 0-100
  miningSpeed: number;
  color: string;
  completed: boolean;
  hash: string;
  blockNumber: number;
  transactions: number;
  difficulty: number;
  nonce: number;
  previousHash: string;
  connections: { x: number; y: number }[];
};

export default function BlockchainAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load crypto icons
  const [icons, setIcons] = useState<Record<CryptoType, HTMLImageElement | null>>({
    BTC: null,
    ETH: null,
    SOL: null
  });

  // Generate a random hash
  const generateHash = () => {
    return '0x' + Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 16).toString(16)
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
      loadImage('/icons/crypto/bitcoin.svg'),
      loadImage('/icons/crypto/ethereum.svg'),
      loadImage('/icons/crypto/solana.svg')
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

    // Calculate number of icons based on screen size
    const iconCount = Math.max(10, Math.floor((window.innerWidth * window.innerHeight) / 50000));

    for (let i = 0; i < iconCount; i++) {
      // Distribute icons more evenly across the screen
      const gridX = Math.floor(i / 3) % Math.ceil(Math.sqrt(iconCount));
      const gridY = Math.floor(i / 3 / Math.ceil(Math.sqrt(iconCount)));
      const cellWidth = window.innerWidth / Math.ceil(Math.sqrt(iconCount));
      const cellHeight = window.innerHeight / Math.ceil(Math.sqrt(iconCount));

      initialElements.push({
        type: cryptoTypes[i % cryptoTypes.length], // Ensure even distribution of crypto types
        x: (gridX + 0.2 + Math.random() * 0.6) * cellWidth,
        y: (gridY + 0.2 + Math.random() * 0.6) * cellHeight,
        size: Math.random() * 10 + 20, // 20-30px
        speed: Math.random() * 0.8 + 0.3, // 0.3-1.1
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.3 + 0.3 // 0.3-0.6
      });
    }

    setCryptoElements(initialElements);

    // Initialize mining blocks
    const initialBlocks: MiningBlock[] = [];
    const colors = ['#00ff9d', '#00c3ff', '#f7931a', '#627eea', '#14f195'];

    // Create a chain of blocks
    let prevX = window.innerWidth * 0.2;
    let prevY = window.innerHeight * 0.5;
    let prevHash = '0x0000000000000000000000000000000000000000';

    for (let i = 0; i < 3; i++) {
      // Position blocks in a chain with some randomness
      const x = prevX + 150 + Math.random() * 50;
      const y = prevY + (Math.random() - 0.5) * 100;

      const block = {
        x,
        y,
        width: 120,
        height: 60,
        progress: Math.random() * 30, // Start with some progress
        miningSpeed: 0.1 + Math.random() * 0.3, // Speed of mining
        color: colors[Math.floor(Math.random() * colors.length)],
        completed: false,
        hash: generateHash(),
        blockNumber: i + 1,
        transactions: Math.floor(Math.random() * 20) + 5,
        difficulty: Math.floor(Math.random() * 5) + 1,
        nonce: Math.floor(Math.random() * 1000000),
        previousHash: prevHash,
        connections: [{ x: prevX, y: prevY }]
      };

      initialBlocks.push(block);

      // Update for next block
      prevX = x;
      prevY = y;
      prevHash = block.hash;
    }

    setMiningBlocks(initialBlocks);
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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw crypto elements
      setCryptoElements(prevElements => {
        return prevElements.map(element => {
          // Update position
          const newX = element.x + element.speed;
          const newY = element.y + element.speed * 0.5;

          // Wrap around screen
          const wrappedX = newX > canvas.width ? 0 : newX < 0 ? canvas.width : newX;
          const wrappedY = newY > canvas.height ? 0 : newY < 0 ? canvas.height : newY;

          // Update rotation
          const newRotation = (element.rotation + element.rotationSpeed) % 360;

          // Draw the element if icon is loaded
          const icon = icons[element.type];
          if (icon) {
            ctx.save();
            ctx.translate(wrappedX, wrappedY);
            ctx.rotate((newRotation * Math.PI) / 180);
            ctx.globalAlpha = element.opacity;
            ctx.drawImage(
              icon,
              -element.size / 2,
              -element.size / 2,
              element.size,
              element.size
            );
            ctx.restore();
          }

          return {
            ...element,
            x: wrappedX,
            y: wrappedY,
            rotation: newRotation
          };
        });
      });

      // Update and draw mining blocks
      setMiningBlocks(prevBlocks => {
        const updatedBlocks = prevBlocks.map(block => {
          if (block.completed) return block;

          // Update mining progress
          const newProgress = block.progress + block.miningSpeed;
          const completed = newProgress >= 100;

          // Draw connections to previous blocks
          if (block.connections.length > 0) {
            ctx.save();
            ctx.strokeStyle = block.color;
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 3]);

            for (const connection of block.connections) {
              ctx.beginPath();
              ctx.moveTo(block.x, block.y + block.height / 2);
              ctx.lineTo(connection.x + block.width, connection.y + block.height / 2);
              ctx.stroke();

              // Draw data packets moving along the connection if mining
              if (!block.completed) {
                const time = Date.now() / 1000;
                const packetCount = 3;

                for (let p = 0; p < packetCount; p++) {
                  const t = ((time * 0.5) + (p / packetCount)) % 1;
                  const packetX = connection.x + block.width + (block.x - connection.x - block.width) * t;
                  const packetY = connection.y + block.height / 2 + (block.y - connection.y) * t;

                  ctx.fillStyle = block.color;
                  ctx.beginPath();
                  ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
            }
            ctx.restore();
          }

          // Draw the block
          ctx.save();

          // Draw block background
          ctx.fillStyle = '#121212';
          ctx.globalAlpha = 0.8;
          ctx.fillRect(block.x, block.y, block.width, block.height);
          ctx.globalAlpha = 1;

          // Draw block outline
          ctx.strokeStyle = block.color;
          ctx.lineWidth = 2;
          ctx.strokeRect(block.x, block.y, block.width, block.height);

          // Draw block header
          ctx.fillStyle = block.color;
          ctx.globalAlpha = 0.2;
          ctx.fillRect(block.x, block.y, block.width, 16);
          ctx.globalAlpha = 1;

          // Draw block number
          ctx.font = 'bold 10px monospace';
          ctx.fillStyle = block.color;
          ctx.textAlign = 'left';
          ctx.fillText(`Block #${block.blockNumber}`, block.x + 5, block.y + 12);

          // Draw mining progress bar
          const progressWidth = (block.width - 10) * (newProgress / 100);
          ctx.fillStyle = block.color;
          ctx.globalAlpha = 0.3;
          ctx.fillRect(block.x + 5, block.y + block.height - 10, progressWidth, 5);
          ctx.globalAlpha = 1;

          // Draw mining text
          ctx.font = '9px monospace';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'left';

          if (!completed) {
            ctx.fillText(`Mining... ${Math.floor(newProgress)}%`, block.x + 5, block.y + 30);
            ctx.fillText(`Nonce: ${block.nonce + Math.floor(newProgress * 100)}`, block.x + 5, block.y + 42);
          } else {
            ctx.fillText(`Mined! Txs: ${block.transactions}`, block.x + 5, block.y + 30);
            ctx.fillText(`Nonce: ${block.nonce}`, block.x + 5, block.y + 42);
          }

          // Draw hash if completed
          if (completed) {
            ctx.font = '8px monospace';
            ctx.fillStyle = block.color;
            ctx.textAlign = 'center';
            ctx.fillText(
              block.hash.substring(0, 18) + '...',
              block.x + block.width / 2,
              block.y - 5
            );

            // Draw celebration effect - mining success
            for (let i = 0; i < 8; i++) {
              const angle = (Math.PI * 2 * i) / 8;
              const distance = 15;
              ctx.beginPath();
              ctx.moveTo(
                block.x + block.width / 2,
                block.y + block.height / 2
              );
              ctx.lineTo(
                block.x + block.width / 2 + Math.cos(angle) * distance,
                block.y + block.height / 2 + Math.sin(angle) * distance
              );
              ctx.strokeStyle = block.color;
              ctx.stroke();
            }
          }

          ctx.restore();

          return {
            ...block,
            progress: newProgress,
            completed
          };
        });

        // Add new blocks if some are completed
        const completedBlocks = updatedBlocks.filter(b => b.completed);
        const completedCount = completedBlocks.length;
        const colors = ['#00ff9d', '#00c3ff', '#f7931a', '#627eea', '#14f195'];

        if (completedCount > 0 && updatedBlocks.length < 6) {
          // Find the last completed block to connect to
          const lastCompletedBlock = [...completedBlocks].sort((a, b) => b.blockNumber - a.blockNumber)[0];

          if (lastCompletedBlock) {
            // Create a new block that connects to the last completed one
            const newBlockNumber = Math.max(...updatedBlocks.map(b => b.blockNumber)) + 1;

            // Position the new block in a chain-like formation
            const newX = lastCompletedBlock.x + 150 + Math.random() * 50;
            const newY = lastCompletedBlock.y + (Math.random() - 0.5) * 100;

            // Ensure the block stays within canvas bounds
            const boundedX = Math.min(Math.max(newX, 100), canvas.width - 220);
            const boundedY = Math.min(Math.max(newY, 100), canvas.height - 160);

            updatedBlocks.push({
              x: boundedX,
              y: boundedY,
              width: 120,
              height: 60,
              progress: 0,
              miningSpeed: 0.1 + Math.random() * 0.3,
              color: colors[Math.floor(Math.random() * colors.length)],
              completed: false,
              hash: generateHash(),
              blockNumber: newBlockNumber,
              transactions: Math.floor(Math.random() * 20) + 5,
              difficulty: Math.floor(Math.random() * 5) + 1,
              nonce: Math.floor(Math.random() * 1000000),
              previousHash: lastCompletedBlock.hash,
              connections: [{ x: lastCompletedBlock.x, y: lastCompletedBlock.y }]
            });
          }
        }

        return updatedBlocks;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [icons]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-40"
      style={{ pointerEvents: 'none' }}
    />
  );
}
