'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Modal from '@/components/ui/Modal';

type TechStack = {
  name: string;
  icon: string;
};

type BlockProps = {
  title: string;
  company?: string;
  period: string;
  description: string;
  techStack: TechStack[];
  githubLink?: string;
  demoLink?: string;
  gasUsed?: number; // Difficulty/effort level
  confirmations?: number; // Time spent or impact rating
  isGenesis?: boolean;
  blockHash?: string; // Current block hash
  prevBlockHash?: string; // Previous block hash
  blockHeight?: number; // Block position in the chain
  expanded?: boolean; // Whether the block is expanded to show details
  onToggleExpand?: () => void; // Function to toggle expanded state
  showHashConnection?: boolean; // Whether to show hash connection visualization
  isLastBlock?: boolean; // Whether this is the last block in the chain
};

export default function Block({
  title,
  company,
  period,
  description,
  techStack,
  githubLink,
  demoLink,
  gasUsed = 50,
  confirmations = 1,
  isGenesis = false,
  blockHash = "0x0000000000000000",
  prevBlockHash = "0x0000000000000000",
  blockHeight = 0,
  expanded = false,
  onToggleExpand,
  showHashConnection = false,
  isLastBlock = false,
}: BlockProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMined, setIsMined] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const controls = useAnimation();

  // Handle mounting on client-side only
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Mining animation effect - only run on client side
  useEffect(() => {
    // Set initial opacity to 1 immediately
    controls.start({ opacity: 1 });

    const mineBlock = async () => {
      // Initial "mining" state
      await controls.start({
        opacity: 1,
        boxShadow: ["0 0 0 rgba(0, 255, 157, 0)", "0 0 20px rgba(0, 255, 157, 0.7)", "0 0 0 rgba(0, 255, 157, 0)"],
        transition: {
          duration: 2,
          repeat: 3,
          repeatType: "loop"
        }
      });

      // Block successfully "mined"
      await controls.start({
        opacity: 1,
        scale: [1, 1.03, 1],
        boxShadow: "0 0 10px rgba(0, 255, 157, 0.5)",
        transition: { duration: 0.5 }
      });

      setIsMined(true);
    };

    // Start mining animation after a delay based on block height
    const timer = setTimeout(() => {
      mineBlock();
    }, 1000 + blockHeight * 300);

    return () => clearTimeout(timer);
  }, [controls, blockHeight]);

  // Function to handle modal opening
  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Opening modal directly...");
    setIsModalOpen(true);
  };

  return (
    <motion.div
      className={`relative border border-[#2d2d2d] rounded-lg p-6 bg-[#121212] hover:bg-[#181818] transition-all ${isGenesis ? 'border-[#00ff9d]' : ''} ${expanded ? 'scale-105 shadow-lg shadow-[#00ff9d]/20' : ''}`}
      initial={{ opacity: 1, y: 0 }}
      animate={controls}
      whileHover={{ scale: expanded ? 1.01 : 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onToggleExpand && onToggleExpand()}
    >
      {/* Hash Connection Visualization - only show when enabled */}
      {showHashConnection && !isGenesis && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-1 h-16 flex justify-center items-center">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#2d2d2d]"></div>
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-[#00ff9d]"
            animate={{
              height: ["0%", "100%", "100%"],
              top: ["0%", "0%", "50%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1]
            }}
          />
        </div>
      )}

      {/* Mining Indicator - Client-side only */}
      {!isMined && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          animate={{
            boxShadow: ["0 0 0 rgba(0, 255, 157, 0)", "0 0 15px rgba(0, 255, 157, 0.7)", "0 0 0 rgba(0, 255, 157, 0)"]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      )}

      {/* Last Block Indicator */}
      {isLastBlock && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-[#00ff9d] font-mono bg-[#0a0a0a] px-2 py-1 rounded-full border border-[#2d2d2d]">
          Latest Block
        </div>
      )}

      {/* Block Header with Hash and Height */}
      <div className="mb-4">
        {/* Block Height and Period */}
        <div className="flex justify-between items-center mb-2">
          <div className="bg-[#1a1a1a] px-3 py-1 rounded-full text-xs text-[#00ff9d] font-mono">
            Block #{blockHeight}
          </div>
          <div className="bg-[#1a1a1a] px-3 py-1 rounded-full text-xs text-gray-300">
            {period}
          </div>
        </div>

        {/* Block Hash */}
        <div className="bg-[#1a1a1a] p-2 rounded-md mb-3">
          <div className="flex items-center text-xs text-gray-400 mb-1">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Block Hash</span>
          </div>
          <div className="font-mono text-xs text-[#00ff9d] break-all">
            {blockHash}
          </div>
        </div>

        {/* Previous Block Hash */}
        {!isGenesis && (
          <div className="bg-[#1a1a1a] p-2 rounded-md mb-3">
            <div className="flex items-center text-xs text-gray-400 mb-1">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Previous Hash</span>
            </div>
            <div className="font-mono text-xs text-gray-400 break-all">
              {prevBlockHash}
            </div>
          </div>
        )}
      </div>

      {/* Block Content */}
      <div className="border-t border-[#2d2d2d] pt-4 mb-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          {company && <p className="text-gray-400">{company}</p>}
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

        {/* Description - Show full description when expanded */}
        <p className={`text-gray-300 mb-4 ${!expanded && description.length > 150 ? 'line-clamp-3' : ''}`}>
          {description}
        </p>

        {/* Direct Modal Button */}
        <button
          onClick={handleOpenModal}
          className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-3 py-1 rounded-md text-xs flex items-center transition-colors mb-4"
        >
          <span className="mr-1">View Full Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-4 border-t border-[#2d2d2d] pt-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#1a1a1a] p-3 rounded-md">
                <div className="text-xs text-gray-400 mb-1">Gas Used</div>
                <div className="text-[#00ff9d] font-mono">{gasUsed}k</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-md">
                <div className="text-xs text-gray-400 mb-1">Confirmations</div>
                <div className="text-[#00ff9d] font-mono">{confirmations}</div>
              </div>
            </div>

            <div className="text-xs text-gray-400 mb-2">Block Hash</div>
            <div className="bg-[#1a1a1a] p-2 rounded-md mb-3 font-mono text-xs text-[#00ff9d] break-all">
              {blockHash}
            </div>

            {!isGenesis && (
              <>
                <div className="text-xs text-gray-400 mb-2">Previous Hash</div>
                <div className="bg-[#1a1a1a] p-2 rounded-md mb-3 font-mono text-xs text-gray-400 break-all">
                  {prevBlockHash}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Block Footer */}
      <div className="border-t border-[#2d2d2d] pt-4 flex justify-between items-center">
        <div className="flex space-x-3">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00ff9d] transition-colors"
              onClick={(e) => e.stopPropagation()} // Prevent triggering block expand
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00ff9d] transition-colors"
              onClick={(e) => e.stopPropagation()} // Prevent triggering block expand
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Expand/Collapse Button */}
          {onToggleExpand && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
              className="text-xs text-gray-400 hover:text-[#00ff9d] transition-colors flex items-center"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              <span className="mr-1">{expanded ? "Collapse" : "Expand"}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {expanded ? (
                  <polyline points="18 15 12 9 6 15"></polyline>
                ) : (
                  <polyline points="6 9 12 15 18 9"></polyline>
                )}
              </svg>
            </button>
          )}

          {/* View Details Button */}
          <button
            onClick={handleOpenModal}
            className="text-xs text-gray-400 hover:text-[#00ff9d] transition-colors flex items-center"
          >
            <span className="mr-1">View Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Block Stats */}
      <div className="absolute top-2 right-2 flex items-center space-x-2 text-xs text-gray-400">
        <div className="flex items-center">
          <span className="mr-1">⛽</span>
          <span>{gasUsed}k</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1">✓</span>
          <span>{confirmations}</span>
        </div>
      </div>

      {/* Modal using the new Modal component - only render when mounted */}
      {isMounted && (
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
              <div className="text-gray-400">{company}</div>
              <div className="text-gray-400">{period}</div>
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
                <span>Block Height:</span>
                <span className="text-[#00ff9d]">#{blockHeight}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Gas Used:</span>
                <span className="text-[#00ff9d]">{gasUsed}k</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Confirmations:</span>
                <span className="text-[#00ff9d]">{confirmations}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Block Type:</span>
                <span className="text-[#00ff9d]">{isGenesis ? 'Genesis' : 'Standard'}</span>
              </div>
              <div className="border-t border-[#2d2d2d] my-2 pt-2">
                <div className="mb-2">
                  <div className="text-gray-400 mb-1">Block Hash:</div>
                  <div className="text-[#00ff9d] text-xs break-all">{blockHash}</div>
                </div>
                {!isGenesis && (
                  <div className="mb-2">
                    <div className="text-gray-400 mb-1">Previous Hash:</div>
                    <div className="text-gray-300 text-xs break-all">{prevBlockHash}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Content>

        <Modal.Actions>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              View Code
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] text-black px-4 py-2 rounded-md flex items-center hover:opacity-90 transition-opacity"
            >
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Live Demo
            </a>
          )}
        </Modal.Actions>
        </Modal>
      )}
    </motion.div>
  );
}
