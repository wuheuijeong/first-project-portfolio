import { useEffect, useRef, useState } from "react";

export function useActiveSecton() {

    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeTop, setActiveTop] = useState(0);
    const refs = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-id");
                        if (id) {
                            setActiveId(id);
                            setActiveTop((entry.target as HTMLElement).offsetTop);
                    }
                }});
            },
            {rootMargin : "-40% 0px -40% 0px"}
        );

        refs.current.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const setRef = (id: string) => (el: HTMLDivElement | null) => {
        if (el) refs.current.set(id, el);
    };

    return { activeId, activeTop, setRef };
}