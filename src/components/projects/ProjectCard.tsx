'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';

type TechStack = {
  name: string;
  icon: string; // Path to SVG icon
};

type ProjectCardProps = {
  title: string;
  description: string;
  imageSrc?: string;
  techStack: TechStack[];
  githubLink?: string;
  demoLink?: string;
  contractAddress?: string;
  // NFT-style metadata
  tokenId?: string;
  chain?: string;
  rarity?: string;
};

export default function ProjectCard({
  title,
  description,
  techStack,
  githubLink,
  demoLink,
  contractAddress,
  tokenId = Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
  chain = 'ETH',
  rarity = 'Rare',
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate a deterministic hash for the project based on title
  const generateHash = (input: string) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).substring(0, 10).padStart(10, '0');
  };

  const projectHash = generateHash(title);

  return (
    <div
      className="relative group transform transition-transform duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* NFT Glow Effect - Static, not following mouse */}
      <div
        className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] blur-md transition-all duration-300 ${
          isHovered ? 'opacity-70' : 'opacity-0'
        }`}
      />

      {/* Card Container */}
      <div
        className={`relative border-2 rounded-xl overflow-hidden bg-[#121212] transition-all duration-300 ${
          isHovered ? 'border-[#00ff9d]' : 'border-[#2d2d2d]'
        }`}
      >
        {/* NFT Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00ff9d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* NFT Token Metadata Header */}
        <div className="relative px-3 py-2 border-b border-[#2d2d2d] flex justify-between items-center bg-[#0a0a0a]">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-black">#{tokenId}</span>
            </div>
            <span className="text-xs font-mono text-gray-400">
              {chain} • {rarity}
            </span>
          </div>
          <div className="flex items-center">
            <div className="text-xs font-mono text-gray-400 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#00ff9d] mr-1"></span>
              Verified
            </div>
          </div>
        </div>

        {/* Project Image */}
        <div className="relative h-48 w-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
          {/* Project Image */}
          <div className="absolute inset-0">
            <Image
              src={title.includes("DeFi") ? "/projects/defi-swap.jpg" :
                   title.includes("NFT") ? "/projects/nft-marketplace.jpg" :
                   title.includes("Multi-Sig") ? "/projects/multi-sig.jpg" :
                   title.includes("DAO") ? "/projects/dao-governance.jpg" :
                   title.includes("Staking") ? "/projects/staking-platform.jpg" :
                   title.includes("Bridge") ? "/projects/cross-chain-bridge.jpg" : "/projects/defi-swap.jpg"}
              alt={title}
              fill
              className={`object-cover transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>

          {/* Hover Animation Overlay - More subtle */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]/50 transition-all duration-300 transform ${
              isHovered ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          />
        </div>

        {/* Project Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <div className="bg-[#1a1a1a] px-2 py-1 rounded-full text-xs font-mono text-[#00ff9d]">
              0x{projectHash.substring(0, 6)}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-3">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                <Image src={tech.icon} alt={tech.name} width={16} height={16} className="mr-1" />
                {tech.name}
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4">{description}</p>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00ff9d] transition-colors"
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
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
              {contractAddress && (
                <a
                  href={`https://etherscan.io/address/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </a>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-gray-400 hover:text-[#00ff9d] transition-colors flex items-center"
            >
              <span className="mr-1">Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* Modal using the new Modal component */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="xl"
        fullWidth
      >
        <Modal.Header onClose={() => setIsModalOpen(false)}>
          <div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] flex items-center justify-center mr-2">
                <span className="text-xs font-bold text-black">#{tokenId}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <div className="flex items-center text-xs">
              <span className="font-mono text-gray-400 mr-2">
                {chain} • {rarity}
              </span>
              <div className="font-mono text-gray-400 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] mr-1"></span>
                Verified
              </div>
            </div>
          </div>
        </Modal.Header>

        <Modal.Content>
          {/* Two-column layout for larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Left column - Project Image and Metadata */}
            <div className="md:col-span-1">
              <div className="relative h-48 md:h-48 w-full rounded-xl overflow-hidden bg-[#1a1a1a] flex items-center justify-center border border-[#2d2d2d]">
                <div className="absolute inset-0">
                  <Image
                    src={title.includes("DeFi") ? "/projects/defi-swap.jpg" :
                         title.includes("NFT") ? "/projects/nft-marketplace.jpg" :
                         title.includes("Multi-Sig") ? "/projects/multi-sig.jpg" :
                         title.includes("DAO") ? "/projects/dao-governance.jpg" :
                         title.includes("Staking") ? "/projects/staking-platform.jpg" :
                         title.includes("Bridge") ? "/projects/cross-chain-bridge.jpg" : "/projects/defi-swap.jpg"}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* NFT Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212] to-transparent h-16 pointer-events-none" />

                {/* Token Hash */}
                <div className="absolute bottom-2 left-2 bg-[#0a0a0a]/80 px-2 py-1 rounded-full text-xs font-mono text-[#00ff9d]">
                  0x{projectHash.substring(0, 6)}
                </div>
              </div>

              {/* NFT Metadata - Compact version */}
              <div className="mt-3">
                <div className="bg-[#0a0a0a] rounded-xl border border-[#2d2d2d] overflow-hidden">
                  <div className="grid grid-cols-2 text-xs">
                    <div className="p-2 border-b border-r border-[#2d2d2d]">
                      <span className="block text-gray-500 text-xs">Token ID</span>
                      <span className="font-mono text-white">#{tokenId}</span>
                    </div>
                    <div className="p-2 border-b border-[#2d2d2d]">
                      <span className="block text-gray-500 text-xs">Chain</span>
                      <span className="font-mono text-white">{chain}</span>
                    </div>
                    <div className="p-2 border-r border-[#2d2d2d]">
                      <span className="block text-gray-500 text-xs">Rarity</span>
                      <span className="font-mono text-white">{rarity}</span>
                    </div>
                    <div className="p-2">
                      <span className="block text-gray-500 text-xs">Hash</span>
                      <span className="font-mono text-white text-xs truncate">0x{projectHash.substring(0, 6)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Project Details */}
            <div className="md:col-span-2">
              {/* Description */}
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase mb-1">Description</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
              </div>

              {/* Tech Stack */}
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase mb-1">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <div key={index} className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                      <Image src={tech.icon} alt={tech.name} width={16} height={16} className="mr-1" />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Address */}
              {contractAddress && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase mb-1">Contract Address</h3>
                  <div className="bg-[#0a0a0a] p-2 rounded-xl font-mono text-xs text-gray-300 border border-[#2d2d2d]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="mr-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="9" y1="3" x2="9" y2="21"></line>
                        </svg>
                        <span className="flex-shrink-0">Smart Contract</span>
                      </div>
                      <a
                        href={`https://etherscan.io/address/${contractAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ff9d] hover:underline text-xs truncate ml-2 max-w-[200px]"
                      >
                        {contractAddress.substring(0, 18)}...
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Content>

        <Modal.Actions className="flex flex-wrap justify-center md:justify-start gap-3">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] text-black px-4 py-2 rounded-xl flex items-center hover:opacity-90 transition-opacity font-medium text-sm"
            >
              <svg className="mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Live Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-xl flex items-center transition-colors border border-[#2d2d2d] text-sm"
            >
              <svg className="mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              View Code
            </a>
          )}
          {contractAddress && (
            <a
              href={`https://etherscan.io/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-xl flex items-center transition-colors border border-[#2d2d2d] text-sm"
            >
              <svg className="mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              View on Etherscan
            </a>
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
}
