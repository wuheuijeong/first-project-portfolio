import BlogCard from "./BlogCard";
import styles from "./Blog.module.css"
import heading from "../../../styles/SectionHeading.module.css";
import { useBlogPosts } from "../../../hooks/useBlogPosts";


export default function Blog() {

    const { posts, loading } = useBlogPosts();

    if (loading) return <p>로딩 중...</p>

    return (
        <div className={styles.container}>
            <h2 className={heading.header}>BLOG</h2>
            <h3 className={`${heading.subheader} ${styles.subheader}`}>공부하고 기록한 글들</h3>

            <ul className={styles.list}>
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </ul>
        </div>
    )
}