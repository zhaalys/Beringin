'use client';

import { useEffect, useRef, useState } from 'react';

export default function LightRays({
  raysOrigin = 'top-center',
  raysColor = '#00ffff',
  raysSpeed = 1.5,
  lightSpread = 0.8,
  rayLength = 1.2,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.1,
  distortion = 0.05,
  className = ''
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      if (!followMouse) return;
      const rect = container.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    container.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      timeRef.current += raysSpeed * 0.01;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate origin point
      let originX, originY;
      const rect = container.getBoundingClientRect();
      
      if (raysOrigin === 'top-center') {
        originX = canvas.width / 2;
        originY = 0;
      } else if (raysOrigin === 'center') {
        originX = canvas.width / 2;
        originY = canvas.height / 2;
      } else if (raysOrigin === 'top-left') {
        originX = 0;
        originY = 0;
      } else if (raysOrigin === 'top-right') {
        originX = canvas.width;
        originY = 0;
      } else {
        originX = canvas.width / 2;
        originY = 0;
      }

      // Apply mouse influence
      if (followMouse) {
        originX += (mousePosRef.current.x - originX) * mouseInfluence;
        originY += (mousePosRef.current.y - originY) * mouseInfluence;
      }

      // Draw rays
      const numRays = 20;
      const angleStep = (Math.PI * 2 * lightSpread) / numRays;
      const startAngle = -Math.PI * lightSpread / 2;

      for (let i = 0; i < numRays; i++) {
        const angle = startAngle + angleStep * i + Math.sin(timeRef.current + i) * distortion;
        const length = canvas.height * rayLength * (1 + Math.sin(timeRef.current * 2 + i) * noiseAmount);
        
        const endX = originX + Math.cos(angle) * length;
        const endY = originY + Math.sin(angle) * length;

        // Create gradient
        const gradient = ctx.createLinearGradient(originX, originY, endX, endY);
        gradient.addColorStop(0, raysColor);
        gradient.addColorStop(0.5, raysColor + '80');
        gradient.addColorStop(1, raysColor + '00');

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = raysColor;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, distortion]);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative ${className}`}
      style={{ overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
}

