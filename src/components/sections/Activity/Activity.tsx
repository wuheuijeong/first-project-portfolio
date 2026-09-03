import type { ActivityEntry, ActivityDetail } from "../../../types"
import ActivityItem from "./ActivityItem";
import ActivityDetailCard from "./ActivityDetailCard";

const activities: ActivityEntry[] = [
  { id: "1", type: "해커톤", date: "2021.03", title: "HackDay 2023 최우수상", summary: "글로벌 해커톤 본선 진출" },
  { id: "2", type: "해커톤", date: "2024.05", title: "JUNCTION ASIA 2024", summary: "OCR 기반 데이터 처리 프로젝트" },
  // 나머지 2~3개 더
];

const activityDetails: ActivityDetail[] = [
  {
    entryId: "2",
    fulltitle: "JUNCTION ASIA 2024 해커톤",
    role: "Backend Developer",
    details: ["OCR 기반 데이터 처리 API 구현", "공공데이터 API 데이터 연동"],
  },
  // detail 있는 항목만 넣기
];

export default function Activity() {

    return (
        <div>
            <div>
                <h2>ACTIVITY</h2>
                <h3>활동</h3>
            </div>


            <div>
                {activities.map((entry) => {
                    const detail = activityDetails.find((d) => d.entryId === entry.id);
                    
                    return (
                    <div key={entry.id}>
                        <ActivityItem entry={entry} />
                        {detail && <ActivityDetailCard detail={detail} />}
                    
                    </div>
                    );
                })}
            </div>
        </div>
    )

}