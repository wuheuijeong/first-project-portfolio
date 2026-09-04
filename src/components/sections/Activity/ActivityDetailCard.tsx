import type { ActivityDetail } from "../../../types";
import styles from "./ActivityDetailCard.module.css"

interface ActivityDetailCardProps {
    detail: ActivityDetail;
}

export default function ActivityDetailCard({detail}: ActivityDetailCardProps) {

    return (
        <div className={styles.card}>
            <div>
                <h3 className={styles.fulltitle}>{detail.fulltitle}</h3>
                <p className={styles.role}>{detail.role}</p>
            </div>

            <div>
                <ul className={styles.detail}>
                    {detail.details.map((detail, idx) => (
                        <li className={styles.listli} key={idx}>{detail}</li>
                    ))}
                </ul>
            </div>
                
        </div>
    )

}