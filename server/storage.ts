import { foodItems, FoodItem, InsertFoodItem, users, User, InsertUser, FoodCategory } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getFoodByCategory(category: FoodCategory): Promise<FoodItem[]>;
  getRandomFoodByCategory(category: FoodCategory): Promise<FoodItem | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private foods: Map<number, FoodItem>;
  private userCurrentId: number;
  private foodCurrentId: number;

  constructor() {
    this.users = new Map();
    this.foods = new Map();
    this.userCurrentId = 1;
    this.foodCurrentId = 1;
    
    this.initializeFoodData();
  }

  private initializeFoodData() {
    const foodData: InsertFoodItem[] = [
      { 
        name: "Bibimbap", 
        description: "A colorful mixed rice dish with sautéed vegetables, meat, a fried egg, and gochujang sauce.", 
        category: "korean",
        image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "Bulgogi", 
        description: "Thinly sliced marinated beef, typically cooked on a grill with onions and other vegetables.", 
        category: "korean",
        image: "https://images.unsplash.com/photo-1583187865805-fd6d8bf8c493?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "Kimchi Jjigae", 
        description: "A spicy stew made with kimchi, pork, tofu, and vegetables. Perfect for cold days.", 
        category: "korean",
        image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "Dim Sum", 
        description: "A variety of small dishes served in steamer baskets or on small plates, often enjoyed with tea.", 
        category: "chinese",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "Kung Pao Chicken", 
        description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.", 
        category: "chinese",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "Mapo Tofu", 
        description: "Soft tofu cooked in a spicy sauce with minced meat. A classic Sichuan dish.", 
        category: "chinese",
        image: "https://images.unsplash.com/photo-1541379889336-70f26e4c4617?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "Cheeseburger", 
        description: "A classic hamburger topped with melted cheese, lettuce, tomato, and special sauce.", 
        category: "western",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "Spaghetti Carbonara", 
        description: "Italian pasta dish with eggs, cheese, pancetta, and black pepper.", 
        category: "western",
        image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "Steak & Fries", 
        description: "Juicy grilled steak served with crispy French fries and a side of sauce.", 
        category: "western",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      }
    ];

    foodData.forEach(food => this.createFood(food));
  }

  private createFood(food: InsertFoodItem): FoodItem {
    const id = this.foodCurrentId++;
    const newFood = { ...food, id };
    this.foods.set(id, newFood);
    return newFood;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFoodByCategory(category: FoodCategory): Promise<FoodItem[]> {
    return Array.from(this.foods.values()).filter(
      (food) => food.category === category
    );
  }

  async getRandomFoodByCategory(category: FoodCategory): Promise<FoodItem | undefined> {
    const foodsInCategory = await this.getFoodByCategory(category);
    if (foodsInCategory.length === 0) {
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * foodsInCategory.length);
    return foodsInCategory[randomIndex];
  }
}

export const storage = new MemStorage();
