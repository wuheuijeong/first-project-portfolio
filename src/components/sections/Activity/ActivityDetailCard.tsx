import { Fragment } from "react";
import type { ActivityDetail } from "../../../types";
import styles from "./ActivityDetailCard.module.css"
import TechTag from "../../ui/TechTag/TechTag";

interface ActivityDetailCardProps {
    detail: ActivityDetail;
    entryType: string;
}

export default function ActivityDetailCard({ detail, entryType }: ActivityDetailCardProps) {
    const showRoleNote = !!detail.roleNote && detail.roleNote !== entryType;

    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={styles.card}>
            <p className={styles.org}>
                {detail.org}
                {showRoleNote && ` · ${detail.roleNote}`}
            </p>

            {detail.metrics && detail.metrics.length > 0 && (
                <div className={styles.metrics}>
                    {detail.metrics.map((metric) => (
                        <span className={styles.metric} key={metric}>{metric}</span>
                    ))}
                </div>
            )}

            <div className={styles.list}>
                {detail.points.map((point, idx) => (
                    <Fragment key={idx}>
                        <div className={styles.listLabel}>{point.label}</div>
                        <div className={styles.listText}>{point.text}</div>
                    </Fragment>
                ))}
            </div>

            {(detail.skills?.length || detail.relatedProject) && (
                <div className={styles.footer}>
                    {detail.skills && detail.skills.length > 0 && (
                        <div className={styles.skillsRow}>
                            {detail.skills.map((skill) => (
                                <TechTag key={skill} subtle>{skill}</TechTag>
                            ))}
                        </div>
                    )}

                    {detail.relatedProject && (
                        <button type="button" className={styles.relatedLink} onClick={scrollToProjects}>
                            관련 프로젝트 보기 →
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
