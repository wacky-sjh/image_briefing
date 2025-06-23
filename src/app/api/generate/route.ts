import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  // 1. formData 파싱
  const formData = await req.formData();
  const file = formData.get("image") as File | null;
  const prompt = (formData.get("prompt") as string) || "이 이미지에 대해 자세히 설명해 주세요.";

  if (!file) {
    return new Response(JSON.stringify({ error: "No image file uploaded." }), { status: 400 });
  }

  // 2. 파일을 ArrayBuffer로 읽고 base64로 변환
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");

  // 3. Gemini API 호출
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: "Server configuration error: API Key missing." }), {
      status: 500,
    });
  }
  const genAI = new GoogleGenAI({ apiKey: API_KEY });

  const imagePart = {
    inlineData: {
      data: base64,
      mimeType: file.type || "image/jpeg",
    },
  };

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ parts: [{ text: prompt }, imagePart] }],
      // config: {
      //   thinkingConfig: {
      //     thinkingBudget: 0,
      //   },
      // },
    });

    const text = result.text;
    return new Response(JSON.stringify({ description: text }), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Failed to generate image description.",
        details: error?.response?.text || error?.message,
      }),
      { status: 500 },
    );
  }
}
