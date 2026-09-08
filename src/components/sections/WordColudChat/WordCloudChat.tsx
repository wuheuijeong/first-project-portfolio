import { useState } from "react";
import type { Keyword, Message } from "../../../types";
import WordCloud from "./WordCloud";
import ChatWindow from "./ChatWindow";
import styles from "./WordcloudChat.module.css";
import { askQuestion } from "../../../lib/ai";
import aboutMeContent from "../../../data/aboutMe.md?raw";

const keywords: Keyword[] = [
    {
    id: "1",
    text: "협업",
    weight: 5,
    questions: [
      "팀 프로젝트에서 협업을 어떻게 했나요?",
      "의견이 갈릴 때는 어떻게 조율하나요?",
      "협업 중 가장 인상 깊었던 경험은?",
    ],
  },
  {
    id: "2",
    text: "성장",
    weight: 4,
    questions: [
      "가장 크게 성장했다고 느낀 경험은?",
      "실패를 통해 배운 점이 있나요?",
      "앞으로 어떤 방향으로 성장하고 싶나요?",
    ],
  },
  {
    id: "3",
    text: "문제해결",
    weight: 4,
    questions: [
      "어려운 문제를 해결한 경험이 있나요?",
      "문제를 해결할 때 주로 어떤 방식으로 접근하나요?",
      "가장 기억에 남는 트러블슈팅 경험은?",
    ],
  },
  {
    id: "4",
    text: "책임감",
    weight: 3,
    questions: [
      "책임감을 발휘했던 순간은?",
      "맡은 일을 끝까지 해낸 경험이 있나요?",
      "팀장 역할을 맡았을 때 어땠나요?",
    ],
  },
];

export default function WordcloudChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  const sendMessage = async (question: string) => {
    setSuggestedQuestions([]); // 질문 보내면 추천 질문은 사라지게 설정
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    const answer = await askQuestion(question, aboutMeContent);

    setMessages((prev) => [...prev, { role: "bot", content: answer }]);
    setLoading(false);
  };

  const handleKeywordSelect = (keyword: Keyword) => {
    setSuggestedQuestions(keyword.questions);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>ASK ME</h2>
      <h3 className={styles.subheader}>키워드로 알아보는 나</h3>

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