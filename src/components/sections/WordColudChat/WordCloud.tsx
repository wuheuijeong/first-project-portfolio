import { useState, useEffect } from "react";
import type { Keyword } from "../../../types";
import styles from "./WordCloud.module.css";

interface WordCloudProps {
  keywords: Keyword[];
  onKeywordSelect: (keyword: Keyword) => void;
}

interface Position {
  top: string;
  left: string;
  fontSize: number;
  delay: number;
}

export default function WordCloud({ keywords, onKeywordSelect }: WordCloudProps) {
  const [activeKeywordId, setActiveKeywordId] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, Position>>({});

  useEffect(() => {
    const updatePositions = () => {
      const width = window.innerWidth;
      let scale = 1;
      if (width <= 768) {
        scale = 0.45;
      } else if (width <= 1024) {
        scale = 0.7;
      }

      const positioned: Record<string, Position> = {};
      keywords.forEach((kw, idx) => {
        const cols = 2;
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        positioned[kw.id] = {
          top: `${15 + row * 35 + Math.random() * 10}%`,
          left: `${20 + col * 45 + Math.random() * 10}%`,
          fontSize: (24 + kw.weight * 4) * scale,
          delay: idx * 0.4,
        };
      });
      setPositions(positioned);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [keywords]);

  const handleClick = (kw: Keyword) => {
    setActiveKeywordId(kw.id);
    onKeywordSelect(kw);
  };

  return (
    <div className={styles.cloud}>
      {keywords.map((kw) => {
        const pos = positions[kw.id];
        if (!pos) return null;

        return (
          <button
            key={kw.id}
            className={`${styles.keyword} ${activeKeywordId === kw.id ? styles.keywordActive : ""}`}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              fontSize: `${pos.fontSize}px`,
              animationDelay: `${pos.delay}s`,
            }}
            onClick={() => handleClick(kw)}
          >
            {kw.text}
          </button>
        );
      })}
    </div>
  );
}