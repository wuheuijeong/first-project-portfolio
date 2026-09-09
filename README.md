# First Project Portfolio

## 1. 프로젝트 소개

React와 TypeScript로 만든 개인 포트폴리오 웹사이트입니다. 네비게이션 클릭이나 스크롤로 섹션을 이동하는 원페이지(One Page) 스크롤 구조로 구성되어 있으며, Hero부터 Contact까지 하나의 페이지 안에서 자기소개, 경력, 기술 스택, 활동, 프로젝트, 블로그 글을 순서대로 보여줍니다.

프론트엔드 개발자로 취업을 준비하면서, 정적인 자기소개서 대신 방문자가 직접 궁금한 점을 물어보고 답을 들을 수 있는 인터랙티브한 포트폴리오를 만들어보고 싶어서 제작했습니다. 그래서 워드클라우드로 키워드를 클릭하면 관련 질문이 추천되고, 실제로 그 질문을 AI 챗봇에게 보내 답변을 받아볼 수 있는 `ASK ME` 섹션을 핵심 기능으로 넣었습니다.

## 2. 기술 스택

| 구분 | 기술 |
| --- | --- |
| 프론트엔드 | React 19, TypeScript, Vite, CSS Modules |
| 데이터 | Supabase (PostgreSQL, Storage) |
| AI | Groq API (`openai/gpt-oss-20b` 모델), react-markdown |
| 배포 | Vercel (Serverless Functions) |

`package.json`에 등록된 라이브러리 기준으로 정리하면 다음과 같습니다.

- `react`, `react-dom` — UI 렌더링
- `react-icons` — 기술 스택 아이콘 표시
- `react-markdown` — 프로젝트 상세 설명을 마크다운으로 렌더링
- `@supabase/supabase-js` — Supabase 클라이언트 (프로젝트/블로그/스킬 데이터 조회)
- `groq-sdk` — 서버리스 함수(`api/chat.ts`)에서 Groq API 호출
- `@google/generative-ai` — 의존성으로 설치는 되어 있으나, 현재 코드베이스(`src`, `api`)에서 실제로 import해 사용하는 곳은 없습니다. 확인이 필요한 부분으로 아래 안내에도 남겨둡니다.

## 3. 섹션 구성

`src/App.tsx`에 정의된 순서대로 아래 섹션이 렌더링됩니다.

| 순서 | 컴포넌트 | 설명 |
| --- | --- | --- |
| 1 | `Navbar` | 섹션 이동용 상단 네비게이션 (Home / About / Career / Skill / Activity / Project / Blog) |
| 2 | `Hero` | 이름, 한 줄 소개, 프로필 사진, 이메일/GitHub/velog/LinkedIn 링크 |
| 3 | `WordCloudChat` | 워드클라우드 키워드 + AI 챗봇으로 자기소개를 살펴보는 `ASK ME` 섹션 |
| 4 | `CareerTimeline` | 입학, 인턴, 졸업 등 주요 이력을 타임라인으로 표시 |
| 5 | `Skills` | Frontend / Backend / Data 카테고리를 순환 탭으로 전환하며 보여주는 기술 스택 |
| 6 | `Activity` | 학회, 연구, 스터디, 인턴 등 활동 이력을 스크롤 연동 타임라인으로 표시 |
| 7 | `Projects` | Supabase에서 불러온 프로젝트 카드 목록, 클릭 시 상세 모달 표시 |
| 8 | `Blog` | Supabase에서 불러온 블로그 글 카드 목록 |
| 9 | `Closing` (Contact) | 마무리 인사와 이메일 연락 버튼 |

## 4. 워드클라우드 + 챗봇 동작 흐름

`about` 섹션(`WordCloudChat.tsx`)에서 키워드 클릭부터 답변 표시까지의 흐름은 다음과 같습니다.

