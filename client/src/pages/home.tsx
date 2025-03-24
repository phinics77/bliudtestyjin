import CategoryCard from "@/components/category-card";
import { foodCategories, FoodCategory } from "@shared/schema";
import { Info } from "lucide-react";

export default function Home() {
  const categoryDescriptions: Record<FoodCategory, { desc: string, image: string }> = {
    korean: {
      desc: "비빔밥, 김치찌개, 불고기 등",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    chinese: {
      desc: "짜장면, 탕수육, 마파두부 등",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    western: {
      desc: "버거, 파스타, 스테이크 등",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  };

  return (
    <>
      <header className="bg-primary text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-['Poppins'] font-bold">오늘 뭐 먹지?</h1>
          <button className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition">
            <Info className="h-5 w-5" />
          </button>
        </div>
      </header>
      
      <div className="p-6">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-['Poppins'] font-semibold text-neutral-dark mb-2">음식 카테고리를 선택하세요</h2>
          <p className="text-gray-600">맛있는 음식을 추천해 드릴게요!</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {foodCategories.map((category) => (
            <CategoryCard 
              key={category}
              category={category}
              image={categoryDescriptions[category].image}
              description={categoryDescriptions[category].desc}
            />
          ))}
        </div>
      </div>
      
      <footer className="p-4 text-center text-gray-500 text-sm mt-auto">
        <p>&copy; {new Date().getFullYear()} 오늘 뭐 먹지? 앱</p>
      </footer>
    </>
  );
}
