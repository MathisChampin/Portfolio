'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function AboutSection() {
  const [titleRef, titleInView] = useInView({
    threshold: 0.1,
  });

  const [descriptionRef, descriptionInView] = useInView({
    threshold: 0.1,
  });

  const [iconsRef, iconsInView] = useInView({
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="aboutme-section" className="about-section">
      <motion.div
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        animate={titleInView ? "visible" : "hidden"}
      >
        <motion.div className="about-card" variants={itemVariants}>
          <motion.h2 
            ref={titleRef}
            className="about-title" 
            variants={itemVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
          >
            À propos de moi
          </motion.h2>
          <motion.div
            ref={descriptionRef}
            initial="hidden"
            animate={descriptionInView ? "visible" : "hidden"}
          >
            <motion.p className="about-description" variants={itemVariants}>
              Je suis étudiant à Epitech Paris, passionné par le développement et l'innovation.
              Mon parcours m'a permis d'acquérir une solide expertise en développement web et mobile,
              ainsi qu'une approche créative pour résoudre des problèmes complexes.
            </motion.p>
            <motion.p className="about-description" variants={itemVariants}>
            L'année prochaine, je m'apprête à vivre une expérience exceptionnelle en partant étudier à
            <span className="about-highlight"> Keimyung University</span> en Corée du Sud.
            Cette opportunité unique me permettra de m'ouvrir à de nouvelles cultures, d'enrichir mon parcours professionnel et de renforcer mes compétences techniques.
            </motion.p>
          </motion.div>
          <motion.div 
            ref={iconsRef}
            className="about-icons"
            initial="hidden"
            animate={iconsInView ? "visible" : "hidden"}
            variants={itemVariants}
          >
            <div className="about-icon">
              <Image
                src="/icons/epitech.png"
                alt="Epitech Logo"
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="about-icon">
              <Image
                src="/icons/korea.png"
                alt="South Korea Flag"
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 