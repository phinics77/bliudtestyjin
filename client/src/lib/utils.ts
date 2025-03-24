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
  const shareText = `Check out my food recommendation: ${foodName} - a delicious ${category} dish! #WhatToEatToday`;
  
  switch (platform) {
    case 'instagram':
      // Instagram doesn't support direct web sharing links
      // Copy text to clipboard for manual sharing
      await navigator.clipboard.writeText(shareText);
      return { success: true, message: 'Text copied to clipboard for sharing on Instagram' };
    
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodeURIComponent(shareText)}`, '_blank');
      return { success: true };

    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${window.location.href}`, '_blank');
      return { success: true };
      
    case 'copy':
      await navigator.clipboard.writeText(shareText);
      return { success: true, message: 'Link copied to clipboard!' };
      
    default:
      return { success: false, message: 'Unsupported sharing platform' };
  }
}
