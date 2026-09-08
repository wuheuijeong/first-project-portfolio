import styles from "./CareerTimeline.module.css"
import heading from "../../../styles/SectionHeading.module.css";

export default function CareerTimeliine() {

    // 타임라인에 표시할 경력 항목들
    const items = [
        {
            date: "2022.03",
            title: "성신여자대학교 AI융합학부 입학",
            description: "AI융합학부 주전공으로 대학 생활을 시작했습니다.",
        },
        {
            date: "2025.06",
            title: "카카오모빌리티 인턴",
            description: "카카오모빌리티 주차 사업팀에서 9개월 간 인턴으로 근무했습니다.",
        },
        {
            date: "2026.02",
            title: "성신여자대학교 졸업",
            description: "4년간의 학업을 마쳤습니다.",
        },
        {
            date: "2026.09",
            title: "현대오토에버 모빌리티 SW 스쿨 웹/앱 4기",
            description: "웹/앱 풀스택 과정을 수강하며 프론트엔드 개발 역량을 집중적으로 쌓고 있습니다.",
        },
    ];

    return (
        <div className={styles.container}>
            <div>
                <h2 className={heading.header}>CAREER</h2>
                <h3 className={`${heading.subheader} ${styles.subheader}`}>지금까지의 여정</h3>
            </div>

            <div className={styles.career}>
                <div className={styles.line} />
                {items.map((item, idx) => (
                    <div key={idx} className={styles.item}>
                        <p className={styles.date}>{item.date}</p>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.description}>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}