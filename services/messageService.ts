
import { DailyMessage } from "../types";
import { SHEET_CSV_URL } from "../constants";
import { generateDailyMeditation } from "./geminiService";

const normalizeHeader = (str: string): string => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

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
        if (nextChar === '"') { currentField += '"'; i++; } else { inQuotes = false; }
      } else { currentField += char; }
    } else {
      if (char === '"') { inQuotes = true; }
      else if (char === ',') { row.push(currentField); currentField = ''; }
      else if (char === '\n' || char === '\r') {
        if (char === '\r' && nextChar === '\n') i++;
        row.push(currentField);
        if (row.length > 0) result.push(row);
        row = []; currentField = '';
      } else { currentField += char; }
    }
  }
  if (row.length > 0 || currentField !== '') { row.push(currentField); result.push(row); }
  return result;
};

export const fetchDailyMessageFromSheet = async (): Promise<DailyMessage | null> => {
  try {
    const response = await fetch(`${SHEET_CSV_URL}&t=${Date.now()}`);
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    if (rows.length < 2) return await generateDailyMeditation();
    const headers = rows[0].map(normalizeHeader);
    const today = new Date().toLocaleDateString('pt-BR');
    const todayRow = rows.slice(1).find(row => row[0] === today);
    if (!todayRow) return await generateDailyMeditation();
    const getVal = (h: string) => todayRow[headers.indexOf(normalizeHeader(h))]?.trim() || "";
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
  } catch {
    return await generateDailyMeditation();
  }
};

export const fetchAllPastMessagesFromSheet = async (): Promise<DailyMessage[]> => {
  try {
    const response = await fetch(`${SHEET_CSV_URL}&t=${Date.now()}`);
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    if (rows.length < 2) return [];
    const headers = rows[0].map(normalizeHeader);
    return rows.slice(1).map(row => {
      const getVal = (h: string) => row[headers.indexOf(normalizeHeader(h))]?.trim() || "";
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
        source: 'sheet' as any
      };
    }).reverse();
  } catch { return []; }
};
