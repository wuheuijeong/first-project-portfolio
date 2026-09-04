import styles from "./CareerTimeline.module.css"

export default function CareerTimeliine() {
     
    const items = [
        {date: "2022.03", title: "성신여자대학교 AI 융합학부 입학", description:"대학교에 입학했습니다."},
        {date: "2025.09", title: "카카오모빌리티 인턴 (9개월)", description:"주차사업팀 인턴 9개월"},
        {date: "2026.02", title: "2번", description:"2번입니다."},
        {date: "2026.12", title: "현대오토에버 SW 모빌리티 스쿨 웹/앱 4기 수료", description:"3번입니다."}
    ];

    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.header}>CAREER</h2>
                <h3 className={styles.subheader}>지금까지의 여정</h3>
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