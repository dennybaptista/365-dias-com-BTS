
import { DailyMessage } from "../types";
import { SHEET_CSV_URL } from "../constants";
import { generateDailyMeditation } from "./geminiService";

// Helper para normalizar cabeçalhos da planilha
const normalizeHeader = (str: string): string => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

// Helper para obter a data atual no fuso de Brasília (UTC-3) com a regra das 04:00
const getBrazilEffectiveDate = (): Date => {
  const now = new Date();
  const brtString = now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
  const brt = new Date(brtString);
  
  if (brt.getHours() < 4) {
    brt.setDate(brt.getDate() - 1);
  }
  
  brt.setHours(0, 0, 0, 0);
  return brt;
};

// Determina o nome da aba com base na data
const getSheetNameForDate = (date: Date): string => {
  const monthNames = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", 
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
  ];
  const month = date.getMonth();
  const year = date.getFullYear();

  // Regra para janeiro de 2025 (aba legada)
  if (year === 2025 && month === 0) {
    return "2025 E JANEIRO";
  }

  // Para qualquer outro mês, utiliza o padrão solicitado: "MÊS 2026"
  // Mesmo que o ano atual seja 2025, o sistema buscará a aba com 2026
  return `${monthNames[month]} 2026`;
};

// Compara se duas datas são o mesmo dia
const isSameDay = (d1: Date, d2: Date): boolean => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

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

// Helper para buscar linhas de uma aba específica
const fetchRowsFromSheet = async (sheetName: string): Promise<string[][]> => {
  try {
    const url = `${SHEET_CSV_URL}&sheet=${encodeURIComponent(sheetName)}&t=${Date.now()}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (e) {
    console.error(`Erro ao buscar aba ${sheetName}:`, e);
    return [];
  }
};

export const fetchDailyMessageFromSheet = async (): Promise<DailyMessage | null> => {
  try {
    const effectiveNow = getBrazilEffectiveDate();
    const sheetName = getSheetNameForDate(effectiveNow);
    const rows = await fetchRowsFromSheet(sheetName);
    
    if (rows.length < 2) return await generateDailyMeditation();
    
    const headers = rows[0].map(normalizeHeader);
    
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
    const effectiveNow = getBrazilEffectiveDate();
    // Inicia com a aba de Janeiro
    const sheetNamesToFetch: string[] = ["2025 E JANEIRO"];
    
    // Adiciona as abas mensais até o mês atual
    // Começamos em Fevereiro (mês 1)
    let datePointer = new Date(2025, 1, 1); 
    const currentMonthEnd = new Date(effectiveNow.getFullYear(), effectiveNow.getMonth(), 1);

    while (datePointer <= currentMonthEnd) {
      const name = getSheetNameForDate(datePointer);
      if (!sheetNamesToFetch.includes(name)) {
        sheetNamesToFetch.push(name);
      }
      datePointer.setMonth(datePointer.getMonth() + 1);
    }

    // Buscar todas as abas em paralelo
    const allSheetResults = await Promise.all(
      sheetNamesToFetch.map(name => fetchRowsFromSheet(name))
    );

    const allMessages: DailyMessage[] = [];

    allSheetResults.forEach(rows => {
      if (rows.length < 2) return;
      
      const headers = rows[0].map(normalizeHeader);
      
      rows.slice(1).forEach(row => {
        const getVal = (h: string) => {
          const idx = headers.indexOf(normalizeHeader(h));
          return idx !== -1 ? row[idx]?.trim() || "" : "";
        };
        
        const msgDate = parseDateBR(row[0]);
        if (msgDate && (msgDate <= effectiveNow || isSameDay(msgDate, effectiveNow))) {
          allMessages.push({
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
          });
        }
      });
    });

    const uniqueMessages = Array.from(new Map(allMessages.map(m => [m.date, m])).values());
    return uniqueMessages.sort((a, b) => {
      const dateA = parseDateBR(a.date)?.getTime() || 0;
      const dateB = parseDateBR(b.date)?.getTime() || 0;
      return dateB - dateA;
    });

  } catch (error) {
    console.error("Erro ao carregar histórico multiavas:", error);
    return [];
  }
};
