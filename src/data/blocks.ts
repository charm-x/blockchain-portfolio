import { Block, MempoolItem } from '@/types';

export const blocksData: Block[] = [
  {
    title: "Senior Smart Contract Engineer",
    company: "DeFi Protocol Inc.",
    period: "2022 - Present",
    description: "Led the development of a decentralized lending protocol with automated interest rate adjustments. Implemented secure smart contracts with comprehensive test coverage and audit preparation.",
    techStack: [
      { name: "Solidity", icon: "⚙️" },
      { name: "Hardhat", icon: "🔨" },
      { name: "TypeScript", icon: "📝" },
      { name: "Ethers.js", icon: "🔌" }
    ],
    githubLink: "https://github.com",
    demoLink: "https://defiprotocol.com",
    gasUsed: 85,
    confirmations: 12,
    blockHeight: 3,
    blockHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    prevBlockHash: "0x0987654321fedcba0987654321fedcba09876543"
  },
  {
    title: "Blockchain Developer",
    company: "CryptoStartup Labs",
    period: "2021 - 2022",
    description: "Developed NFT marketplace with advanced trading features including auctions, royalties, and cross-chain compatibility. Built custom ERC-721 contracts with gas optimization.",
    techStack: [
      { name: "Solidity", icon: "⚙️" },
      { name: "React", icon: "⚛️" },
      { name: "Web3.js", icon: "🌐" },
      { name: "IPFS", icon: "📦" }
    ],
    githubLink: "https://github.com",
    demoLink: "https://nftmarketplace.com",
    gasUsed: 72,
    confirmations: 8,
    blockHeight: 2,
    blockHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
    prevBlockHash: "0x1987654321fedcba0987654321fedcba09876543"
  },
  {
    title: "Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2020 - 2021",
    description: "Built traditional web applications with modern frameworks. Gained experience in system architecture, database design, and API development that later proved valuable in blockchain development.",
    techStack: [
      { name: "JavaScript", icon: "🟨" },
      { name: "Node.js", icon: "🟢" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Docker", icon: "🐳" }
    ],
    githubLink: "https://github.com",
    gasUsed: 45,
    confirmations: 6,
    isGenesis: true,
    blockHeight: 1,
    blockHash: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
    prevBlockHash: "0x0000000000000000000000000000000000000000"
  }
];

export const mempoolData: MempoolItem[] = [
  {
    title: "Blockchain Protocol Architect",
    timeframe: "Future Goal",
    description: "Design and implement a novel consensus mechanism that improves scalability while maintaining security. Lead a team of engineers to build a new layer-1 blockchain with focus on interoperability.",
    techStack: [
      { name: "Rust", icon: "🦀" },
      { name: "Consensus", icon: "🔄" },
      { name: "Cryptography", icon: "🔐" },
      { name: "Distributed Systems", icon: "🌐" }
    ],
    priority: 10,
    difficulty: 10,
    status: 'planned',
    blockHeight: 10,
    dependencies: ["Advanced Cryptography", "Distributed Systems Mastery"]
  },
  {
    title: "DeFi Protocol Security Auditor",
    timeframe: "2024 - 2025",
    description: "Specialize in smart contract security auditing for major DeFi protocols. Develop automated tools for vulnerability detection and contribute to security standards.",
    techStack: [
      { name: "Security", icon: "🛡️" },
      { name: "Formal Verification", icon: "✅" },
      { name: "Mythril", icon: "🔍" },
      { name: "Slither", icon: "🐍" }
    ],
    priority: 9,
    difficulty: 8,
    status: 'in-progress',
    blockHeight: 8,
    dependencies: ["Advanced Solidity", "Security Patterns"]
  },
  {
    title: "Cross-Chain Bridge Developer",
    timeframe: "2024",
    description: "Build secure and efficient cross-chain bridges enabling seamless asset transfers between different blockchain networks. Focus on minimizing trust assumptions.",
    techStack: [
      { name: "Solidity", icon: "⚙️" },
      { name: "Cosmos SDK", icon: "🌌" },
      { name: "Polkadot", icon: "🔴" },
      { name: "Zero-Knowledge", icon: "🔒" }
    ],
    priority: 8,
    difficulty: 9,
    status: 'pending',
    blockHeight: 6,
    dependencies: ["Multi-chain Architecture", "Cryptographic Protocols"]
  },
  {
    title: "Layer 2 Scaling Solutions Expert",
    timeframe: "2024",
    description: "Deep dive into Layer 2 technologies including optimistic rollups, zk-rollups, and state channels. Contribute to scaling solutions for Ethereum ecosystem.",
    techStack: [
      { name: "Optimism", icon: "🔴" },
      { name: "Arbitrum", icon: "🔵" },
      { name: "Polygon", icon: "🟣" },
      { name: "StarkNet", icon: "⭐" }
    ],
    priority: 7,
    difficulty: 7,
    status: 'pending',
    blockHeight: 5,
    dependencies: ["Ethereum Deep Dive", "Cryptographic Proofs"]
  }
];
