
import React, { useState, useEffect, useMemo } from 'react';
import { DailyMessage, Theme } from '../types';
import { COLORS } from '../constants';
import { fetchAllPastMessagesFromSheet } from '../services/messageService';

const stripMarkdown = (text: string) => {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
};

const formatRichText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

interface ArchiveProps {
  theme: Theme;
}

const Archive: React.FC<ArchiveProps> = ({ theme }) => {
  const currentColors = COLORS[theme];
  const [messages, setMessages] = useState<DailyMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<DailyMessage | null>(null);

  const [filterMember, setFilterMember] = useState<string>('');
  const [filterAlbum, setFilterAlbum] = useState<string>('');
  const [filterSong, setFilterSong] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllPastMessagesFromSheet();
      setMessages(data);
      setLoading(false);
    };
    load();
  }, []);

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

  const clearFilters = () => {
    setFilterMember('');
    setFilterAlbum('');
    setFilterSong('');
  };

  const handleShare = (msg: DailyMessage, platform: 'whatsapp' | 'telegram') => {
    const firstParagraph = stripMarkdown(msg.reflection.split('\n')[0]);
    const cleanQuote = stripMarkdown(msg.quote);
    const shareUrl = `${window.location.origin}${window.location.pathname}?d=${encodeURIComponent(msg.date)}`;
    
    const shareText = `💜 ${msg.title}\n\n"${cleanQuote}"\n\n${firstParagraph}\n\nLeia o restante em: \n${shareUrl}`;
    const encodedText = encodeURIComponent(shareText);
    
    const urls = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`💜 ${msg.title}\n\n"${cleanQuote}"\n\n${firstParagraph}\n\nLeia o restante em: `)}`
    };
    
    window.open(urls[platform], '_blank');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <p className={`text-sm font-bold uppercase tracking-widest ${currentColors.textMuted}`}>Carregando memórias...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 px-4 pb-24 reveal-animation">
      <div className="text-center space-y-4">
        <h2 className={`text-4xl md:text-6xl font-elegant tracking-tight bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent`}>
          Arquivo de Reflexões
        </h2>
        <p className={`text-sm md:text-base font-medium ${currentColors.textMuted}`}>Reviva todas as doses de carinho do Bangtan já compartilhadas.</p>
      </div>

      <div className={`p-6 md:p-8 rounded-[2rem] border-2 ${currentColors.card} ${currentColors.border} shadow-none space-y-6`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-xs font-black uppercase tracking-widest ${currentColors.primary}`}>Filtrar memórias</h3>
          {(filterMember || filterAlbum || filterSong) && (
            <button onClick={clearFilters} className="text-[10px] font-bold uppercase text-purple-500 hover:underline">Limpar Filtros</button>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className={`text-[10px] font-bold uppercase tracking-wider ${currentColors.textMuted}`}>Artista / Membro</label>
            <select 
              value={filterMember} 
              onChange={e => { setFilterMember(e.target.value); setFilterAlbum(''); setFilterSong(''); }}
              className={`w-full p-3 rounded-xl border ${currentColors.border} bg-transparent outline-none focus:border-purple-500 transition-all text-sm font-medium ${currentColors.text}`}
            >
              <option value="">Todos os Membros</option>
              {members.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="flex-1 space-y-2">
            <label className={`text-[10px] font-bold uppercase tracking-wider ${currentColors.textMuted}`}>Álbum</label>
            <select 
              value={filterAlbum} 
              disabled={!filterMember && filterMember !== '' && albums.length === 0}
              onChange={e => { setFilterAlbum(e.target.value); setFilterSong(''); }}
              className={`w-full p-3 rounded-xl border ${currentColors.border} bg-transparent outline-none focus:border-purple-500 transition-all text-sm font-medium ${currentColors.text} disabled:opacity-30`}
            >
              <option value="">Todos os Álbuns</option>
              {albums.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="flex-1 space-y-2">
            <label className={`text-[10px] font-bold uppercase tracking-wider ${currentColors.textMuted}`}>Música</label>
            <select 
              value={filterSong} 
              disabled={!filterAlbum}
              onChange={e => setFilterSong(e.target.value)}
              className={`w-full p-3 rounded-xl border ${currentColors.border} bg-transparent outline-none focus:border-purple-500 transition-all text-sm font-medium ${currentColors.text} disabled:opacity-30`}
            >
              <option value="">Todas as Músicas</option>
              {songs.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filteredMessages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMessages.map((msg, i) => (
            <div 
              key={i}
              className={`flex flex-col rounded-[2rem] border-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] ${currentColors.card} ${currentColors.border} shadow-none group`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={msg.imageUrl || "https://i.imgur.com/nIvbBDx.jpeg"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={msg.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-5 right-5">
                   <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">{msg.member}</span>
                   <h3 className="text-white text-lg font-bold truncate leading-tight">{msg.title}</h3>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 space-y-4">
                <p className={`text-sm italic leading-relaxed line-clamp-3 ${currentColors.text} opacity-70`}>
                  "{msg.quote}"
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-purple-500/10">
                   <span className={`text-[10px] font-bold ${currentColors.textMuted}`}>{msg.date}</span>
                   <button 
                    onClick={() => setSelectedMsg(msg)}
                    className="text-xs font-black uppercase tracking-widest text-purple-500 hover:text-purple-600 transition-colors"
                   >
                     Ler mais →
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
           <span className="text-4xl">🔍</span>
           <p className={`font-medium ${currentColors.textMuted}`}>Nenhuma mensagem encontrada para estes filtros.</p>
        </div>
      )}

      {selectedMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedMsg(null)}
          ></div>
          {/* Modal simplificado: sem animação de escala, sem scroll interno forçado e sem sombra */}
          <div className={`relative w-full max-w-2xl rounded-[2.5rem] border-2 shadow-none overflow-hidden ${currentColors.card} ${currentColors.border}`}>
            <div className="relative h-64 md:h-80 w-full">
              <img src={selectedMsg.imageUrl} className="w-full h-full object-cover" alt="" />
              <button onClick={() => setSelectedMsg(null)} className="absolute top-6 right-6 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm">✕</button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8">
                <span className="text-pink-400 text-xs font-black uppercase tracking-[0.3em]">{selectedMsg.member}</span>
                <h2 className="text-white text-3xl font-elegant">{selectedMsg.title}</h2>
              </div>
            </div>
            <div className="p-8 md:p-12 space-y-10 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className={`p-6 rounded-2xl border-2 border-dashed ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-purple-950/20 border-purple-900/40'} relative shadow-none`}>
                <p className={`text-lg italic leading-relaxed ${currentColors.text}`}>"{formatRichText(selectedMsg.quote)}"</p>
                <div className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {selectedMsg.song} • {selectedMsg.album}
                </div>
              </div>
              <div className="space-y-6">
                {selectedMsg.reflection.split('\n').map((para, i) => (
                  <p key={i} className={`text-base leading-relaxed ${currentColors.text} opacity-80`}>{formatRichText(para)}</p>
                ))}
              </div>
              <div className={`text-center p-8 rounded-[2rem] ${theme === 'light' ? 'bg-purple-50' : 'bg-purple-900/10'} border border-purple-500/10 shadow-none`}>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-2">Afirmação</span>
                <p className={`text-xl font-bold italic ${theme === 'light' ? 'text-purple-700' : 'text-purple-300'}`}>"{formatRichText(selectedMsg.affirmation)}"</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={() => handleShare(selectedMsg, 'whatsapp')}
                    className={`flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 border transition-all ${
                      theme === 'light' ? 'bg-purple-100 border-purple-200 text-purple-600' : 'bg-purple-900/40 border-purple-800/60 text-purple-200'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button 
                    onClick={() => handleShare(selectedMsg, 'telegram')}
                    className={`flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 border transition-all ${
                      theme === 'light' ? 'bg-purple-100 border-purple-200 text-purple-600' : 'bg-purple-900/40 border-purple-800/60 text-purple-200'
                    }`}
                  >
                    Telegram
                  </button>
                </div>
                <button 
                  onClick={() => setSelectedMsg(null)}
                  className="w-full py-4 rounded-2xl border-2 border-purple-500/20 text-purple-500 font-bold uppercase tracking-widest text-sm hover:bg-purple-500/5 transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archive;
