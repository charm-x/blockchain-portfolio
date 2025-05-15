'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
};

export default function Select({
  options,
  value,
  onChange,
  label,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const selectRef = useRef<HTMLDivElement>(null);

  // Find the selected option label and index
  const selectedOption = options.find(option => option.value === value);
  const selectedIndex = options.findIndex(option => option.value === value);

  // Reset highlighted index when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : 0);
    }
  }, [isOpen, selectedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev < options.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (options[highlightedIndex]) {
          onChange(options[highlightedIndex].value);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
        staggerChildren: 0.03
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: 'easeIn'
      }
    }
  };

  // Option item animation variants
  const optionVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.15,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Label */}
      {label && (
        <span className="text-gray-400 mr-2 text-xs">{label}</span>
      )}

      {/* Select trigger */}
      <div
        className={`flex items-center justify-between bg-[#121212] rounded-md p-2 cursor-pointer border border-[#2d2d2d] hover:border-[#3d3d3d] transition-all ${
          isOpen ? 'border-[#00c3ff]/50 shadow-[0_0_8px_rgba(0,195,255,0.3)]' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? "select-dropdown" : undefined}
      >
        <span className={`text-xs ${isOpen ? 'text-[#00c3ff]' : 'text-white'}`}>
          {selectedOption?.label || 'Select...'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#00c3ff]' : 'text-gray-400'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-10 mt-1 w-full bg-[#121212] border border-[#2d2d2d] rounded-md shadow-lg overflow-hidden backdrop-blur-sm"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              boxShadow: '0 4px 12px rgba(0, 195, 255, 0.15)',
              backgroundImage: 'linear-gradient(to right, rgba(0, 195, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 195, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
            id="select-dropdown"
            role="listbox"
          >
            <div className="max-h-60 overflow-auto py-1">
              {options.map((option, index) => (
                <motion.div
                  key={option.value}
                  variants={optionVariants}
                  className={`px-3 py-2 text-xs cursor-pointer transition-all relative ${
                    option.value === value
                      ? 'bg-[#1a1a1a] text-[#00ff9d] border-l-2 border-[#00ff9d]'
                      : index === highlightedIndex
                        ? 'bg-[#1a1a1a]/70 text-white border-l-2 border-[#00c3ff]/50'
                        : 'text-white hover:bg-[#1a1a1a] hover:border-l-2 hover:border-[#00c3ff]/50'
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  role="option"
                  aria-selected={option.value === value}
                >
                  <div className="flex items-center">
                    {option.value === value && (
                      <span className="mr-1.5 text-[#00ff9d] opacity-80">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                    {option.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
