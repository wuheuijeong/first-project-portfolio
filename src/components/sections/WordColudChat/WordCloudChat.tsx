import { useState } from "react";
import type { Keyword, Message } from "../../../types";
import styles from "./WordCloudChat.module.css"
import WordCloud from "./WordCloud";
import ChatWindow from "./ChatWindow";
import aboutMeContent from "../../../data/aboutMe.md?raw";
import { askQuestion } from "../../../lib/gemini";

const keywords: Keyword[] = [
    {id: "1", text: "협업", weight: 5, suggestedQuestion: "팀 프로젝트에서 협업을 어떻게 했나요?"},
    { id: "2", text: "성장", weight: 4, suggestedQuestion: "가장 크게 성장했다고 느낀 경험은?" },
    { id: "3", text: "문제해결", weight: 4, suggestedQuestion: "어려운 문제를 해결한 경험이 있나요?" },
    { id: "4", text: "책임감", weight: 3, suggestedQuestion: "책임감을 발휘했던 순간은?" },
];

export default function WordCloudChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (question: string) => {
        setMessages((prev) => [...prev, {role: "user", content: question }]);
        setLoading(true);

        const answer = await askQuestion(question, aboutMeContent);
        
        setMessages((prev) => [...prev, {role: "bot", content: answer }]);
        setLoading(false);
    }

    const handleKeywordClick = (keyword: Keyword) => {
        sendMessage(keyword.suggestedQuestion);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <h2 className={styles.header}>ABOUT ME</h2>
                <h3 className={styles.subheader}>키워드로 알아보는 나</h3>
            </div>

            <div className={styles.layout}>
                <WordCloud keywords={keywords} onSelect={handleKeywordClick} />
                <ChatWindow messages={messages} onSend={sendMessage} loading={loading} />
            </div>
        </div>
    );
}