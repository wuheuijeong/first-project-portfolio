
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

export default function ProjectCard({id, title, summary, role, stack, teamsize, period, imageUrl, demoUrl, githubUrl}: ProjectCardProps) {
    return (
        <div className="project-card">
            <div>
                <div>
                    <img src={imageUrl} alt={title} />
                </div>

                <div>
                    <span>
                        <h2>{title}</h2>
                        <p>{demoUrl}</p>    
                        <p>{githubUrl}</p>
                    </span>

                    <span>
                        <p>{role}</p>
                        <p>{teamsize}</p>
                        <p>{period}</p>
                    </span>
                </div>

                <div>
                    {stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                    ))}
                </div>

                <div>
                    <p>{summary}</p>
                </div>
            </div>
        </div>
    )
}