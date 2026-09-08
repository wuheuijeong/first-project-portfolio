import ProjectCard from "./ProjectCard";
import { useState } from "react";
import type { Project } from "../../../types";
import ProjectModal from "./ProjectModal";
import styles from "./Projects.module.css"
import { useProjects } from "../../../hooks/useProjects";

export default function Projects() {
    
    const { projects, loading } = useProjects();
    const [selected, setSelected] = useState<Project | null>(null);

    if (loading) return <p>로딩 중...</p>

    return (
        <div className = {styles.container}>
          <div className={styles.containerHeader}>
            <h2 className={styles.header}>PROJECTS</h2>
            <h3 className={styles.subHeader}>프로젝트</h3>
          </div>

            <ul className={styles.projectList}>
                {/* 카드 클릭 시 해당 프로젝트를 모달로 열기 */}
                {projects.map((project) => (
                    <li key={project.id} onClick={() => setSelected(project)}>
                        <ProjectCard
                            id={project.id}
                            title={project.title}
                            summary={project.summary}
                            role={project.role}
                            stack={project.stack}
                            teamsize={project.teamsize}
                            period={project.period}
                            imageUrl={project.imageUrl?.[0]}
                            detail={project.detail}
                            demoUrl={project.demoUrl}
                            githubUrl={project.githubUrl} 
                        />
                    </li>
                ))}
            </ul>
            {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}