/**
 * ProtectedRoute.tsx
 * 
 * Composant de protection des routes qui nécessitent une authentification.
 * Ce composant vérifie si l'utilisateur est connecté et s'il a les rôles requis
 * pour accéder à la route protégée.
 */

import { ReactNode } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Si les données de l'utilisateur sont en cours de chargement, afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, rediriger vers la page d'authentification
  if (!user) {
    // Redirection vers la page d'authentification
    setLocation("/auth");
    return null;
  }

  // Si des rôles spécifiques sont requis, vérifier que l'utilisateur a au moins un de ces rôles
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.includes(user.role);
    
    if (!hasRequiredRole) {
      // L'utilisateur est connecté mais n'a pas les droits requis, rediriger vers la page d'accueil
      setLocation("/");
      return null;
    }
  }

  // L'utilisateur est connecté et a les rôles requis, afficher le contenu protégé
  return <>{children}</>;
}