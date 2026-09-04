import ProjectCard from "./ProjectCard";
import { useState } from "react";
import type { Project } from "../../../types";
import ProjectModal from "./ProjectModal";
import styles from "./Projects.module.css"

const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Project",
    summary: "현대오토에버 모빌리티 SW 스쿨 첫 번째 프로젝트, 개인 포트폴리오 만들기",
    role: "프론트엔드 리드",
    stack: ["React", "TypeScript", "CSS Modules"],
    teamsize: 4,
    period: "2026.09 ~ 2026.09",
    imageUrl: ["https://placehold.co/280x160", "https://placehold.co/280x160", "https://placehold.co/280x160", "https://placehold.co/280x160", "https://placehold.co/280x160"],
    detail:
      "이 프로젝트는 현대오토에버 모빌리티 SW스쿨 웹/앱 4기 첫 번째 팀 프로젝트로, 4인 팀에서 프론트엔드 리드를 맡아 진행했습니다. 목표는 '토스 스타일'의 깔끔한 1인 개발자 포트폴리오 사이트를 React 기반으로 구현하는 것이었습니다.\n\n담당 역할\n- 전체 컴포넌트 구조 설계 및 팀원 작업 분배 (Hero, Career, Skills, Activity, Projects, Blog 6개 섹션)\n- Git 브랜치 전략 수립 및 PR 리뷰 프로세스 운영\n\n배운 점\n디자인 시스템을 코드보다 먼저 문서화해두는 것이 팀 작업 속도와 일관성에 큰 영향을 미친다는 걸 체감했습니다. 이 프로젝트는 현대오토에버 모빌리티 SW스쿨 웹/앱 4기 첫 번째 팀 프로젝트로, 4인 팀에서 프론트엔드 리드를 맡아 진행했습니다. 목표는 '토스 스타일'의 깔끔한 1인 개발자 포트폴리오 사이트를 React 기반으로 구현하는 것이었습니다.\n\n담당 역할\n- 전체 컴포넌트 구조 설계 및 팀원 작업 분배 (Hero, Career, Skills, Activity, Projects, Blog 6개 섹션)\n- Git 브랜치 전략 수립 및 PR 리뷰 프로세스 운영\n\n배운 점\n디자인 시스템을 코드보다 먼저 문서화해두는 것이 팀 작업 속도와 일관성에 큰 영향을 미친다는 걸 체감했습니다. 이 프로젝트는 현대오토에버 모빌리티 SW스쿨 웹/앱 4기 첫 번째 팀 프로젝트로, 4인 팀에서 프론트엔드 리드를 맡아 진행했습니다. 목표는 '토스 스타일'의 깔끔한 1인 개발자 포트폴리오 사이트를 React 기반으로 구현하는 것이었습니다.\n\n담당 역할\n- 전체 컴포넌트 구조 설계 및 팀원 작업 분배 (Hero, Career, Skills, Activity, Projects, Blog 6개 섹션)\n- Git 브랜치 전략 수립 및 PR 리뷰 프로세스 운영\n\n배운 점\n디자인 시스템을 코드보다 먼저 문서화해두는 것이 팀 작업 속도와 일관성에 큰 영향을 미친다는 걸 체감했습니다. 이 프로젝트는 현대오토에버 모빌리티 SW스쿨 웹/앱 4기 첫 번째 팀 프로젝트로, 4인 팀에서 프론트엔드 리드를 맡아 진행했습니다. 목표는 '토스 스타일'의 깔끔한 1인 개발자 포트폴리오 사이트를 React 기반으로 구현하는 것이었습니다.\n\n담당 역할\n- 전체 컴포넌트 구조 설계 및 팀원 작업 분배 (Hero, Career, Skills, Activity, Projects, Blog 6개 섹션)\n- Git 브랜치 전략 수립 및 PR 리뷰 프로세스 운영\n\n배운 점\n디자인 시스템을 코드보다 먼저 문서화해두는 것이 팀 작업 속도와 일관성에 큰 영향을 미친다는 걸 체감했습니다.",
    demoUrl: "https://example.vercel.app",
    githubUrl: "https://github.com/example/portfolio",
  },
  {
    id: "2",
    title: "코딩테스트 아카이브",
    summary: "프로그래머스 문제 풀이 기록 및 회고를 정리하는 개인 학습용 웹앱",
    role: "개인 프로젝트",
    stack: ["React", "TypeScript", "Supabase"],
    teamsize: 1,
    period: "2026.06 ~ 2026.07",
    imageUrl: ["https://placehold.co/280x160", "https://placehold.co/280x160", "https://placehold.co/280x160"],
    detail:
      "코딩테스트 준비 과정에서 풀었던 문제와 풀이 방식을 기록하고 검색할 수 있는 개인용 아카이브입니다. Supabase를 활용해 문제 데이터를 저장하고, 태그별 필터링 기능을 구현했습니다.\n\n담당 역할\n- 전체 기획 및 개발 단독 진행\n- Supabase 테이블 설계 및 CRUD 기능 구현\n\n배운 점\n혼자 기획부터 배포까지 진행하며 일정 관리와 우선순위 설정의 중요성을 배웠습니다.",
    demoUrl: "https://example2.vercel.app",
    githubUrl: "https://github.com/example/coding-test-archive",
  },
  {
    id: "3",
    title: "골목 주차 공급자 앱 기획",
    summary: "유휴 주차공간을 공유하는 서비스의 공급자용 앱/웹 기획 프로젝트",
    role: "서비스 기획",
    stack: ["Figma", "Notion"],
    teamsize: 1,
    period: "2026.04 ~ 2026.05",
    imageUrl: ["https://placehold.co/280x160", "https://placehold.co/280x160"],
    detail:
      "카카오모빌리티 인턴 경험을 바탕으로, 유휴 주차공간을 보유한 개인이 공급자로 참여할 수 있는 서비스를 기획했습니다. 사용자 리서치부터 플로우 설계, 화면 기획까지 전 과정을 개인적으로 진행했습니다.\n\n담당 역할\n- 사용자 인터뷰 및 문제 정의\n- 서비스 플로우 및 와이어프레임 설계\n\n배운 점\n실제 서비스로 이어지지 않더라도, 문제 정의부터 검증까지의 과정을 훈련하는 것 자체가 기획 역량에 큰 도움이 된다는 걸 느꼈습니다.",
    demoUrl: "http://example3.vercel.app",
    githubUrl: "http://g",
  },
];


export default function Projects() {
    
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <div className = {styles.container}>
          <div className={styles.containerHeader}>
            <h2 className={styles.header}>PROJECTS</h2>
            <h3 className={styles.subHeader}>프로젝트</h3>
          </div>

            <ul className={styles.projectList}>
                {projects.map((project) => (
                    <li key={project.id} onClick={() => setSelected(project)}>
                        <ProjectCard
                            id={project.id}
                            title={project.title}
                            summary={project.summary}
                            role={project.role}
                            stack={project.stack}
                            teamsize={project.teamsize}
                            period={project.period}
                            imageUrl={project.imageUrl?.[0]}
                            detail={project.detail}
                            demoUrl={project.demoUrl}
                            githubUrl={project.githubUrl} 
                        />
                    </li>
                ))}
            </ul>
            {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}