import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateBlogContent = async (topic: string, tone: string = 'professional'): Promise<string> => {
  if (!apiKey) {
    throw new Error('API Key is missing. Please configure your environment.');
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a comprehensive, engaging blog post about "${topic}". 
      The tone should be ${tone}. 
      Structure it with clear H2 headings. 
      Keep it under 600 words. 
      Do not include markdown code blocks for the whole text, just standard markdown formatting.`,
    });

    return response.text || 'Failed to generate content.';
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content via Gemini.");
  }
};

export const generateMarketingTagline = async (businessName: string): Promise<string> => {
   if (!apiKey) return "Your Partner in Digital Growth";
   
   try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, punchy, 5-8 word marketing tagline for a digital agency named ${businessName}.`,
    });
    return response.text?.trim() || "Your Partner in Digital Growth";
   } catch (e) {
     return "Your Partner in Digital Growth";
   }
}
