import styles from "./Hero.module.css";
import LinkButton from "../../ui/LinkButton/LinkButton";
import myPhoto from "../../assets/my_photo.jpeg"


export default function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={styles.title}>
                자동화로 시간을 아끼고<br />
                디테일로 신뢰를 채웁니다<br />
            </h1>

            <img src={myPhoto} alt="프로필" className={styles.image} />

            <div className={styles.textBlock}>
                <p className={styles.role}>Frontend Developer</p>
                <p className={styles.intro}>
                    안녕하세요, 우희정입니다. React/TypeScript 기반 프로덕트를 만들고 데이터로 검증하는 일을 좋아합니다. 작은 디테일이 큰 신뢰를 만든다고 믿기에, 화면 하나를 만들 때도 실제로 그 화면을 쓰는 사람의 입장에서 다시 한번 생각해보려 합니다. 반복되는 비효율을 발견하면 그냥 넘기지 않고 코드로 직접 해결해보는 편이고, 그 과정에서 얻은 경험을 다음 문제 해결에 쌓아가고 있습니다.
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