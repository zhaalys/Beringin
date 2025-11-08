'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RotatingText({
  texts = ['BERINGIN', 'Komunitas', 'Terhubung', 'Informasi'],
  mainClassName = "px-2 sm:px-2 md:px-3 bg-green-500 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg",
  staggerFrom = "last",
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  staggerDuration = 0.025,
  splitLevelClassName = "overflow-hidden pb-0.5 sm:pb-1 md:pb-1",
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 2000
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const currentText = texts[currentIndex];
  const chars = currentText.split('');

  const getStaggerDelay = (index) => {
    if (staggerFrom === "last") {
      return (chars.length - 1 - index) * staggerDuration;
    }
    return index * staggerDuration;
  };

  return (
    <div className={`flex items-center ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex"
        >
          {chars.map((char, index) => (
            <div key={`${currentIndex}-${index}`} className={splitLevelClassName}>
              <motion.span
                custom={index}
                variants={{
                  initial: initial,
                  animate: animate,
                  exit: exit
                }}
                transition={{
                  ...transition,
                  delay: getStaggerDelay(index)
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

