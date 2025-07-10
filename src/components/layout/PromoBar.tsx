import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const PromoBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-promo text-promo-foreground relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-center">
              Limited-time offer! Unlock a year of limitless creativity with all annual plans at 50% off.
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              View Plan
            </Button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close promo"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};