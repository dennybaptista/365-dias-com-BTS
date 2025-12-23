
import { DailyMessage } from "../types";
import { SHEET_CSV_URL } from "../constants";
import { generateDailyMeditation } from "./geminiService";

// Helper para normalizar cabeçalhos da planilha
const normalizeHeader = (str: string): string => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

// Helper para obter a data atual no fuso de Brasília (UTC-3) com a regra das 04:00
const getBrazilEffectiveDate = (): Date => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const brt = new Date(utc - (3 * 3600000));
  
  // Se for antes das 4h da manhã, ainda conta como o dia anterior para o conteúdo
  if (brt.getHours() < 4) {
    brt.setDate(brt.getDate() - 1);
  }
  
  brt.setHours(0, 0, 0, 0);
  return brt;
};

// Formata Date para string DD/MM/AAAA
const formatDateBR = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Converte string DD/MM/AAAA para objeto Date para comparação
const parseDateBR = (dateStr: string): Date | null => {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
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
    const todayStr = formatDateBR(getBrazilEffectiveDate());
    
    const todayRow = rows.slice(1).find(row => row[0] === todayStr);
    
    if (!todayRow) return await generateDailyMeditation();
    
    const getVal = (h: string) => {
      const idx = headers.indexOf(normalizeHeader(h));
      return idx !== -1 ? todayRow[idx]?.trim() || "" : "";
    };

    return {
      date: todayRow[0],
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
          date: row[0],
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
        // Filtra para exibir apenas mensagens de hoje ou do passado
        const msgDate = parseDateBR(msg.date);
        return msgDate && msgDate <= effectiveNow;
      })
      .reverse(); // Mais recentes primeiro
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
    return [];
  }
};
