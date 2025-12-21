
import { GoogleGenAI, Type } from "@google/genai";
import { DailyMessage } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export const generateDailyMeditation = async (): Promise<DailyMessage> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere a meditação de hoje baseada no universo BTS.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING },
            title: { type: Type.STRING },
            member: { type: Type.STRING },
            song: { type: Type.STRING },
            album: { type: Type.STRING },
            spotifyUrl: { type: Type.STRING },
            imageUrl: { type: Type.STRING },
            quote: { type: Type.STRING },
            reflection: { type: Type.STRING },
            affirmation: { type: Type.STRING },
          },
          required: ["date", "title", "member", "song", "album", "spotifyUrl", "imageUrl", "quote", "reflection", "affirmation"],
        },
      },
    });

    return JSON.parse(response.text) as DailyMessage;
  } catch (error) {
    return {
      date: new Date().toLocaleDateString('pt-BR'),
      title: "O Despertar da Primavera",
      member: "BTS",
      song: "Spring Day",
      album: "You Never Walk Alone",
      spotifyUrl: "https://open.spotify.com/track/09mEucvDXqSsq1zSea0Y9L",
      imageUrl: "https://i.imgur.com/nIvbBDx.jpeg",
      quote: "Nenhuma noite é eterna.",
      reflection: "Assim como as estações mudam, seus sentimentos também podem florescer.",
      affirmation: "Eu sou capaz de florescer no meu próprio tempo.",
      source: 'ai'
    };
  }
};
