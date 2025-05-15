import Link from "next/link";
import Button from "@/components/ui/Button";
import ProjectImage from "@/components/ui/ProjectImage";
import BlockConfirmation from "@/components/ui/BlockConfirmation";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4 md:px-8">
      {/* Hero Section */}
      <section className="py-20 md:py-32 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="relative w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#00ff9d] glow-effect">
            <Image
              src="/images/profile.jpg"
              alt="Blockchain Developer Profile"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]/30 pointer-events-none" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Blockchain Developer</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gray-300">
            Smart Contract Engineer. dApp Builder. On-Chain Craftsman.
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Building the decentralized future with secure smart contracts,
            innovative dApps, and blockchain solutions that push the boundaries of what&apos;s possible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/projects" variant="primary" size="lg" className="glow-effect">
              View My Work
            </Button>
            <Button href="/blocks" variant="outline" size="lg">
              Explore Blocks
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 border-t border-[#2d2d2d]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
            <Link href="/projects" className="text-[#00ff9d] hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#121212] hover:border-[#00ff9d] transition-all duration-300">
              <div className="relative h-48 w-full bg-[#1a1a1a] flex items-center justify-center">
                <ProjectImage
                  src="/projects/defi-swap.jpg"
                  alt="DeFi Swap Protocol"
                  fallbackSrc="/icons/tech/solidity.svg"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">DeFi Swap Protocol</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <Image src="/icons/tech/solidity.svg" alt="Solidity" width={16} height={16} className="mr-1" />
                    Solidity
                  </div>
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <Image src="/icons/tech/react.svg" alt="React" width={16} height={16} className="mr-1" />
                    React
                  </div>
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <Image src="/icons/tech/hardhat.svg" alt="Hardhat" width={16} height={16} className="mr-1" />
                    Hardhat
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Decentralized token swap protocol with automated market making and liquidity pools.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#121212] hover:border-[#00ff9d] transition-all duration-300">
              <div className="relative h-48 w-full bg-[#1a1a1a] flex items-center justify-center">
                <ProjectImage
                  src="/projects/nft-marketplace.jpg"
                  alt="NFT Marketplace"
                  fallbackSrc="/icons/tech/ipfs.svg"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">NFT Marketplace</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <Image src="/icons/tech/solidity.svg" alt="Solidity" width={16} height={16} className="mr-1" />
                    Solidity
                  </div>
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <Image src="/icons/tech/nextjs.svg" alt="Next.js" width={16} height={16} className="mr-1" />
                    Next.js
                  </div>
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <Image src="/icons/tech/ipfs.svg" alt="IPFS" width={16} height={16} className="mr-1" />
                    IPFS
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Decentralized NFT marketplace with minting, trading, and auction capabilities.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#121212] hover:border-[#00ff9d] transition-all duration-300">
              <div className="relative h-48 w-full bg-[#1a1a1a] flex items-center justify-center">
                <ProjectImage
                  src="/projects/multi-sig.jpg"
                  alt="Multi-Sig Wallet"
                  fallbackSrc="/icons/tech/ethereum.svg"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">Multi-Sig Wallet</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <Image src="/icons/tech/solidity.svg" alt="Solidity" width={16} height={16} className="mr-1" />
                    Solidity
                  </div>
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <Image src="/icons/tech/typescript.svg" alt="TypeScript" width={16} height={16} className="mr-1" />
                    TypeScript
                  </div>
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-md text-xs flex items-center">
                    <Image src="/icons/tech/ethers.svg" alt="Ethers.js" width={16} height={16} className="mr-1" />
                    Ethers.js
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Secure multi-signature wallet requiring multiple approvals for transactions.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 border-t border-[#2d2d2d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Skills & Technologies</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Skill Category 1 */}
            <div className="border border-[#2d2d2d] rounded-lg p-6 bg-[#121212]">
              <h3 className="text-xl font-bold mb-4 text-[#00ff9d]">Smart Contracts</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/solidity.svg" alt="Solidity" width={20} height={20} className="mr-2" />
                    <span>Solidity</span>
                  </div>
                  <BlockConfirmation level={95} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/erc.svg" alt="ERC Standards" width={20} height={20} className="mr-2" />
                    <span>ERC Standards</span>
                  </div>
                  <BlockConfirmation level={90} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/openzeppelin.svg" alt="OpenZeppelin" width={20} height={20} className="mr-2" />
                    <span>OpenZeppelin</span>
                  </div>
                  <BlockConfirmation level={85} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/gas.svg" alt="Gas Optimization" width={20} height={20} className="mr-2" />
                    <span>Gas Optimization</span>
                  </div>
                  <BlockConfirmation level={80} />
                </li>
              </ul>
            </div>

            {/* Skill Category 2 */}
            <div className="border border-[#2d2d2d] rounded-lg p-6 bg-[#121212]">
              <h3 className="text-xl font-bold mb-4 text-[#00ff9d]">Development</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/hardhat.svg" alt="Hardhat" width={20} height={20} className="mr-2" />
                    <span>Hardhat</span>
                  </div>
                  <BlockConfirmation level={90} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/truffle.svg" alt="Truffle" width={20} height={20} className="mr-2" />
                    <span>Truffle</span>
                  </div>
                  <BlockConfirmation level={75} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/ethers.svg" alt="Ethers.js" width={20} height={20} className="mr-2" />
                    <span>Ethers.js</span>
                  </div>
                  <BlockConfirmation level={85} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/web3.svg" alt="Web3.js" width={20} height={20} className="mr-2" />
                    <span>Web3.js</span>
                  </div>
                  <BlockConfirmation level={70} />
                </li>
              </ul>
            </div>

            {/* Skill Category 3 */}
            <div className="border border-[#2d2d2d] rounded-lg p-6 bg-[#121212]">
              <h3 className="text-xl font-bold mb-4 text-[#00ff9d]">Frontend</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/react.svg" alt="React" width={20} height={20} className="mr-2" />
                    <span>React</span>
                  </div>
                  <BlockConfirmation level={80} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/nextjs.svg" alt="Next.js" width={20} height={20} className="mr-2" />
                    <span>Next.js</span>
                  </div>
                  <BlockConfirmation level={75} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/typescript.svg" alt="TypeScript" width={20} height={20} className="mr-2" />
                    <span>TypeScript</span>
                  </div>
                  <BlockConfirmation level={65} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/tailwind.svg" alt="Tailwind CSS" width={20} height={20} className="mr-2" />
                    <span>Tailwind CSS</span>
                  </div>
                  <BlockConfirmation level={80} />
                </li>
              </ul>
            </div>

            {/* Skill Category 4 */}
            <div className="border border-[#2d2d2d] rounded-lg p-6 bg-[#121212]">
              <h3 className="text-xl font-bold mb-4 text-[#00ff9d]">Blockchain</h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/ethereum.svg" alt="Ethereum" width={20} height={20} className="mr-2" />
                    <span>Ethereum</span>
                  </div>
                  <BlockConfirmation level={95} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/polygon.svg" alt="Polygon" width={20} height={20} className="mr-2" />
                    <span>Polygon</span>
                  </div>
                  <BlockConfirmation level={85} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/bsc.svg" alt="BSC" width={20} height={20} className="mr-2" />
                    <span>BSC</span>
                  </div>
                  <BlockConfirmation level={70} />
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Image src="/icons/tech/layer2.svg" alt="Layer 2 Solutions" width={20} height={20} className="mr-2" />
                    <span>Layer 2 Solutions</span>
                  </div>
                  <BlockConfirmation level={80} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center border-t border-[#2d2d2d]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-lg text-gray-400 mb-10">
            Let&apos;s collaborate on your next blockchain project and bring your vision to life.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="glow-effect">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
