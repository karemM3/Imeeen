/**
 * main.tsx
 * 
 * Point d'entrée principal de l'application React.
 * Ce fichier initialise l'application en montant le composant App
 * dans l'élément DOM racine de la page HTML.
 */

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Styles globaux de l'application

// Création du point de montage React et rendu du composant App
createRoot(document.getElementById("root")!).render(<App />);
