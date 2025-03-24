import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function shareRecommendation(
  platform: string,
  foodName: string,
  category: string
) {
  // 카테고리명 한국어로 변환
  const koreanCategory = category === 'korean' ? '한식' : 
                         category === 'chinese' ? '중식' : 
                         category === 'western' ? '양식' : category;
  
  const shareText = `오늘의 음식 추천: ${foodName} - 맛있는 ${koreanCategory} 요리! #오늘뭐먹지`;
  
  switch (platform) {
    case 'instagram':
      // 인스타그램은 직접적인 웹 공유 링크를 지원하지 않음
      // 클립보드에 텍스트 복사하여 수동 공유
      await navigator.clipboard.writeText(shareText);
      return { success: true, message: '인스타그램에 공유할 텍스트가 클립보드에 복사되었습니다' };
    
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodeURIComponent(shareText)}`, '_blank');
      return { success: true };

    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${window.location.href}`, '_blank');
      return { success: true };
      
    case 'copy':
      await navigator.clipboard.writeText(shareText);
      return { success: true, message: '링크가 클립보드에 복사되었습니다!' };
      
    default:
      return { success: false, message: '지원되지 않는 공유 플랫폼입니다' };
  }
}
