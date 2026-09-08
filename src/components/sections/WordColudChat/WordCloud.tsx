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

  // 화면 크기에 따라 배율을 조정하며 각 키워드의 위치와 크기를 계산
  useEffect(() => {
    const updatePositions = () => {
      const width = window.innerWidth;
      let scale = 1;
      if (width <= 768) {
        scale = 0.45;
      } else if (width <= 1024) {
        scale = 0.7;
      }

      // 2열 그리드 기준 위치에 랜덤 오프셋을 더해 자연스럽게 배치
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

  // 키워드 클릭 시 활성 표시하고 상위로 선택 결과 전달
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