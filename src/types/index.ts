export interface Game {
    title: Record<string, string>;
    image: string;
    description: Record<string, string>;
    url: string;
}

export interface Project {
    title: Record<string, string>;
    description: Record<string, string>;
    image: string;
    github: string;
    url?: string;
    tags: string[];
}

export interface OpeningAnimationProps {
    onAnimationComplete?: () => void;
}
