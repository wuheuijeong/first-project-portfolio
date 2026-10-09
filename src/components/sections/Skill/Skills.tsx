import SkillBox from "./SkillBox";
import styles from "./Skills.module.css";
import heading from "../../../styles/SectionHeading.module.css";
import { useState } from "react";
import { useSkills } from "../../../hooks/useSkills";


const categories = ["Frontend", "Backend", "Data", "Tools"];

export default function Skills() {
    const { skills, loading } = useSkills();
    const [currentIndex, setCurrentIndex] = useState(0);

    if (loading) return <p>로딩 중...</p>;

    // 현재 선택된 카테고리에 속한 스킬만 필터링
    const currentCategory = categories[currentIndex];
    const items = skills.filter((s) => s.category === currentCategory);

    return (
        <div className={styles.container}>
            <div>
                <h2 className={heading.header}>SKILL</h2>
                <h3 className={heading.subheader}>기술 스택</h3>
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
                {items.map((item) => (
                    <SkillBox key={item.id} title={item.title} description={item.description} />
                ))}
            </div>
        </div>
    );
}