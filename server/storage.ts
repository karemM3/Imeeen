import { 
  users, 
  type User, 
  type InsertUser, 
  contactMessages, 
  type ContactMessage, 
  type InsertContactMessage 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  updateUserRole(id: number, role: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  deleteContactMessage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private userCurrentId: number;
  private messageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
    
    // Create admin user for testing
    this.createUser({
      username: "admin",
      email: "admin@lrm2e.fr",
      password: "admin123", // This would be hashed in a real scenario
      role: "admin",
      fullName: "Admin LRM2E",
      department: "Administration",
      position: "Administrateur Système"
    });
    
    // Create researcher user for testing
    this.createUser({
      username: "researcher",
      email: "researcher@lrm2e.fr",
      password: "researcher123", // This would be hashed in a real scenario
      role: "researcher",
      fullName: "Dr. Marie Curie",
      department: "Materials Science",
      position: "Senior Researcher"
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const createdAt = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt,
      // Assurez-vous que ces champs sont définis avec des valeurs par défaut si non fournis
      role: insertUser.role || "user",
      fullName: insertUser.fullName || null,
      department: insertUser.department || null,
      position: insertUser.position || null
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = await this.getUser(id);
    if (!existingUser) {
      return undefined;
    }
    
    const updatedUser: User = { ...existingUser, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async updateUserRole(id: number, role: string): Promise<User | undefined> {
    // Vérifiez que le rôle est valide
    if (role !== "admin" && role !== "researcher" && role !== "user") {
      throw new Error("Rôle invalide. Les rôles valides sont: admin, researcher, user");
    }
    return this.updateUser(id, { role: role as "admin" | "researcher" | "user" });
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const createdAt = new Date().toISOString();
    const contactMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    return this.contactMessages.delete(id);
  }
}

export const storage = new MemStorage();
