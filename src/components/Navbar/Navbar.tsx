import styles from "./Navbar.module.css"
import { useState } from "react";

// 네브바에 표시할 섹션 목록
const NAV_ITEMS = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "career", label: "Career" },
    { id: "skills", label: "Skill" },
    { id: "activity", label: "Activity" },
    { id: "projects", label: "Project" },
    { id: "blog", label: "Blog" }
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // 클릭한 섹션으로 스크롤 이동 후 메뉴 닫기
    const handleNavClick = (id: string) => {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" }); // 부드럽게 이동하는 기능
        }
        setMenuOpen(false);
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.navInner}>
                <div className={styles.logo} onClick={() => handleNavClick("hero")}>
                    우희정's portfolio
                </div>

                <ul className={styles.navList}>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <button className={styles.navLink} onClick={() => handleNavClick(item.id)}>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* 화면이 좁아지면 navList 대신 이 버튼으로 메뉴 열고 닫기 */}
                <button
                    className={styles.menuToggle}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="메뉴 열기"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

                {menuOpen && (
                    <ul className={styles.mobileMenu}>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.id}>
                                <button className={styles.navLink} onClick={() => handleNavClick(item.id)}>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    )

}