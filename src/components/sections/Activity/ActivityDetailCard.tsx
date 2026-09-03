import type { ActivityDetail } from "../../../types";

interface ActivityDetailCardProps {
    detail: ActivityDetail;
}

export default function ActivityDetailCard({detail}: ActivityDetailCardProps) {

    return (
        <div>
            <div>
                <h3>{detail.fulltitle}</h3>
                <p>{detail.role}</p>
            </div>

            <div>
                <ul>
                    {detail.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                    ))}
                </ul>
            </div>
                
        </div>
    )

}