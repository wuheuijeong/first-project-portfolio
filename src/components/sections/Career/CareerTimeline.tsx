import { Fragment } from "react";
import styles from "./CareerTimeline.module.css"
import heading from "../../../styles/SectionHeading.module.css";

// "\n"이 들어간 문자열을 줄바꿈으로 렌더링
function renderLines(text: string) {
    return text.split("\n").map((line, idx, lines) => (
        <Fragment key={idx}>
            {line}
            {idx < lines.length - 1 && <br />}
        </Fragment>
    ));
}

export default function CareerTimeliine() {

    // 타임라인에 표시할 경력 항목들
    const items = [
        {
            date: "2022.03",
            title: "성신여자대학교\nAI융합학부 입학",
            description: "AI융합학부 주전공으로\n대학 생활을 시작했습니다.",
        },
        {
            date: "2025.06",
            title: "카카오모빌리티 인턴",
            description: "P&C플랫폼사업팀에서 9개월 간\n서비스 운영 데이터를 다루고,\n신규 사업모델 기획과\n발표까지 경험했습니다.",
        },
        {
            date: "2026.02",
            title: "성신여자대학교 졸업",
            description: "4년간의 학업을 마쳤습니다.",
        },
        {
            date: "2026.07",
            title: "현대오토에버 모빌리티\nSW 스쿨 웹/앱 4기",
            description: "개발 구조를 이해하는 PM이 되고자\n웹/앱 풀스택 과정을 수강하고 있습니다.",
        },
    ];

    return (
        <div className={styles.container}>
            <div>
                <h2 className={heading.header}>CAREER</h2>
                <h3 className={heading.subheader}>지금까지의 여정</h3>
            </div>

            <div className={styles.career}>
                <div className={styles.line} />
                {items.map((item, idx) => (
                    <div key={idx} className={styles.item}>
                        <span className={styles.dot} />
                        <p className={styles.date}>{item.date}</p>
                        <h3 className={styles.title}>{renderLines(item.title)}</h3>
                        <p className={styles.description}>{renderLines(item.description)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}