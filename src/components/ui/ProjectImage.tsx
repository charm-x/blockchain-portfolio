'use client';

import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
}

export default function ProjectImage({ src, alt, fallbackSrc }: ProjectImageProps) {
  const [error, setError] = useState(false);

  return (
    <>
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
          onError={() => setError(true)} 
        />
      ) : (
        <img 
          src={fallbackSrc} 
          alt={alt} 
          className="w-16 h-16" 
        />
      )}
    </>
  );
}
