import { useState } from "react";
import type { Keyword, Message } from "../../../types";
import WordCloud from "./WordCloud";
import ChatWindow from "./ChatWindow";
import styles from "./WordCloudChat.module.css";
import heading from "../../../styles/SectionHeading.module.css";
import { askQuestion } from "../../../lib/ai";
import aboutMeContent from "../../../data/aboutMe.md?raw";

// 워드클라우드에 표시할 키워드와 각 키워드 클릭 시 추천 질문
const keywords: Keyword[] = [
  {
    id: "1",
    text: "협업",
    weight: 6,
    questions: [
      "팀 프로젝트에서 협업을 어떻게 했나요?",
      "의견이 갈릴 때는 어떻게 조율하나요?",
      "협업 중 가장 인상 깊었던 경험은?",
    ],
  },
  {
    id: "2",
    text: "문제해결",
    weight: 6,
    questions: [
      "어려운 문제를 해결한 경험이 있나요?",
      "문제를 해결할 때 주로 어떤 방식으로 접근하나요?",
      "가장 기억에 남는 트러블슈팅 경험은?",
    ],
  },
  {
    id: "3",
    text: "실행력",
    weight: 5,
    questions: [
      "아이디어를 실제로 실행에 옮긴 경험이 있나요?",
      "완벽하게 준비되지 않아도 일단 시작한 적이 있나요?",
      "빠르게 결과물을 만들어낸 경험을 소개해주세요.",
    ],
  },
  {
    id: "4",
    text: "자동화",
    weight: 5,
    questions: [
      "업무 자동화 경험에 대해 말해주세요.",
      "반복 업무를 어떻게 효율화했나요?",
      "AI나 LLM을 활용해본 경험이 있나요?",
    ],
  },
  {
    id: "5",
    text: "성장",
    weight: 5,
    questions: [
      "가장 크게 성장했다고 느낀 경험은?",
      "어려움을 극복한 경험이 있나요?",
      "앞으로 어떤 방향으로 성장하고 싶나요?",
    ],
  },
  {
    id: "6",
    text: "책임감",
    weight: 4,
    questions: [
      "책임감을 발휘했던 순간은?",
      "맡은 일을 끝까지 해낸 경험이 있나요?",
      "팀장 역할을 맡았을 때 어땠나요?",
    ],
  },
  {
    id: "7",
    text: "유연함",
    weight: 4,
    questions: [
      "예상과 다르게 상황이 흘러갔을 때 어떻게 대응하나요?",
      "계획이 틀어졌을 때의 경험이 있나요?",
      "갑작스러운 변화에 대처했던 사례가 있나요?",
    ],
  },
  {
    id: "8",
    text: "소통",
    weight: 4,
    questions: [
      "다른 부서나 팀과 소통한 경험이 있나요?",
      "이해관계자와의 조율 경험을 말해주세요.",
      "설득이 필요했던 상황은 어땠나요?",
    ],
  },
  {
    id: "9",
    text: "데이터기반사고",
    weight: 3,
    questions: [
      "데이터를 활용해 의사결정을 내린 경험이 있나요?",
      "데이터 분석 역량은 어떻게 길렀나요?",
      "숫자로 성과를 증명한 경험이 있나요?",
    ],
  },
  {
    id: "10",
    text: "자기관리",
    weight: 3,
    questions: [
      "본인의 약점은 무엇이라고 생각하나요?",
      "약점을 극복한 경험이 있나요?",
      "업무 계획은 어떻게 세우는 편인가요?",
    ],
  },
  {
    id: "11",
    text: "다양한관점",
    weight: 3,
    questions: [
      "복수전공을 선택한 이유는 무엇인가요?",
      "여러 시각으로 문제를 바라본 경험이 있나요?",
      "다양한 배경이 개발자로서 어떤 강점이 되나요?",
    ],
  },
  {
    id: "12",
    text: "성장방향",
    weight: 4,
    questions: [
      "어떤 프론트엔드 개발자가 되고 싶나요?",
      "지금 집중하고 있는 역량은 무엇인가요?",
      "5년 뒤 어떤 모습이길 바라나요?",
    ],
  },
];

export default function WordcloudChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  // 사용자 질문을 저장하고 AI 응답을 받아와 메시지에 추가
  const sendMessage = async (question: string) => {
    setSuggestedQuestions([]); // 질문 보내면 추천 질문은 사라지게 설정
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    const answer = await askQuestion(question, aboutMeContent);

    setMessages((prev) => [...prev, { role: "bot", content: answer }]);
    setLoading(false);
  };

  // 워드클라우드에서 키워드 선택 시 관련 추천 질문 표시
  const handleKeywordSelect = (keyword: Keyword) => {
    setSuggestedQuestions(keyword.questions);
  };

  return (
    <div className={styles.container}>
      <h2 className={heading.header}>ASK ME</h2>
      <h3 className={`${heading.subheader} ${styles.subheader}`}>키워드로 알아보는 나</h3>

      <div className={styles.layout}>
        <WordCloud keywords={keywords} onKeywordSelect={handleKeywordSelect} />
        <ChatWindow
          messages={messages}
          onSend={sendMessage}
          loading={loading}
          suggestedQuestions={suggestedQuestions}
        />
      </div>
    </div>
  );
}