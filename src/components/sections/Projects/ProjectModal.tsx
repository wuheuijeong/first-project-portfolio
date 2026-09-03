import type { Project } from "../../../types"

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>닫기</button>
        <h2>{project.title}</h2>
        <p>{project.detail}</p>
        {project.demoUrl && <a href={project.demoUrl}>배포 링크</a>}
        {project.githubUrl && <a href={project.githubUrl}>깃허브 링크</a>}
      </div>
    </div>
  );
}