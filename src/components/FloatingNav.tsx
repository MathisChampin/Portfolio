'use client';

import { useEffect, useState, ReactNode } from 'react';
import { FiUser, FiCpu, FiFolder, FiMail } from 'react-icons/fi';
import { useNavigation } from '../context/NavigationContext';

interface NavBubble {
  id: string;
  name: string;
  icon: ReactNode;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
  type: 'nav';
}

interface DecorativeBubble {
  id: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
  type: 'decorative';
  opacity: number;
}

type Bubble = NavBubble | DecorativeBubble;

export default function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
  const [entering, setEntering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { setShowNavbar, showBubbles, setShowBubbles } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowNavbar(false);
    setHidden(false);
    return () => setShowNavbar(true);
  }, [setShowNavbar]);

  useEffect(() => {
    if (showBubbles) {
      setHidden(false);
    }
  }, [showBubbles]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'aboutme-section') {
      setActiveBubble(sectionId);
      setEntering(true);

      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 1000); // Ajout d'un délai pour laisser l'animation se dérouler

        setTimeout(() => {
          setHidden(true);
          setShowBubbles(false);
          setShowNavbar(true);
          setEntering(false);
          setActiveBubble(null);
        }, 1000);
      }
    } 
    else if (sectionId === 'skills-section') {
      setActiveBubble(sectionId);
      setEntering(true);

      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 1000);

        setTimeout(() => {
          setHidden(true);
          setShowBubbles(false);
          setShowNavbar(true);
          setEntering(false);
          setActiveBubble(null);
        }, 1000);
      }
    } else if (sectionId === 'projects-section') {
      setActiveBubble(sectionId);
      setEntering(true);

      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 1000);

        setTimeout(() => {
          setHidden(true);
          setShowBubbles(false);
          setShowNavbar(true);
          setEntering(false);
          setActiveBubble(null);
        }, 1000);
      }
    }else if (sectionId === 'contact-section') {
      setActiveBubble(sectionId);
      setEntering(true);

      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 400);

        setTimeout(() => {
          setHidden(true);
          setShowBubbles(false);
          setShowNavbar(true);
          setEntering(false);
          setActiveBubble(null);
        }, 1000);
      }
    }
    else {
      setActiveBubble(sectionId);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems: NavBubble[] = [
    { 
      id: 'aboutme-section',
      name: 'About',
      icon: <FiUser />,
      size: 60,
      orbitRadius: 350,
      orbitSpeed: 20,
      initialAngle: 0,
      type: 'nav'
    },
    { 
      id: 'skills-section',
      name: 'Skills',
      icon: <FiCpu />,
      size: 50,
      orbitRadius: 350,
      orbitSpeed: 25,
      initialAngle: 90,
      type: 'nav'
    },
    { 
      id: 'projects-section',
      name: 'Projects',
      icon: <FiFolder />,
      size: 70,
      orbitRadius: 350,
      orbitSpeed: 18,
      initialAngle: 180,
      type: 'nav'
    },
    { 
      id: 'contact-section',
      name: 'Contact',
      icon: <FiMail />,
      size: 45,
      orbitRadius: 350,
      orbitSpeed: 22,
      initialAngle: 270,
      type: 'nav'
    }
  ];

  const decorativeBubbles: DecorativeBubble[] = Array.from({ length: 30 }, (_, i) => {
    const size = 30 + (i % 5) * 10;
    const orbitRadius = 300 + (i % 4) * 100;
    const speed = 15 + (i % 3) * 5;
    const angle = (i * 12) % 360;
    const opacity = 0.7 + (i % 4) * 0.1;
    
    return {
      id: `decorative-${i}`,
      size,
      orbitRadius,
      orbitSpeed: speed,
      initialAngle: angle,
      type: 'decorative',
      opacity
    };
  });

  const allBubbles: Bubble[] = [...navItems, ...decorativeBubbles];

  if (hidden || !showBubbles) return null;

  return (
    <div className={`floating-nav${entering ? ' entering' : ''}`}>
      {allBubbles.map((item, index) => (
        <div
          key={item.id}
          className={
            `bubble ${item.type} ${activeBubble === item.id ? 'active' : ''}` +
            (entering && activeBubble === item.id ? ' bubble-enter' : '') +
            (entering && activeBubble !== item.id ? ' bubble-fade' : '')
          }
          style={{ 
            width: item.size,
            height: item.size,
            '--orbit-radius': `${item.orbitRadius}px`,
            '--orbit-speed': `${item.orbitSpeed}s`,
            '--initial-angle': `${item.initialAngle}deg`,
            '--opacity': item.type === 'decorative' ? item.opacity : 1
          } as React.CSSProperties}
          onClick={() => item.type === 'nav' && scrollToSection(item.id)}
        >
          {item.type === 'nav' && !entering && (
            <span className="bubble-icon">{item.icon}</span>
          )}
        </div>
      ))}
    </div>
  );
}