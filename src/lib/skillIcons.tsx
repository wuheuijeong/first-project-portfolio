import { FaReact, FaJava, FaFigma } from "react-icons/fa";
import { SiSpring, SiSpringboot, SiJavascript, SiPython, SiSupabase, SiMysql } from "react-icons/si";
import { TbBrain } from "react-icons/tb";
import type { IconType } from "react-icons";

// 기술명을 아이콘 컴포넌트 + 브랜드 컬러에 매핑
export const skillIconMap: Record<string, { icon: IconType; color: string }> = {
  React: { icon: FaReact, color: "#61DAFB" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  Figma: { icon: FaFigma, color: "#F24E1E" },
  Java: { icon: FaJava, color: "#007396" },
  Spring: { icon: SiSpring, color: "#6DB33F" },
  "Spring Boot": { icon: SiSpringboot, color: "#6DB33F" },
  Supabase: { icon: SiSupabase, color: "#3ECF8E" },
  SQL: { icon: SiMysql, color: "#4479A1" },
  Python: { icon: SiPython, color: "#3776AB" },
  ADsP: { icon: TbBrain, color: "#E8674A" },
};