import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import FoodCard from "@/components/food-card";
import { FoodItem } from "@shared/schema";
import { Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Recommendation() {
  const { category } = useParams<{ category: string }>();

  const { 
    data: food, 
    isLoading, 
    error, 
    refetch 
  } = useQuery<FoodItem>({
    queryKey: [`/api/recommendation/${category}`],
  });

  const handleTryAgain = () => {
    refetch();
  };

  return (
    <>
      <header className="bg-primary text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-['Poppins'] font-bold">What to Eat Today?</h1>
          <button className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition">
            <Info className="h-5 w-5" />
          </button>
        </div>
      </header>
      
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-6">
            <div className="h-4 w-24"></div>
            <Skeleton className="h-64 w-full rounded-xl" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">Failed to load recommendation</p>
            <button 
              onClick={() => refetch()} 
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Try Again
            </button>
          </div>
        ) : food ? (
          <FoodCard food={food} onTryAgain={handleTryAgain} />
        ) : null}
      </div>
      
      <footer className="p-4 text-center text-gray-500 text-sm mt-auto">
        <p>&copy; {new Date().getFullYear()} What to Eat Today? App</p>
      </footer>
    </>
  );
}
