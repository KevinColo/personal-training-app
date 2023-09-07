export interface ProgressItem {
  videoId?: number;
  isActive: boolean;
  isCompleted: boolean;
  isRest: boolean;
  duration: number; // Durée en secondes
}
