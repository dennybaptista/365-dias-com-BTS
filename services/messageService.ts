
import { DailyMessage } from "../types";
import { SHEET_CSV_URL } from "../constants";
import { generateDailyMeditation } from "./geminiService";

// Helper para normalizar cabeçalhos da planilha
const normalizeHeader = (str: string): string => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

// Helper para obter a data atual no fuso de Brasília (UTC-3) com a regra das 04:00
const getBrazilEffectiveDate = (): Date => {
  // Obtém a data/hora atual em Brasília independente do fuso local do navegador
  const now = new Date();
  const brtString = now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
  const brt = new Date(brtString);
  
  // Se for antes das 4h da manhã em Brasília, ainda conta como o dia anterior para o conteúdo
  if (brt.getHours() < 4) {
    brt.setDate(brt.getDate() - 1);
  }
  
  brt.setHours(0, 0, 0, 0);
  return brt;
};

// Compara se duas datas são o mesmo dia (ignora horas)
const isSameDay = (d1: Date, d2: Date): boolean => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

// Converte string DD/MM/AAAA para objeto Date para comparação
const parseDateBR = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const clean = dateStr.trim();
  const parts = clean.split('/');
  if (parts.length !== 3) return null;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  return isNaN(date.getTime()) ? null : date;
};

const parseCSV = (text: string): string[][] => {
  const result: string[][] = [];
  let row: string[] = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') { 
          currentField += '"'; 
          i++; 
        } else { 
          inQuotes = false; 
        }
      } else { 
        currentField += char; 
      }
    } else {
      if (char === '"') { 
        inQuotes = true; 
      }
      else if (char === ',') { 
        row.push(currentField); 
        currentField = ''; 
      }
      else if (char === '\n' || char === '\r') {
        if (char === '\r' && nextChar === '\n') i++;
        row.push(currentField);
        if (row.length > 0 && row.some(cell => cell.trim() !== '')) {
          result.push(row);
        }
        row = []; 
        currentField = '';
      } else { 
        currentField += char; 
      }
    }
  }
  
  if (row.length > 0 || currentField !== '') {
    row.push(currentField);
    if (row.some(cell => cell.trim() !== '')) result.push(row);
  }
  return result;
};

export const fetchDailyMessageFromSheet = async (): Promise<DailyMessage | null> => {
  try {
    const response = await fetch(`${SHEET_CSV_URL}&t=${Date.now()}`);
    if (!response.ok) throw new Error("Erro ao acessar a planilha");
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    if (rows.length < 2) return await generateDailyMeditation();
    
    const headers = rows[0].map(normalizeHeader);
    const effectiveNow = getBrazilEffectiveDate();
    
    const todayRow = rows.slice(1).find(row => {
      const rowDate = parseDateBR(row[0]);
      return rowDate && isSameDay(rowDate, effectiveNow);
    });
    
    if (!todayRow) return await generateDailyMeditation();
    
    const getVal = (h: string) => {
      const idx = headers.indexOf(normalizeHeader(h));
      return idx !== -1 ? todayRow[idx]?.trim() || "" : "";
    };

    return {
      date: todayRow[0].trim(),
      title: getVal("titulo"),
      member: getVal("membro"),
      song: getVal("musica"),
      album: getVal("album"),
      spotifyUrl: getVal("spotify_url"),
      imageUrl: getVal("imagem_url"),
      quote: getVal("citacao"),
      reflection: getVal("reflexao"),
      affirmation: getVal("afirmacao"),
      source: 'sheet'
    };
  } catch (error) {
    console.warn("Sheet fetch falhou, tentando Gemini...", error);
    return await generateDailyMeditation();
  }
};

export const fetchAllPastMessagesFromSheet = async (): Promise<DailyMessage[]> => {
  try {
    const response = await fetch(`${SHEET_CSV_URL}&t=${Date.now()}`);
    if (!response.ok) return [];
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    if (rows.length < 2) return [];
    
    const headers = rows[0].map(normalizeHeader);
    const effectiveNow = getBrazilEffectiveDate();
    
    return rows.slice(1)
      .map(row => {
        const getVal = (h: string) => {
          const idx = headers.indexOf(normalizeHeader(h));
          return idx !== -1 ? row[idx]?.trim() || "" : "";
        };
        
        return {
          date: row[0].trim(),
          title: getVal("titulo"),
          member: getVal("membro"),
          song: getVal("musica"),
          album: getVal("album"),
          spotifyUrl: getVal("spotify_url"),
          imageUrl: getVal("imagem_url"),
          quote: getVal("citacao"),
          reflection: getVal("reflexao"),
          affirmation: getVal("afirmacao"),
          source: 'sheet'
        } as DailyMessage;
      })
      .filter(msg => {
        const msgDate = parseDateBR(msg.date);
        // Retorna apenas mensagens de hoje ou do passado
        return msgDate && (msgDate <= effectiveNow || isSameDay(msgDate, effectiveNow));
      })
      .reverse(); 
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
    return [];
  }
};
