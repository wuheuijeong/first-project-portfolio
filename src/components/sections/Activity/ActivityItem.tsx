// 타임라인 위 항목 1개

import type { ActivityEntry } from "../../../types";
import styles from "./ActivityItem.module.css"
import TechTag from "../../ui/TechTag/TechTag";


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
        <div className={styles.container}>
            
            <div className={styles.firstLine}>
                <TechTag key={entry.type}>{entry.type}</TechTag>
                <p>{entry.date}</p>
            </div>

            <div className={styles.title}>{entry.title}</div>

            <div className={styles.summary}>{entry.summary}</div>

        </div>
    )
}