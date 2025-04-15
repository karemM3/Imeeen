/**
 * queryClient.ts
 * 
 * Ce fichier configure TanStack Query (React Query) pour gérer les appels API
 * et l'état global des données dans l'application.
 * 
 * Il fournit:
 * - Des fonctions utilitaires pour les requêtes API
 * - Une configuration par défaut pour les requêtes et mutations
 * - Une gestion des erreurs HTTP standardisée
 */

import { QueryClient, QueryFunction } from "@tanstack/react-query";

/**
 * Vérifie si une réponse HTTP est valide (status 2xx)
 * Lance une erreur avec le texte de la réponse en cas d'échec
 * 
 * @param res - L'objet Response à vérifier
 * @throws Error avec le code et le message d'erreur
 */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Effectue une requête API avec gestion d'erreur standardisée
 * 
 * @param method - Méthode HTTP (GET, POST, PUT, DELETE, etc.)
 * @param url - URL de la requête
 * @param data - Données à envoyer (optionnel, pour POST/PUT)
 * @returns La réponse HTTP en cas de succès
 * @throws Error en cas d'échec de la requête
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // Inclut les cookies pour l'authentification
  });

  await throwIfResNotOk(res);
  return res;
}

/**
 * Type définissant le comportement en cas d'erreur 401 (Non autorisé)
 * - "returnNull": Renvoie null silencieusement (utile pour vérifier l'état d'authentification)
 * - "throw": Lance une erreur (comportement par défaut)
 */
type UnauthorizedBehavior = "returnNull" | "throw";

/**
 * Crée une fonction de requête pour TanStack Query
 * avec gestion personnalisée de l'authentification
 * 
 * @param options - Options de configuration (comportement sur erreur 401)
 * @returns Fonction de requête typée pour TanStack Query
 */
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include", // Inclut les cookies pour l'authentification
    });

    // Gestion spéciale des erreurs 401 (non autorisé)
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

/**
 * Configuration du client TanStack Query pour l'application
 * 
 * Cette configuration:
 * - Définit une fonction de requête par défaut
 * - Désactive le rafraîchissement automatique (à gérer manuellement)
 * - Désactive les nouvelles tentatives en cas d'échec
 * - Conserve les données en cache indéfiniment (staleTime)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,        // Pas de rafraîchissement automatique périodique
      refetchOnWindowFocus: false,   // Pas de rafraîchissement quand la fenêtre reprend le focus
      staleTime: Infinity,           // Les données ne deviennent jamais obsolètes automatiquement
      retry: false,                  // Pas de nouvelles tentatives en cas d'échec
    },
    mutations: {
      retry: false,                  // Pas de nouvelles tentatives pour les mutations
    },
  },
});
