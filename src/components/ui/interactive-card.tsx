import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'gradient';
  hoverScale?: number;
  clickScale?: number;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className,
  href,
  onClick,
  variant = 'default',
  hoverScale = 1.02,
  clickScale = 0.98,
}) => {
  const baseClasses = 'rounded-xl overflow-hidden cursor-pointer focus-ring';
  
  const variantClasses = {
    default: 'bg-card border border-border shadow-md hover:shadow-xl',
    glass: 'backdrop-blur-xl bg-card/80 border border-border/50 shadow-lg hover:shadow-2xl',
    gradient: 'bg-gradient-to-br from-card to-muted border border-border/50 shadow-lg hover:shadow-2xl',
  };

  const Component = href ? motion.a : motion.div;
  const props = href ? { href } : { onClick };

  return (
    <Component
      className={cn(baseClasses, variantClasses[variant], className)}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: clickScale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </Component>
  );
};