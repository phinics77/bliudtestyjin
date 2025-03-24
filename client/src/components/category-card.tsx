import { FoodCategory } from "@shared/schema";
import { useCallback } from "react";
import { useLocation } from "wouter";
import { capitalize } from "@/lib/utils";

interface CategoryCardProps {
  category: FoodCategory;
  image: string;
  description: string;
}

export default function CategoryCard({ category, image, description }: CategoryCardProps) {
  const [_, setLocation] = useLocation();
  
  const handleCategoryClick = useCallback(() => {
    setLocation(`/recommendation/${category}`);
  }, [category, setLocation]);

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={handleCategoryClick}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={`${capitalize(category)} Food`} 
          className="w-full h-48 object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white text-xl font-['Poppins'] font-bold">{capitalize(category)}</h3>
          <p className="text-white text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  );
}
