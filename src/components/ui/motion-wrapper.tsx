import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  type?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
  className?: string;
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
  },
  slideRight: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  none: {
    initial: {},
    animate: {},
    exit: {}
  }
};

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  type = 'fadeIn',
  className,
  ...props
}) => {
  const animation = animations[type];

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};