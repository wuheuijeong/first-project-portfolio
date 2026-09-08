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
  fontSize: number;
  delay: number;
}

export default function WordCloud({ keywords, onKeywordSelect }: WordCloudProps) {
  const [activeKeywordId, setActiveKeywordId] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const cloudRef = useRef<HTMLDivElement>(null);

  // 컨테이너의 실제 크기와 키워드 개수를 기준으로 행/열, 위치, 폰트 크기를 계산
  useEffect(() => {
    const updatePositions = () => {
      const containerWidth = cloudRef.current?.offsetWidth ?? window.innerWidth;
      const containerHeight = cloudRef.current?.offsetHeight ?? 400;
      const cols = window.innerWidth <= 768 ? 2 : 3;

      const totalRows = Math.ceil(keywords.length / cols);
      const rowGap = 90 / totalRows;
      const colGap = 100 / cols;
      const colWidthPx = (containerWidth * colGap) / 100;
      const rowHeightPx = (containerHeight * rowGap) / 100;

      const positioned: Record<string, Position> = {};
      keywords.forEach((kw, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;

        // 배정된 열 너비와 행 높이를 넘지 않도록 텍스트 길이 기준으로 폰트 크기 상한을 계산
        const idealFontSize = 24 + kw.weight * 4;
        const maxFontSizeByWidth = (colWidthPx * 0.85) / (kw.text.length * 0.95);
        const maxFontSizeByHeight = rowHeightPx * 0.6;
        const fontSize = Math.max(
          12,
          Math.min(idealFontSize, maxFontSizeByWidth, maxFontSizeByHeight)
        );

        positioned[kw.id] = {
          top: `${5 + row * rowGap + Math.random() * (rowGap * 0.3)}%`,
          left: `${2 + col * colGap + Math.random() * (colGap * 0.2)}%`,
          fontSize,
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