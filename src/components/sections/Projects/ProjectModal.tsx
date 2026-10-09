import type { Project } from "../../../types"
import styles from "./ProjectModal.module.css"
import TechTag from "../../ui/TechTag/TechTag";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";


interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

interface DetailSection {
  heading: string | null;
  body: string;
}

const INSIGHT_PATTERN = /인사이트|insight|주요\s*결과/i;

// "## 제목" 단위로 본문을 나눠, 섹션별로 강조 박스 적용 여부를 판단할 수 있게 함
function splitDetailSections(markdown: string): DetailSection[] {
  const chunks = markdown.split(/\n(?=##\s)/g);

  return chunks
    .map((chunk) => {
      const match = chunk.match(/^##\s+(.+?)\n([\s\S]*)$/);
      if (!match) return { heading: null, body: chunk.trim() };
      return { heading: match[1].trim(), body: match[2].trim() };
    })
    .filter((section) => section.heading || section.body);
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const gallery = project.galleryUrls ?? [];
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden"; //모달 열려있는 동안 배경 스크롤 금지

    return () => {
      document.body.style.overflow = ""; // 모달 닫히면 다시 스크롤 가능하도록
    };
  }, []);

  const showPrev = () => setImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  const showNext = () => setImageIndex((prev) => (prev + 1) % gallery.length);

  // 키보드로 모달 닫기(Esc) 및 이미지 넘기기(좌우 화살표) 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && gallery.length > 1) showPrev();
      if (e.key === "ArrowRight" && gallery.length > 1) showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const sections = splitDetailSections(project.detail);

  return (
    // 오버레이 클릭 시 닫히고 모달 내부 클릭은 전파 차단
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* 제목 줄만 상단에 고정, 나머지는 모달 전체와 함께 스크롤 */}
        <div className={styles.modalHeader}>
          <div className={styles.firstline}>
            <h2 className={styles.title}>{project.title}</h2>

            <div className={styles.icon}>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <img src="/icons/Link_icon.svg" alt="링크" width={16} height={16} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <img src="/icons/Github_icon.svg" alt="깃허브" width={16} height={16} />
                </a>
              )}
            </div>
          </div>

          <button onClick={onClose} className={styles.closeButton} aria-label="닫기">
            <img src="/icons/Close_icon.svg" alt="" width={20} height={20} />
          </button>
        </div>

        {gallery.length > 0 && (
          <div className={styles.gallery}>
            <img
              src={gallery[imageIndex]}
              alt={`${project.title} 이미지 ${imageIndex + 1}`}
              className={styles.galleryImage}
            />

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.galleryArrow} ${styles.galleryArrowLeft}`}
                  onClick={showPrev}
                  aria-label="이전 이미지"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${styles.galleryArrow} ${styles.galleryArrowRight}`}
                  onClick={showNext}
                  aria-label="다음 이미지"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className={styles.galleryDots}>
                  {gallery.map((_, idx) => (
                    <span
                      key={idx}
                      className={idx === imageIndex ? styles.galleryDotActive : styles.galleryDot}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.metaRow}>
            <p className={styles.secondline}>
              {project.role} · {project.teamsize}인 · {project.period}
            </p>

            <div className={styles.stackRow}>
              {project.stack.map((tech) => (
                <TechTag key={tech} subtle>{tech}</TechTag>
              ))}
            </div>
          </div>

          <p className={styles.summary}>{project.summary}</p>
        </div>

        <div className={styles.detail}>
          {sections.map((section, idx) => {
            const isInsight = !!section.heading && INSIGHT_PATTERN.test(section.heading);

            return (
              <div key={idx} className={isInsight ? styles.insightSection : undefined}>
                {section.heading && <h2>{section.heading}</h2>}
                <ReactMarkdown>{section.body}</ReactMarkdown>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
