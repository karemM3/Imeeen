/**
 * App.tsx
 * 
 * Composant principal de l'application qui gère:
 * - La structure générale de l'application
 * - Les providers de contexte (langue, requêtes API)
 * - Le système de routage
 * - Les préférences de thème (clair/sombre)
 */

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import ResearcherPage from "@/pages/researcher-page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

/**
 * Composant de routage qui définit les différentes routes de l'application
 * Utilise wouter pour une gestion légère des routes
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route 
        path="/admin" 
        component={() => (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/researcher" 
        component={() => (
          <ProtectedRoute allowedRoles={["admin", "researcher"]}>
            <ResearcherPage />
          </ProtectedRoute>
        )} 
      />
      <Route component={NotFound} /> {/* Route par défaut pour les URL non reconnues */}
    </Switch>
  );
}

/**
 * Composant principal de l'application
 * Gère les providers de contexte et la structure globale de l'interface
 */
function App() {
  // Effet pour initialiser le thème selon les préférences utilisateur
  useEffect(() => {
    // Vérifier les préférences de thème sauvegardées ou utiliser les préférences système
    if (localStorage.getItem('dark-mode') === 'true' || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('dark-mode'))) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  return (
    // LanguageProvider doit être avant QueryClientProvider car certains composants
    // de requête utilisent des fonctionnalités de langue
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* Conteneur principal avec support de thème clair/sombre */}
          <div className="font-open-sans transition-colors duration-300 bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text">
            <Navbar />
            <Router />
            <Footer />
          </div>
          {/* Système de notifications toast */}
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
