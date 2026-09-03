import ProjectCard from "./ProjectCard";

const projects = [
    { id: "1", title: "Porftfolio Projects", summary: "현대오토에버 모빌리티 SW 스쿨 첫 번째 프로젝트, 개인 포트폴리오 만들기", role: "프론트엔드 리드",  stack: ["JavaScript", "Java"], teamsize:3 ,  
        period:" ", imageUrl: "https://via.placeholder.com/280x160", detail: "", demoUrl:"", githubUrl: ""}
]

// const [selected, setSelected] = useState<Project | null>(null);

export default function Projects() {

    return (

        <div>
            <h2>PROJECTS</h2>
            <h3>프로젝트</h3>

            <ul className="project-list">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        summary={project.summary}
                        role={project.role}
                        stack={project.stack}
                        teamsize={project.teamsize}
                        period={project.period}
                        imageUrl={project.imageUrl}
                        detail={project.detail}
                        demoUrl={project.demoUrl}
                        githubUrl={project.githubUrl} 
                    />
                ))}
            </ul>
        </div>


    )

}