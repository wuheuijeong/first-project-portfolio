import styles from "./SkillBox.module.css"


interface SkillBoxProps {
    icon: string;
    title: string;
    description: string;
}

export default function SkillBox({icon, title, description}: SkillBoxProps) {
    return (
        <div className={styles.skillbox}>
            <div className={styles.boxheader}>
                <img src={icon} alt={title} width={30} height={30} />
                <span>{title}</span>
            </div>
            <p className={styles.boxdescription}>{description}</p>
        </div>
    );
}