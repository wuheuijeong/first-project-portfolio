import  type { Message } from "../../../types"
import { useState } from "react";
import styles from "./ChatWindow.module.css"

interface ChatWindowProps {
    messages: Message[];
    onSend: (question: string) => void;
    loading: boolean;
}

export default function ChatWindow( {messages, onSend, loading }: ChatWindowProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if(!input.trim() || loading) return;
        onSend(input);
        setInput("");
    };

    return (
        <div className={styles.chatBox}>
            <div className={styles.messages}>
                {messages.map((m, idx) => (
                    <p key={idx} className={m.role === "user" ? styles.userMsg : styles.botMsg}>
                        {m.content}
                    </p>
                ))}
                {loading && <p className={styles.botMsg}>답변을 가져오는 중...</p>}
            </div>


            <div className={styles.inputRow}>
                <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="궁금한 점을 물어보세요!"
                className={styles.input}
                disabled={loading}
                />
                <button onClick={handleSend} className={styles.sendButton} disabled={loading}>전송</button>
            </div>
        </div>
    );
}