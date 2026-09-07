import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Skill } from "../types";

export function useSkills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSkills() {
            const { data, error } = await supabase.from("skills").select("*");
            console.log("skills 데이터:", data);
            console.log("skills 에러:", error);

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            setSkills(data ?? []);
            setLoading(false);
        }

        fetchSkills();
    }, []);

    return { skills, loading };
}