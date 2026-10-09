import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Project } from "../types";

// Supabase 연결이 끊겼을 때를 대비한 기본 프로젝트 목록 (PM 관점 재구성)
const fallbackProjects: Project[] = [
    {
        id: "f1",
        title: "PJ DIY 상위 사업기획 및 발표",
        summary: "설비 투자비 부담 없는 '골목 주차 공유' 신규 사업모델을 기획해 수익배분 구조를 설계하고, 사업팀 발표를 거쳐 부사장 보고 안건으로 채택시킨 프로젝트",
        role: "사업 기획 · 발표",
        stack: ["사업기획", "수익모델 설계", "경쟁사 리서치", "발표"],
        teamsize: 1,
        period: "2025.12 - 2026.03",
        detail: "**배경**\n\n제휴 주차장 운영 데이터를 다루며, 설비 투자 없이도 유휴 골목 공간을 주차 공급원으로 활용할 수 있다는 기회를 포착했습니다.\n\n**과정**\n- 공급자(공간 소유자)·수요자(운전자) 양측의 pain point를 정의하고 서비스 구조 설계\n- 수익배분 모델과 운영 리스크를 데이터 기반으로 검토\n- 사업팀 발표 자료 작성 및 발표 진행\n\n**성과**\n- 사업팀 발표를 거쳐 부사장 보고 안건으로 최종 채택",
    },
    {
        id: "f2",
        title: "TF 실적 트래킹 대시보드 구축 및 회고",
        summary: "신규 주차상품 도입 성과와 마케팅 데이터를 분석해 TF 프로젝트 회고 대시보드를 구축하고, 의사결정에 필요한 인사이트를 제공한 프로젝트",
        role: "데이터 분석 · 대시보드 설계",
        stack: ["데이터분석", "Google Sheets", "성과지표 설계"],
        teamsize: 1,
        period: "2025.06 - 2026.03",
        detail: "**배경**\n\n신규 주차상품 도입 이후 성과를 추적할 지표 체계가 없어, 특정 액션이 실제 지표에 미친 영향을 확인하기 어려웠습니다.\n\n**과정**\n- 자회사 TF 미팅에서 필요한 핵심 지표(전환율, 수수료 변화 등)를 정의\n- 마케팅·상품 성과 데이터를 정리해 회고 자료로 가공\n\n**성과**\n- 데이터가 의사결정의 근거가 되는 과정을 직접 경험",
    },
    {
        id: "f3",
        title: "업무 자동화 도구 제작",
        summary: "반복 입력·검수 과정의 비효율을 직접 포착해 LLM, Selenium, Tampermonkey 기반 업무 자동화 툴 4종을 기획·구현한 프로젝트",
        role: "기획 · 구현",
        stack: ["문제정의", "LLM 프롬프트", "Selenium", "업무표준화"],
        teamsize: 1,
        period: "2025.06 - 2026.03",
        detail: "**배경**\n\n제휴 주차장 수수료율, 정산 특약 조건 등 약 3만 건 규모의 데이터를 수기로 입력·검수하는 과정에서 오입력과 정산 리스크를 발견했습니다.\n\n**과정**\n- 수수료 감시 프로그램, 대량 수정 자동 매크로 등 업무 툴 4종 기획 및 구현\n- Admin 페이지 구조 충돌로 발생한 에러를 분석해 안정성 확보\n- 팀원 배포 및 활용법 안내로 업무 표준화\n\n**성과**\n- 반복 입력 시간 90% 이상 단축, 검수 시간 60% 단축",
    },
    {
        id: "f4",
        title: "주차 플랫폼 운영 업무",
        summary: "제휴 주차장 수수료율, 정산 특약 조건 등 핵심 운영 데이터를 검수·관리하며 서비스 운영 안정성을 확보한 업무",
        role: "서비스 운영",
        stack: ["어드민 운영", "데이터 검수", "정산 프로세스"],
        teamsize: 1,
        period: "2025.06 - 2026.03",
        detail: "**담당 업무**\n- 제휴 주차장 수수료율, 정산 특약 조건, 운영 시간 등 핵심 데이터 검수 및 어드민 관리\n- 대규모 주차 상품 데이터 검수·동기화\n- 업무 DX/AX 관련 TF 참여 및 실제 업무 시연",
    },
    {
        id: "f5",
        title: "UAM 수요 예측 분석 연구 (UROP)",
        summary: "서울 지역 대학(원)생을 대상으로 도심항공모빌리티(UAM) 수요를 분석해 소득임계치 기반 버티포트 입지를 제안한 연구",
        role: "팀장 · 연구 총괄",
        stack: ["설문설계", "데이터분석", "Python", "시장수요분석"],
        teamsize: 4,
        period: "2024.05 - 2024.11",
        detail: "**과정**\n- 연구 방향 설정, 역할 분담, 설문 설계, 데이터 분석, 논문 작성 총괄\n- 115명의 설문 응답 데이터를 Python으로 정제·분석, Matplotlib으로 시각화\n- 소득임계치(Income Threshold) 개념을 적용해 37개 구간 중 27개 구간에서 이동시간 단축 효과 증명\n\n**성과**\n- 한국항공우주학회 2024 추계학술대회 포스터 발표 및 논문 제출",
    },
    {
        id: "f6",
        title: "게 나이 예측 ML 프로젝트",
        summary: "회귀 모델을 활용해 게의 나이를 예측하는 데이터 분석 프로젝트, Codeit Boost 데모데이 대회 우수상 수상",
        role: "팀원",
        stack: ["Python", "Scikit-learn", "LightGBM", "XGBoost"],
        teamsize: 3,
        period: "2025.02",
        detail: "**과정**\n- 데이터 전처리 및 다양한 회귀 모델(Scikit-learn, LightGBM, XGBoost) 비교 실험\n- 교외 팀원들과 7일간 데모데이 준비\n\n**성과**\n- '게 나이 예측 머신러닝' 데모데이 대회에서 우수상 수상",
    },
];

export function useProjects() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase.from("projects").select("*");

            if (error || !data || data.length === 0) {
                if (error) console.error(error);
                setProjects(fallbackProjects);
                setLoading(false);
                return;
            }

            const mapped: Project[] = (data ?? []).map((row) => ({
                id: row.id,
                title: row.title,
                summary: row.summary,
                role: row.role,
                stack: row.stack,
                teamsize: row.team_size,
                period: row.period,
                imageUrl: row.image_url,
                galleryUrls: row.gallery_urls
                    ? row.gallery_urls.split(",").map((url: string) => url.trim())
                    : [],
                detail: row.detail,
                demoUrl: row.demo_url,
                githubUrl: row.github_url,
            }));

            setProjects(mapped);
            setLoading(false);
        }

        fetchProjects();
    }, []);

    return {projects, loading};
}