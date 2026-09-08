import SkillBox from "./SkillBox";
import styles from "./Skills.module.css";
import { useState, useEffect } from "react";
import { useSkills } from "../../../hooks/useSkills";


const categories = ["Frontend", "Backend", "Data"];
const AUTO_INTERVAL = 3000;
const HOLD_DURATION = 10000;

export default function Skills() {
    const { skills, loading } = useSkills();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHeld, setIsHeld] = useState(false);

    // 클릭으로 고정되지 않은 동안 카테고리를 자동으로 순환
    useEffect(() => {
        if (isHeld) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % categories.length);
        }, AUTO_INTERVAL);

        return () => clearInterval(timer);
    }, [isHeld]);

    // 탭 클릭 시 해당 카테고리로 고정하고 일정 시간 뒤 자동 순환 재개
    const handleClick = (idx: number) => {
        setCurrentIndex(idx);
        setIsHeld(true);
        setTimeout(() => setIsHeld(false), HOLD_DURATION);
    };

    if (loading) return <p>로딩 중...</p>;

    // 현재 선택된 카테고리에 속한 스킬만 필터링
    const currentCategory = categories[currentIndex];
    const items = skills.filter((s) => s.category === currentCategory);

    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.header}>SKILL</h2>
                <h3 className={styles.subheader}>기술 스택</h3>
            </div>

            <div className={styles.categoryTabs}>
                {categories.map((category, idx) => (
                    <button
                        key={category}
                        className={idx === currentIndex ? styles.activeTab : styles.tab}
                        onClick={() => handleClick(idx)}
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