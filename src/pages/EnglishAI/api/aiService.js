// src/api/aiService.js adadas
// get api_key from env
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
// Nếu model là dòng o1-preview hoặc o1-mini, hãy đổi tên cho đúng.
// Hiện tại mình giữ nguyên biến MODEL của bạn để bạn tự config.
const MODEL = "gpt-5-nano";
const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

const cleanAndParseJSON = (text) => {
  try {
    let cleaned = text.replace(/```json\n?|```/g, "").trim();
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    console.log("Raw Text:", text);
    return null;
  }
};

export const generateContent = async (prompt, systemInstruction = "") => {
  try {
    const explicitJsonInstruction =
      systemInstruction + " Respond strictly in JSON format.";

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: explicitJsonInstruction },
          { role: "user", content: prompt },
        ],
        // ĐÃ XÓA: temperature: 0.7 (Để mặc định cho model tự quyết định)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `OpenAI API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";
    return cleanAndParseJSON(content);
  } catch (error) {
    console.error("AI JSON Generation Error:", error);
    throw error;
  }
};

export const generateTextContent = async (prompt, systemInstruction = "") => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          ...(systemInstruction
            ? [{ role: "system", content: systemInstruction }]
            : []),
          { role: "user", content: prompt },
        ],
        // ĐÃ XÓA: temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `OpenAI API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("AI Text Generation Error:", error);
    throw error;
  }
};
