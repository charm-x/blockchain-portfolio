import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectsPage() {
  // Sample data for projects with NFT-style metadata
  const projects = [
    {
      title: "DeFi Swap Protocol",
      description: "A decentralized token swap protocol with automated market making and liquidity pools. Features include low slippage trades, flash loans, and yield farming opportunities.",
      imageSrc: "/projects/defi-swap.jpg", // Placeholder - you'll need to add actual images
      techStack: [
        { name: "Solidity", icon: "/icons/tech/solidity.svg" },
        { name: "React", icon: "/icons/tech/react.svg" },
        { name: "Hardhat", icon: "/icons/tech/hardhat.svg" },
        { name: "Ethers.js", icon: "/icons/tech/ethers.svg" }
      ],
      githubLink: "https://github.com",
      demoLink: "https://defiswap.com",
      contractAddress: "0x1234567890123456789012345678901234567890",
      // NFT-style metadata
      tokenId: "0001",
      chain: "ETH",
      rarity: "Legendary"
    },
    {
      title: "NFT Marketplace",
      description: "A decentralized marketplace for creating, buying, selling, and trading NFTs. Supports ERC-721 and ERC-1155 tokens with royalty distribution and auction mechanisms.",
      imageSrc: "/projects/nft-marketplace.jpg", // Placeholder
      techStack: [
        { name: "Solidity", icon: "/icons/tech/solidity.svg" },
        { name: "Next.js", icon: "/icons/tech/nextjs.svg" },
        { name: "IPFS", icon: "/icons/tech/ipfs.svg" },
        { name: "OpenZeppelin", icon: "/icons/tech/openzeppelin.svg" }
      ],
      githubLink: "https://github.com",
      demoLink: "https://nftmarketplace.com",
      contractAddress: "0x0987654321098765432109876543210987654321",
      // NFT-style metadata
      tokenId: "0002",
      chain: "ETH",
      rarity: "Epic"
    },
    {
      title: "Multi-Sig Wallet",
      description: "A secure multi-signature wallet requiring multiple approvals for transactions. Features include transaction proposal, approval workflow, and execution tracking.",
      imageSrc: "/projects/multi-sig.jpg", // Placeholder
      techStack: [
        { name: "Solidity", icon: "/icons/tech/solidity.svg" },
        { name: "TypeScript", icon: "/icons/tech/typescript.svg" },
        { name: "Ethers.js", icon: "/icons/tech/ethers.svg" },
        { name: "React", icon: "/icons/tech/react.svg" }
      ],
      githubLink: "https://github.com",
      demoLink: "https://multisig.com",
      contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      // NFT-style metadata
      tokenId: "0003",
      chain: "ETH",
      rarity: "Rare"
    },
    {
      title: "DAO Governance",
      description: "A decentralized autonomous organization framework with proposal creation, voting mechanisms, and treasury management. Supports both token-weighted and quadratic voting.",
      imageSrc: "/projects/dao.jpg", // Placeholder
      techStack: [
        { name: "Solidity", icon: "/icons/tech/solidity.svg" },
        { name: "React", icon: "/icons/tech/react.svg" },
        { name: "Graph Protocol", icon: "/icons/tech/graph.svg" },
        { name: "Compound", icon: "/icons/tech/compound.svg" }
      ],
      githubLink: "https://github.com",
      demoLink: "https://daogov.com",
      contractAddress: "0xfedcba0987654321fedcba0987654321fedcba09",
      // NFT-style metadata
      tokenId: "0004",
      chain: "ETH",
      rarity: "Uncommon"
    },
    {
      title: "Staking Platform",
      description: "A DeFi staking platform allowing users to stake tokens and earn rewards. Features include flexible and locked staking options with variable APY.",
      imageSrc: "/projects/staking.jpg", // Placeholder
      techStack: [
        { name: "Solidity", icon: "/icons/tech/solidity.svg" },
        { name: "Vue.js", icon: "/icons/tech/vue.svg" },
        { name: "Truffle", icon: "/icons/tech/truffle.svg" },
        { name: "Web3.js", icon: "/icons/tech/web3.svg" }
      ],
      githubLink: "https://github.com",
      demoLink: "https://stakingplatform.com",
      contractAddress: "0x5678901234567890123456789012345678901234",
      // NFT-style metadata
      tokenId: "0005",
      chain: "BSC",
      rarity: "Rare"
    },
    {
      title: "Cross-Chain Bridge",
      description: "A bridge for transferring assets between different blockchain networks. Supports ERC-20 tokens with secure locking and minting mechanisms.",
      imageSrc: "/projects/bridge.jpg", // Placeholder
      techStack: [
        { name: "Solidity", icon: "/icons/tech/solidity.svg" },
        { name: "Rust", icon: "/icons/tech/rust.svg" },
        { name: "Polkadot", icon: "/icons/tech/polkadot.svg" },
        { name: "React", icon: "/icons/tech/react.svg" }
      ],
      githubLink: "https://github.com",
      demoLink: "https://crosschainbridge.com",
      contractAddress: "0x2468013579246801357924680135792468013579",
      // NFT-style metadata
      tokenId: "0006",
      chain: "DOT",
      rarity: "Legendary"
    }
  ];

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Blockchain Projects</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A showcase of my decentralized applications, smart contracts, and blockchain solutions.
            Each project demonstrates different aspects of blockchain development.
          </p>
        </div>

        {/* Project Filter (can be implemented with state in a client component) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-md transition-colors">
            All
          </button>
          <button className="bg-[#121212] hover:bg-[#2a2a2a] text-gray-400 px-4 py-2 rounded-md transition-colors">
            DeFi
          </button>
          <button className="bg-[#121212] hover:bg-[#2a2a2a] text-gray-400 px-4 py-2 rounded-md transition-colors">
            NFT
          </button>
          <button className="bg-[#121212] hover:bg-[#2a2a2a] text-gray-400 px-4 py-2 rounded-md transition-colors">
            DAO
          </button>
          <button className="bg-[#121212] hover:bg-[#2a2a2a] text-gray-400 px-4 py-2 rounded-md transition-colors">
            Infrastructure
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              techStack={project.techStack}
              githubLink={project.githubLink}
              demoLink={project.demoLink}
              contractAddress={project.contractAddress}
              tokenId={project.tokenId}
              chain={project.chain}
              rarity={project.rarity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
