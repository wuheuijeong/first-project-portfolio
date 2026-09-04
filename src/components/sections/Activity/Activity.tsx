import type { ActivityEntry, ActivityDetail } from "../../../types"
import ActivityItem from "./ActivityItem";
import ActivityDetailCard from "./ActivityDetailCard";
import styles from "./Activity.module.css";
import { useActiveSecton } from "../../../hooks/useActiveSection";

const activities: ActivityEntry[] = [
  { id: "1", type: "해커톤", date: "2021.03", title: "HackDay 2023 최우수상", summary: "글로벌 해커톤 본선 진출" },
  { id: "2", type: "해커톤", date: "2024.05", title: "JUNCTION ASIA 2024", summary: "OCR 기반 데이터 처리 프로젝트" },
  // 나머지 2~3개 더
];

const activityDetails: ActivityDetail[] = [
  {
    
    entryId: "1",
    fulltitle: "JUNCTION ASIA 2024 해커톤",
    role: "Backend Developer",
    details: ["OCR 기반 데이터 처리 API 구현", "공공데이터 API 데이터 연동"],
  },
  {
    entryId: "2",
    fulltitle: "2번째 활동입니다.",
    role: "FrontEnd Developer",
    details: ["2-1 활동입니다.", "2-2 활동입니다."],
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
                    {activities.map((entry) => {                        
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
                        </div>
                        );
                    })}
                </div>

                {activeId && (
                    <div className={styles.floatingDetail} style={{ top: `${activeTop}px`}}>
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