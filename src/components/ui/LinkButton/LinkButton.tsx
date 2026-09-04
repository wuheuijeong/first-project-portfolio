import styles from "./LinkButton.module.css";

interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    external?: boolean;
}

export default function LinkButton({href, children, external = true}: LinkButtonProps) {
    return (

        < a href={href}
        className={styles.linkButton}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        >
            <span className={styles.dot} />
            {children}
        </a>
    );
}