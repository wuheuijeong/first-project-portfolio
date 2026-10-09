import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Skill } from "../types";

// Supabase 연결이 끊겼을 때를 대비한 기본 스킬 목록 (Skills.tsx의 categories와 동일한 값 사용)
const fallbackSkills: Skill[] = [
    { id: "f1", category: "Frontend", title: "React", icon: "", description: "현대오토에버 모빌리티 SW스쿨에서 학습하며 포트폴리오 웹사이트를 직접 구현" },
    { id: "f2", category: "Backend", title: "Supabase", icon: "", description: "별도 서버 없이 프로젝트·스킬 데이터를 관리하는 테이블 설계 및 CRUD 구현" },
    { id: "f3", category: "Data", title: "SQL", icon: "", description: "SQLD 자격 보유, 데이터 추출 및 분석에 활용" },
    { id: "f4", category: "Data", title: "Python", icon: "", description: "Pandas, Scikit-learn 기반 데이터 분석 및 사업성 검증에 활용" },
    { id: "f5", category: "Tools", title: "LLM 프롬프트", icon: "", description: "프롬프트 엔지니어링으로 업무 자동화 툴 기획 및 구현" },
    { id: "f6", category: "Tools", title: "Selenium", icon: "", description: "반복 업무 자동화 스크립트 개발, 검수 시간 60% 단축" },
];

export function useSkills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSkills() {
            const { data, error } = await supabase.from("skills").select("*");

            if (error || !data || data.length === 0) {
                if (error) console.error(error);
                setSkills(fallbackSkills);
                setLoading(false);
                return;
            }

            setSkills(data);
            setLoading(false);
        }

        fetchSkills();
    }, []);

    return { skills, loading };
}