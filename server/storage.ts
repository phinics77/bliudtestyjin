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
        name: "비빔밥", 
        description: "다양한 나물과 고기, 계란이 어우러진 밥 요리로 매콤한 고추장 소스가 특징입니다.", 
        category: "korean",
        image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "불고기", 
        description: "달콤하고 짭짤한 양념에 재운 얇게 썬 쇠고기를 구운 한국의 대표적인 요리입니다.", 
        category: "korean",
        image: "https://images.unsplash.com/photo-1583187865805-fd6d8bf8c493?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "김치찌개", 
        description: "묵은지와 돼지고기, 두부 등을 넣고 얼큰하게 끓인 국물 요리로 추운 날 먹기 좋습니다.", 
        category: "korean",
        image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "된장찌개", 
        description: "된장과 두부, 다양한 채소를 넣고 끓인 한국의 전통 찌개로 구수한 맛이 특징입니다.", 
        category: "korean",
        image: "https://images.unsplash.com/photo-1627476455994-a248c90bd3c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "떡볶이", 
        description: "쫄깃한 떡과 어묵을 매콤달콤한 고추장 소스에 끓인 한국의 대표적인 분식입니다.", 
        category: "korean",
        image: "https://images.unsplash.com/photo-1635963231146-d1e513e9ea25?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "삼겹살", 
        description: "두툼한 돼지고기 삼겹살을 직접 구워 쌈과 함께 먹는 인기 있는 한국 요리입니다.", 
        category: "korean",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "딤섬", 
        description: "찜통에 쪄내거나 작은 접시에 담긴 다양한 작은 요리로, 주로 차와 함께 즐깁니다.", 
        category: "chinese",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "꿔바로우", 
        description: "바삭한 튀김옷을 입힌 돼지고기에 새콤달콤한 소스를 곁들인 중국 요리입니다.", 
        category: "chinese",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "마파두부", 
        description: "부드러운 두부와 다진 고기를 매콤한 소스에 볶은 사천식 중국 요리입니다.", 
        category: "chinese",
        image: "https://images.unsplash.com/photo-1541379889336-70f26e4c4617?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "짜장면", 
        description: "춘장에 다진 고기와 채소를 볶아 만든 소스를 면과 함께 비벼 먹는 중국식 한국 요리입니다.", 
        category: "chinese",
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "탕수육", 
        description: "바삭하게 튀긴 돼지고기에 새콤달콤한 소스를 부어 먹는 중국식 요리입니다.", 
        category: "chinese",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "양꼬치", 
        description: "양고기를 꼬치에 끼워 향신료를 뿌리고 구운 중국 북부의 전통 요리입니다.", 
        category: "chinese",
        image: "https://images.unsplash.com/photo-1544601284-28cc9f8excce9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "치즈버거", 
        description: "녹인 치즈, 양상추, 토마토, 특제 소스를 올린 클래식한 햄버거입니다.", 
        category: "western",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "카르보나라", 
        description: "계란, 치즈, 베이컨, 후추를 넣어 만든 크리미한 이탈리안 파스타 요리입니다.", 
        category: "western",
        image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "스테이크", 
        description: "육즙이 풍부한 구운 스테이크와 바삭한 감자튀김이 함께 제공되는 요리입니다.", 
        category: "western",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "피자", 
        description: "토마토 소스와 녹인 치즈 위에 다양한 토핑을 올린 이탈리안 오븐 요리입니다.", 
        category: "western",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "타코", 
        description: "옥수수 또는 밀가루 토르티야에 고기, 채소, 치즈, 살사를 넣은 멕시칸 요리입니다.", 
        category: "western",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
      },
      { 
        name: "리조또", 
        description: "천천히 끓여 크리미한 식감을 갖는 이탈리안 쌀 요리로 다양한 재료와 함께 즐깁니다.", 
        category: "western",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
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
