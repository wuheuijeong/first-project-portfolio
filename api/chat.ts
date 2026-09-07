import Groq from "groq-sdk";

console.log("모든 환경변수 키 목록:", Object.keys(process.env).filter(k => k.includes("GROQ") || k.includes("GEMINI")));
console.log("GROQ_API_KEY 값:", process.env.GROQ_API_KEY);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, context } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `다음은 나에 대한 정보야. 이 정보를 바탕으로 질문에 답변해줘. 정보에 없는 내용이면 모른다고 답해줘.\n\n${context}`,
        },
        { role: "user", content: question },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const answer = completion.choices[0]?.message?.content ?? "답변을 가져오지 못했습니다.";
    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}