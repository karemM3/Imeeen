/**
 * animations.ts
 * 
 * Ce fichier contient les fonctions d'animation utilisées dans l'application.
 * Les animations sont principalement gérées avec GSAP (GreenSock Animation Platform),
 * une bibliothèque puissante pour les animations web.
 */

import { gsap } from "gsap";

/**
 * Initialise les animations pour le nouveau logo moderne du laboratoire
 * Cette fonction crée des animations subtiles et élégantes pour les éléments du logo:
 * 1. Une légère oscillation du cercle externe
 * 2. Une rotation très lente de l'hexagone
 * 3. Une pulsation douce du cercle interne
 * 
 * @param logoRef - Référence React au SVG du logo
 */
export const initSubtleLogoAnimation = (logoRef: React.RefObject<SVGSVGElement>) => {
  // Vérifie que la référence est valide
  if (!logoRef.current) return;
  
  // Sélectionne les éléments SVG individuels à animer
  const outerCircle = logoRef.current.querySelector('circle:first-child');
  const hexagon = logoRef.current.querySelector('path');
  const innerCircle = logoRef.current.querySelector('circle:last-child');
  const text = logoRef.current.querySelector('text');

  // Animation du cercle externe - oscillation très subtile
  gsap.to(outerCircle, {
    scale: 1.02,           // Très légère augmentation de taille
    opacity: 0.9,          // Légère variation d'opacité
    duration: 3,           // Durée de l'animation (en secondes)
    repeat: -1,            // Répétition infinie
    yoyo: true,            // Alterne entre l'état initial et final
    transformOrigin: "center center",
    ease: "sine.inOut"     // Fonction de timing douce
  });

  // Animation de l'hexagone - rotation très lente
  gsap.to(hexagon, {
    rotation: 60,          // Rotation de 60 degrés (un côté de l'hexagone)
    duration: 20,          // Très lent - 20 secondes pour une rotation partielle
    repeat: -1,            // Répétition infinie
    yoyo: true,            // Retour à la position initiale
    transformOrigin: "center center",
    ease: "power1.inOut"   // Fonction de timing douce
  });

  // Animation du cercle interne - effet de pulsation subtile
  gsap.to(innerCircle, {
    scale: 1.03,           // Légère pulsation
    duration: 2.5,         // Durée de l'animation (en secondes)
    repeat: -1,            // Répétition infinie
    yoyo: true,            // Alterne entre l'état initial et final
    transformOrigin: "center center",
    ease: "sine.inOut"     // Fonction de timing douce
  });
  
  // Animation du texte - subtile variation d'opacité
  gsap.to(text, {
    opacity: 0.85,         // Légère variation d'opacité
    duration: 2,           // Durée de l'animation (en secondes)
    repeat: -1,            // Répétition infinie
    yoyo: true,            // Alterne entre l'état initial et final
    ease: "sine.inOut"     // Fonction de timing douce
  });
};

/**
 * Animation d'origine pour l'ancien logo (maintenue pour référence si nécessaire)
 * @param logoRef - Référence React au SVG du logo
 */
export const initLogoAnimation = (logoRef: React.RefObject<SVGSVGElement>) => {
  // Vérifie que la référence est valide
  if (!logoRef.current) return;
  
  // Code maintenu pour compatibilité mais non utilisé
  const circle = logoRef.current.querySelector('circle:first-child');
  const path = logoRef.current.querySelector('path');
  const innerCircle = logoRef.current.querySelector('circle:last-child');

  if (!circle || !path || !innerCircle) return;

  gsap.to(circle, {
    scale: 1.05, opacity: 0.8, duration: 1.5, repeat: -1, yoyo: true,
    transformOrigin: "center center", ease: "power1.inOut"
  });

  gsap.to(path, {
    rotation: 360, duration: 8, repeat: -1,
    transformOrigin: "center center", ease: "linear"
  });

  gsap.to(innerCircle, {
    y: -5, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut"
  });
};

/**
 * Initialise les animations de défilement pour les sections de la page
 * 
 * Cette fonction crée un effet d'apparition progressive des sections
 * lorsque l'utilisateur fait défiler la page, avec des transitions
 * douces et élégantes.
 */
export const initScrollAnimations = () => {
  // Sélectionne toutes les sections de la page
  const sections = document.querySelectorAll('section');
  
  // Applique l'animation à chaque section
  sections.forEach(section => {
    // Animation de transition avec fromTo (définit états initial et final)
    gsap.fromTo(
      section,
      // État initial - section légèrement décalée vers le bas et invisible
      { 
        y: 20,             // 20px sous sa position finale (plus subtil)
        opacity: 0         // Complètement transparent
      },
      // État final - section en place et visible
      {
        y: 0,              // Position normale (sans décalage)
        opacity: 1,        // Complètement visible
        duration: 1,       // Durée de la transition en secondes (légèrement plus lente)
        scrollTrigger: {
          trigger: section, // Élément qui déclenche l'animation
          start: "top 85%", // Démarrer quand le haut de la section atteint 85% de la hauteur de la fenêtre
          toggleActions: "play none none none" // Jouer l'animation une seule fois
        }
      }
    );
  });
};
