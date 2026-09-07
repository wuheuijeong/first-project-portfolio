import styles from "./Contact.module.css"
import LinkButton from "../../ui/LinkButton/LinkButton";


export default function Closing() {
    return(
        <div className={styles.container}>
            <div className={styles.closing}>
                <h2 className={styles.headMessage}>여기까지 봐주셔서 감사합니다.</h2>
                <p className={styles.subMessage}>더 나은 제품을 만드는 과정을 좋아합니다. 함께 일하고 싶으시다면 편하게 연락 주세요.</p>
            </div>
            <LinkButton href="mailto:wuheuijeong@gmail.com" external={false}>이메일 보내기: wuheuijeong@gmail.com</LinkButton>
        </div>

    )
}