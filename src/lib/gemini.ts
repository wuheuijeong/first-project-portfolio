export async function askQuestion(question: string, context: string) {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Tyle": "application/json"},
        body: JSON.stringify({ question, context }),
    });
    const data = await res.json();
    return data.answer;
}