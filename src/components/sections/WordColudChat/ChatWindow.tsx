import  type { Message } from "../../../types"
import { useState } from "react";
import styles from "./ChatWindow.module.css"

interface ChatWindowProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatWindow( {messages, setMessages }: ChatWindowProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        const answer = `(임시 응답) "${input}"에 대한 답변입니다.`;

        setMessages((prev) => [...prev, {role: "user", content: input}, {role: "bot", content: answer}]);

        setInput("");
    }

    return (
        <div className={styles.chatBox}>
            <div className={styles.messages}>
                {messages.map((m, idx) => (
                    <p key={idx} className={m.role === "user" ? styles.userMsg : styles.botMsg}>
                        {m.content}
                    </p>
                ))}
            </div>


            <div className={styles.inputRow}>
                <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="궁금한 점을 물어보세요!"
                className={styles.input}
                />
                <button onClick={handleSend} className={styles.sendButton}>전송</button>
            </div>
        </div>
    );
}