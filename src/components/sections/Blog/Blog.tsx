import BlogCard from "./BlogCard";
import styles from "./Blog.module.css"

const posts = [
    {id: "1", title: "디자인시스템 컴포넌트 네이밍 원칙 정리", summary:"원칙을 상세하게 정리했습니다.", platform: "Velog", date:"2024.08.23", url: "https://velog.com"},
    {id: "2", title: "디자인시스템 컴포넌트 네이밍 원칙 정리", summary:"원칙을 상세하게 정리했습니다.", platform: "Velog", date:"2024.08.23", url: "https://velog.com"},
    {id: "3", title: "디자인시스템 컴포넌트 네이밍 원칙 정리", summary:"원칙을 상세하게 정리했습니다.", platform: "Velog", date:"2024.08.23", url: "https://velog.com"},
    {id: "4", title: "디자인시스템 컴포넌트 네이밍 원칙 정리", summary:"원칙을 상세하게 정리했습니다.", platform: "Velog", date:"2024.08.23", url: "https://velog.com"}
]

export default function Blog() {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>BLOGS</h2>
            <h3 className={styles.subheader}>공부하고 기록한 글들</h3>

            <ul className={styles.blogcard}>
                {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
            </ul>
        </div>
    )
}