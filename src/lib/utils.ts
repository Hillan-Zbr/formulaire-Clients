import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Fonction utilitaire pour fusionner les classes Tailwind proprement
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

