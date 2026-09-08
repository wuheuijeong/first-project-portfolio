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
            <div className={styles.layout}>
                <div className={styles.image}>
                    <img src={imageUrl} alt={title} className={styles.firstimage}/>
                </div>

                <div className={styles.content}>
                    <span className={styles.firstline}>
                        <h2 className = {styles.title}>{title}</h2>
                        <div className= {styles.icon}>
                            {/* 링크 클릭이 카드 클릭 이벤트로 전파되어 모달이 열리는 것 방지 */}
                            {demoUrl && (
                                <a href={demoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <img src="/icons/Link_icon.svg" alt="링크" width={16} height={16} />
                                </a>
                            )}
                            {githubUrl && (
                                <a href={githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <img src="/icons/Github_icon.svg" alt="깃허브" width={16} height={16} />
                                </a>
                            )}
                        </div>
                    </span>

                    <p className={styles.secondline}>
                        {role} · {teamsize}인 · {period}
                    </p>
                

                    <div className={styles.stackRow}>
                        {stack.map((tech) => (
                            <TechTag key={tech}>{tech}</TechTag>
                        ))}
                    </div>

                    <div>
                        <p className={styles.summary}>{summary}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}