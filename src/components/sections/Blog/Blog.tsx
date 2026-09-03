import BlogCard from "./BlogCard";

const posts = [
    {id: "1", title: "디자인시스템 컴포넌트 네이밍 원칙 정리", summary:"원칙을 상세하게 정리했습니다.", platform: "Velog", date:"2024.08.23", url: "https://velog.com"}
]

export default function Blog() {
    return (
        <div>
            <h2>BLOGS</h2>
            <h3>공부하고 기록한 글들</h3>

            <ul>
                {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
            </ul>
        </div>
    )
}