import SkillBox from "./SkillBox";


const skills = [
    {category: "BackEnd", icon: "🐳", title: "Docker", description: "Docker를 활용해 로컬 개발 환경을 컨테이너화하여 팀원 간 실행 환경 차이 문제를 해결했습니다. Dockerfile을 작성해 필요한 이미지를 직접 빌드해본 경험이 있으며, docker-compose로 여러 서비스를 함께 구동하는 멀티 컨테이너 구성도 다뤄봤습니다."},
    {category: "BackEnd", icon: "🐳", title: "Docker", description: "Docker를 활용해 로컬 개발 환경을 컨테이너화하여 팀원 간 실행 환경 차이 문제를 해결했습니다. Dockerfile을 작성해 필요한 이미지를 직접 빌드해본 경험이 있으며, docker-compose로 여러 서비스를 함께 구동하는 멀티 컨테이너 구성도 다뤄봤습니다."},
    {category: "BackEnd", icon: "🐳", title: "Docker", description: "Docker를 활용해 로컬 개발 환경을 컨테이너화하여 팀원 간 실행 환경 차이 문제를 해결했습니다. Dockerfile을 작성해 필요한 이미지를 직접 빌드해본 경험이 있으며, docker-compose로 여러 서비스를 함께 구동하는 멀티 컨테이너 구성도 다뤄봤습니다."}
]

const categories = ["Frontend", "BackEnd", "Data"];

export default function Skills() {

    return (
        <div>
            <h2>Skills</h2>
            <h3>기술 스택</h3>

            <div className="skill-list">
                {categories.map((category) => {
                    const items = skills.filter((s) => s.category === category);
                    if (items.length === 0) return null;

                    return (
                        <div key={category} className = "skill-boxes">
                            <p>{category.toUpperCase()}</p>
                            <div>
                                {items.map((item, idx) => (
                                    <SkillBox key={idx} icon={item.icon} title={item.title} description={item.description} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}