'use client';

// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// Font used - https://compressa.preusstype.com/
// Note: Make sure the font you're using supports all the variable properties. 
// React Bits does not take responsibility for the fonts used

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Helper function to adjust color brightness
const adjustColorBrightness = (hex, factor) => {
  if (!hex || !hex.startsWith('#')) return hex;
  const num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return hex;
  const r = Math.min(255, Math.max(0, Math.floor((num >> 16) * factor)));
  const g = Math.min(255, Math.max(0, Math.floor(((num >> 8) & 0x00FF) * factor)));
  const b = Math.min(255, Math.max(0, Math.floor((num & 0x0000FF) * factor)));
  return `rgb(${r}, ${g}, ${b})`;
};

export default function TextPressure({ 
  text = "BERINGIN",
  textColor = "#10b981",
  strokeColor = "#059669",
  minFontSize = 120,
  flex = true,
  alpha = false,
  stroke = false,
  width = true,
  weight = true,
  italic = false
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      
      drawText(w, h, mousePos, isHovered);
    };

    const drawText = (w, h, mouse = { x: 0.5, y: 0.5 }, hovered = false) => {
      ctx.clearRect(0, 0, w, h);
      
      // Calculate font size based on container width with interactive pressure
      const baseFontSize = Math.max(minFontSize, w / (text.length * 0.6));
      
      // Add pressure effect based on mouse position
      const pressureX = (mouse.x - 0.5) * 0.3; // -0.15 to 0.15
      const pressureY = (mouse.y - 0.5) * 0.3;
      const pressure = Math.sqrt(pressureX * pressureX + pressureY * pressureY);
      
      // Adjust font properties based on pressure and hover
      const fontSize = baseFontSize * (1 + (hovered ? pressure * 0.1 : 0));
      const weightMultiplier = hovered ? 1 + pressure * 0.2 : 1;
      
      ctx.textAlign = 'center';
      // Use 'middle' baseline for centered text rendering
      ctx.textBaseline = 'middle';
      
      // Offset text position based on mouse pressure
      const x = w / 2 + pressureX * 20;
      // Position text in the middle vertically with enough padding from top
      // Account for font size to ensure text doesn't get cut off
      const y = h * 0.55 + pressureY * 20;
      
      // Build font string with variable properties
      let fontStyle = italic ? 'italic' : 'normal';
      let fontWeight = weight ? Math.floor(900 * weightMultiplier) : 400;
      
      const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
      
      // Create dynamic gradient based on mouse position
      const gradientX = mouse.x * w;
      const gradientY = mouse.y * h;
      const gradient = ctx.createRadialGradient(gradientX, gradientY, 0, x, y, fontSize * 2);
      
      // Adjust colors based on hover and pressure
      const intensity = hovered ? 1 + pressure * 0.3 : 1;
      const lightColor = adjustColorBrightness(textColor, intensity);
      const darkColor = adjustColorBrightness(strokeColor, intensity);
      
      gradient.addColorStop(0, lightColor);
      gradient.addColorStop(0.5, darkColor);
      gradient.addColorStop(1, lightColor);
      
      // Apply alpha if needed
      if (alpha) {
        ctx.globalAlpha = 0.8;
      }
      
      // Draw stroke if enabled
      if (stroke) {
        ctx.strokeStyle = darkColor;
        ctx.lineWidth = fontSize * 0.03 * (1 + pressure);
        ctx.strokeText(text, x, y);
      }
      
      // Draw filled text with gradient
      ctx.fillStyle = gradient;
      ctx.fillText(text, x, y);
      
      // Add glow effect on hover
      if (hovered) {
        ctx.shadowColor = textColor;
        ctx.shadowBlur = 30 * (1 + pressure);
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;
      }
      
      // Reset alpha
      if (alpha) {
        ctx.globalAlpha = 1.0;
      }
    };

    // Animation loop
    const animate = () => {
      const rect = container.getBoundingClientRect();
      drawText(rect.width, rect.height, mousePos, isHovered);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePos({ x: 0.5, y: 0.5 });
    };

    // Mouse enter handler
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    // Initial resize
    resizeCanvas();
    
    // Start animation loop
    animate();
    
    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Resize observer for better performance
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    resizeObserver.observe(container);
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [text, textColor, strokeColor, minFontSize, stroke, width, weight, italic, alpha, flex, mousePos, isHovered]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        display: flex ? 'flex' : 'block',
        alignItems: flex ? 'center' : 'initial',
        justifyContent: flex ? 'center' : 'initial',
        cursor: 'pointer'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </motion.div>
  );
}
