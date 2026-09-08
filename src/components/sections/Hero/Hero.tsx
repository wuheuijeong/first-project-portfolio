import styles from "./Hero.module.css";
import LinkButton from "../../ui/LinkButton/LinkButton";


export default function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={styles.title}>
                자동화로 시간을 아끼고<br />
                디테일로 신뢰를 채웁니다<br />
            </h1>

            <img src="src/assets/my_photo.jpeg" alt="프로필" className={styles.image} />

            <div className={styles.textBlock}>
                <p className={styles.role}>Frontend Developer</p>
                <p className={styles.intro}>
                    안녕하세요, 우희정입니다. React/TypeScript 기반 프로덕트를 만들고 데이터로 검증하는 일을 좋아합니다. 작은 디테일이 큰 신뢰를 만든다고 믿어요.
                </p>

                {/* 연락처 및 외부 링크 모음 */}
                <div className={styles.linkGroup}>
                    <LinkButton href="mailto:..." external={false}>wuheuijeong@gmail.com</LinkButton>
                    <LinkButton href="https://github.com/wuheuijeong">GitHub</LinkButton>
                    <LinkButton href="https://velog.io/@wuheuijeong/posts">velog</LinkButton>
                    <LinkButton href="https://linkedin.com/...">Linkedin</LinkButton>
                </div>
            </div>
        </div>
    );
}