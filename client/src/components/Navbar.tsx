/**
 * Navbar.tsx
 * 
 * Barre de navigation modernisée avec design élégant et animations subtiles.
 * Inclut le nouveau logo du LRM2E et une palette de couleurs pastel homogène.
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import ModernLogo from "./AnimatedLogo"; // Gardons le même nom de fichier pour éviter les conflits
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "@/lib/i18n";

// Définition des couleurs pastels pour le design harmonieux
const colors = {
  primary: "#94B9AF", // Vert-bleu pastel
  secondary: "#DFB89B", // Beige-orange pastel
  accent: "#B4C7E7", // Bleu clair pastel
  light: "#F8F9FA", // Blanc cassé
  dark: "#2A3D45", // Vert-gris foncé
};

/**
 * Composant de navigation principal avec design moderne
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  // Effet pour détecter le défilement et appliquer une transition douce
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-dark-surface/95 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-white dark:bg-dark-surface py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo et nom du laboratoire */}
          <div className="flex items-center">
            <ModernLogo className="w-14 h-14 mr-3" />
            <div className="border-l-2 pl-3 border-opacity-20" style={{ borderColor: colors.primary }}>
              <h1 className="text-lg md:text-xl font-poppins font-bold" style={{ color: colors.primary }}>
                <span className="mr-2">LRM2E</span>
                <span className="text-sm font-light opacity-80">|</span>
                <span className="text-sm font-light ml-2">{t("labName")}</span>
              </h1>
              <p className="text-xs md:text-sm font-poppins opacity-80" style={{ color: colors.secondary }}>
                {t("labFullName")}
              </p>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <button 
            id="mobile-menu-button" 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Navigation desktop - design moderne avec effet de survol */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              { key: "home", href: "#accueil" },
              { key: "research", href: "#recherche" },
              { key: "team", href: "#equipe" },
              { key: "publications", href: "#publications" },
              { key: "contact", href: "#contact" }
            ].map((item) => (
              <a 
                key={item.key}
                href={item.href} 
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-opacity-10 hover:scale-105"
                style={{ 
                  color: colors.primary,
                  backgroundImage: `linear-gradient(to right, ${colors.primary}00, ${colors.primary}10)`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundImage = `linear-gradient(to right, ${colors.primary}10, ${colors.primary}20)`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundImage = `linear-gradient(to right, ${colors.primary}00, ${colors.primary}10)`;
                }}
              >
                {t(item.key as any)}
              </a>
            ))}
            
            {/* Toggle buttons container */}
            <div className="flex items-center space-x-3 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Navigation mobile avec transition douce */}
        <div 
          id="mobile-menu" 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-1 py-3">
            {[
              { key: "home", href: "#accueil" },
              { key: "research", href: "#recherche" },
              { key: "team", href: "#equipe" },
              { key: "publications", href: "#publications" },
              { key: "contact", href: "#contact" }
            ].map((item) => (
              <a 
                key={item.key}
                href={item.href} 
                className="px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                style={{ color: colors.primary }}
                onClick={closeMenu}
              >
                {t(item.key as any)}
              </a>
            ))}
            
            {/* Toggle buttons */}
            <div className="flex items-center space-x-4 p-4 mt-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <ThemeToggle mobile />
              <LanguageToggle mobile />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
