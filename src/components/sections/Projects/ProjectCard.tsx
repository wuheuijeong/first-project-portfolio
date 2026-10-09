import styles from "./ProjectCard.module.css"
import TechTag from "../../ui/TechTag/TechTag";

export interface ProjectCardProps {
    id: string;
    title: string;
    summary: string;
    role: string;
    stack: string[];
    teamsize: number;
    period: string;
    imageUrl?: string;
    detail: string;
    demoUrl?: string;
    githubUrl?: string;
}

export default function ProjectCard({title, summary, role, stack, teamsize, period, imageUrl, demoUrl, githubUrl}: ProjectCardProps) {
    return (
        <div className={styles.projectcard}>
            {(demoUrl || githubUrl) && (
                <div className={styles.cardIcons}>
                    {/* 링크 클릭이 카드 클릭 이벤트로 전파되어 모달이 열리는 것 방지 */}
                    {demoUrl && (
                        <a href={demoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className={styles.iconButton}>
                            <img src="/icons/Link_icon.svg" alt="링크" width={14} height={14} />
                        </a>
                    )}
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className={styles.iconButton}>
                            <img src="/icons/Github_icon.svg" alt="깃허브" width={14} height={14} />
                        </a>
                    )}
                </div>
            )}

            <div className={styles.layout}>
                <div className={styles.image}>
                    {imageUrl ? (
                        <img src={imageUrl} alt={title} className={styles.firstimage} loading="lazy" />
                    ) : (
                        <div className={styles.imagePlaceholder}>{title.slice(0, 1)}</div>
                    )}
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>

                    <p className={styles.secondline}>
                        {role} · {teamsize}인 · {period}
                    </p>

                    <p className={styles.summary}>{summary}</p>

                    <div className={styles.stackRow}>
                        {stack.map((tech) => (
                            <TechTag key={tech}>{tech}</TechTag>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}