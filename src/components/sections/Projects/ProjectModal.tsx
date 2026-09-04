import type { Project } from "../../../types"
import styles from "./ProjectModal.module.css"
import TechTag from "../../ui/TechTag/TechTag";
import { useEffect } from "react";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {

  useEffect(() => {
    document.body.style.overflow = "hidden"; //모달 열려있는 동안 배경 스크롤 금지

    return() => {
      document.body.style.overflow = ""; // 모달 닫히면 다시 스크롤 가능하도록
    };
  }, []);


  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <button onClick={onClose} className={styles.closeButton}>
          <img src="/icons/Close_icon.svg" alt="닫기" width={20} height={20} />
        </button>

        <div className={styles.fixedArea}>
          <div className={styles.firstline}>
            <h2 className={styles.title}>{project.title}</h2>

            <div className={styles.icon}>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <img src="/icons/Link_icon.svg" alt="링크" width={16} height={16} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <img src="/icons/Github_icon.svg" alt="깃허브" width={16} height={16} />
                </a>
              )}
            </div>
          </div>


          <div className={styles.stackRow}>
            {project.stack.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>

          <p className={styles.secondline}>
            {project.role} · {project.teamsize}인 · {project.period}
          </p>

          <p className={styles.summary}>{project.summary}</p>

          <div className={styles.gallery}>
            {project.imageUrl?.map((url, idx) => (
              <img key={idx} src={url} alt={`${project.title} 이미지 ${idx + 1}`} className={styles.galleryImage} />
            ))}
          </div>
        </div>

        <div className={styles.scrollArea}>
          <p className={styles.detail}>{project.detail}</p>
        </div>
      </div>
    </div>
  );
}