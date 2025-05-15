'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function ContractSigningSection() {
  const [animationStage, setAnimationStage] = useState(0);
  const [contractSigned, setContractSigned] = useState(false);
  const [contractDeployed, setContractDeployed] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Use state for random values to prevent hydration errors
  const [contractId, setContractId] = useState("SC-0000");
  const [txHash, setTxHash] = useState("0x0000000000000000000000000000000000000000");

  // Generate random values only on client-side after component mounts
  useEffect(() => {
    // Generate contract ID
    setContractId(`SC-${Math.floor(Math.random() * 10000)}`);

    // Generate transaction hash
    const hash = "0x" + Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setTxHash(hash);
  }, []);

  // Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Multi-stage animation sequence - only starts when section is visible
  useEffect(() => {
    if (!isVisible) return;

    // Create individual timer references instead of an array
    const timer1 = setTimeout(() => setAnimationStage(1), 500);
    const timer2 = setTimeout(() => setAnimationStage(2), 1500);
    const timer3 = setTimeout(() => {
      setAnimationStage(3);
      setContractSigned(true);
    }, 2500);
    const timer4 = setTimeout(() => setAnimationStage(4), 3500);

    // Note: We're no longer setting contractDeployed and showProducts with timers
    // Instead, they're triggered by the animation completion in the data packet animations

    // Clear all timers in cleanup function
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isVisible]);

  return (
    <div className="py-20 border-t border-[#2d2d2d] overflow-hidden" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
          <span className="gradient-text">Let&apos;s Build Something Amazing Together</span>
        </h2>

        <div className="relative h-[400px] mb-16">
          {/* Background pattern - blockchain grid */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#00ff9d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-5xl gap-4 md:gap-8 px-4">
              {/* Smart Contract Document */}
              <motion.div
                className={`bg-[#121212] border-2 ${contractSigned ? 'border-[#00ff9d]' : 'border-[#2d2d2d]'} rounded-xl p-4 w-full md:w-[280px] transition-all duration-500 flex-shrink-0 flex flex-col`}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: animationStage >= 1 ? 1 : 0,
                  x: animationStage >= 1 ? 0 : -20,
                  borderColor: contractSigned ? '#00ff9d' : '#2d2d2d'
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#00ff9d] mr-2"></div>
                    <h3 className="text-md font-bold text-white">Smart Contract</h3>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    {contractSigned ? 'SIGNED' : 'PENDING'}
                  </div>
                </div>

                {/* Contract Content */}
                <div className="bg-[#1a1a1a] rounded-md p-3 mb-3 flex-grow">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Contract ID:</span>
                    <span className="font-mono">{contractId}</span>
                  </div>

                  <div className="border-b border-[#2d2d2d] pb-2 mb-2">
                    <h4 className="text-xs font-bold text-white mb-1">Agreement Terms</h4>
                    <p className="text-xs text-gray-300">
                      Client and Developer agree to collaborate on blockchain solutions.
                    </p>
                  </div>

                  {/* Signature Areas */}
                  <div className="space-y-2">
                    {/* Client Signature */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Client:</span>
                      <motion.div
                        className="bg-[#0a0a0a] px-2 py-1 rounded-md w-[120px] h-[24px] flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: animationStage >= 2 ? 1 : 0 }}
                      >
                        {animationStage >= 2 && (
                          <span className="text-[#00c3ff] font-mono text-xs italic">Client Signature</span>
                        )}
                      </motion.div>
                    </div>

                    {/* Developer Signature */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Developer:</span>
                      <motion.div
                        className="bg-[#0a0a0a] px-2 py-1 rounded-md w-[120px] h-[24px] flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: animationStage >= 3 ? 1 : 0 }}
                      >
                        {animationStage >= 3 && (
                          <span className="text-[#00ff9d] font-mono text-xs italic">BlockDev</span>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Contract Deployment Status */}
                <motion.div
                  className={`bg-[#1a1a1a] rounded-md p-2 overflow-hidden ${contractDeployed ? 'border border-[#00ff9d]' : ''}`}
                  animate={{
                    borderColor: contractDeployed ? '#00ff9d' : 'transparent',
                    boxShadow: contractDeployed ? '0 0 10px rgba(0, 255, 157, 0.3)' : 'none'
                  }}
                >
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Status:</span>
                    <span className={`font-mono ${contractDeployed ? 'text-[#00ff9d]' : animationStage >= 4 ? 'text-yellow-500' : 'text-gray-500'}`}>
                      {contractDeployed ? 'DEPLOYED' : animationStage >= 4 ? 'DEPLOYING...' : 'AWAITING'}
                    </span>
                  </div>

                  {/* Deployment Progress Bar */}
                  {animationStage >= 4 && (
                    <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden mb-1">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#00ff9d] to-[#00c3ff]"
                        initial={{ width: '0%' }}
                        animate={{ width: contractDeployed ? '100%' : '60%' }}
                        transition={{ duration: contractDeployed ? 0.5 : 2, ease: "easeInOut" }}
                      />
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* Blockchain Transaction Animation */}
              {animationStage >= 4 && (
                <div className="hidden md:flex items-center justify-center">
                  <motion.div
                    className="h-[2px] w-[80px] relative overflow-visible"
                    initial={{ width: 0 }}
                    animate={{ width: '80px' }}
                    transition={{ duration: 1.5 }}
                  >
                    {/* Main connection line with glow effect */}
                    <div className="absolute top-0 left-0 h-full w-full bg-[#00ff9d] shadow-[0_0_5px_rgba(0,255,157,0.7)]"></div>

                    {/* Pulsing nodes along the connection */}
                    <motion.div
                      className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1 h-1 rounded-full bg-[#00ff9d] shadow-[0_0_3px_rgba(0,255,157,0.9)]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-2/4 -translate-y-1/2 w-1 h-1 rounded-full bg-[#00ff9d] shadow-[0_0_3px_rgba(0,255,157,0.9)]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-3/4 -translate-y-1/2 w-1 h-1 rounded-full bg-[#00ff9d] shadow-[0_0_3px_rgba(0,255,157,0.9)]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />

                    {/* Data packets moving across - one-way only */}
                    {animationStage >= 4 && !contractDeployed && (
                      <>
                        {/* Main data packet with hexagon shape */}
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
                          initial={{ x: 0, opacity: 1 }}
                          animate={{
                            x: 80,
                            opacity: [1, 0.9, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: 2,
                            repeatType: "loop",
                            ease: "easeInOut",
                            repeatDelay: 0.2
                          }}
                          onAnimationComplete={() => {
                            if (!contractDeployed) {
                              setContractDeployed(true);
                              setTimeout(() => setShowProducts(true), 500);
                            }
                          }}
                        >
                          {/* Hexagon shape for data packet */}
                          <div className="w-5 h-5 bg-[#00ff9d] relative rotate-45 shadow-[0_0_8px_rgba(0,255,157,0.6)]">
                            <div className="absolute inset-0.5 bg-[#121212] rotate-0"></div>
                            <div className="absolute inset-1 bg-[#00ff9d] rotate-0 opacity-70"></div>
                          </div>
                        </motion.div>

                        {/* Secondary data packet with different shape */}
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
                          initial={{ x: 0, opacity: 0 }}
                          animate={{
                            x: 80,
                            opacity: [0, 1, 0.8, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: 2,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: 0.5,
                            repeatDelay: 0.2
                          }}
                        >
                          {/* Diamond shape for secondary packet */}
                          <div className="w-4 h-4 bg-[#00c3ff] rotate-45 shadow-[0_0_8px_rgba(0,195,255,0.6)]"></div>
                        </motion.div>

                        {/* Small trailing particles */}
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00ff9d]"
                          initial={{ x: 0, opacity: 0 }}
                          animate={{
                            x: [0, 40, 80],
                            opacity: [0, 0.7, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: 2,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: 0.2,
                            repeatDelay: 0.2
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                </div>
              )}

              {/* Mobile connector (only visible on small screens) */}
              {animationStage >= 4 && (
                <div className="flex md:hidden items-center justify-center">
                  <motion.div
                    className="h-[40px] w-[2px] my-2 relative overflow-visible"
                    initial={{ height: 0 }}
                    animate={{ height: contractDeployed ? '40px' : '20px' }}
                    transition={{ duration: 1.5 }}
                  >
                    {/* Main connection line with glow effect */}
                    <div className="absolute top-0 left-0 h-full w-full bg-[#00ff9d] shadow-[0_0_5px_rgba(0,255,157,0.7)]"></div>

                    {/* Pulsing nodes along the connection */}
                    <motion.div
                      className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00ff9d] shadow-[0_0_3px_rgba(0,255,157,0.9)]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute top-2/4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00ff9d] shadow-[0_0_3px_rgba(0,255,157,0.9)]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    <motion.div
                      className="absolute top-3/4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00ff9d] shadow-[0_0_3px_rgba(0,255,157,0.9)]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />

                    {/* Data packets moving down - one-way only */}
                    {animationStage >= 4 && !contractDeployed && (
                      <>
                        {/* Main data packet with hexagon shape */}
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                          initial={{ y: 0, opacity: 1 }}
                          animate={{
                            y: 40,
                            opacity: [1, 0.9, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: 2,
                            repeatType: "loop",
                            ease: "easeInOut",
                            repeatDelay: 0.2
                          }}
                          onAnimationComplete={() => {
                            if (!contractDeployed) {
                              setContractDeployed(true);
                              setTimeout(() => setShowProducts(true), 500);
                            }
                          }}
                        >
                          {/* Hexagon shape for data packet */}
                          <div className="w-5 h-5 bg-[#00ff9d] relative rotate-45 shadow-[0_0_8px_rgba(0,255,157,0.6)]">
                            <div className="absolute inset-0.5 bg-[#121212] rotate-0"></div>
                            <div className="absolute inset-1 bg-[#00ff9d] rotate-0 opacity-70"></div>
                          </div>
                        </motion.div>

                        {/* Secondary data packet with different shape */}
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                          initial={{ y: 0, opacity: 0 }}
                          animate={{
                            y: 40,
                            opacity: [0, 1, 0.8, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: 2,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: 0.5,
                            repeatDelay: 0.2
                          }}
                        >
                          {/* Diamond shape for secondary packet */}
                          <div className="w-4 h-4 bg-[#00c3ff] rotate-45 shadow-[0_0_8px_rgba(0,195,255,0.6)]"></div>
                        </motion.div>

                        {/* Small trailing particles */}
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00ff9d]"
                          initial={{ y: 0, opacity: 0 }}
                          animate={{
                            y: [0, 20, 40],
                            opacity: [0, 0.7, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: 2,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: 0.2,
                            repeatDelay: 0.2
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                </div>
              )}

              {/* Amazing Products Result */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: showProducts ? 1 : 0,
                  x: showProducts ? 0 : 20
                }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-[280px] flex-shrink-0 flex flex-col"
              >
                <div className="bg-[#121212] border-2 border-[#00c3ff] rounded-xl p-4 text-center h-full flex flex-col">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#00c3ff] mr-2"></div>
                    <h3 className="text-md font-bold text-[#00c3ff]">Amazing Products</h3>
                    <div className="w-2 h-2 rounded-full bg-[#00c3ff] ml-2"></div>
                  </div>

                  <div className="flex justify-center gap-4 mb-3">
                    <div className="relative w-10 h-10">
                      <Image src="/icons/crypto/btc.svg" alt="Bitcoin" fill className="object-contain" />
                    </div>
                    <div className="relative w-10 h-10">
                      <Image src="/icons/crypto/eth.svg" alt="Ethereum" fill className="object-contain" />
                    </div>
                    <div className="relative w-10 h-10">
                      <Image src="/icons/crypto/sol.svg" alt="Solana" fill className="object-contain" />
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 mb-2">
                    Secure, efficient, and innovative blockchain solutions
                  </p>

                  {/* Success indicators */}
                  <div className="flex justify-center gap-2 mb-2">
                    <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#00ff9d] mr-1"></span>
                      <span className="text-white">Secure</span>
                    </div>
                    <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#00c3ff] mr-1"></span>
                      <span className="text-white">Innovative</span>
                    </div>
                  </div>

                  {/* Spacer to push transaction hash to bottom */}
                  <div className="flex-grow"></div>

                  {/* Transaction hash */}
                  <div className="mt-2 pt-2 border-t border-[#2d2d2d]">
                    <p className="text-xs text-gray-500 font-mono truncate">
                      TXID: {txHash.substring(0, 14)}...
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-6">Ready to Sign Your Own Contract?</h3>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Let&apos;s collaborate on your next blockchain project and bring your vision to life with cutting-edge technology.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="glow-effect">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
}
