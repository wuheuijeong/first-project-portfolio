// 타임라인 위 항목 1개

import type { ActivityEntry } from "../../../types";


interface ActivityItemProps {
    entry: ActivityEntry;
}

// interface ActivityDetail {
//     entryId: string;
//     fulltitle: string;
//     role: string;
//     details: string[]
// }

export default function ActivityItem({ entry }: ActivityItemProps) {
    
    return (
        <div>
            <div>
                <p>{entry.type}</p>
                <p>{entry.date}</p>
            </div>

            <div>
                <h3>{entry.title}</h3>
            </div>

            <div>
                <p>{entry.summary}</p>
            </div>
        </div>
    )
}