```
[WordCloud] 키워드 클릭
      │  (WordCloud.tsx: onKeywordSelect 호출)
      ▼
[WordCloudChat] handleKeywordSelect
      │  키워드에 미리 정의된 questions 배열을
      │  suggestedQuestions state로 저장
      ▼
[ChatWindow] 추천 질문 버튼 목록 렌더링
      │  버튼 클릭 또는 입력창에 직접 질문 입력 후 전송
      ▼
[WordCloudChat] sendMessage(question)
      │  aboutMe.md 전체 내용을 컨텍스트로 함께 전달
      ▼
[lib/ai.ts] askQuestion(question, context)
      │  POST /api/chat  { question, context }
      ▼
[api/chat.ts] (Vercel Serverless Function)
      │  Groq SDK로 openai/gpt-oss-20b 모델 호출
      │  system 프롬프트: "정보에 없는 내용은 추측하지 말 것" 등 규칙 + aboutMe.md 컨텍스트
      │  user 프롬프트: 사용자 질문
      ▼
Groq API 응답 (answer)
      ▼
[WordCloudChat] messages state에 봇 답변 추가
      ▼
[ChatWindow] 답변을 말풍선으로 렌더링 + 스크롤 하단 이동
```

- 예상 질문은 `WordCloudChat.tsx`에 하드코딩된 `keywords` 배열의 `questions` 필드에서 가져오며, 별도의 API 호출 없이 클라이언트에서 즉시 표시됩니다.
- 실제 자기소개 컨텍스트는 `src/data/aboutMe.md` 파일을 `?raw` 방식으로 문자열째 불러와(`aboutMeContent`) 매 질문마다 함께 전송합니다.
- Groq API 키(`GROQ_API_KEY`)는 `api/chat.ts`, 즉 Vercel 서버리스 함수 안에서만 `process.env`로 읽히므로 브라우저 번들에 포함되지 않고, 클라이언트 쪽 코드(`src/lib/ai.ts`)는 `/api/chat`을 fetch만 할 뿐 API 키를 알지 못합니다.

## 5. 전체 프로젝트 구조

```
.
├── api/
│   └── chat.ts
├── public/
│   ├── etc/
│   ├── icons/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── sections/
│   │   │   ├── Activity/
│   │   │   ├── Blog/
│   │   │   ├── Career/
│   │   │   ├── Closing/
│   │   │   ├── Hero/
│   │   │   ├── Projects/
│   │   │   ├── Skill/
│   │   │   └── WordColudChat/
│   │   └── ui/
│   │       ├── EntryTag/
│   │       ├── LinkButton/
│   │       └── TechTag/
│   ├── data/
│   │   └── aboutMe.md
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   ├── useBlogPosts.ts
│   │   ├── useProjects.ts
│   │   └── useSkills.ts
│   ├── lib/
│   │   ├── ai.ts
│   │   ├── skillIcons.tsx
│   │   └── supabase.ts
│   ├── styles/
│   │   └── SectionHeading.module.css
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

## 6. 폴더별 설명

- **src/components/sections/** — 페이지를 구성하는 각 섹션 컴포넌트(Hero, WordColudChat, Career, Skill, Activity, Projects, Blog, Closing)를 폴더별로 관리합니다. 각 섹션은 자체 `.module.css`와 하위 컴포넌트(예: `Projects/ProjectCard.tsx`, `Activity/ActivityItem.tsx`)를 함께 둡니다.
- **src/components/ui/** — `LinkButton`, `TechTag`, `EntryTag`처럼 여러 섹션에서 재사용하는 작은 UI 컴포넌트를 모아둔 폴더입니다.
- **src/hooks/** — `useProjects`, `useBlogPosts`, `useSkills`처럼 Supabase에서 데이터를 조회해 컴포넌트에 전달하는 커스텀 훅과, 스크롤 위치에 따라 활성 항목을 계산하는 `useActiveSection`이 있습니다.
- **src/lib/** — `supabase.ts`(Supabase 클라이언트 초기화), `ai.ts`(챗봇 질문 요청 함수), `skillIcons.tsx`(기술명 → 아이콘/색상 매핑)처럼 도메인에 종속되지 않는 유틸 코드를 둡니다.
- **src/types/** — `Project`, `Skill`, `Keyword`, `Message` 등 앱 전반에서 쓰이는 타입 정의를 모아둔 곳입니다.
- **src/data/** — 챗봇 컨텍스트로 사용되는 `aboutMe.md` 등 정적 콘텐츠 파일을 둡니다.
- **api/** — Vercel 서버리스 함수 폴더입니다. `chat.ts` 하나가 있으며, 클라이언트 요청을 받아 Groq API를 호출하고 응답을 반환합니다.

## 7. 디자인

- 브랜드 컬러는 오렌지 계열의 `#E8674A`이며, 강조 텍스트·버튼·활성 상태 표시 등 사이트 전반에서 포인트 컬러로 사용됩니다. 배경은 흰색(`#FFFFFF`)과 연한 그레이(`#F2F4F6`)를 기본으로 사용합니다.
- 불필요한 장식 없이 여백과 타이포그래피 중심으로 정보를 전달하는 미니멀하고 깔끔한 톤으로 디자인했습니다.

