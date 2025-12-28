
import React, { useState, useEffect, useMemo } from 'react';
import { DailyMessage, Theme } from '../types';
import { COLORS } from '../constants';
import { fetchAllPastMessagesFromSheet } from '../services/messageService';

interface ArchiveProps {
  theme: Theme;
  onViewMessage: (msg: DailyMessage) => void;
  initialFilters?: {
    member?: string;
    album?: string;
    song?: string;
  };
}

const Archive: React.FC<ArchiveProps> = ({ theme, onViewMessage, initialFilters }) => {
  const currentColors = COLORS[theme];
  const [messages, setMessages] = useState<DailyMessage[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filterMember, setFilterMember] = useState<string>(initialFilters?.member || '');
  const [filterAlbum, setFilterAlbum] = useState<string>(initialFilters?.album || '');
  const [filterSong, setFilterSong] = useState<string>(initialFilters?.song || '');

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllPastMessagesFromSheet();
      setMessages(data);
      setLoading(false);
    };
    load();
  }, []);

  // Sincroniza filtros iniciais se eles mudarem
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.member) setFilterMember(initialFilters.member);
      if (initialFilters.album) setFilterAlbum(initialFilters.album);
      if (initialFilters.song) setFilterSong(initialFilters.song);
    }
  }, [initialFilters]);

  const members = useMemo(() => Array.from(new Set(messages.map(m => m.member))), [messages]);
  const albums = useMemo(() => {
    const filtered = filterMember ? messages.filter(m => m.member === filterMember) : messages;
    return Array.from(new Set(filtered.map(m => m.album)));
  }, [messages, filterMember]);
  const songs = useMemo(() => {
    let filtered = messages;
    if (filterMember) filtered = filtered.filter(m => m.member === filterMember);
    if (filterAlbum) filtered = filtered.filter(m => m.album === filterAlbum);
    return Array.from(new Set(filtered.map(m => m.song)));
  }, [messages, filterMember, filterAlbum]);

  const filteredMessages = useMemo(() => {
    return messages.filter(m => {
      const matchMember = !filterMember || m.member === filterMember;
      const matchAlbum = !filterAlbum || m.album === filterAlbum;
      const matchSong = !filterSong || m.song === filterSong;
      return matchMember && matchAlbum && matchSong;
    });
  }, [messages, filterMember, filterAlbum, filterSong]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
      <p className={`text-sm font-bold uppercase tracking-widest ${currentColors.textMuted}`}>Carregando memórias...</p>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 px-4 pb-24 reveal-animation">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-elegant bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Arquivo de Reflexões</h2>
        <p className={`text-sm md:text-base font-medium ${currentColors.textMuted}`}>Reviva todas as doses de carinho do Bangtan já compartilhadas.</p>
      </div>
      <div className={`p-6 md:p-8 rounded-[2rem] border-2 ${currentColors.card} ${currentColors.border} space-y-6`}>
        <h3 className={`text-xs font-black uppercase tracking-widest ${currentColors.primary}`}>Filtrar memórias</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className={`text-[10px] font-bold uppercase tracking-wider ${currentColors.textMuted}`}>Artista / Membro</label>
            <select value={filterMember} onChange={e => { setFilterMember(e.target.value); setFilterAlbum(''); setFilterSong(''); }} className={`w-full p-3 rounded-xl border ${currentColors.border} bg-transparent outline-none text-sm font-medium ${currentColors.text}`}>
              <option value="">Todos os Membros</option>
              {members.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex-1 space-y-2">
            <label className={`text-[10px] font-bold uppercase tracking-wider ${currentColors.textMuted}`}>Álbum</label>
            <select value={filterAlbum} disabled={!filterMember && filterMember !== '' && albums.length === 0} onChange={e => { setFilterAlbum(e.target.value); setFilterSong(''); }} className={`w-full p-3 rounded-xl border ${currentColors.border} bg-transparent outline-none text-sm font-medium ${currentColors.text} disabled:opacity-30`}>
              <option value="">Todos os Álbuns</option>
              {albums.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex-1 space-y-2">
            <label className={`text-[10px] font-bold uppercase tracking-wider ${currentColors.textMuted}`}>Música</label>
            <select value={filterSong} disabled={!filterAlbum} onChange={e => setFilterSong(e.target.value)} className={`w-full p-3 rounded-xl border ${currentColors.border} bg-transparent outline-none text-sm font-medium ${currentColors.text} disabled:opacity-30`}>
              <option value="">Todas as Músicas</option>
              {songs.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMessages.map((msg, i) => (
          <div key={i} className={`flex flex-col rounded-[2rem] border-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] ${currentColors.card} ${currentColors.border} group`}>
            <div className="relative h-48 overflow-hidden">
              <img src={msg.imageUrl || "https://i.imgur.com/nIvbBDx.jpeg"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={msg.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5">
                 <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">{msg.member}</span>
                 <h3 className="text-white text-lg font-bold truncate leading-tight">{msg.title}</h3>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 space-y-4">
              <p className={`text-sm italic leading-relaxed line-clamp-3 ${currentColors.text} opacity-70`}>"{msg.quote}"</p>
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-purple-500/10">
                 <span className={`text-[10px] font-bold ${currentColors.textMuted}`}>{msg.date}</span>
                 <button onClick={() => onViewMessage(msg)} className="text-xs font-black uppercase tracking-widest text-purple-500 hover:text-purple-600 transition-colors">Ler mais →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Archive;
