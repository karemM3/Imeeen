/**
 * use-language.ts
 * 
 * Hook personnalisé pour accéder facilement au contexte de langue
 * dans n'importe quel composant de l'application.
 */

import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

/**
 * useLanguage - Hook pour accéder aux fonctionnalités de langue
 * 
 * @returns Un objet contenant:
 *   - language: la langue actuelle ("fr" ou "en")
 *   - toggleLanguage: fonction pour basculer entre français et anglais
 *   - setLanguage: fonction pour définir une langue spécifique
 */
export const useLanguage = () => {
  // Récupérer les valeurs du contexte (avec valeurs par défaut si le contexte n'existe pas)
  const context = useContext(LanguageContext);
  return context;
};
