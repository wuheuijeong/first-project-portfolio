import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { BlogPost } from "../types";

export function useBlogPosts() {

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogPosts() {
            const { data, error } = await supabase.from("blog_posts").select("*"); 

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            const mapped: BlogPost[] = (data ?? []).map((row) => ({
                id: row.id,
                title: row.title,
                summary: row.summary,
                platform: row.platform,
                date: row.post_date,
                url: row.url,
            }));

            setPosts(mapped);
            setLoading(false);
        }

        fetchBlogPosts();
    }, []);

    return { posts, loading };
}