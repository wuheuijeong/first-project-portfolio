interface SkillBoxProps {
    icon: string;
    title: string;
    description: string;
}

export default function SkillBox({icon, title, description}: SkillBoxProps) {
    return (
        <div className="skillbox">
            <div className="skillbox-header">
                <span>{icon} {title}</span>
            </div>
            <p>{description}</p>
        </div>
    );
}