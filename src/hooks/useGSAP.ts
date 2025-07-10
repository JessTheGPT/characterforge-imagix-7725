import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGSAP = (
  animationCallback: (ctx: gsap.Context) => void,
  dependencies: any[] = []
) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationCallback(ctx);
    }, containerRef);

    return () => ctx.revert();
  }, dependencies);

  return containerRef;
};

export const useScrollTriggerAnimation = (
  trigger: string,
  animationCallback: () => void,
  options: ScrollTrigger.Vars = {}
) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        
        ScrollTrigger.create({
          trigger,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: animationCallback,
          ...options
        });
      });
    }
  }, [trigger]);
};