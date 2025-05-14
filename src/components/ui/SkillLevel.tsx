'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

type SkillLevelProps = {
  level: number; // 0-100 percentage
  color?: string; // Optional custom color
  showPercentage?: boolean; // Whether to show percentage text
  size?: 'sm' | 'md' | 'lg'; // Size variant
  animated?: boolean; // Whether to animate on load
};

export default function SkillLevel({
  level,
  color = '#00ff9d', // Default to primary color
  showPercentage = true,
  size = 'md',
  animated = true,
}: SkillLevelProps) {
  const controls = useAnimation();
  
  // Ensure level is between 0-100
  const normalizedLevel = Math.min(Math.max(level, 0), 100);
  
  // Size variants
  const heightMap = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  const textSizeMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  useEffect(() => {
    if (animated) {
      controls.start({
        width: `${normalizedLevel}%`,
        transition: { duration: 1, ease: 'easeOut' }
      });
    } else {
      controls.set({ width: `${normalizedLevel}%` });
    }
  }, [normalizedLevel, animated, controls]);

  return (
    <div className="w-full flex items-center gap-2">
      <div className={`w-full bg-[#1a1a1a] rounded-full overflow-hidden ${heightMap[size]}`}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={controls}
        />
      </div>
      
      {showPercentage && (
        <div className={`${textSizeMap[size]} text-gray-400 w-10 text-right`}>
          {normalizedLevel}%
        </div>
      )}
    </div>
  );
}
