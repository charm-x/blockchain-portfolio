import { PersonalInfo, ContactInfo } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Blockchain Developer',
  title: 'Blockchain Developer',
  subtitle: 'Smart Contract Engineer. dApp Builder. On-Chain Craftsman.',
  description: 'Building the decentralized future with secure smart contracts, innovative dApps, and blockchain solutions that push the boundaries of what\'s possible.',
  profileImage: '/images/profile.jpg',
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: '/icons/social/github.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: '/icons/social/linkedin.svg'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: '/icons/social/twitter.svg'
    }
  ]
};

export const contactInfo: ContactInfo = {
  email: 'hello@blockchaindev.com',
  location: 'Remote / Global',
  availability: 'Available for new opportunities',
  preferredContact: ['Email', 'LinkedIn', 'Discord']
};
