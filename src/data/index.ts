// Central data access layer - exports all data and utility functions

// Data exports
export { navigationItems } from './navigation';
export { personalInfo, contactInfo } from './personal';
export { blocksData, mempoolData } from './blocks';
export { projectsData } from './projects';
export { skillsData } from './skills';

// Re-export types for convenience
export type {
  TechStack,
  Block,
  Project,
  MempoolItem,
  NavigationItem,
  SkillCategory,
  Skill,
  PersonalInfo,
  ContactInfo,
  SocialLink,
  ProjectFilter,
  MempoolSortBy,
  MempoolFilterStatus
} from '@/types';

// Utility functions
import { Block, Project, MempoolItem, ProjectFilter, MempoolFilterStatus, MempoolSortBy } from '@/types';
import { blocksData, mempoolData } from './blocks';
import { projectsData } from './projects';

/**
 * Get all blocks data
 */
export const getBlocks = (): Block[] => {
  return blocksData;
};

/**
 * Get a specific block by index
 */
export const getBlock = (index: number): Block | undefined => {
  return blocksData[index];
};

/**
 * Get all mempool items
 */
export const getMempoolItems = (): MempoolItem[] => {
  return mempoolData;
};

/**
 * Filter mempool items by status
 */
export const filterMempoolByStatus = (status: MempoolFilterStatus): MempoolItem[] => {
  if (status === 'all') return mempoolData;
  return mempoolData.filter(item => item.status === status);
};

/**
 * Sort mempool items
 */
export const sortMempoolItems = (items: MempoolItem[], sortBy: MempoolSortBy): MempoolItem[] => {
  return [...items].sort((a, b) => {
    if (sortBy === 'priority') {
      return (b.priority || 5) - (a.priority || 5);
    } else if (sortBy === 'difficulty') {
      return (b.difficulty || 5) - (a.difficulty || 5);
    } else if (sortBy === 'status') {
      const statusOrder = { 'in-progress': 0, 'pending': 1, 'planned': 2 };
      return statusOrder[a.status || 'pending'] - statusOrder[b.status || 'pending'];
    }
    return 0;
  });
};

/**
 * Get all projects
 */
export const getProjects = (): Project[] => {
  return projectsData;
};

/**
 * Filter projects by category
 */
export const filterProjectsByCategory = (filter: ProjectFilter): Project[] => {
  if (filter === 'All') return projectsData;
  
  return projectsData.filter(project => {
    return project.category === filter || project.title.includes(filter);
  });
};

/**
 * Get unique project categories
 */
export const getProjectCategories = (): string[] => {
  const categories = new Set(projectsData.map(project => project.category));
  return Array.from(categories);
};

/**
 * Calculate average difficulty for mempool items
 */
export const getAverageMempoolDifficulty = (): number => {
  const total = mempoolData.reduce((sum, item) => sum + (item.difficulty || 5), 0);
  return Math.round(total / mempoolData.length);
};

/**
 * Get mempool statistics
 */
export const getMempoolStats = () => {
  const total = mempoolData.length;
  const inProgress = mempoolData.filter(item => item.status === 'in-progress').length;
  const pending = mempoolData.filter(item => item.status === 'pending').length;
  const planned = mempoolData.filter(item => item.status === 'planned').length;
  const avgDifficulty = getAverageMempoolDifficulty();
  
  return {
    total,
    inProgress,
    pending,
    planned,
    avgDifficulty
  };
};
