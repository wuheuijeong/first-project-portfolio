export interface ActivityEntry {
  id: string;
  type: string;
  date: string;
  title: string;
  summary: string;
}

export interface ActivityDetail {
  entryId: string;
  fulltitle: string;
  role: string;
  details: string[];
}

export interface Keyword {
  id: string;
  text: string;
  weight: number;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  platform: string;
  date: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  teamsize: number;
  period: string;
  imageUrl?: string[];
  detail: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Keyword {
  id: string;
  text: string;
  weight: number;
  suggestedQuestion: string;
}

export interface Message {
  role: "user" | "bot";
  content: string;
}