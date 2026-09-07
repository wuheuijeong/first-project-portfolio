import SkillBox from "./SkillBox";
import styles from "./Skills.module.css"
import { useEffect, useState } from "react";


const skills = [
    { category: "BackEnd", icon: "/icons/Docker_icon.svg", title: "Docker", description: "Docker를 활용해 로컬 개발 환경을 컨테이너화하여 팀원 간 실행 환경 차이 문제를 해결했습니다. Dockerfile을 작성해 필요한 이미지를 직접 빌드해본 경험이 있으며, docker-compose로 여러 서비스를 함께 구동하는 멀티 컨테이너 구성도 다뤄봤습니다." },
    { category: "FrontEnd", icon: "/icons/React_icon.svg", title: "React", description: "Docker를 활용해 로컬 개발 환경을 컨테이너화하여 팀원 간 실행 환경 차이 문제를 해결했습니다. Dockerfile을 작성해 필요한 이미지를 직접 빌드해본 경험이 있으며, docker-compose로 여러 서비스를 함께 구동하는 멀티 컨테이너 구성도 다뤄봤습니다." },
    { category: "FrontEnd", icon: "/icons/JavaScript_icon.svg", title: "JavaScript", description: "Docker를 활용해 로컬 개발 환경을 컨테이너화하여 팀원 간 실행 환경 차이 문제를 해결했습니다. Dockerfile을 작성해 필요한 이미지를 직접 빌드해본 경험이 있으며, docker-compose로 여러 서비스를 함께 구동하는 멀티 컨테이너 구성도 다뤄봤습니다." },
    { category: "Data", icon: "/icons/JavaScript_icon.svg", title: "JavaScript", description: "Docker를 활용해 로컬 개발 환경을 컨테이너화하여 팀원 간 실행 환경 차이 문제를 해결했습니다. Dockerfile을 작성해 필요한 이미지를 직접 빌드해본 경험이 있으며, docker-compose로 여러 서비스를 함께 구동하는 멀티 컨테이너 구성도 다뤄봤습니다." },
    { category: "FrontEnd", icon: "/icons/JavaScript_icon.svg", title: "JavaScript", description: "Docker를 활용해 로컬 개발 환경을 컨테이너화하여 팀원 간 실행 환경 차이 문제를 해결했습니다. Dockerfile을 작성해 필요한 이미지를 직접 빌드해본 경험이 있으며, docker-compose로 여러 서비스를 함께 구동하는 멀티 컨테이너 구성도 다뤄봤습니다." }
]

const categories = ["Frontend", "BackEnd", "Data"];

export default function Skills() {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % categories.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const currentCategory = categories[currentIndex];
    const items = skills.filter((s) => s.category === currentCategory);

    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.header}>SKILLS</h2>
                <h3 className={styles.subheader}>기술 스택</h3>
            </div>

            <div className={styles.categoryTabs}>
                {categories.map((category, idx) => (
                    <button
                        key={category}
                        className={idx === currentIndex ? styles.activeTab : styles.tab}
                        onClick={() => setCurrentIndex(idx)}
                    >
                        {category.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className={styles.skillList}>
                {items.map((item, idx) => (
                    <SkillBox key={idx} icon={item.icon} title={item.title} description={item.description} />
                ))}
            </div>
        </div>
    );
}


// return (
//                         <div key={category} className={styles.categoryGroup}>
//                             <p className={styles.category}>{category.toUpperCase()}</p>
//                             <div>
//                                 {items.map((item, idx) => (
//                                     <SkillBox key={idx} icon={item.icon} title={item.title} description={item.description} />
//                                 ))}
//                             </div>
//                         </div>
//                     );