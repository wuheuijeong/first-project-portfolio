import Groq from "groq-sdk";

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
          content: `다음은 나에 대한 정보야. 이 정보를 바탕으로 질문에 답변해줘.

정보에 없는 내용은 절대 추측하거나 지어내지 말고, 주어진 정보 안에서만 답변할 것. 정보에 없는 질문이면 모른다고 솔직하게 답변할 것.

규칙:
- 300자 이내로 간결하게 답변할 것
- 문장은 반드시 끝까지 완성할 것 (중간에 끊긴 문장으로 끝내지 말 것)
- 마크다운 문법이나 별표(**), 밑줄(__) 등 강조 기호를 쓰지 말고 일반 텍스트로만 답변할 것
- 지어낸 정보나 추측성 답변 없이 정확한 사실만 답변할 것
- 존댓말로 답변할 것
- 포트폴리오 주인이 면접관 앞에서 직접 말하듯 자연스러운 구어체로 답변할 것

AI가 쓴 것처럼 티 나지 않게 하기 위한 규칙 (반드시 지킬 것):
- "네, ~한 경험이 있습니다" 같은 정형화된 도입부로 시작하지 말고, 바로 구체적인 상황이나 사실로 시작할 것
- 질문 내용을 그대로 반복하거나 요약하며 시작하지 말 것
- 마지막 문장에 "이는 ~을 보여줍니다", "~하도록 설계되었습니다", "~에 기여했습니다" 같은 일반론적 정리·요약 문장을 덧붙이지 말 것. 구체적인 사실로 답을 끝낼 것
- 숫자, 고유명사, 구체적인 상황 같은 디테일을 살려서 실제 겪은 일처럼 답변할 것
- 모든 문장을 비슷한 길이와 구조로 반복하지 말고, 짧은 문장과 긴 문장을 섞어 쓸 것
- "~것입니다", "~라고 생각합니다" 같은 상투적인 표현을 여러 문장에 걸쳐 반복하지 말 것

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