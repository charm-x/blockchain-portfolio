import ProjectsContainer from "@/components/projects/ProjectsContainer";

export default function ProjectsPage() {
  // Sample data for projects with NFT-style metadata and categories
  const projects = [
    {
      title: "DeFi Swap Protocol",
      description: "A decentralized token swap protocol with automated market making and liquidity pools. Features include low slippage trades, flash loans, and yield farming opportunities.",
      imageSrc: "/projects/defi-swap.jpg",
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
      rarity: "Legendary",
      category: "DeFi"
    },
    {
      title: "NFT Marketplace",
      description: "A decentralized marketplace for creating, buying, selling, and trading NFTs. Supports ERC-721 and ERC-1155 tokens with royalty distribution and auction mechanisms.",
      imageSrc: "/projects/nft-marketplace.jpg",
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
      rarity: "Epic",
      category: "NFT"
    },
    {
      title: "Multi-Sig Wallet",
      description: "A secure multi-signature wallet requiring multiple approvals for transactions. Features include transaction proposal, approval workflow, and execution tracking.",
      imageSrc: "/projects/multi-sig.jpg",
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
      rarity: "Rare",
      category: "Infrastructure"
    },
    {
      title: "DAO Governance",
      description: "A decentralized autonomous organization framework with proposal creation, voting mechanisms, and treasury management. Supports both token-weighted and quadratic voting.",
      imageSrc: "/projects/dao-governance.jpg",
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
      rarity: "Uncommon",
      category: "DAO"
    },
    {
      title: "Staking Platform",
      description: "A DeFi staking platform allowing users to stake tokens and earn rewards. Features include flexible and locked staking options with variable APY.",
      imageSrc: "/projects/staking-platform.jpg",
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
      rarity: "Rare",
      category: "DeFi"
    },
    {
      title: "Cross-Chain Bridge",
      description: "A bridge for transferring assets between different blockchain networks. Supports ERC-20 tokens with secure locking and minting mechanisms.",
      imageSrc: "/projects/cross-chain-bridge.jpg",
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
      rarity: "Legendary",
      category: "Infrastructure"
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

        {/* Projects Container with filtering functionality */}
        <ProjectsContainer projects={projects} />
      </div>
    </div>
  );
}
