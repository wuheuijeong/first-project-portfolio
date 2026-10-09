import styles from "./TechTag.module.css"

interface TechTagProps {
    children: React.ReactNode;
    subtle?: boolean;
}

export default function TechTag({children, subtle}: TechTagProps) {
    return (
        <span className={subtle ? `${styles.tag} ${styles.subtle}` : styles.tag}>{children}</span>
    )
}