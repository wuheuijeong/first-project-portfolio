import type { Keyword } from "../../../types";
import styles from "./WordCloud.module.css"
import { useState } from "react";
import { useEffect } from "react";

interface WordCloudProps {
    keywords: Keyword[];
    onSelect: (keyword: Keyword) => void;
}

interface Position {
    top: string;
    left: string;
    fontSize: number;
}

export default function WordCloud({ keywords, onSelect }: WordCloudProps) {
    const [positions, setPositions] = useState<Record<string, Position>>({});

    useEffect(() => {
        const initial: Record<string, Position> = {};
        keywords.forEach((kw) => {
            initial[kw.id] = {
                top: `${10 + Math.random() * 70}%`,
                left: `${10 + Math.random() * 70}%`,
                fontSize: 14 + kw.weight * 4,
            };
        });
        setPositions(initial);
    }, [keywords]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPositions((prev) => {
                const updated = { ...prev };
                keywords.forEach((kw) => {
                    if (updated[kw.id]) {
                        updated[kw.id] = {
                            ...updated[kw.id],
                            fontSize: 14 + Math.floor(Math.random() * 5 + 1) * 4,
                        }
                    }
                });
                return updated;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [keywords]);

    return (
        <div className={styles.cloud}>
            {keywords.map((kw) => (
                <span
                key={kw.id}
                className={styles.keyword}
                onClick={() => onSelect(kw)}
                >
                    {kw.text}
                </span>
            ))}
        </div>
    );
}