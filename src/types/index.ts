export interface ActivityEntry {
  id: string;
  type: string;
  date: string;
  title: string;
  summary: string;
  highlight?: string; // 펼칠 수 없는 항목에 바로 보여줄 핵심 한 줄
}

export interface ActivityPoint {
  label: string;
  text: string;
}

export interface ActivityDetail {
  entryId: string;
  org: string;
  roleNote?: string; // entry.type과 다른 새로운 정보일 때만 표시
  metrics?: string[];
  points: ActivityPoint[];
  skills?: string[];
  relatedProject?: boolean; // Projects 섹션으로 이동하는 링크 표시 여부
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
  imageUrl?: string;
  galleryUrls?: string[];
  detail: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Keyword {
  id: string;
  text: string;
  weight: number;
  questions: string[];
}

export interface Message {
  role: "user" | "bot";
  content: string;
}

export interface Skill {
  id: string;
  category: string;
  title: string;
  icon: string;
  description: string;
}