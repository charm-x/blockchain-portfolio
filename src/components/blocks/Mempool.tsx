'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MempoolItem from './MempoolItem';
import Select from '../ui/Select';
import { MempoolItem as MempoolItemType, MempoolSortBy, MempoolFilterStatus } from '@/types';

type MempoolProps = {
  items: MempoolItemType[];
  className?: string;
};

export default function Mempool({ items, className = '' }: MempoolProps) {
  const [sortedItems, setSortedItems] = useState<MempoolItemType[]>([]);
  const [sortBy, setSortBy] = useState<MempoolSortBy>('priority');
  const [filterStatus, setFilterStatus] = useState<MempoolFilterStatus>('all');

  // Sort and filter items when props or sort/filter options change
  useEffect(() => {
    let filtered = [...items];

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        return (b.priority || 5) - (a.priority || 5);
      } else if (sortBy === 'difficulty') {
        return (b.difficulty || 5) - (a.difficulty || 5);
      } else if (sortBy === 'status') {
        const statusOrder = { 'in-progress': 0, 'pending': 1, 'planned': 2 };
        return statusOrder[a.status || 'pending'] - statusOrder[b.status || 'pending'];
      }
      return 0;
    });

    setSortedItems(filtered);
  }, [items, sortBy, filterStatus]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`bg-[#0a0a0a]/50 border border-[#2d2d2d] rounded-xl p-6 backdrop-blur-sm ${className}`}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            <span className="text-[#00c3ff]">Mempool</span> Aspirations
          </h2>
          <div className="flex space-x-3 text-xs">
            <Select
              label="Sort by:"
              className='w-32'
              value={sortBy}
              onChange={(value) => setSortBy(value as 'priority' | 'difficulty' | 'status')}
              options={[
                { value: 'priority', label: 'Priority' },
                { value: 'difficulty', label: 'Difficulty' },
                { value: 'status', label: 'Status' }
              ]}
            />
            <Select
              label="Status:"
              className='w-32'
              value={filterStatus}
              onChange={(value) => setFilterStatus(value as 'all' | 'pending' | 'in-progress' | 'planned')}
              options={[
                { value: 'all', label: 'All' },
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'planned', label: 'Planned' }
              ]}
            />
          </div>
        </div>
        <p className="text-gray-400">
          Future goals and aspirations waiting to be confirmed on the blockchain of my career.
        </p>
      </div>

      {/* Mempool Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 auto-rows-fr">
        <div className="bg-[#121212] rounded-lg p-3 border border-[#2d2d2d]">
          <div className="text-xs text-gray-400 mb-1">Pending Transactions</div>
          <div className="text-xl font-bold text-white">{items.length}</div>
        </div>
        <div className="bg-[#121212] rounded-lg p-3 border border-[#2d2d2d]">
          <div className="text-xs text-gray-400 mb-1">Avg Priority</div>
          <div className="text-xl font-bold text-[#00c3ff]">
            {Math.round(items.reduce((sum, item) => sum + (item.priority || 5), 0) / items.length)}
          </div>
        </div>
        <div className="bg-[#121212] rounded-lg p-3 border border-[#2d2d2d]">
          <div className="text-xs text-gray-400 mb-1">Avg Difficulty</div>
          <div className="text-xl font-bold text-[#00c3ff]">
            {Math.round(items.reduce((sum, item) => sum + (item.difficulty || 5), 0) / items.length)}
          </div>
        </div>
      </div>

      {/* Mempool Items */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {sortedItems.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              layout
            >
              <MempoolItem
                title={item.title}
                timeframe={item.timeframe}
                description={item.description}
                techStack={item.techStack}
                priority={item.priority}
                difficulty={item.difficulty}
                status={item.status}
                blockHeight={item.blockHeight}
                dependencies={item.dependencies}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {sortedItems.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No mempool items match your filter criteria.
        </div>
      )}
    </div>
  );
}
