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

    useEffect(() => {
        if (isHeld) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % categories.length);
        }, AUTO_INTERVAL);

        return () => clearInterval(timer);
    }, [isHeld]);

    const handleClick = (idx: number) => {
        setCurrentIndex(idx);
        setIsHeld(true);
        setTimeout(() => setIsHeld(false), HOLD_DURATION);
    };

    if (loading) return <p>로딩 중...</p>;

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