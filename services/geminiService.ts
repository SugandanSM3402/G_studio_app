
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAssistantResponse = async (history: ChatMessage[], prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are a helpful Android system assistant called 'Droid-G'. Be concise and friendly.",
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with my circuits. Check your connection.";
  }
};

export const generateAndroidCode = async (prompt: string, language: 'kotlin' | 'java') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a professional ${language} code snippet for an Android app. Feature requested: ${prompt}. Only return the code block, no explanations.`,
      config: {
        systemInstruction: "You are an expert Android developer specializing in Kotlin (Jetpack Compose) and Java (Traditional Views). Provide clean, production-ready code snippets.",
        temperature: 0.2,
      },
    });
    return response.text || "// No code generated";
  } catch (error) {
    return `// Error generating code: ${error}`;
  }
};
