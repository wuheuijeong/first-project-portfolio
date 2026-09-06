import type { Keyword } from "../../../types";
import styles from "./WordCloud.module.css"
import { useState } from "react";

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
                top: `${10 + "Math.random() * 70"}`
            }
        })
    })
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