'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface Skill {
  name: string;
  level: number;
  logo: string;
  category: 'systems' | 'web' | 'other';
  noBar?: boolean;
}

const skills: Skill[] = [
  // Systèmes & Bas niveau
  { name: 'C', level: 80, logo: '/skills/c.svg', category: 'systems' },
  { name: 'C#', level: 80, logo: '/skills/csharp.svg', category: 'systems' },
  { name: 'C++', level: 80, logo: '/skills/cpp.svg', category: 'systems' },
  { name: 'ASM', level: 30, logo: '/skills/asm.svg', category: 'systems' },
  
  // Web & Frontend
  { name: 'TypeScript', level: 50, logo: '/skills/typescript.svg', category: 'web' },
  { name: 'JavaScript', level: 50, logo: '/skills/javascript.svg', category: 'web' },
  { name: 'HTML', level: 50, logo: '/skills/html.svg', category: 'web' },
  { name: 'CSS', level: 50, logo: '/skills/css.svg', category: 'web' },
  
  // Autres
  { name: 'Haskell', level: 25, logo: '/skills/haskell.svg', category: 'other' },
  { name: "Python", logo: "/skills/python.svg", level: 50, category: "other" },
  { name: "Unreal Engine", logo: "/skills/unreal.svg", level: 30, category: "other" },
  { name: "GitHub", logo: "/skills/github.svg", level: 0, category: "other", noBar: true },
  { name: "Docker", logo: "/skills/docker.svg", level: 0, category: "other", noBar: true },
];

export default function SkillsSection() {
  const [titleRef, titleInView] = useInView({
    threshold: 0.1,
  });

  const [systemsRef, systemsInView] = useInView({
    threshold: 0.1,
  });

  const [webRef, webInView] = useInView({
    threshold: 0.1,
  });

  const [otherRef, otherInView] = useInView({
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 100 },
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

  const skillVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  return (
    <section id="skills-section" className="skills-section">
      <div className="skills-content">
        <motion.h2 
          ref={titleRef}
          className="skills-title" 
          variants={titleVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
        >
          Compétences
        </motion.h2>

        <div className="skills-categories">
          {(['systems', 'web', 'other'] as const).map((category, index) => {
            const ref = category === 'systems' ? systemsRef :
                       category === 'web' ? webRef : otherRef;
            const inView = category === 'systems' ? systemsInView :
                         category === 'web' ? webInView : otherInView;

            return (
              <motion.div 
                key={category} 
                ref={ref}
                className="skills-category" 
                variants={categoryVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={index}
              >
                <motion.h3 
                  className="category-title"
                  variants={skillVariants}
                >
                  {category === 'systems' ? 'Systèmes & Bas niveau' :
                   category === 'web' ? 'Web & Frontend' : 'Autres'}
                </motion.h3>
                <motion.div 
                  className="skills-grid"
                  variants={categoryVariants}
                >
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="skill-item"
                        variants={skillVariants}
                        custom={skillIndex}
                      >
                        <motion.div 
                          className="skill-header"
                          variants={skillVariants}
                        >
                          <motion.div 
                            className="skill-logo"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={skill.logo}
                              alt={`${skill.name} logo`}
                              width={30}
                              height={30}
                            />
                          </motion.div>
                          <span className="skill-name">{skill.name}</span>
                          {!skill.noBar && (
                            <span className="skill-level">{skill.level}%</span>
                          )}
                        </motion.div>
                        {!skill.noBar && (
                          <div className="skill-bar">
                            <motion.div
                              className="skill-progress"
                              custom={skill.level}
                              variants={progressVariants}
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
