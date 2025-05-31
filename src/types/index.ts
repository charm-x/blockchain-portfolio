// Core shared types for the blockchain portfolio application

export interface TechStack {
  name: string;
  icon: string; // Path to SVG icon or emoji
}

export interface Block {
  title: string;
  company: string;
  period: string;
  description: string;
  techStack: TechStack[];
  githubLink?: string;
  demoLink?: string;
  gasUsed?: number;
  confirmations?: number;
  isGenesis?: boolean;
  blockHash?: string;
  prevBlockHash?: string;
  blockHeight?: number;
}

export interface Project {
  title: string;
  description: string;
  imageSrc?: string;
  techStack: TechStack[];
  githubLink?: string;
  demoLink?: string;
  contractAddress?: string;
  tokenId?: string;
  chain?: string;
  rarity?: string;
  category: string;
}

export interface MempoolItem {
  title: string;
  timeframe?: string;
  description: string;
  techStack: TechStack[];
  priority?: number;
  difficulty?: number;
  status?: 'pending' | 'in-progress' | 'planned';
  blockHeight?: number;
  dependencies?: string[];
}

export interface NavigationItem {
  name: string;
  path: string;
  blockHeight: number;
  hash: string;
  gasPrice: string;
  txCount: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  socialLinks?: SocialLink[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  availability: string;
  preferredContact: string[];
}

// Filter and sorting types
export type ProjectFilter = 'All' | 'DeFi' | 'NFT' | 'DAO' | 'Infrastructure';
export type MempoolSortBy = 'priority' | 'difficulty' | 'status';
export type MempoolFilterStatus = 'all' | 'pending' | 'in-progress' | 'planned';
