'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  className?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  title,
  maxWidth = 'md',
  fullWidth = false,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  className = '',
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Handle mounting on client-side only
  useEffect(() => {
    setMounted(true);
    console.log("Modal component mounted");
    return () => {
      console.log("Modal component unmounted");
      setMounted(false);
    };
  }, []);

  // Handle focus management
  useEffect(() => {
    if (!mounted) return;

    console.log("Modal open state changed:", open);

    if (open) {
      previousActiveElement.current = document.activeElement;
      console.log("Modal opening, previous active element:", previousActiveElement.current);

      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
        console.log("Modal focused");
      }

      // Lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll
      document.body.style.overflow = '';

      // Restore focus when modal closes
      if (previousActiveElement.current && 'focus' in previousActiveElement.current) {
        (previousActiveElement.current as HTMLElement).focus();
        console.log("Focus restored to previous element");
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open, mounted]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!disableEscapeKeyDown && event.key === 'Escape' && open) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disableEscapeKeyDown, onClose, open]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !disableBackdropClick &&
      modalRef.current &&
      event.target instanceof Node &&
      !modalRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  // Max width classes
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  // Don't render anything on the server or if document is not available
  if (!mounted || typeof document === 'undefined') return null;

  // Use portal to render at the root level
  return createPortal(
    <div
      className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-modal="true"
      role="dialog"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          {/* Modal content */}
          <div
            ref={modalRef}
            tabIndex={-1}
            className={`relative transform overflow-hidden rounded-xl bg-[#121212] border-2 border-[#2d2d2d] text-left shadow-xl transition-all animate-scaleIn max-h-[90vh] ${
              maxWidthClasses[maxWidth]
            } ${fullWidth ? 'w-full' : ''} ${className}`}
          >
            {/* NFT Pattern Background */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#00ff9d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none rounded-xl" />

            {/* Content */}
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Subcomponents for MUI-like structure
Modal.Header = function ModalHeader({
  children,
  onClose,
  className = '',
}: {
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <div className={`flex justify-between items-start p-4 relative ${className}`}>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

Modal.Content = function ModalContent({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`px-4 pb-3 relative ${className}`}>{children}</div>;
};

Modal.Actions = function ModalActions({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap justify-end gap-2 px-4 py-3 border-t border-[#2d2d2d] bg-[#0a0a0a]/50 ${className}`}>
      {children}
    </div>
  );
};
