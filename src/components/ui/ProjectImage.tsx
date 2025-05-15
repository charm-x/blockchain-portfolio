'use client';

import { useState } from 'react';
import Image from 'next/image';

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
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
          width={400}
          height={300}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Image
          src={fallbackSrc}
          alt={alt}
          className="w-16 h-16"
          width={64}
          height={64}
        />
      )}
    </>
  );
}
