import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Project } from "../types";

export function useProjects() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase.from("projects").select("*");

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            const mapped: Project[] = (data ?? []).map((row) => ({
                id: row.id,
                title: row.title,
                summary: row.summary,
                role: row.role,
                stack: row.stack,
                teamsize: row.team_size,
                period: row.period,
                imageUrl: row.image_url,
                galleryUrls: row.gallery_urls
                    ? row.gallery_urls.split(",").map((url: string) => url.trim())
                    : [],
                detail: row.detail,
                demoUrl: row.demo_url,
                githubUrl: row.github_url,
            }));

            setProjects(mapped);
            setLoading(false);
        }

        fetchProjects();
    }, []);

    return {projects, loading};
}