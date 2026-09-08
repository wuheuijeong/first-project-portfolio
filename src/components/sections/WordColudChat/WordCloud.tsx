import { useState, useEffect, useRef } from "react";
import type { Keyword } from "../../../types";
import styles from "./WordCloud.module.css";

interface WordCloudProps {
  keywords: Keyword[];
  onKeywordSelect: (keyword: Keyword) => void;
}

interface Position {
  top: string;
  left: string;
  sizeLevel: 0 | 1 | 2;
  delay: number;
}

// 매번 새로 뽑는 랜덤 weight의 범위 (넓게 설정하여 크기 조합이 눈에 띄게 달라지도록 함)
const MIN_RANDOM_WEIGHT = 1;
const MAX_RANDOM_WEIGHT = 6;

function getRandomWeight() {
  return Math.floor(Math.random() * (MAX_RANDOM_WEIGHT - MIN_RANDOM_WEIGHT + 1)) + MIN_RANDOM_WEIGHT;
}

// weight를 3단계 크기 구간(0: 가장 큼, 2: 중간, 1: 가장 작음)으로 매핑
function getSizeLevel(weight: number): 0 | 1 | 2 {
  if (weight >= 5) return 0;
  if (weight >= 3) return 2;
  return 1;
}

export default function WordCloud({ keywords, onKeywordSelect }: WordCloudProps) {
  const [activeKeywordId, setActiveKeywordId] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const cloudRef = useRef<HTMLDivElement>(null);

  // 키워드 개수를 기준으로 행/열과 위치를 계산하고, 크기 구간은 매번 랜덤으로 새로 뽑음
  useEffect(() => {
    const updatePositions = () => {
      const cols = window.innerWidth <= 768 ? 2 : 3;

      const totalRows = Math.ceil(keywords.length / cols);
      const rowGap = 90 / totalRows;
      const colGap = 100 / cols;

      const positioned: Record<string, Position> = {};
      keywords.forEach((kw, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;

        positioned[kw.id] = {
          top: `${5 + row * rowGap + Math.random() * (rowGap * 0.3)}%`,
          left: `${2 + col * colGap + Math.random() * (colGap * 0.2)}%`,
          sizeLevel: getSizeLevel(getRandomWeight()),
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
    <div className={styles.cloud} ref={cloudRef}>
      {keywords.map((kw) => {
        const pos = positions[kw.id];
        if (!pos) return null;

        return (
          <button
            key={kw.id}
            data-size={pos.sizeLevel}
            className={`${styles.keyword} ${activeKeywordId === kw.id ? styles.keywordActive : ""}`}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
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