import type { BlogPost } from "../../../types";
import styles from "./BlogCard.module.css"

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({post}: BlogCardProps) {

    return (
        <a className={styles.blogcard} href={post.url} target="_blank" rel="noreferrer">
            <div className={styles.content}>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.summary}>{post.summary}</p>
                <p className={styles.meta}>{post.platform}, {post.date}</p>
            </div>
            <img className={styles.arrow} src="public/icons/Arrow_icon.svg" />
        </a>
    )
}