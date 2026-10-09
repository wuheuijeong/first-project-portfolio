import styles from "./Hero.module.css";
import LinkButton from "../../ui/LinkButton/LinkButton";
import myPhoto from "../../../assets/my_photo.jpeg"


export default function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={styles.title}>
                <span className={styles.titleLine}>데이터로 문제를 정의하고</span>
                <span className={styles.titleLine}>실행으로 상품을 증명합니다</span>
            </h1>

            <img src={myPhoto} alt="프로필" className={styles.image} />

            <div className={styles.textBlock}>
                <p className={styles.role}>Product Manager</p>
                <div className={styles.intro}>
                    <p>
                        안녕하세요, 우희정입니다. 현장의 데이터를 근거로 문제를 정의하고,{" "}
                        <span className={styles.nowrap}>상품·사업 기획</span>으로 풀어내는 일을 좋아합니다.
                    </p>
                    <p>
                        카카오모빌리티 주차사업팀 인턴 시절 제휴 주차장 운영 데이터를 직접 다루며 비효율을 발견했고, 이를{" "}
                        <span className={styles.nowrap}>'골목 주차 공유(PJ DIY)'</span> 신규 사업모델로 기획해 수익배분 구조 설계부터 사업팀 발표까지 주도했습니다.
                    </p>
                    <p>
                        반복되는 비효율을 그냥 넘기지 않고 <span className={styles.nowrap}>자동화 툴</span>로 직접 해결해본 경험은 클라우드·AI 인프라 같은 기술 기반 상품을 기획할 때도 실무자의 언어로 소통할 수 있는 역량으로 이어진다고 생각합니다.
                    </p>
                </div>

                {/* 연락처 및 외부 링크 모음 */}
                <div className={styles.linkGroup}>
                    <LinkButton href="mailto:..." external={false}>wuheuijeong@gmail.com</LinkButton>
                    <LinkButton href="https://github.com/wuheuijeong">GitHub</LinkButton>
                    <LinkButton href="https://velog.io/@wuheuijeong/posts">velog</LinkButton>
                    <LinkButton href="https://linkedin.com/...">LinkedIn</LinkButton>
                </div>
            </div>
        </div>
    );
}