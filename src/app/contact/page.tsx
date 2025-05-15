import ContactForm from "@/components/contact/ContactForm";
import BlockConfirmation from "@/components/ui/BlockConfirmation";

export default function ContactPage() {
  // Generate a pseudo-random transaction hash for the page
  const txHash = "0x" + Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  // Generate a block number
  const blockNumber = Math.floor(Math.random() * 9000000) + 1000000;

  return (
    <div className="px-4 md:px-8 py-8 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] to-transparent z-10" />
        <div className="absolute inset-0 bg-[#121212]/70 z-10" />
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/blockchain-bg.jpg")' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#121212] border border-[#2d2d2d] rounded-lg px-4 py-1 mb-4">
            <span className="text-xs font-mono text-[#00ff9d]">BLOCK #{blockNumber}</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Connect to the Network</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Interested in working together? Have questions about blockchain development?
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Information - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#121212] border border-[#2d2d2d] rounded-xl p-6 relative overflow-hidden group">
              {/* Blockchain pattern background */}
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#00ff9d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Connect With Me</h2>
                  <div className="bg-[#1a1a1a] px-2 py-1 rounded-full text-xs text-[#00ff9d] font-mono">
                    Verified
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg p-4 hover:border-[#00ff9d] transition-colors group/item">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#121212] p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00ff9d]">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-300">Email Address</h3>
                        <a href="mailto:contact@blockdev.com" className="text-white group-hover/item:text-[#00ff9d] transition-colors font-mono text-sm">
                          contact@blockdev.com
                        </a>
                      </div>
                    </div>
                    <div className="pl-9">
                      <BlockConfirmation level={100} showLabel={false} maxBlocks={5} />
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg p-4 hover:border-[#00ff9d] transition-colors group/item">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#121212] p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00ff9d]">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-300">Discord</h3>
                        <p className="text-white font-mono text-sm">
                          blockdev#1234
                        </p>
                      </div>
                    </div>
                    <div className="pl-9">
                      <BlockConfirmation level={90} showLabel={false} maxBlocks={5} />
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg p-4 hover:border-[#00ff9d] transition-colors group/item">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#121212] p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00ff9d]">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-300">Ethereum Address</h3>
                        <div className="flex items-center">
                          <p className="text-white font-mono text-sm">
                            0x1234...5678
                          </p>
                          <button className="ml-2 text-gray-400 hover:text-[#00ff9d]" title="Copy address">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="pl-9">
                      <BlockConfirmation level={100} showLabel={false} maxBlocks={5} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#2d2d2d]">
                  <h3 className="text-sm font-bold mb-4 text-white flex items-center">
                    <span className="bg-[#1a1a1a] px-2 py-1 rounded-full text-xs text-[#00ff9d] font-mono mr-2">
                      NETWORK
                    </span>
                    Follow On-Chain
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1a1a1a] border border-[#2d2d2d] p-3 rounded-lg text-gray-400 hover:text-[#00ff9d] hover:border-[#00ff9d] transition-all flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1a1a1a] border border-[#2d2d2d] p-3 rounded-lg text-gray-400 hover:text-[#00ff9d] hover:border-[#00ff9d] transition-all flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1a1a1a] border border-[#2d2d2d] p-3 rounded-lg text-gray-400 hover:text-[#00ff9d] hover:border-[#00ff9d] transition-all flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a
                      href="https://medium.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1a1a1a] border border-[#2d2d2d] p-3 rounded-lg text-gray-400 hover:text-[#00ff9d] hover:border-[#00ff9d] transition-all flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <path d="M21 15l-5-5L5 21"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction details */}
            <div className="bg-[#121212] border border-[#2d2d2d] rounded-xl p-5">
              <h3 className="text-sm font-bold mb-3 text-white flex items-center">
                <span className="bg-[#1a1a1a] px-2 py-1 rounded-full text-xs text-[#00ff9d] font-mono mr-2">
                  TX
                </span>
                Transaction Details
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Transaction Hash:</span>
                  <span className="text-xs font-mono text-white truncate">{txHash}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Status:</span>
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#00ff9d] mr-2"></span>
                    <span className="text-xs font-mono text-white">Success</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Block:</span>
                  <span className="text-xs font-mono text-white">{blockNumber}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Timestamp:</span>
                  <span className="text-xs font-mono text-white">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-[#121212] border-2 border-[#2d2d2d] rounded-xl p-6 relative overflow-hidden">
              {/* Blockchain pattern background */}
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#00ff9d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="bg-[#1a1a1a] px-2 py-1 rounded-full text-xs text-[#00ff9d] font-mono mr-2">
                      NEW
                    </span>
                    Create Transaction
                  </h2>
                  <div className="bg-[#1a1a1a] px-3 py-1 rounded-full text-xs text-[#00ff9d] font-mono flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#00ff9d] mr-2 animate-pulse"></span>
                    Pending
                  </div>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
