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
): Promise<{ success: boolean; message?: string }> {
  try {
    // 카테고리명 한국어로 변환
    const koreanCategory = 
      category === 'korean' ? '한식' : 
      category === 'chinese' ? '중식' : 
      category === 'japanese' ? '일식' :
      category === 'western' ? '양식' : category;
    
    const shareText = `오늘의 음식 추천: ${foodName} - 맛있는 ${koreanCategory} 요리! #오늘뭐먹지`;
    const currentUrl = window.location.href;
    
    switch (platform) {
      case 'instagram':
        // 인스타그램은 직접적인 웹 공유 링크를 지원하지 않음
        // 클립보드에 텍스트 복사하여 수동 공유
        try {
          await navigator.clipboard.writeText(shareText);
          return { success: true, message: '인스타그램에 공유할 텍스트가 클립보드에 복사되었습니다. 인스타그램 앱에 붙여넣기 하세요!' };
        } catch (error) {
          console.error("클립보드 복사 오류:", error);
          // 대체 방법: 텍스트 영역을 사용하여 복사
          const textarea = document.createElement('textarea');
          textarea.value = shareText;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          return { success: true, message: '인스타그램에 공유할 텍스트가 클립보드에 복사되었습니다. 인스타그램 앱에 붙여넣기 하세요!' };
        }
      
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
        const fbWindow = window.open(facebookUrl, '_blank', 'width=600,height=400');
        if (!fbWindow || fbWindow.closed || typeof fbWindow.closed === 'undefined') {
          // 팝업이 차단되었을 경우
          return { success: false, message: '페이스북 공유 창이 차단되었습니다. 팝업 차단을 해제해주세요.' };
        }
        return { success: true, message: '페이스북 공유 창이 열렸습니다.' };

      case 'twitter':
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
        const twWindow = window.open(twitterUrl, '_blank', 'width=600,height=400');
        if (!twWindow || twWindow.closed || typeof twWindow.closed === 'undefined') {
          // 팝업이 차단되었을 경우
          return { success: false, message: '트위터 공유 창이 차단되었습니다. 팝업 차단을 해제해주세요.' };
        }
        return { success: true, message: '트위터 공유 창이 열렸습니다.' };
        
      case 'copy':
        try {
          await navigator.clipboard.writeText(`${shareText} ${currentUrl}`);
          return { success: true, message: '공유 텍스트가 클립보드에 복사되었습니다!' };
        } catch (error) {
          console.error("클립보드 복사 오류:", error);
          // 대체 방법: 텍스트 영역을 사용하여 복사
          const textarea = document.createElement('textarea');
          textarea.value = `${shareText} ${currentUrl}`;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          return { success: true, message: '공유 텍스트가 클립보드에 복사되었습니다!' };
        }
        
      default:
        return { success: false, message: '지원되지 않는 공유 플랫폼입니다' };
    }
  } catch (error) {
    console.error("공유 과정 중 오류 발생:", error);
    return { success: false, message: '공유 중 오류가 발생했습니다.' };
  }
}