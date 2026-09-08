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

정보에 없는 내용은 절대 추측하거나 지어내지 말고, 주어진 정보 안에서만 답변할 것. 정보에 없는 질문이면 모른다고 솔직하게 답변할 것.

규칙:
- 300자로 간결하게 답변할 것
- 문장은 반드시 끝까지 완성할 것 (중간에 끊긴 문장으로 끝내지 말 것)
- 마크다운 문법을 쓰지 말고 일반 텍스트로만 답변할 것
- 별표(**), 밑줄(__) 등 강조 기호를 절대 사용하지 말 것
- 지어낸 정보나 추측성 답변 없이 정확한 사실만 답변할 것
- 존댓말로 답변할 것
- 포트폴리오 주인이 답변하는 것처럼 톤앤매너를 적용하여 답변할 것

[정보]
${context}`,
        },
        { role: "user", content: question },
      ],
      model: "openai/gpt-oss-20b",
    });

    const answer = completion.choices[0]?.message?.content ?? "답변을 가져오지 못했습니다.";
    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}