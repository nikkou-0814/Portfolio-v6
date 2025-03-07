export interface Project {
    title: Record<string, string>;
    description: Record<string, string>;
    image: string;
    github: string;
    url?: string;
    tags: string[];
}