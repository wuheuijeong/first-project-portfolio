import { FaReact, FaJava } from "react-icons/fa";
import { SiSpring, SiSpringboot, SiJavascript, SiPython, SiSupabase, SiMysql } from "react-icons/si";
import { TbBrain } from "react-icons/tb";
import type { IconType } from "react-icons";

// 기술명을 아이콘 컴포넌트에 매핑
export const skillIconMap: Record<string, IconType> = {
  React: FaReact,
  JavaScript: SiJavascript,
  Figma: FaReact,
  Java: FaJava,
  Spring: SiSpring,
  "Spring Boot": SiSpringboot,
  Supabase: SiSupabase,
  SQL: SiMysql,
  Python: SiPython,
  ADsP: TbBrain,
};