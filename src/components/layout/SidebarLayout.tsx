'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/data';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeBlock, setActiveBlock] = useState('/');
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Update active block based on current path
  useEffect(() => {
    setActiveBlock(pathname);
  }, [pathname]);

  // Get current network stats
  const currentBlock = navigationItems.find(item => item.path === activeBlock) || navigationItems[0];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-64 bg-black/80 backdrop-blur-md border-r border-[#2d2d2d] fixed h-full overflow-y-auto z-50 scrollbar-hide">
        <div className="p-4 pb-20">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white flex items-center mb-6">
            <span className="text-[#00ff9d] mr-2">⬢</span>
            <span>BlockDev</span>
          </Link>

          {/* Network Stats */}
          <div className="mb-6 space-y-2">
            <div className="bg-[#1a1a1a] px-3 py-2 rounded-md flex items-center text-xs text-gray-400">
              <span className="text-[#00ff9d] mr-2">⬢</span>
              <span>Network: Mainnet</span>
            </div>
            <div className="bg-[#1a1a1a] px-3 py-2 rounded-md text-xs text-gray-400 flex items-center">
              <span className="text-[#00ff9d] mr-2">⚡</span>
              <span>Gas: {currentBlock.gasPrice} Gwei</span>
            </div>
            <div className="bg-[#1a1a1a] px-3 py-2 rounded-md text-xs text-gray-400 flex items-center">
              <span className="text-[#00ff9d] mr-2">⛓️</span>
              <span>Latest Block: #{Math.max(...navigationItems.map(item => item.blockHeight))}</span>
            </div>
          </div>

          {/* Navigation Blocks */}
          <div className="space-y-3">
            {navigationItems.map((item) => {
              const isActive = activeBlock === item.path;
              const isHovered = isHovering === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onMouseEnter={() => setIsHovering(item.path)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <motion.div
                    className={`border rounded-lg p-3 transition-all my-2 ${
                      isActive
                        ? 'border-[#00ff9d] bg-[#121212]'
                        : 'border-[#2d2d2d] bg-[#121212] hover:border-gray-500'
                    }`}
                    whileHover={{ x: 4 }}
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

                    {/* Mining animation container - always present to maintain consistent height */}
                    <div className="mt-2 h-1 rounded-full overflow-hidden">
                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.div
                            className="h-full w-full bg-gradient-to-r from-[#00ff9d] to-[#00c3ff]"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            exit={{ width: 0 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Connect Wallet Button */}
          <div className="mt-6">
            <button className="w-full bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] text-black font-medium py-2 px-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Connect Wallet
            </button>
          </div>

          {/* Footer Content */}
          <div className="mt-8 pt-6 border-t border-[#2d2d2d]">
            {/* Social Links */}
            <div className="flex justify-center space-x-4 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff9d] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff9d] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00ff9d] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-xs">
              <p>© {new Date().getFullYear()} BlockDev</p>
              <p className="mt-1">Built with Next.js & Tailwind</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2d2d2d]">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="text-white p-2 mr-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>

            <Link href="/" className="text-xl font-bold text-white flex items-center">
              <span className="text-[#00ff9d] mr-2">⬢</span>
              <span>BlockDev</span>
            </Link>
          </div>

          <button className="bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] text-black font-medium py-1.5 px-3 rounded-full text-xs hover:opacity-90 transition-opacity">
            Connect
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-64 bg-black/95 h-full overflow-y-auto border-r border-[#2d2d2d]"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <Link href="/" className="text-xl font-bold text-white flex items-center">
                    <span className="text-[#00ff9d] mr-2">⬢</span>
                    <span>BlockDev</span>
                  </Link>
                  <button
                    className="text-white"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-3">
                  {navigationItems.map((item) => {
                    const isActive = activeBlock === item.path;

                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsSidebarOpen(false)}
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
                            <div className="font-mono text-xs text-gray-500 truncate">
                              {item.hash.substring(0, 18)}...
                            </div>
                          </div>

                          {/* Empty container to maintain consistent height with desktop */}
                          <div className="mt-2 h-1 rounded-full overflow-hidden"></div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                {/* Connect Wallet Button */}
                <div className="mt-6">
                  <button className="w-full bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] text-black font-medium py-2 px-4 rounded-full text-sm hover:opacity-90 transition-opacity">
                    Connect Wallet
                  </button>
                </div>

                {/* Footer Content for Mobile */}
                <div className="mt-8 pt-6 border-t border-[#2d2d2d]">
                  {/* Social Links */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>

                  {/* Copyright */}
                  <div className="text-center text-gray-500 text-xs">
                    <p>© {new Date().getFullYear()} BlockDev</p>
                    <p className="mt-1">Built with Next.js & Tailwind</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="md:ml-64 w-full">
        <div className="md:pt-6 pt-16 pb-16">
          {children}
        </div>
      </div>
    </div>
  );
}
