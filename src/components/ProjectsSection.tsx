'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const projects = [
  {
    title: "R-Type",
    image: "/projects/rtype.png",
    description: `Dans le cadre de mon cursus à Epitech, j'ai participé à la réalisation d'un clone du célèbre jeu d'arcade R-Type.
Ce projet avait pour objectifs de développer un jeu en 2D multijoueur en ligne, en mettant en œuvre :
- Un moteur graphique pour le rendu des sprites et des animations.
- Un moteur réseau pour permettre à plusieurs joueurs de se connecter et jouer ensemble en temps réel.
- Une architecture client-serveur, avec synchronisation des entités (vaisseaux, tirs, ennemis).
- Une gestion d'événements efficace pour le gameplay (collisions, déplacements, tirs, etc.).

Ce projet m'a permis de renforcer mes compétences en :
- Programmation réseau (TCP/UDP)
- Programmation orientée objet
- Gestion de projet en équipe (Git, organisation agile)
- Optimisation des performances en temps réel

R-Type a été un défi majeur, car il nécessitait à la fois une rigueur technique et une collaboration étroite en équipe pour atteindre un résultat fluide et jouable.`,
    tags: ["C++", "SFML", "TCP/UDP", "Multijoueur", "Client-Serveur", "Agile"],
  },
  {
    title: "AREA",
    image: "/projects/area.png",
    description: `AREA - Plateforme d'automatisation de tâches (Epitech)
AREA permet aux utilisateurs de créer des automatisations personnalisées entre différents services en ligne, en combinant :
- Actions (déclencheurs comme "Nouveau message sur Discord", "Nouvel e-mail reçu", etc.)
- Réactions (actions comme "Envoyer un message", "Créer un événement", etc.)

Le projet est structuré autour :
- D'un back-end développé en Go utilisant MongoDB pour la persistance des données.
- D'un front-end web en React.js pour la plateforme utilisateur.
- D'une application mobile en Flutter pour permettre l'accès aux automatismes depuis n'importe où.

Fonctionnalités clés :
- Connexion OAuth2 à des services comme Google, Discord ou Twitch.
- Interface dynamique pour créer et gérer ses automatisations (Areas).
- Gestion des paramètres personnalisés pour chaque action/réaction.

Ce projet m'a permis de me perfectionner en :
- Programmation d'API REST en Go
- Authentification OAuth2
- Architecture d'applications fullstack (Go, React, Flutter)
- Gestion de projet collaboratif avec GitHub et Docker

AREA est un projet ambitieux qui m'a confronté à des défis techniques réels, notamment l'interconnexion de multiples APIs tierces et la gestion efficace des flux d'événements.`,
    tags: ["Go", "React", "Flutter", "MongoDB", "OAuth2", "Docker"],
  },
  {
    title: "OneScientificStudy OSS V2",
    image: "/projects/oss.png",
    description: `OneScientificStudy OSS V2 est une application web développée pour la gestion d'une étude scientifique multicentrique en contexte de pandémie hospitalière sur six mois.

Objectifs :
- Suivi et analyse des données patients et cliniques en situation de pandémie.
- Centralisation des données entre plusieurs hôpitaux participants.
- Génération de rapports automatiques pour aider à la décision médicale.

Technologies :
- Backend : ASP.NET Core 7.0 (C#), Entity Framework Core, PostgreSQL, authentification JWT.
- Frontend : React.js
- Documentation API : Swagger
- Génération de rapports : OpenAI (texte) + QuestPDF (PDF)

Fonctionnalités principales :
- Gestion complète des entités : hôpitaux, patients, hospitalisations, traitements, matériels, personnel médical et non médical.
- Statistiques en temps réel : taux de guérison, décès, traitements en cours, identification des meilleurs et pires traitements.
- Génération de rapports PDF basée sur les données cliniques et OpenAI.
- API REST sécurisée (JWT, CORS).

Cas d'usage :
- Consultation des patients par centre hospitalier.
- Suivi de l'évolution de la pandémie sur plusieurs semaines.
- Génération automatique de rapports à partir des statistiques médicales.`,
    tags: ["ASP.NET Core", "C#", "React", "PostgreSQL", "OpenAI", "QuestPDF", "Swagger"],
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 80, scale: 0.95 },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 }
  }
};

export default function ProjectsSection() {
  const [focused, setFocused] = useState<number | null>(null);

  useEffect(() => {
    if (focused === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFocused(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focused]);

  return (
    <section id="projects-section" className="projects-section">
      <h2 className="projects-title">Projets</h2>
      <div className="projects-grid">
        {projects.map((project, idx) => {
          // Si une card est focus, on masque les autres
          if (focused !== null && focused !== idx) return null;

          return (
            <motion.div
              className={`project-card${focused === idx ? ' focused' : ''}`}
              key={project.title}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              whileHover={focused === null ? { scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)" } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setFocused(focused === idx ? null : idx)}
              layout
            >
              <div className="project-image-container">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={300}
                  className="project-image"
                  style={{ objectFit: "cover", borderRadius: "1.5rem 1.5rem 0 0" }}
                />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">
                  {focused === idx
                    ? project.description.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))
                    : project.description.split('\n').slice(0, 4).map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                  {focused !== idx && <span style={{ color: "#FF3E9D" }}>[...]</span>}
                </p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span className="project-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                {focused === idx && (
                  <button className="close-btn" onClick={e => { e.stopPropagation(); setFocused(null); }}>
                    Fermer
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
