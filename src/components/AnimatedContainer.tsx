'use client';

import { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

// Version sans animations pour éviter les erreurs de build
export default function AnimatedContainer({ 
  children, 
  className = ''
}: AnimatedContainerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function FadeInWhenVisible({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function ScaleOnHover({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function FloatingAnimation({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}