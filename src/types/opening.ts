import { Project } from '@/types/project';

export interface Sparkle {
    id: number;
    x: number;
    y: number;
    size: number;
    velocityX: number;
    velocityY: number;
    opacity: number;
    rotation: number;
    rotationVelocity: number;
    color: string;
}
  
export interface OpeningAnimationProps {
    onAnimationComplete?: () => void;
    projects: Project[];
}