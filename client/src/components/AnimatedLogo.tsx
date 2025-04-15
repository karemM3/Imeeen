/**
 * ModernLogo.tsx
 * 
 * Composant qui crée un logo SVG moderne pour le laboratoire LRM2E.
 * Design épuré avec des formes géométriques simples et une animation subtile.
 * Ce logo représente visuellement les domaines du laboratoire avec:
 * - Un hexagone (représentant la structure moléculaire)
 * - Un cercle (symbolisant l'environnement et le cycle de recherche)
 * - Un acronyme "LRM2E" intégré
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface ModernLogoProps {
  className?: string; // Permet de personnaliser les styles du conteneur
}

/**
 * Composant de logo moderne pour le laboratoire de recherche
 * 
 * @param className - Classes CSS optionnelles pour le conteneur du logo
 * @returns Composant SVG avec animation subtile
 */
const ModernLogo = ({ className = "" }: ModernLogoProps) => {
  // Référence au SVG pour les animations GSAP
  const logoRef = useRef<SVGSVGElement>(null);
  
  // Référence aux éléments du logo
  const outerCircleRef = useRef<SVGCircleElement>(null);
  const hexagonRef = useRef<SVGPathElement>(null);
  const innerCircleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  // Initialiser les animations subtiles au montage du composant
  useEffect(() => {
    // Animation du cercle externe - oscillation très subtile
    if (outerCircleRef.current) {
      gsap.to(outerCircleRef.current, {
        scale: 1.02,
        opacity: 0.9,
        duration: 3,
        repeat: -1,
        yoyo: true,
        transformOrigin: "center center",
        ease: "sine.inOut"
      });
    }

    // Animation de l'hexagone - rotation très lente
    if (hexagonRef.current) {
      gsap.to(hexagonRef.current, {
        rotation: 60,
        duration: 20,
        repeat: -1,
        yoyo: true,
        transformOrigin: "center center",
        ease: "power1.inOut"
      });
    }

    // Animation du cercle interne - effet de pulsation subtile
    if (innerCircleRef.current) {
      gsap.to(innerCircleRef.current, {
        scale: 1.03,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        transformOrigin: "center center",
        ease: "sine.inOut"
      });
    }
    
    // Animation du texte - subtile variation d'opacité
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 0.85,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  // Couleurs pastel pour le logo
  const primaryColor = "#94B9AF"; // Vert-bleu pastel
  const secondaryColor = "#DFB89B"; // Beige-orange pastel
  const accentColor = "#B4C7E7"; // Bleu clair pastel

  return (
    <div className={`relative ${className}`}>
      <svg 
        ref={logoRef}
        viewBox="0 0 100 100" 
        className="w-full h-full"
      >
        {/* Cercle externe */}
        <circle 
          ref={outerCircleRef}
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke={accentColor}
          strokeWidth="2" 
          className="opacity-80"
        />
        
        {/* Hexagone représentant la structure moléculaire */}
        <path 
          ref={hexagonRef}
          d="M50,20 L75,32.5 L75,67.5 L50,80 L25,67.5 L25,32.5 Z" 
          fill="none"
          stroke={primaryColor}
          strokeWidth="2.5"
          className="opacity-90"
        />
        
        {/* Cercle interne */}
        <circle 
          ref={innerCircleRef}
          cx="50" 
          cy="50" 
          r="20" 
          fill="none" 
          stroke={secondaryColor}
          strokeWidth="2.5" 
          className="opacity-90"
        />
        
        {/* Texte LRM2E */}
        <text
          ref={textRef}
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill={primaryColor}
          className="font-sans"
        >
          LRM2E
        </text>
      </svg>
    </div>
  );
};

export default ModernLogo;
