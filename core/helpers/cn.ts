import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Função auxiliar para combinar classes (opcional, mas recomendada)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
