
import { GoogleGenAI, Type } from "@google/genai";
import { DailyMessage } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export const generateDailyMeditation = async (): Promise<DailyMessage> => {
  // Inicialização segura seguindo as diretrizes oficiais
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  const ai = new GoogleGenAI({ apiKey: apiKey || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: "Gere uma meditação diária inspiradora baseada no universo BTS para hoje." }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING, description: "Data formatada em DD/MM/AAAA" },
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

    const text = response.text;
    if (!text) throw new Error("Resposta vazia do modelo");
    
    const data = JSON.parse(text) as DailyMessage;
    return { ...data, source: 'ai' };
  } catch (error) {
    console.error("Erro ao gerar meditação via IA:", error);
    // Fallback elegante em caso de erro
    return {
      date: new Date().toLocaleDateString('pt-BR'),
      title: "O Despertar da Esperança",
      member: "BTS",
      song: "Spring Day",
      album: "You Never Walk Alone",
      spotifyUrl: "https://open.spotify.com/track/09mEucvDXqSsq1zSea0Y9L",
      imageUrl: "https://i.imgur.com/nIvbBDx.jpeg",
      quote: "Nenhuma noite é eterna, nenhuma estação dura para sempre.",
      reflection: "Mesmo no inverno mais rigoroso, a primavera está a caminho. Respire fundo e confie no seu tempo.",
      affirmation: "Eu sou resiliente e floresço no meu próprio tempo.",
      source: 'ai'
    };
  }
};
