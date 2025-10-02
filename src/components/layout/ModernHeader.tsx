import React from 'react';
import { motion } from 'framer-motion';
import { User, Plus, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/useResponsive';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ModernHeaderProps {
  isAuthenticated: boolean;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
  onCreateClick?: () => void;
}

export const ModernHeader: React.FC<ModernHeaderProps> = ({
  isAuthenticated,
  onSignIn,
  onSignUp,
  onSignOut,
  onCreateClick,
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              PhotoMe AI
            </span>
          </motion.div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Create Button */}
                <Button
                  onClick={onCreateClick}
                  variant="gradient"
                  size={isMobile ? "sm" : "default"}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {!isMobile && "Create"}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => navigate('/settings')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => navigate('/settings')}
                    >
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={onSignIn}
                  variant="ghost"
                  size={isMobile ? "sm" : "default"}
                >
                  Sign In
                </Button>
                <Button
                  onClick={onSignUp}
                  variant="default"
                  size={isMobile ? "sm" : "default"}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};