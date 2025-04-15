/**
 * i18n.ts
 * 
 * Ce fichier fournit les fonctionnalités d'internationalisation (i18n) pour l'application.
 * Il permet d'accéder facilement aux traductions en fonction de la langue sélectionnée.
 */

import { useLanguage } from "@/hooks/use-language";
import { translations } from "./translations";

/**
 * Type représentant toutes les clés de traduction disponibles
 * Grâce à cette définition de type, TypeScript peut vérifier que nous utilisons uniquement
 * des clés valides pour les traductions.
 */
export type TranslationKey = keyof typeof translations.fr;

/**
 * useTranslation - Hook pour accéder aux fonctions de traduction
 * 
 * Renvoie une fonction 't' qui traduit les clés en texte dans la langue actuelle
 * 
 * Exemple d'utilisation:
 * const { t } = useTranslation();
 * <p>{t("welcomeMessage")}</p>
 * 
 * @returns Un objet contenant la fonction de traduction 't'
 */
export const useTranslation = () => {
  // Récupérer la langue actuelle depuis le contexte
  const { language } = useLanguage();
  
  /**
   * Fonction de traduction qui renvoie le texte correspondant à la clé
   * dans la langue actuelle
   * 
   * @param key - Clé de traduction (doit exister dans les fichiers de traduction)
   * @returns Le texte traduit ou la clé elle-même si la traduction n'existe pas
   */
  const t = (key: TranslationKey): string => {
    // Utiliser les traductions de la langue actuelle ou français par défaut
    const currentTranslations = translations[language] || translations.fr;
    // Renvoyer la traduction ou la clé si la traduction n'existe pas
    return currentTranslations[key] || key;
  };
  
  return { t };
};
