import { useState } from "react";
import type { Message } from "../../../types";
import styles from "./ChatWindow.module.css";

interface ChatWindowProps {
  messages: Message[];
  onSend: (question: string) => void;
  loading: boolean;
  suggestedQuestions: string[];
}

export default function ChatWindow({ messages, onSend, loading, suggestedQuestions }: ChatWindowProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || loading) return;
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

        {loading && <p className={styles.botMsg}>답변을 생각하는 중...</p>}

        {!loading && suggestedQuestions.length > 0 && (
          <div className={styles.suggestedList}>
            {suggestedQuestions.map((q, idx) => (
              <button key={idx} className={styles.suggestedQuestion} onClick={() => onSend(q)}>
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="궁금한 걸 물어보세요"
          className={styles.input}
          disabled={loading}
        />
        <button onClick={handleSend} className={styles.sendButton} disabled={loading}>
          전송
        </button>
      </div>
    </div>
  );
}