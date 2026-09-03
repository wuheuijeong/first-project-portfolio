import type { BlogPost } from "../../../types";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({post}: BlogCardProps) {

    return (
        <a href={post.url} target="_blank" rel="noreferrer">
            <div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <p>{post.platform}, {post.date}</p>
            </div>
            <div>화살표</div>
        </a>
    )
}