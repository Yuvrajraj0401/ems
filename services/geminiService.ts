
import { GoogleGenAI } from "@google/genai";

export const editProductImage = async (base64Image: string, prompt: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // Using gemini-2.5-flash-image for image editing tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1], // Remove the data:image/png;base64, prefix
              mimeType: 'image/png',
            },
          },
          {
            text: `Edit this product image based on the following instruction: ${prompt}. Return the edited image.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
};
