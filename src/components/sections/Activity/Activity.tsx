import type { ActivityEntry, ActivityDetail } from "../../../types"
import ActivityItem from "./ActivityItem";
import ActivityDetailCard from "./ActivityDetailCard";
import styles from "./Activity.module.css";
import { useActiveSecton } from "../../../hooks/useActiveSection";

// 타임라인에 표시할 활동 목록
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
    summary: "Python/C++ 알고리즘 스터디 및 교내 SW경진대회 출전",
  },
  {
    id: "4",
    type: "동아리",
    date: "2024.04 ~ 2024.09",
    title: "데이터 분석 대학 연합동아리 WEIT",
    summary: "대한항공-아시아나 합병 분석 프로젝트 진행",
  },
  {
    id: "5",
    type: "부트캠프",
    date: "2024.10 ~ 2025.02",
    title: "Codeit Boost 데이터 분석 부트캠프",
    summary: "데이터애널리스트입문·Python기초 과정 수료, 데모데이 대회 우수상",
  },
  {
    id: "6",
    type: "인턴",
    date: "2025.06 ~ 2026.03",
    title: "카카오모빌리티 인턴 (주차사업팀)",
    summary: "JavaScript·Selenium 기반 업무 자동화 툴 4종 개발, 반복 입력 시간 90% 단축",
  },
];

// 각 활동을 클릭했을 때 보여줄 상세 내용
const activityDetails: ActivityDetail[] = [
  {
    entryId: "1",
    fulltitle: "한국항공우주학회 2024 추계학술대회",
    role: "제1저자 · 팀장",
    details: [
      "서울 지역 대학(원)생 대상 UAM 수요예측 분석 연구",
      "115명 설문 데이터를 Python으로 정제·분석, Matplotlib 시각화",
    ],
  },
  {
    entryId: "2",
    fulltitle: "UROP - UAM 수요 예측 분석 및 버티포트 입지 선정 연구",
    role: "팀장",
    details: [
      "연구방향 설정, 역할분담, 설문설계, 데이터분석, 논문작성 총괄",
      "소득 임계치(Income Threshold) 개념 적용, 37개 구간 중 27개 구간 이동시간 단축 효과 증명",
    ],
  },
  {
    entryId: "3",
    fulltitle: "AI융합학부 프로그래밍 언어 소모임",
    role: "팀원",
    details: [
      "Python/C++ 알고리즘 스터디 진행",
      "교내 SW경진대회 출전 및 후배 대상 교육콘텐츠 제작",
    ],
  },
  {
    entryId: "4",
    fulltitle: "데이터 분석 대학 연합동아리 WEIT",
    role: "팀원",
    details: [
      "데이터분석 및 머신러닝 스터디 진행",
      "대한항공-아시아나 합병 분석 프로젝트 수행",
    ],
  },
  {
    entryId: "5",
    fulltitle: "Codeit Boost 데모데이 대회",
    role: "참가자",
    details: [
      "'게 나이 예측 머신러닝' 프로젝트로 우수상 수상",
      "코드잇 데이터애널리스트입문·Python기초 과정 수료",
    ],
  },
  {
    entryId: "6",
    fulltitle: "카카오모빌리티 P&C플랫폼사업팀 인턴",
    role: "인턴",
    details: [
      "수수료·특약 현장 감시 프로그램, 대량 수정 자동 매크로 등 업무 자동화 툴 4종을 JavaScript·Selenium 기반으로 직접 기획 및 구현",
      "Admin 페이지 구조 충돌로 발생한 스크립트 에러를 브라우저 개발자도구로 분석·해결, 반복 입력 시간 90% 단축·검수 시간 60% 단축 달성",
    ],
  },
];

export default function Activity() {
  const { activeId, activeTop, setRef } = useActiveSecton();

  return (
    <div className={styles.activityArea}>
      <div>
        <h2 className={styles.header}>ACTIVITY</h2>
        <h3 className={styles.subheader}>활동</h3>
      </div>

      <div className={styles.container}>
        <div className={styles.timeline} />
        <div className={styles.timebox}>
          {/* 타임라인 목록, 활성화된 항목 바로 아래 상세 카드 인라인 표시 */}
          {activities.map((entry) => {
            const isActive = entry.id === activeId;
            const detail = activityDetails.find((d) => d.entryId === entry.id);

            return (
              <div
                className={styles.oneActivity}
                key={entry.id}
                data-id={entry.id}
                ref={setRef(entry.id)}
              >
                <div className={styles.activityItem}>
                  <ActivityItem entry={entry} />
                </div>

                {isActive && detail && (
                  <div className={styles.inlineDetail}>
                    <ActivityDetailCard detail={detail} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 스크롤 위치에 따라 활성 항목 옆에 떠있는 상세 카드 */}
        {activeId && (
          <div className={styles.floatingDetail} style={{ top: `${activeTop}px` }}>
            {(() => {
              const detail = activityDetails.find((d) => d.entryId === activeId);
              return detail && <ActivityDetailCard detail={detail} />;
            })()}
          </div>
        )}
      </div>
    </div>
  )
}