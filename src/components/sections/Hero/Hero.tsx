import styles from "./Hero.module.css"

export default function Hero() {
    return (
        <div>
            <h1>
                사용자의 시간을 아껴주는 인터페이스를 만듭니다.
            </h1>

            <h2>
                Frontend Develpoer
            </h2>

            <p>
                안녕하세요, 우희정입니다. React/TypeScript 기반 프로덕트를 만들고 데이터로 검증하는 일을 좋아합니다. 작은 디테일이 큰 신뢰를 만든다고 믿어요. 
            </p>

            <div className={styles.linkGroup}>
                <a href="mailto:wuheuijeong@gmail.com">wuheuijeong@gmail.com</a>
                <a href="https://github.com/본인아이디">GitHub</a>
                <a href="https://velog.io/@본인아이디">velog</a>
                <a href="https://linkedin.com/in/본인아이디">Linkedin</a>
            </div>
        </div>
    )
}