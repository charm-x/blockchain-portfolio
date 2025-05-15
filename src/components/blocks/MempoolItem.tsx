'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';

type TechStack = {
  name: string;
  icon: string;
};

type MempoolItemProps = {
  title: string;
  timeframe?: string;
  description: string;
  techStack: TechStack[];
  priority?: number; // 1-10, higher means higher priority
  difficulty?: number; // 1-10, higher means more difficult
  status?: 'pending' | 'in-progress' | 'planned';
  blockHeight?: number; // Expected block height when confirmed
  dependencies?: string[]; // IDs of blocks this depends on
};

export default function MempoolItem({
  title,
  timeframe,
  description,
  techStack,
  priority = 5,
  difficulty = 5,
  status = 'pending',
  blockHeight,
  dependencies = [],
}: MempoolItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate a fee based on priority (higher priority = higher fee)
  const fee = Math.floor(priority * 1.5);

  // Function to handle modal opening
  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Force a state update to true
    setIsModalOpen(true);
  };

  // Status color mapping
  const statusColors = {
    'pending': 'bg-yellow-500',
    'in-progress': 'bg-blue-500',
    'planned': 'bg-purple-500'
  };

  // Status label mapping
  const statusLabels = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'planned': 'Planned'
  };

  return (
    <motion.div
      className="relative border border-[#2d2d2d] rounded-lg p-6 bg-[#121212]/80 hover:bg-[#181818] transition-all backdrop-blur-sm h-full"
      initial={{ opacity: 0.8, y: 0 }}
      whileHover={{ scale: 1.02, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Pulsating animation for pending transactions */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          boxShadow: ["0 0 0 rgba(0, 195, 255, 0)", "0 0 10px rgba(0, 195, 255, 0.4)", "0 0 0 rgba(0, 195, 255, 0)"]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />

      {/* Mempool Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${statusColors[status]} mr-2`}></div>
          <div className="text-xs font-mono text-gray-400">
            {statusLabels[status]}
          </div>
        </div>
        <div className="flex items-center text-xs font-mono text-gray-400">
          <span className="mr-1">Fee:</span>
          <span className="text-[#00c3ff]">{fee} gwei</span>
        </div>
      </div>

      {/* Block Content */}
      <div className="border-t border-[#2d2d2d] pt-4 mb-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          {timeframe && <p className="text-gray-400">{timeframe}</p>}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <div key={index} className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
              <span className="mr-1">{tech.icon}</span>
              {tech.name}
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4">{description}</p>

        {/* Direct Modal Button */}
        <button
          onClick={handleOpenModal}
          className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-3 py-1 rounded-md text-xs flex items-center transition-colors mb-4 relative z-10"
        >
          <span className="mr-1">View Full Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <span className="mr-1">⚙️</span>
            <span className="text-gray-400">Difficulty: {difficulty}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🔥</span>
            <span className="text-gray-400">Priority: {priority}</span>
          </div>
        </div>

        <button
          onClick={handleOpenModal}
          className="text-xs text-gray-400 hover:text-[#00c3ff] transition-colors flex items-center relative z-10 cursor-pointer"
        >
          <span className="mr-1">View Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Modal - always render on client side */}
      {typeof document !== 'undefined' && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          maxWidth="lg"
        >
          <Modal.Header onClose={() => setIsModalOpen(false)}>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </Modal.Header>

          <Modal.Content>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${statusColors[status]} mr-2`}></div>
                  <div className="text-gray-400">{statusLabels[status]}</div>
                </div>
                {timeframe && <div className="text-gray-400">{timeframe}</div>}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {techStack.map((tech, index) => (
                  <div key={index} className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <span className="mr-1">{tech.icon}</span>
                    {tech.name}
                  </div>
                ))}
              </div>

              <p className="text-gray-300 mb-4">{description}</p>

              <div className="bg-[#0a0a0a] p-4 rounded-md font-mono text-sm text-gray-300 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Expected Block:</span>
                  <span className="text-[#00c3ff]">#{blockHeight || '???'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Difficulty:</span>
                  <span className="text-[#00c3ff]">{difficulty}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Priority:</span>
                  <span className="text-[#00c3ff]">{priority}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Fee:</span>
                  <span className="text-[#00c3ff]">{fee} gwei</span>
                </div>
              </div>

              {dependencies.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-bold mb-2">Dependencies</h3>
                  <ul className="list-disc pl-5 text-gray-300">
                    {dependencies.map((dep, index) => (
                      <li key={index}>{dep}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Modal.Content>
        </Modal>
      )}
    </motion.div>
  );
}
