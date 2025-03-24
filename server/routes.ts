import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { foodCategories, type FoodCategory } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API endpoint to get a random food recommendation by category
  app.get("/api/recommendation/:category", async (req, res) => {
    try {
      const categorySchema = z.enum(foodCategories);
      const categoryResult = categorySchema.safeParse(req.params.category);
      
      if (!categoryResult.success) {
        return res.status(400).json({ message: "Invalid food category" });
      }
      
      const category = categoryResult.data as FoodCategory;
      const food = await storage.getRandomFoodByCategory(category);
      
      if (!food) {
        return res.status(404).json({ message: "No food found for this category" });
      }
      
      return res.json(food);
    } catch (error) {
      console.error("Error getting food recommendation:", error);
      return res.status(500).json({ message: "Failed to get food recommendation" });
    }
  });

  // API endpoint to get all foods by category
  app.get("/api/foods/:category", async (req, res) => {
    try {
      const categorySchema = z.enum(foodCategories);
      const categoryResult = categorySchema.safeParse(req.params.category);
      
      if (!categoryResult.success) {
        return res.status(400).json({ message: "Invalid food category" });
      }
      
      const category = categoryResult.data as FoodCategory;
      const foods = await storage.getFoodByCategory(category);
      
      return res.json(foods);
    } catch (error) {
      console.error("Error getting foods by category:", error);
      return res.status(500).json({ message: "Failed to get foods" });
    }
  });

  return httpServer;
}
