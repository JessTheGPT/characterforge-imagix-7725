import { useState, useEffect } from 'react';

interface Breakpoints {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  '2xl': boolean;
}

export const useResponsive = (): Breakpoints => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      setBreakpoints({
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
        xl: width >= 1280,
        '2xl': width >= 1536,
      });
    };

    updateBreakpoints();
    window.addEventListener('resize', updateBreakpoints);
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpoints;
};

export const useIsMobile = (): boolean => {
  const { md } = useResponsive();
  return !md;
};