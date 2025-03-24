import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FoodItem } from "@shared/schema";
import { shareRecommendation } from "@/lib/utils";
import { useState } from "react";
import { X } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaLink } from "react-icons/fa";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  food: FoodItem;
  onShareSuccess: (platform: string) => void;
}

export default function ShareModal({ isOpen, onClose, food, onShareSuccess }: ShareModalProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async (platform: string) => {
    setIsSharing(true);
    try {
      const result = await shareRecommendation(platform, food.name, food.category);
      if (result.success) {
        onShareSuccess(platform);
      }
    } catch (error) {
      console.error("공유 오류:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const shareOptions = [
    { 
      name: "인스타그램", 
      icon: <FaInstagram className="text-pink-600 text-xl" />,
      platform: "instagram"
    },
    { 
      name: "페이스북", 
      icon: <FaFacebook className="text-blue-600 text-xl" />,
      platform: "facebook" 
    },
    { 
      name: "트위터", 
      icon: <FaTwitter className="text-blue-400 text-xl" />,
      platform: "twitter" 
    },
    { 
      name: "링크 복사", 
      icon: <FaLink className="text-gray-600 text-xl" />,
      platform: "copy" 
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-['Poppins'] text-lg font-semibold">음식 추천 공유하기</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">닫기</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option.platform)}
              disabled={isSharing}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                {option.icon}
              </div>
              <span className="text-xs text-gray-600">{option.name}</span>
            </button>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="w-full text-gray-600 hover:text-gray-800"
          >
            취소
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
