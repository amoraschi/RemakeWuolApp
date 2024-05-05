import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber (num: number) {
  return num > 999 ? (num / 1000).toFixed(1) + 'K' : num
}
