import { FoodItem } from "@shared/schema";
import { capitalize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ShareModal from "./share-modal";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { History, Utensils, Flame, RotateCcw, Share2, ArrowLeft } from "lucide-react";

interface FoodCardProps {
  food: FoodItem;
  onTryAgain: () => void;
}

// 카테고리명 한국어로 변환 함수
const translateCategory = (category: string): string => {
  switch(category) {
    case 'korean':
      return '한식';
    case 'chinese':
      return '중식';
    case 'western':
      return '양식';
    case 'japanese':
      return '일식';
    default:
      return '알 수 없음';
  }
};

export default function FoodCard({ food, onTryAgain }: FoodCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
  };

  const handleShareSuccess = (platform: string) => {
    const platformName = platform === 'copy' ? '클립보드' : 
                         platform === 'instagram' ? '인스타그램' :
                         platform === 'facebook' ? '페이스북' :
                         platform === 'twitter' ? '트위터' : platform;
                         
    toast({
      title: "공유 완료",
      description: platform === "copy" 
        ? "링크가 클립보드에 복사되었습니다!" 
        : `${platformName}에 공유되었습니다!`,
      duration: 3000
    });
    setIsShareModalOpen(false);
  };

  const handleBackClick = () => {
    setLocation("/");
  };

  return (
    <>
      <div className="mb-4">
        <Button 
          onClick={handleBackClick}
          variant="ghost" 
          className="flex items-center text-gray-600 hover:text-primary transition"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>카테고리로 돌아가기</span>
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="relative">
          <img 
            src={food.image} 
            alt={food.name} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
            <span>{translateCategory(food.category)}</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-['Poppins'] font-bold text-neutral-dark">{food.name}</h2>
            <div className="text-primary">
              <Utensils className="h-5 w-5" />
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            {food.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Flame className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-sm text-gray-700">인기 메뉴</span>
            </div>
            <div className="flex items-center">
              <History className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-700">조리 시간 25-40분</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={onTryAgain} 
          variant="outline" 
          className="w-full py-6 border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-white"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          <span>다시 추천받기</span>
        </Button>
        
        <Button 
          onClick={handleShareClick} 
          className="w-full py-6 bg-[#4ECDC4] hover:bg-opacity-90"
        >
          <Share2 className="mr-2 h-4 w-4" />
          <span>공유하기</span>
        </Button>
      </div>

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={handleCloseModal} 
        food={food}
        onShareSuccess={handleShareSuccess}
      />
    </>
  );
}
