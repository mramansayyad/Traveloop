import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not set in environment variables.");
}

// Initialize the Gemini client
// It will automatically use process.env.GEMINI_API_KEY if not passed explicitly
export const ai = new GoogleGenAI({});

// Export the recommended models from the skill
export const MODELS = {
  pro: "gemini-3-pro-preview",
  flash: "gemini-3-flash-preview",
  image: "gemini-3-pro-image-preview",
};

export const defaultModel = MODELS.flash;
