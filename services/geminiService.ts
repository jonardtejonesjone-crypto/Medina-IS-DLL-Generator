import { GoogleGenAI } from "@google/genai";
import { GenerationRequest, GenerationResponse, DailyLessonLogOutputSchema } from "../types";

export const generateLessonLog = async (
  request: GenerationRequest
): Promise<GenerationResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined in the environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: request.model,
      contents: request.prompt,
      config: {
        temperature: 0.9,
        topK: 64,
        topP: 0.95,
        responseMimeType: "application/json", // Request JSON output
        responseSchema: DailyLessonLogOutputSchema, // Apply the defined schema
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text content received from Gemini API.");
    }

    return { text: text };
  } catch (error) {
    console.error("Error generating lesson log:", error);
    throw new Error(`Failed to generate lesson log: ${(error as Error).message}`);
  }
};