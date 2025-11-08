'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300 relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/50 to-transparent rounded-bl-full"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function CardSwap({
  children,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const cards = Array.isArray(children) ? children : [children];
  const totalCards = cards.length;

  useEffect(() => {
    if (totalCards <= 1 || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalCards, delay, isPaused]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const getCardStyle = (index) => {
    const offset = (index - currentIndex + totalCards) % totalCards;
    const isActive = offset === 0;
    const isNext = offset === 1;
    const isPrevious = offset === totalCards - 1;

    if (isActive) {
      return {
        zIndex: totalCards,
        scale: 1,
        y: 0,
        x: 0,
        opacity: 1,
      };
    } else if (isNext) {
      return {
        zIndex: totalCards - 1,
        scale: 0.95,
        y: verticalDistance,
        x: cardDistance,
        opacity: 0.8,
      };
    } else if (isPrevious) {
      return {
        zIndex: totalCards - 2,
        scale: 0.95,
        y: -verticalDistance,
        x: -cardDistance,
        opacity: 0.8,
      };
    } else {
      return {
        zIndex: 0,
        scale: 0.9,
        y: 0,
        x: 0,
        opacity: 0.3,
      };
    }
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="sync">
        {cards.map((card, index) => {
          const style = getCardStyle(index);
          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                scale: style.scale,
                y: style.y,
                x: style.x,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="absolute w-full max-w-2xl mx-auto px-4"
            >
              {card}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

