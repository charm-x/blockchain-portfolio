'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

type BlockConfirmationProps = {
  level: number; // 0-100 percentage
  showLabel?: boolean; // Whether to show the confirmation label
  animated?: boolean; // Whether to animate on load
  maxBlocks?: number; // Maximum number of blocks to show
};

export default function BlockConfirmation({
  level,
  showLabel = true,
  animated = true,
  maxBlocks = 12, // Maximum of 12 blocks (like Bitcoin confirmations)
}: BlockConfirmationProps) {
  const controls = useAnimation();

  // Calculate number of blocks based on level (0-100)
  const normalizedLevel = Math.min(Math.max(level, 0), 100);
  const blockCount = Math.ceil((normalizedLevel / 100) * maxBlocks);

  // Determine skill level label based on block count
  const getSkillLabel = (blocks: number) => {
    if (blocks >= maxBlocks - 1) return "Full Consensus";
    if (blocks >= maxBlocks * 0.75) return "Super Majority";
    if (blocks >= maxBlocks * 0.5) return "Majority";
    if (blocks >= maxBlocks * 0.25) return "Partial Consensus";
    return "Pending";
  };

  // Generate a pseudo-random hash for each block
  const generateHash = (index: number, level: number) => {
    const base = `${index}${level}`;
    return `0x${Array.from({ length: 6 }, (_, i) =>
      ((parseInt(base) + i) * 1234).toString(16).substring(0, 2)
    ).join('')}`;
  };

  // Generate array of blocks
  const blocks = Array.from({ length: blockCount }, (_, i) => i);

  useEffect(() => {
    if (animated) {
      controls.start({
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      });
    } else {
      controls.set({ opacity: 1 });
    }
  }, [animated, controls]);

  const blockVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  // Calculate the size of blocks based on available space
  // For smaller screens or higher block counts, make blocks smaller
  const getBlockSize = () => {
    if (maxBlocks > 8) return 'h-3 w-3';
    return 'h-4 w-4';
  };

  const blockSize = getBlockSize();
  const connectorSize = blockSize === 'h-3 w-3' ? 'h-0.5 w-1' : 'h-0.5 w-2';

  return (
    <div className="w-full">
      <div className="flex flex-col mb-1">
        <div className="flex items-center justify-between mb-2">
          {/* Skill label */}
          {showLabel && (
            <div className="text-xs font-medium text-[#00ff9d] bg-[#121212] px-2 py-0.5 rounded border border-[#2d2d2d] inline-block">
              {getSkillLabel(blockCount)} ({blockCount}/{maxBlocks})
            </div>
          )}
        </div>

        {/* Block chain visualization - with horizontal scroll if needed */}
        <div className="relative w-full overflow-x-auto pb-1 hide-scrollbar">
          <motion.div
            className="flex items-center min-w-min"
            initial={{ opacity: 0 }}
            animate={controls}
          >
            {blocks.map((_, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className={`${blockSize} rounded-sm ${
                    index === 0
                      ? 'bg-gradient-to-r from-[#00ff9d] to-[#00c3ff]'
                      : 'bg-[#00ff9d]'
                  } ${index === blocks.length - 1 ? 'animate-pulse' : ''} relative z-10 group cursor-pointer`}
                  variants={blockVariants}
                  initial="hidden"
                  custom={index}
                  title={generateHash(index, normalizedLevel)}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-[#121212] text-xs text-[#00ff9d] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 border border-[#2d2d2d]">
                    {generateHash(index, normalizedLevel)}
                  </div>
                </motion.div>
                {index < blocks.length - 1 && (
                  <motion.div
                    className={`${connectorSize} bg-[#00ff9d] mx-0.5`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: blockSize === 'h-3 w-3' ? 4 : 8 }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.2 }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
