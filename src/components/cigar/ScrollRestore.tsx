"use client";

import { useEffect } from "react";

export function ScrollRestore() {
  useEffect(() => {
    // Save scroll position as user scrolls on main page
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      sessionStorage.setItem('mainPageScrollPosition', scrollPosition.toString());
    };
    
    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Restore scroll position when component mounts
    const savedPosition = sessionStorage.getItem('mainPageScrollPosition');
    if (savedPosition) {
      const attemptScroll = (attempts = 0) => {
        if (attempts > 10) return;
        
        const position = parseInt(savedPosition, 10);
        window.scrollTo(0, position);
        
        if (Math.abs(window.scrollY - position) > 10 && attempts < 10) {
          setTimeout(() => attemptScroll(attempts + 1), 50);
        } else {
          sessionStorage.removeItem('mainPageScrollPosition');
        }
      };
      
      setTimeout(() => attemptScroll(), 100);
    }
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return null;
}
