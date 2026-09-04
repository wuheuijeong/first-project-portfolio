import styles from "./TechTag.module.css"

interface TechTagProps {
    children: React.ReactNode;
}

export default function TechTag({children}: TechTagProps) {
    return (
        <span className={styles.tag}>{children}</span>
    )
}