'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Ajouter des écouteurs pour les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .about-icon');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          width: '12px',
          height: '12px',
          background: 'linear-gradient(45deg, var(--accent-color), var(--secondary-color))',
          borderRadius: '50%',
          zIndex: 9999,
          pointerEvents: 'none',
          boxShadow: '0 0 20px var(--accent-color)',
        }}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          backgroundColor: 'var(--secondary-color)',
          opacity: 0.1,
          borderRadius: '50%',
          zIndex: 9998,
          pointerEvents: 'none',
          boxShadow: '0 0 20px var(--secondary-color)',
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }}
      />
    </>
  );
} 