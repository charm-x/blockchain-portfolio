import { NavigationItem } from '@/types';

export const navigationItems: NavigationItem[] = [
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
