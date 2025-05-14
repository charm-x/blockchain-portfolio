'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Navigation items with blockchain-themed metadata
const navItems = [
  {
    name: 'Home',
    path: '/',
    blockHeight: 1,
    hash: '0x8c3f7c21a5e1b0a5e1b0a5e1b0a5e1b0a5e1b0a5',
    gasPrice: '12',
    txCount: '24',
  },
  {
    name: 'Blocks',
    path: '/blocks',
    blockHeight: 2,
    hash: '0x7d9c4e35f2d9c74a86a7f81d8d9a5be71848329',
    gasPrice: '15',
    txCount: '18',
  },
  {
    name: 'Projects',
    path: '/projects',
    blockHeight: 3,
    hash: '0x4b3af30f93c1a5c1236aa4f69a7fb0e29c2f2a3',
    gasPrice: '18',
    txCount: '32',
  },
  {
    name: 'Contact',
    path: '/contact',
    blockHeight: 4,
    hash: '0x2f1b678a5889d890d25c096bd686f76b48d32c6',
    gasPrice: '10',
    txCount: '8',
  },
];

export default function BlockchainNavigation() {
  const pathname = usePathname();
  const [activeBlock, setActiveBlock] = useState('/');
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Update active block based on current path
  useEffect(() => {
    setActiveBlock(pathname);
  }, [pathname]);

  // Get current network stats
  const currentBlock = navItems.find(item => item.path === activeBlock) || navItems[0];

  return (
    <div className="w-full">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="mb-2 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <div className="bg-[#1a1a1a] px-2 py-1 rounded-md flex items-center">
              <span className="text-[#00ff9d] mr-1">⬢</span>
              <span>Network: Mainnet</span>
            </div>
            <div className="bg-[#1a1a1a] px-2 py-1 rounded-md">
              <span className="text-[#00ff9d] mr-1">⚡</span>
              <span>Gas: {currentBlock.gasPrice} Gwei</span>
            </div>
          </div>
          <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs text-gray-400">
            <span className="text-[#00ff9d] mr-1">⛓️</span>
            <span>Latest Block: #{Math.max(...navItems.map(item => item.blockHeight))}</span>
          </div>
        </div>

        <div className="flex space-x-4">
          {navItems.map((item) => {
            const isActive = activeBlock === item.path;
            const isHovered = isHovering === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex-1"
                onMouseEnter={() => setIsHovering(item.path)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <motion.div
                  className={`border rounded-lg p-3 transition-all ${
                    isActive
                      ? 'border-[#00ff9d] bg-[#121212]'
                      : 'border-[#2d2d2d] bg-[#121212] hover:border-gray-500'
                  }`}
                  whileHover={{ y: -4 }}
                  animate={{
                    boxShadow: isActive
                      ? '0 0 10px rgba(0, 255, 157, 0.3)'
                      : 'none'
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-[#1a1a1a] px-2 py-1 rounded-full text-xs text-[#00ff9d] font-mono">
                      Block #{item.blockHeight}
                    </div>
                    <div className={`text-sm font-medium ${isActive ? 'text-[#00ff9d]' : 'text-white'}`}>
                      {item.name}
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-2 rounded-md mb-2">
                    <div className="flex items-center text-xs text-gray-400 mb-1">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Hash</span>
                    </div>
                    <div className="font-mono text-xs text-gray-500 truncate">
                      {item.hash}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{item.gasPrice} Gwei</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span>{item.txCount} Txs</span>
                    </div>
                  </div>

                  {/* Mining animation when hovered */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        className="mt-2 h-1 bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="mb-2 flex justify-between items-center">
          <div className="bg-[#1a1a1a] px-2 py-1 rounded-md flex items-center text-xs text-gray-400">
            <span className="text-[#00ff9d] mr-1">⬢</span>
            <span>Network: Mainnet</span>
          </div>
          <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs text-gray-400">
            <span className="text-[#00ff9d] mr-1">⛓️</span>
            <span>Latest: #{Math.max(...navItems.map(item => item.blockHeight))}</span>
          </div>
        </div>

        <button
          className="flex items-center justify-between bg-[#1a1a1a] px-3 py-2 rounded-lg text-white w-full border border-[#2d2d2d]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <span className="text-[#00ff9d] mr-2">⬢</span>
            <span>Block Explorer</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-400 mr-2">Gas: {currentBlock.gasPrice} Gwei</span>
            <span>
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </span>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mt-2 border border-[#2d2d2d] rounded-lg bg-[#121212] overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 space-y-3">
                {navItems.map((item) => {
                  const isActive = activeBlock === item.path;

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        className={`border rounded-lg p-3 ${
                          isActive
                            ? 'border-[#00ff9d] bg-[#121212]'
                            : 'border-[#2d2d2d] bg-[#121212]'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="bg-[#1a1a1a] px-2 py-1 rounded-full text-xs text-[#00ff9d] font-mono">
                            Block #{item.blockHeight}
                          </div>
                          <div className={`text-sm font-medium ${isActive ? 'text-[#00ff9d]' : 'text-white'}`}>
                            {item.name}
                          </div>
                        </div>

                        <div className="bg-[#1a1a1a] p-2 rounded-md mb-2">
                          <div className="flex items-center text-xs text-gray-400 mb-1">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Hash</span>
                          </div>
                          <div className="font-mono text-xs text-gray-500 truncate">
                            {item.hash.substring(0, 18)}...
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs text-gray-400">
                          <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>{item.gasPrice} Gwei</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            <span>{item.txCount} Txs</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
