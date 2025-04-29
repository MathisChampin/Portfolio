'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../context/NavigationContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showNavbar, setShowNavbar, setShowBubbles } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Si la navbar ne doit pas être affichée, on ne rend rien
  if (!showNavbar) return null;

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNavbar(false);
    setShowBubbles(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'About me', onClick: () => scrollToSection('aboutme-section') },
    { name: 'Skills', onClick: () => scrollToSection('skills-section') },
    { name: 'Projects', onClick: () => scrollToSection('projects-section') },
    { name: 'Contact', onClick: () => scrollToSection('contact-section') },
  ];

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.a
          href="#"
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePortfolioClick}
        >
          Portfolio
        </motion.a>
        
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              className="nav-link"
              onClick={item.onClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.nav>
  );
} 