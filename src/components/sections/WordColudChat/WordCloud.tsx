import { useState, useEffect, useRef } from "react";
import type { Keyword } from "../../../types";
import styles from "./WordCloud.module.css";

interface WordCloudProps {
  keywords: Keyword[];
  onKeywordSelect: (keyword: Keyword) => void;
}

interface Position {
  top: number;
  left: number;
  sizeLevel: 0 | 1 | 2;
  delay: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// 매번 새로 뽑는 랜덤 weight의 범위 (넓게 설정하여 크기 조합이 눈에 띄게 달라지도록 함)
const MIN_RANDOM_WEIGHT = 1;
const MAX_RANDOM_WEIGHT = 6;

// data-size 구간별 폰트 크기 / font-weight (WordCloud.module.css의 값과 일치해야 함)
const FONT_SIZES: Record<0 | 1 | 2, number> = { 0: 28, 1: 16, 2: 22 };
const FONT_WEIGHTS: Record<0 | 1 | 2, number> = { 0: 800, 1: 600, 2: 800 };
const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

// 나선형 배치 시 사용하는 파라미터 (반지름 증가 속도를 완만하게 해 중앙 근처를 촘촘히 탐색)
const SPIRAL_ANGLE_STEP = 0.35;
const SPIRAL_RADIUS_STEP = 2;
const SPIRAL_MAX_ITERATIONS = 400;
const CONTAINER_MARGIN = 8;

function getRandomWeight() {
  return Math.floor(Math.random() * (MAX_RANDOM_WEIGHT - MIN_RANDOM_WEIGHT + 1)) + MIN_RANDOM_WEIGHT;
}

// weight를 3단계 크기 구간(0: 가장 큼, 2: 중간, 1: 가장 작음)으로 매핑
function getSizeLevel(weight: number): 0 | 1 | 2 {
  if (weight >= 5) return 0;
  if (weight >= 3) return 2;
  return 1;
}

// canvas.measureText로 실제 렌더링될 텍스트 폭을 측정해 bounding box(폭/높이)를 추정 (단어 간 여백 포함)
let measureContext: CanvasRenderingContext2D | null = null;
function getMeasureContext(): CanvasRenderingContext2D | null {
  if (typeof document === "undefined") return null;
  if (!measureContext) {
    measureContext = document.createElement("canvas").getContext("2d");
  }
  return measureContext;
}

function estimateBoxSize(text: string, sizeLevel: 0 | 1 | 2) {
  const fontSize = FONT_SIZES[sizeLevel];
  const ctx = getMeasureContext();

  let textWidth: number;
  if (ctx) {
    ctx.font = `${FONT_WEIGHTS[sizeLevel]} ${fontSize}px ${FONT_FAMILY}`;
    textWidth = ctx.measureText(text).width;
  } else {
    textWidth = text.length * fontSize * 0.87;
  }

  const width = textWidth + 4;
  const height = fontSize * 1.45 + 2;
  return { width, height };
}

function rectsOverlapArea(a: Rect, b: Rect) {
  const xOverlap = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const yOverlap = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return xOverlap * yOverlap;
}

function totalOverlap(rect: Rect, placedRects: Rect[]) {
  return placedRects.reduce((sum, other) => sum + rectsOverlapArea(rect, other), 0);
}

// 컨테이너 경계를 벗어나지 않도록 좌표를 보정
function clampRect(rect: Rect, containerWidth: number, containerHeight: number): Rect {
  const maxX = Math.max(CONTAINER_MARGIN, containerWidth - rect.w - CONTAINER_MARGIN);
  const maxY = Math.max(CONTAINER_MARGIN, containerHeight - rect.h - CONTAINER_MARGIN);
  return {
    ...rect,
    x: Math.min(Math.max(rect.x, CONTAINER_MARGIN), maxX),
    y: Math.min(Math.max(rect.y, CONTAINER_MARGIN), maxY),
  };
}

// 중심에서 시작해 각도를 늘리며 반지름을 서서히 키우는 나선형 경로를 따라
// 기존에 배치된 사각형들과 겹치지 않는 첫 후보 위치를 찾는다.
// 최대 반복 횟수 내에 겹치지 않는 자리를 못 찾으면, 그동안 발견한 가장 덜 겹치는 위치로 대체한다.
function findSpiralPosition(
  w: number,
  h: number,
  containerWidth: number,
  containerHeight: number,
  placedRects: Rect[]
): Rect {
  const centerX = containerWidth / 2 - w / 2;
  const centerY = containerHeight / 2 - h / 2;

  let bestRect = clampRect({ x: centerX, y: centerY, w, h }, containerWidth, containerHeight);
  let bestOverlap = totalOverlap(bestRect, placedRects);

  let angle = 0;
  let radius = 0;

  for (let i = 0; i < SPIRAL_MAX_ITERATIONS && bestOverlap > 0; i++) {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const candidate = clampRect({ x, y, w, h }, containerWidth, containerHeight);
    const overlap = totalOverlap(candidate, placedRects);

    if (overlap < bestOverlap) {
      bestOverlap = overlap;
      bestRect = candidate;
    }

    angle += SPIRAL_ANGLE_STEP;
    radius += SPIRAL_RADIUS_STEP;
  }

  return bestRect;
}

export default function WordCloud({ keywords, onKeywordSelect }: WordCloudProps) {
  const [activeKeywordId, setActiveKeywordId] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const cloudRef = useRef<HTMLDivElement>(null);

  // 컨테이너 크기를 기준으로, 중요도(크기)가 큰 키워드부터 중앙에서 시작하는
  // 나선형 경로를 따라 겹치지 않는 위치를 탐색해 배치한다. 크기 구간은 매번 랜덤으로 새로 뽑는다.
  useEffect(() => {
    const updatePositions = () => {
      const containerWidth = cloudRef.current?.offsetWidth ?? window.innerWidth;
      const containerHeight = cloudRef.current?.offsetHeight ?? 400;

      const items = keywords.map((kw, originalIndex) => {
        const sizeLevel = getSizeLevel(getRandomWeight());
        const { width, height } = estimateBoxSize(kw.text, sizeLevel);
        return { kw, sizeLevel, width, height, originalIndex };
      });

      // 큰 폰트(중요도 높은) 키워드부터 먼저 배치해 중앙 근처를 우선 차지하도록 함
      const sortedForPlacement = [...items].sort(
        (a, b) => FONT_SIZES[b.sizeLevel] - FONT_SIZES[a.sizeLevel]
      );

      const placedRects: Rect[] = [];
      const positioned: Record<string, Position> = {};

      sortedForPlacement.forEach(({ kw, sizeLevel, width, height, originalIndex }) => {
        const rect = findSpiralPosition(width, height, containerWidth, containerHeight, placedRects);
        placedRects.push(rect);

        positioned[kw.id] = {
          left: rect.x,
          top: rect.y,
          sizeLevel,
          delay: originalIndex * 0.4,
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
              top: `${pos.top}px`,
              left: `${pos.left}px`,
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
