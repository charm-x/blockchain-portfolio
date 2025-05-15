'use client';

import { motion } from 'framer-motion';

type FilterCategory = 'All' | 'DeFi' | 'NFT' | 'DAO' | 'Infrastructure';

type ProjectFilterProps = {
  onFilterChange: (category: FilterCategory) => void;
  activeFilter: FilterCategory;
};

export default function ProjectFilter({ onFilterChange, activeFilter }: ProjectFilterProps) {
  const filters: FilterCategory[] = ['All', 'DeFi', 'NFT', 'DAO', 'Infrastructure'];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-md ${
            activeFilter === filter
              ? 'bg-[#1a1a1a] text-white'
              : 'bg-[#121212] text-gray-400 hover:bg-[#2a2a2a]'
          }`}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          // Add a glowing effect for the active filter
          animate={{
            boxShadow: activeFilter === filter
              ? ['0 0 0 rgba(0, 255, 157, 0)', '0 0 8px rgba(0, 255, 157, 0.5)', '0 0 0 rgba(0, 255, 157, 0)']
              : 'none',
            transition: {
              boxShadow: {
                repeat: Infinity,
                duration: 2
              }
            }
          }}
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
}
