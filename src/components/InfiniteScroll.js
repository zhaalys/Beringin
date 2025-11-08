'use client';

import { useState, useEffect, useRef } from 'react';

export default function InfiniteScroll({
  items = [],
  isTilted = false,
  tiltDirection = 'left',
  autoplay = true,
  autoplaySpeed = 0.1,
  autoplayDirection = 'down',
  pauseOnHover = false
}) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!autoplay || isPaused) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (autoplayDirection === 'down') {
        positionRef.current += autoplaySpeed;
        scrollContainer.scrollTop = positionRef.current;
        
        // Reset to top when reaching bottom for seamless loop
        if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 3) {
          positionRef.current = 0;
          scrollContainer.scrollTop = 0;
        }
      } else {
        positionRef.current -= autoplaySpeed;
        scrollContainer.scrollTop = positionRef.current;
        
        // Reset to bottom when reaching top
        if (scrollContainer.scrollTop <= 0) {
          positionRef.current = scrollContainer.scrollHeight / 3;
          scrollContainer.scrollTop = scrollContainer.scrollHeight / 3;
        }
      }
    };

    animationRef.current = setInterval(scroll, 16); // ~60fps

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, autoplayDirection, isPaused]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
      if (scrollRef.current) {
        positionRef.current = scrollRef.current.scrollTop;
      }
    }
  };

  // Duplicate items for seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className="h-full overflow-hidden relative"
      style={{
        transform: isTilted 
          ? tiltDirection === 'left' 
            ? 'skewY(-1deg)' 
            : 'skewY(1deg)'
          : 'none',
        transformOrigin: 'center',
      }}
    >
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="py-4">
          {duplicatedItems.map((item, index) => (
            <div key={index} className="mb-4">
              {item.content}
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient fade effects */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
    </div>
  );
}

