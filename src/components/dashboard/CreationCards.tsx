import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Video, User, Zap } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/interactive-card';
import { Button } from '@/components/ui/button';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import { cn } from '@/lib/utils';

interface CreationCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  actions: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
  color: 'blue' | 'yellow';
  className?: string;
}

const CreationCard: React.FC<CreationCardProps> = ({
  title,
  subtitle,
  icon,
  actions,
  color,
  className,
}) => {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-brand-blue to-brand-blue-hover',
    yellow: 'bg-gradient-to-br from-brand-yellow to-brand-yellow-hover',
  };

  return (
    <InteractiveCard
      variant="glass"
      className={cn('p-8 h-80 flex flex-col', colorClasses[color], className)}
    >
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center text-center mb-6">
        <div className="mb-4 p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm leading-relaxed max-w-48">
          {subtitle}
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            variant={action.variant === 'secondary' ? 'outline' : 'default'}
            size="sm"
            className={cn(
              'h-12 gap-2 text-xs font-semibold',
              action.variant === 'secondary'
                ? 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                : 'bg-black/80 text-white hover:bg-black/90'
            )}
          >
            {action.icon}
            <span className="truncate">{action.label}</span>
          </Button>
        ))}
      </div>
    </InteractiveCard>
  );
};

export const CreationCards: React.FC = () => {
  const imageActions = [
    {
      label: 'Create Image',
      icon: <Plus className="h-4 w-4" />,
      onClick: () => console.log('Create image'),
    },
    {
      label: 'Edit Image',
      icon: <Edit className="h-4 w-4" />,
      onClick: () => console.log('Edit image'),
      variant: 'secondary' as const,
    },
  ];

  const storyActions = [
    {
      label: 'Consistent Character',
      icon: <User className="h-4 w-4" />,
      onClick: () => console.log('Consistent character'),
    },
    {
      label: 'Image To Video',
      icon: <Video className="h-4 w-4" />,
      onClick: () => console.log('Image to video'),
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <MotionWrapper type="slideUp" className="text-center">
        <h1 className="text-display-lg font-bold text-foreground mb-4">
          What would you like to create?
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose from our powerful AI tools to bring your creative vision to life
        </p>
      </MotionWrapper>

      {/* Creation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <MotionWrapper type="slideUp" delay={0.2}>
          <CreationCard
            title="Image"
            subtitle="Create stunning AI-generated images from text descriptions"
            icon={
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
            }
            actions={imageActions}
            color="blue"
          />
        </MotionWrapper>

        <MotionWrapper type="slideUp" delay={0.4}>
          <CreationCard
            title="Storytelling"
            subtitle="Create consistent characters and transform images into videos"
            icon={
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-black/60 flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
            }
            actions={storyActions}
            color="yellow"
          />
        </MotionWrapper>
      </div>

      {/* Quick Starts Section */}
      <MotionWrapper type="slideUp" delay={0.6}>
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Quick starts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Portrait Style', image: '👤' },
              { label: 'Landscape Art', image: '🏔️' },
              { label: 'Product Shot', image: '📦' },
            ].map((item, index) => (
              <InteractiveCard
                key={index}
                variant="glass"
                className="p-6 text-center cursor-pointer"
              >
                <div className="text-4xl mb-3">{item.image}</div>
                <p className="font-medium text-foreground">{item.label}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
};