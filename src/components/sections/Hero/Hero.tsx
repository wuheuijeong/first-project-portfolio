import styles from "./Hero.module.css";
import LinkButton from "../../ui/LinkButton/LinkButton";


export default function Hero() {
  return (
        <div className={styles.hero}>
            <h1 className={styles.title}>
                사용자의 시간을 아껴주는<br />
                인터페이스를 만듭니다
                </h1>

            <div className={styles.bottomRow}>
                <div className={styles.left}>
                <div>
                    <p className={styles.role}>Frontend Developer</p>
                    <p className={styles.intro}>
                    안녕하세요, 우희정입니다. React/TypeScript 기반 프로덕트를 만들고 데이터로 검증하는 일을 좋아합니다. 작은 디테일이 큰 신뢰를 만든다고 믿어요.
                    </p>
                </div>

                <div className={styles.linkGroup}>
                    <LinkButton href="mailto:..." external={false}>wuheuijeong@gmail.com</LinkButton>
                    <LinkButton href="https://github.com/wuheuijeong">GitHub</LinkButton>
                    <LinkButton href="https://velog.io/@wuheuijeong/posts">velog</LinkButton>
                    <LinkButton href="https://linkedin.com/...">Linkedin</LinkButton>
                </div>
            </div>

            <img src="src/assets/images.jpeg" alt="프로필" className={styles.image} />
        </div>
    </div>
  );
}