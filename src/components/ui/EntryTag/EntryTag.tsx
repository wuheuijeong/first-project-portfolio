import styles from "./EntrtyTag.module.css";

interface EntryTagProps {
    children: React.ReactNode;
}

export default function TechTag({children}: EntryTagProps) {
    return (
        <span className={styles.tag}>{children}</span>
    )
}