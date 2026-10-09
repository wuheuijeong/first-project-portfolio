import { useState } from "react";
import type { ActivityEntry, ActivityDetail } from "../../../types"
import ActivityItem from "./ActivityItem";
import ActivityDetailCard from "./ActivityDetailCard";
import styles from "./Activity.module.css";
import heading from "../../../styles/SectionHeading.module.css";

// 타임라인에 표시할 활동 목록. 내용이 풍부한 3개만 펼칠 수 있고(아래 activityDetails 참고),
// 나머지는 펼침 없이 핵심 한 줄(highlight)만 바로 보여줌
const activities: ActivityEntry[] = [
  {
    id: "1",
    type: "학회",
    date: "2024.11",
    title: "한국항공우주학회 2024 추계학술대회",
    summary: "UAM 수요예측 분석 연구 포스터 발표 및 논문 제출",
  },
  {
    id: "2",
    type: "연구",
    date: "2024.05 ~ 2024.11",
    title: "UROP 학부생 연구 참여",
    summary: "성신여대 Spider Lab, 팀장으로 UAM 수요예측 분석 프로젝트 주도",
  },
  {
    id: "3",
    type: "스터디",
    date: "2022.03 ~ 2023.12",
    title: "AI융합학부 프로그래밍 언어 소모임",
    summary: "Python/C++ 알고리즘 스터디 참여",
    highlight: "교내 SW경진대회 출전 및 후배 대상 교육콘텐츠 제작",
  },
  {
    id: "4",
    type: "동아리",
    date: "2024.04 ~ 2024.09",
    title: "데이터 분석 대학 연합동아리 WEIT",
    summary: "데이터분석·머신러닝 스터디 진행",
    highlight: "대한항공-아시아나 합병 분석 프로젝트 수행",
  },
  {
    id: "5",
    type: "부트캠프",
    date: "2024.10 ~ 2025.02",
    title: "Codeit Boost 데이터 분석 부트캠프",
    summary: "데이터애널리스트입문·Python기초 과정 수료",
    highlight: "'게 나이 예측 머신러닝' 프로젝트로 데모데이 우수상 수상",
  },
  {
    id: "6",
    type: "인턴",
    date: "2025.06 ~ 2026.03",
    title: "카카오모빌리티 인턴 (주차사업팀)",
    summary: "'골목 주차 공유' 신규 사업 기획부터 업무 자동화까지",
  },
];

// 펼쳤을 때 보여줄 상세 내용 (학회·UROP·카카오모빌리티 인턴 3개만 존재 = 펼침 가능 항목)
const activityDetails: ActivityDetail[] = [
  {
    entryId: "1",
    org: "서울 지역 대학(원)생 대상 UAM 수요예측 분석",
    roleNote: "제1저자 · 팀장",
    metrics: ["설문 115명"],
    points: [
      { label: "연구", text: "서울 지역 대학(원)생 대상 UAM 수요예측 분석 연구 설계" },
      { label: "분석", text: "115명 설문 데이터를 Python으로 정제·분석, Matplotlib으로 시각화" },
    ],
  },
  {
    entryId: "2",
    org: "UAM 수요 예측 분석 및 버티포트 입지 선정 연구",
    roleNote: "팀장",
    metrics: ["37개 중 27개 구간 단축"],
    points: [
      { label: "총괄", text: "연구방향 설정, 역할분담, 설문설계, 데이터분석, 논문작성 총괄" },
      { label: "분석", text: "소득 임계치(Income Threshold) 개념 적용, 37개 구간 중 27개 구간 이동시간 단축 효과 증명" },
    ],
    skills: ["Python"],
    relatedProject: true,
  },
  {
    entryId: "6",
    org: "카카오모빌리티 P&C플랫폼사업팀",
    metrics: ["부사장 보고 채택", "입력 시간 −90%", "검수 시간 −60%"],
    points: [
      { label: "기획", text: "설비 투자 부담 없는 '골목 주차 공유(PJ DIY)' 사업모델 기획, 수익배분 구조 설계 → 사업팀 발표 → 부사장 보고 안건 채택" },
      { label: "분석", text: "수수료율·정산 특약 등 운영 데이터를 분석해 신규 상품 성과 측정, TF 회고에 반영" },
      { label: "자동화", text: "현장 감시 프로그램·대량 수정 매크로 등 업무 자동화 툴 4종 직접 기획·구현" },
    ],
    skills: ["JavaScript", "Selenium"],
    relatedProject: true,
  },
];

export default function Activity() {
  // 기본은 전부 닫힌 상태, 한 번에 하나만 펼쳐짐
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.activityArea}>
      <div>
        <h2 className={heading.header}>ACTIVITY</h2>
        <h3 className={heading.subheader}>활동</h3>
      </div>

      <div className={styles.timebox}>
        <div className={styles.timeline} />

        {activities.map((entry) => {
          const isExpanded = openId === entry.id;
          const detail = activityDetails.find((d) => d.entryId === entry.id);
          const expandable = !!detail;

          return (
            <div className={styles.oneActivity} key={entry.id}>
              <div
                className={expandable ? styles.entryHeader : `${styles.entryHeader} ${styles.entryStatic}`}
                role={expandable ? "button" : undefined}
                tabIndex={expandable ? 0 : undefined}
                aria-expanded={expandable ? isExpanded : undefined}
                onClick={expandable ? () => toggleExpand(entry.id) : undefined}
                onKeyDown={
                  expandable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleExpand(entry.id);
                        }
                      }
                    : undefined
                }
              >
                <span className={`${styles.timelineDot} ${isExpanded ? styles.timelineDotActive : ""}`} />

                <div className={styles.activityItem}>
                  <ActivityItem entry={entry} hideSummary={isExpanded} />
                </div>

                {expandable && (
                  <svg
                    className={isExpanded ? styles.chevronOpen : styles.chevron}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {detail && (
                <div className={`${styles.expandWrapper} ${isExpanded ? styles.expanded : ""}`}>
                  <div className={styles.expandInner}>
                    <ActivityDetailCard detail={detail} entryType={entry.type} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}
