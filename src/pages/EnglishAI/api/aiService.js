// src/api/aiService.js

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = "https://your-site.com";
const SITE_NAME = "LinguaAI";
const MODEL = "tngtech/deepseek-r1t2-chimera:free"; // Hoặc model khác

// Helper: Làm sạch JSON trả về từ AI (vì AI hay trả về kèm markdown ```json)
const cleanAndParseJSON = (text) => {
  try {
    let cleaned = text.replace(/```json\n?|```/g, "").trim();
    const firstBrace = cleaned.indexOf("{");
    const firstBracket = cleaned.indexOf("[");
    const lastBrace = cleaned.lastIndexOf("}");
    const lastBracket = cleaned.lastIndexOf("]");

    let start = -1;
    let end = -1;

    if (
      firstBrace !== -1 &&
      (firstBracket === -1 || firstBrace < firstBracket)
    ) {
      start = firstBrace;
      end = lastBrace;
    } else if (firstBracket !== -1) {
      start = firstBracket;
      end = lastBracket;
    }

    if (start !== -1 && end !== -1) {
      cleaned = cleaned.substring(start, end + 1);
    }
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return null;
  }
};

// Hàm gọi API trả về JSON
export const generateContent = async (prompt, systemInstruction = "") => {
  try {
    const response = await fetch(
      "[https://openrouter.ai/api/v1/chat/completions](https://openrouter.ai/api/v1/chat/completions)",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
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
        }),
      }
    );

    if (!response.ok) throw new Error("API Connection Failed");
    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";
    return cleanAndParseJSON(content);
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};

// Hàm gọi API trả về Text thuần (cho Chat)
export const generateTextContent = async (prompt, systemInstruction = "") => {
  try {
    const response = await fetch(
      "[https://openrouter.ai/api/v1/chat/completions](https://openrouter.ai/api/v1/chat/completions)",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
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
        }),
      }
    );

    if (!response.ok) throw new Error("API Connection Failed");
    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("AI Text Error:", error);
    throw error;
  }
};
