/**
 * LanguageContext.tsx
 * 
 * Ce fichier définit le contexte de langue pour l'application bilingue (français/anglais).
 * Il fournit un provider React qui gère l'état de la langue courante et des fonctions
 * pour changer de langue.
 */

import { createContext, useState, useEffect, ReactNode, useContext } from "react";

// Type définissant les langues supportées par l'application
type Language = "fr" | "en";

/**
 * Interface définissant la structure du contexte de langue
 */
interface LanguageContextType {
  language: Language;               // Langue actuelle ("fr" ou "en")
  toggleLanguage: () => void;       // Fonction pour basculer entre les langues
  setLanguage: (lang: Language) => void;  // Fonction pour définir une langue spécifique
}

/**
 * Valeurs par défaut pour le contexte de langue
 * Cela évite les vérifications d'undefined et les erreurs potentielles
 */
const defaultContext: LanguageContextType = {
  language: "fr",                   // Français par défaut
  toggleLanguage: () => {},         // Fonction vide par défaut
  setLanguage: () => {},            // Fonction vide par défaut
};

// Création du contexte React avec les valeurs par défaut
export const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Props pour le composant provider
interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * LanguageProvider - Composant provider qui encapsule la logique de gestion des langues
 * 
 * @param {ReactNode} children - Les composants enfants qui auront accès au contexte
 * @returns Composant React Provider avec la logique de langue
 */
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // État local pour stocker la langue actuelle (français par défaut)
  const [language, setLanguage] = useState<Language>("fr");

  // Au montage du composant, vérifier s'il existe une préférence de langue sauvegardée
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && (savedLang === "fr" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  /**
   * Bascule entre français et anglais
   * Sauvegarde la nouvelle langue dans localStorage pour la persistance
   */
  const toggleLanguage = () => {
    const newLang: Language = language === "fr" ? "en" : "fr";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  // L'objet de valeur qui sera fourni par le contexte
  const value = {
    language,
    toggleLanguage,
    setLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
