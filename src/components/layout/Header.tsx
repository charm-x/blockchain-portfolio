'use client';

import Link from 'next/link';
import BlockchainNavigation from './BlockchainNavigation';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2d2d2d]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-xl font-bold text-white flex items-center">
            <span className="text-[#00ff9d] mr-2">⬢</span>
            <span>BlockDev</span>
          </Link>

          {/* Connect Wallet Button */}
          <button className="bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] text-black font-medium py-2 px-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Connect Wallet
          </button>
        </div>

        {/* Blockchain Explorer Navigation */}
        <BlockchainNavigation />
      </div>
    </header>
  );
}
