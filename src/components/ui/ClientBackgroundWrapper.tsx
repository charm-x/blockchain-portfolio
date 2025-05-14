'use client';

import dynamic from 'next/dynamic';

// Dynamically import the AnimatedBlockchainBackground component with SSR disabled
// This ensures it only runs on the client side
const AnimatedBlockchainBackground = dynamic(
  () => import('@/components/ui/AnimatedBlockchainBackground'),
  { ssr: false }
);

export default function ClientBackgroundWrapper() {
  return <AnimatedBlockchainBackground />;
}
