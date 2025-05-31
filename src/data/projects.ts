import { Project } from '@/types';

export const projectsData: Project[] = [
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
    githubLink: "https://github.com/username/defi-swap",
    demoLink: "https://defiswap.example.com",
    contractAddress: "0x1234567890123456789012345678901234567890",
    tokenId: "0001",
    chain: "ETH",
    rarity: "Legendary",
    category: "DeFi"
  },
  {
    title: "NFT Marketplace",
    description: "A comprehensive NFT marketplace with advanced features including auctions, royalties, and cross-chain compatibility. Built with gas-optimized smart contracts.",
    imageSrc: "/projects/nft-marketplace.jpg",
    techStack: [
      { name: "Solidity", icon: "/icons/tech/solidity.svg" },
      { name: "Next.js", icon: "/icons/tech/nextjs.svg" },
      { name: "IPFS", icon: "/icons/tech/ipfs.svg" },
      { name: "Web3.js", icon: "/icons/tech/web3.svg" }
    ],
    githubLink: "https://github.com/username/nft-marketplace",
    demoLink: "https://nftmarket.example.com",
    contractAddress: "0x2345678901234567890123456789012345678901",
    tokenId: "0002",
    chain: "ETH",
    rarity: "Epic",
    category: "NFT"
  },
  {
    title: "DAO Governance Platform",
    description: "A decentralized autonomous organization platform with proposal creation, voting mechanisms, and treasury management. Implements quadratic voting and delegation features.",
    imageSrc: "/projects/dao-platform.jpg",
    techStack: [
      { name: "Solidity", icon: "/icons/tech/solidity.svg" },
      { name: "TypeScript", icon: "/icons/tech/typescript.svg" },
      { name: "Aragon", icon: "/icons/tech/aragon.svg" },
      { name: "Snapshot", icon: "/icons/tech/snapshot.svg" }
    ],
    githubLink: "https://github.com/username/dao-platform",
    demoLink: "https://dao.example.com",
    contractAddress: "0x3456789012345678901234567890123456789012",
    tokenId: "0003",
    chain: "ETH",
    rarity: "Rare",
    category: "DAO"
  },
  {
    title: "Cross-Chain Bridge",
    description: "A secure cross-chain bridge enabling asset transfers between Ethereum and Polygon. Features include atomic swaps, multi-signature validation, and fraud proofs.",
    imageSrc: "/projects/cross-chain-bridge.jpg",
    techStack: [
      { name: "Solidity", icon: "/icons/tech/solidity.svg" },
      { name: "Polygon", icon: "/icons/tech/polygon.svg" },
      { name: "Chainlink", icon: "/icons/tech/chainlink.svg" },
      { name: "Go", icon: "/icons/tech/go.svg" }
    ],
    githubLink: "https://github.com/username/cross-chain-bridge",
    demoLink: "https://bridge.example.com",
    contractAddress: "0x4567890123456789012345678901234567890123",
    tokenId: "0004",
    chain: "MULTI",
    rarity: "Legendary",
    category: "Infrastructure"
  },
  {
    title: "Yield Farming Protocol",
    description: "An innovative yield farming protocol with auto-compounding strategies and risk management. Includes liquidity mining, staking rewards, and governance tokens.",
    imageSrc: "/projects/yield-farming.jpg",
    techStack: [
      { name: "Solidity", icon: "/icons/tech/solidity.svg" },
      { name: "Compound", icon: "/icons/tech/compound.svg" },
      { name: "Uniswap", icon: "/icons/tech/uniswap.svg" },
      { name: "OpenZeppelin", icon: "/icons/tech/openzeppelin.svg" }
    ],
    githubLink: "https://github.com/username/yield-farming",
    demoLink: "https://yield.example.com",
    contractAddress: "0x5678901234567890123456789012345678901234",
    tokenId: "0005",
    chain: "ETH",
    rarity: "Epic",
    category: "DeFi"
  },
  {
    title: "Layer 2 Payment Solution",
    description: "A Layer 2 payment solution built on Optimism with instant transactions and minimal fees. Features include payment channels, batch processing, and merchant integration.",
    imageSrc: "/projects/l2-payments.jpg",
    techStack: [
      { name: "Solidity", icon: "/icons/tech/solidity.svg" },
      { name: "Optimism", icon: "/icons/tech/optimism.svg" },
      { name: "React Native", icon: "/icons/tech/react-native.svg" },
      { name: "Node.js", icon: "/icons/tech/nodejs.svg" }
    ],
    githubLink: "https://github.com/username/l2-payments",
    demoLink: "https://payments.example.com",
    contractAddress: "0x6789012345678901234567890123456789012345",
    tokenId: "0006",
    chain: "OP",
    rarity: "Rare",
    category: "Infrastructure"
  }
];
