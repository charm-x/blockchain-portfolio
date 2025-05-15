'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isOnChain, setIsOnChain] = useState(false);

  // Generate a pseudo-random gas price
  const gasPrice = Math.floor(Math.random() * 100) + 20; // 20-120 gwei
  const gasLimit = 150000;
  const estimatedCost = ((gasPrice * gasLimit) / 1e9).toFixed(6);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      // In a real application, you would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Message Type Toggle */}
      <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-2 mb-4">
        <button
          type="button"
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            !isOnChain
              ? 'bg-[#121212] text-[#00ff9d] shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setIsOnChain(false)}
        >
          Standard Message
        </button>
        <button
          type="button"
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            isOnChain
              ? 'bg-[#121212] text-[#00ff9d] shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setIsOnChain(true)}
        >
          On-Chain Message
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              From
            </label>
            <span className="text-xs text-gray-500 font-mono">required</span>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00ff9d] focus:border-[#00ff9d] text-white font-mono text-sm"
            placeholder="Your name"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Reply Address
            </label>
            <span className="text-xs text-gray-500 font-mono">required</span>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00ff9d] focus:border-[#00ff9d] text-white font-mono text-sm"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Message Data
            </label>
            <span className="text-xs text-gray-500 font-mono">required</span>
          </div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00ff9d] focus:border-[#00ff9d] text-white font-mono text-sm resize-none"
            placeholder="Your message..."
          />
          <div className="mt-1 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {formData.message.length} bytes
            </div>
            <div className="text-xs text-gray-500">
              Max 1500 bytes
            </div>
          </div>
        </div>
      </div>

      {/* On-Chain Transaction Details */}
      {isOnChain && (
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Gas Price:</span>
            <span className="text-xs font-mono text-white">{gasPrice} Gwei</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Gas Limit:</span>
            <span className="text-xs font-mono text-white">{gasLimit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center border-t border-[#2d2d2d] pt-2">
            <span className="text-xs text-gray-400">Estimated Cost:</span>
            <span className="text-xs font-mono text-[#00ff9d]">{estimatedCost} ETH</span>
          </div>
        </div>
      )}

      {/* Submit Button and Status */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-gradient-to-r from-[#00ff9d] to-[#00c3ff] text-black font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isOnChain ? 'Confirming...' : 'Sending...'}
            </>
          ) : (
            <>
              {isOnChain ? (
                <>
                  <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  Sign & Send
                </>
              ) : (
                'Send Message'
              )}
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="bg-[#121212] border border-green-800 text-green-400 text-sm px-3 py-1 rounded-lg flex items-center">
            <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            {isOnChain ? 'Transaction confirmed!' : 'Message sent!'}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-[#121212] border border-red-800 text-red-400 text-sm px-3 py-1 rounded-lg flex items-center">
            <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {isOnChain ? 'Transaction failed!' : 'Message failed!'}
          </div>
        )}
      </div>

      {/* Form Footer */}
      <div className="mt-6 pt-4 border-t border-[#2d2d2d]">
        <div className="text-xs text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00ff9d] mr-1">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          {isOnChain
            ? 'On-chain messages are stored permanently on the Ethereum blockchain'
            : 'Your information is encrypted and never shared with third parties'}
        </div>
      </div>
    </form>
  );
}
