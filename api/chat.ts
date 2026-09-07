import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 임시: 사용 가능한 모델 목록 확인
  const models = await groq.models.list();
  console.log("사용 가능한 모델 목록:", JSON.stringify(models, null, 2));

  const { question, context } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `다음은 나에 대한 정보야. 이 정보를 바탕으로 질문에 답변해줘.

규칙:
- 2~3문장 이내로 간결하게 답변할 것
- 마크다운 문법을 쓰지 말고 일반 텍스트로만 답변할 것

[정보]
${context}`,
        },
        { role: "user", content: question },
      ],
      model: "openai/gpt-oss-20b",
      max_tokens: 150,
    });

    const answer = completion.choices[0]?.message?.content ?? "답변을 가져오지 못했습니다.";
    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}