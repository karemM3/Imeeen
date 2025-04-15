import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth, isAuthenticated, hasRole } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configurer l'authentification et les routes associées
  setupAuth(app);
  // API routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      const savedMessage = await storage.createContactMessage({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        createdAt: new Date().toISOString()
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully",
        data: savedMessage
      });
    } catch (error) {
      if (error instanceof Error) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: validationError.message
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "An unexpected error occurred"
        });
      }
    }
  });

  app.get("/api/contact", hasRole(["admin"]), async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json({ 
        success: true, 
        data: messages
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
