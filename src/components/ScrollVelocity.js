'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollVelocity({ 
  texts = ['BERINGIN', 'Scroll Down'],
  velocity = 0,
  className = "custom-scroll-text"
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const lastScrollY = useRef(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateScrollSpeed = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY.current);
      setScrollSpeed(speed);
      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      updateScrollSpeed();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Use provided velocity or calculate from scroll speed
  const effectiveVelocity = velocity !== undefined && velocity > 0 ? velocity : scrollSpeed;

  useEffect(() => {
    if (texts.length <= 1) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Change text based on scroll velocity
    const threshold = 5; // Lower threshold for more responsive changes
    
    if (effectiveVelocity > threshold) {
      // Change text immediately when scrolling starts
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      
      // Then continue changing at intervals while scrolling
      intervalRef.current = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, 800); // Change text every 800ms when scrolling
    } else {
      // Reset to first text when scrolling stops
      setCurrentTextIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [effectiveVelocity, texts.length]);

  const currentText = texts[currentTextIndex] || texts[0];

  return (
    <div className="relative w-full" style={{ overflow: 'visible', position: 'relative' }}>
      <motion.div
        className={className}
        animate={{
          scale: 1 + (effectiveVelocity / 200) * 0.2,
          x: effectiveVelocity > 5 ? [0, 200, -200, 0] : 0,
          y: effectiveVelocity > 5 ? [0, -100, 100, 0] : 0,
          rotate: effectiveVelocity > 5 ? [0, 15, -15, 0] : 0,
        }}
        transition={{ 
          duration: 1.2,
          repeat: effectiveVelocity > 5 ? Infinity : 0,
          ease: "easeInOut"
        }}
        style={{ 
          overflow: 'visible',
          position: 'relative',
          zIndex: 10,
          willChange: 'transform'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentTextIndex}
            initial={{ 
              opacity: 0, 
              y: 150, 
              x: -150, 
              scale: 0.2, 
              rotate: -30,
              filter: 'blur(15px)'
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              x: 0,
              scale: 1, 
              rotate: 0,
              filter: 'blur(0px)'
            }}
            exit={{ 
              opacity: 0, 
              y: -150, 
              x: 150, 
              scale: 0.2, 
              rotate: 30,
              filter: 'blur(15px)'
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="inline-block"
            style={{ 
              transformOrigin: 'center',
              willChange: 'transform',
              position: 'relative',
              zIndex: 10
            }}
          >
            {currentText}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