## 8. 반응형 UI

- 태블릿 기준 `max-width: 1024px`, 모바일 기준 `max-width: 768px` 두 단계 브레이크포인트를 기본으로 지원합니다. (`ActivityDetailCard`처럼 일부 컴포넌트는 `480px` 브레이크포인트를 추가로 둡니다.)
- 각 컴포넌트의 CSS Modules(`*.module.css`) 안에 미디어 쿼리를 함께 작성하며, `1024px → 768px` 순서로 넓은 화면 기준부터 좁은 화면 기준으로 내려가며 스타일을 덮어쓰는 컨벤션을 따릅니다.
- 워드클라우드(`WordCloud.tsx`)는 CSS 미디어 쿼리만으로는 처리할 수 없는 특수 케이스로, 컨테이너 크기와 각 키워드 텍스트의 실제 렌더링 폭(`canvas.measureText`)을 측정해 겹치지 않는 위치를 나선형 탐색 알고리즘으로 계산합니다. `window`의 `resize` 이벤트마다 이 계산을 다시 수행해 화면 크기가 바뀌어도 키워드가 겹치지 않도록 재배치합니다.

## 9. 로컬 실행 방법

이 프로젝트는 `api/chat.ts` 서버리스 함수를 통해 AI 챗봇 기능을 제공하기 때문에, 반드시 Vercel CLI(`vercel dev`)로 실행해야 합니다. `npm run dev`(Vite dev 서버)만 실행하면 `api/` 폴더의 서버리스 함수가 동작하지 않아 `/api/chat` 요청이 404 또는 무응답으로 실패하고, `ASK ME` 챗봇 기능이 동작하지 않습니다.

```bash
# 1. 저장소 클론
git clone <repository-url>
cd first-project-portfolio

# 2. 의존성 설치
npm install

# 3. Vercel CLI가 없다면 설치
npm install -g vercel

# 4. vercel dev로 실행 (Vite + 서버리스 함수 모두 동작)
vercel dev
```

## 10. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 아래 값을 채워주세요.

```
GROQ_API_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

- 값에는 따옴표(`"`, `'`)를 넣지 않아야 합니다.
- `VITE_` 접두사가 붙은 값(`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)은 빌드 시 클라이언트 번들에 포함되어 브라우저에 노출되는 공개 값입니다.
- `GROQ_API_KEY`는 접두사가 없으며, `api/chat.ts` 서버리스 함수 안에서만 `process.env`로 읽히는 비밀 값이므로 절대 `VITE_` 접두사를 붙이면 안 됩니다.

## 11. Vercel 배포 시 환경변수 등록 방법

1. Vercel 대시보드 → 해당 프로젝트 → **Settings → Environment Variables**로 이동합니다.
2. `.env.local`에 설정한 것과 동일한 키(`GROQ_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)와 값을 그대로 등록합니다.
3. Vite 환경변수(`VITE_` 접두사)는 빌드 시점에 코드에 반영되므로, 환경변수를 새로 추가하거나 값을 수정한 뒤에는 반드시 **Redeploy**를 실행해야 변경 사항이 반영됩니다.
4. 이전 빌드 캐시 때문에 변경 사항이 반영되지 않는다면, Redeploy 시 **Use existing Build Cache** 옵션을 해제하고 다시 배포해주세요.

