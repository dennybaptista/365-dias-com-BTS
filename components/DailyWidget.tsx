
import React from 'react';
import { DailyMessage, Theme } from '../types';
import { COLORS } from '../constants';

interface DailyWidgetProps {
  theme: Theme;
  onReveal: () => Promise<void>;
  onBack?: () => void;
  isRevealing: boolean;
  message: DailyMessage | null;
  revealed: boolean;
}

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

const getProjectDayCount = (): number => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const brtOffset = -3;
  const brt = new Date(utc + (3600000 * brtOffset));
  
  if (brt.getHours() < 4) {
    brt.setDate(brt.getDate() - 1);
  }
  const start = new Date(brt.getFullYear(), 0, 1);
  const diff = brt.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay) + 1;
};

const MediaIcons = {
  spotify: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.675.464-1.026.249-2.813-1.718-6.353-2.107-10.521-1.154-.403.092-.81-.162-.902-.565-.092-.402.162-.81.565-.902 4.566-1.044 8.473-.596 11.636 1.334.352.215.463.675.248 1.027zm1.464-3.26c-.27.438-.845.58-1.282.311-3.218-1.977-8.125-2.55-11.93-1.396-.494.15-1.018-.128-1.168-.622-.15-.494.128-1.018.622-1.168 4.346-1.32 9.75-.668 13.447 1.597.437.27.579.844.311 1.282zm.127-3.395C15.228 8.49 8.845 8.277 5.162 9.394c-.558.17-1.144-.144-1.314-.702-.17-.558.144-1.144.702-1.314 4.23-1.283 11.285-1.025 15.748 1.624.502.298.667.944.369 1.446-.298.502-.944.667-1.446.369z"/></svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  ),
  soundcloud: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M1.11 12.833c-.048 0-.088.04-.088.088v2.1c0 .048.04.088.088.088.048 0 .088-.04.088-.088v-2.1c0-.048-.04-.088-.088-.088zm.611-.843c-.061 0-.111.05-.111.111v3.52c0 .061.05.111.111.111s.111-.05.111-.111v-3.52c0-.062-.05-.111-.111-.111zm.778-.17c-.086 0-.156.07-.156.156v4.062c0 .085.07.155.156.155.085 0 .155-.07.155-.155v-4.062c0-.086-.07-.156-.155-.156zm.833-.941c-.104 0-.188.084-.188.188v5.717c0 .104.084.188.188.188.103 0 .188-.084.188-.188v-5.717c0-.104-.085-.188-.188-.188zm.889.376c-.122 0-.222.1-.222.222V17.5c0 .122.1.222.222.222s.222-.1.222-.222v-5.833c0-.122-.1-.222-.222-.222zm.944-.805c-.143 0-.259.116-.259.259v6.524c0 .142.116.258.259.258s.258-.116.258-.258v-6.524c0-.143-.116-.259-.258-.259zm1 .12c-.161 0-.292.131-.292.292v6.524c0 .161.131.292.292.292s.292-.131.292-.292v-6.524c0-.161-.131-.292-.292-.292zm.889-.885c-.182 0-.329.147-.329.329v7.712c0 .182.147.329.329.329s.329-.147.329-.329v-7.712c0-.182-.147-.329-.329-.329zm.889.843c-.201 0-.363.163-.363.363v7.41c0 .2.163.363.363.363s.364-.163.364-.363v-7.41c0-.201-.163-.363-.364-.363zm1-.476c-.22 0-.399.179-.399.399v7.711c0 .22.179.399.399.399s.399-.179.399-.399v-7.711c0-.22-.179-.399-.399-.399zm.944-.843c-.244 0-.442.198-.442.442v9.395c0 .244.198.442.442.442s.441-.198.441-.442V9.337c0-.244-.197-.442-.441-.442zm1.056.843c-.266 0-.482.215-.482.482v9.395c0 .267.215.482.482.482s.482-.215.482-.482V10.18c0-.267-.216-.482-.482-.482zm1.056-.475c-.287 0-.521.234-.521.521v9.871c0 .287.234.521.521.521.287 0 .521-.234.521-.521v-9.871c0-.287-.234-.521-.521-.521zm1.056-.445c-.313 0-.566.254-.566.566v10.316c0 .313.253.566.566.566.312 0 .565-.253.565-.566V9.261c0-.312-.253-.566-.565-.566zm1.11.843c-.334 0-.606.271-.606.606v10.316c0 .334.271.606.606.606s.607-.271.607-.606V10.104c0-.334-.273-.606-.607-.606zm.723-2.113c-.15 0-.29.026-.421.074-.014.004-.029.006-.044.006-.062 0-.112-.05-.112-.112v-1.127c0-.13-.105-.236-.236-.236-.131 0-.236.106-.236.236V19.5c0 .13.105.236.236.236.131 0 .236-.106.236-.236v-1.12c.164.129.369.206.592.206 1.487 0 2.693-1.206 2.693-2.693s-1.206-2.694-2.693-2.694h-.015z"/></svg>
  )
};

const DailyWidget: React.FC<DailyWidgetProps> = ({ theme, onReveal, onBack, isRevealing, message, revealed }) => {
  const currentColors = COLORS[theme] || COLORS.light;
  const dayOfYear = getProjectDayCount();
  const totalDays = 365;

  const handleShare = (platform: 'whatsapp' | 'telegram') => {
    if (!message) return;
    
    const reflectionText = message.reflection || '';
    const firstParagraph = stripMarkdown(reflectionText.split('\n')[0]);
    const cleanQuote = stripMarkdown(message.quote || '');
    const shareUrl = `${window.location.origin}${window.location.pathname}?d=${encodeURIComponent(message.date)}`;
    
    const fullShareText = `💜 ${message.title || 'Frases do BTS'}\n\n"${cleanQuote}"\n\n${firstParagraph}\n\nLeia o restante em: ${shareUrl}`;
    const encodedText = encodeURIComponent(fullShareText);
    
    const urls = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
      telegram: `https://t.me/share/url?text=${encodedText}`
    };
    
    window.open(urls[platform], '_blank');
  };

  const getMediaInfo = (url: string) => {
    const lowerUrl = url.toLowerCase();
    const commonColor = 'bg-purple-600 hover:bg-purple-700'; // Todos lilases
    
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
      return { 
        label: 'Assistir no YouTube', 
        icon: MediaIcons.youtube,
        color: commonColor
      };
    }
    if (lowerUrl.includes('soundcloud.com')) {
      return { 
        label: 'Ouvir no SoundCloud', 
        icon: MediaIcons.soundcloud,
        color: commonColor
      };
    }
    return { 
      label: 'Ouvir no Spotify', 
      icon: MediaIcons.spotify,
      color: commonColor
    };
  };

  const DayBadge = ({ isOverlay = false }: { isOverlay?: boolean }) => {
    if (isOverlay) {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-lg border border-white/20 bg-black/40 backdrop-blur-md">
          <span className="text-white text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
            Dia {dayOfYear} de {totalDays}
          </span>
        </div>
      );
    }
    return (
      <div className={`inline-flex items-center px-5 py-2 rounded-full border ${currentColors.border} ${currentColors.accent}`}>
        <span className={`text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase ${currentColors.primary}`}>
          Dia {dayOfYear} de {totalDays}
        </span>
      </div>
    );
  };

  const Tag = ({ children, icon }: { children?: React.ReactNode, icon?: React.ReactNode }) => (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-tight border transition-all ${
      theme === 'dark' 
        ? 'bg-purple-900/20 border-purple-800/40 text-purple-300'
        : 'bg-purple-50 border-purple-100 text-purple-600'
    }`}>
      {icon && <span className="opacity-70">{icon}</span>}
      {children}
    </div>
  );

  if (!revealed) {
    return (
      <div className={`w-full max-w-md p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 border-2 ${currentColors.card} ${currentColors.border} flex flex-col items-center justify-center space-y-8 min-h-[300px] hover:scale-[1.01] cursor-default group shadow-none`}>
        <div className="text-center space-y-6 flex flex-col items-center w-full">
          <DayBadge />
          <div className="space-y-3">
            <h2 className={`text-xl md:text-2xl font-bold ${currentColors.text}`}>Sua dose diária de BTS</h2>
            <p className={`${currentColors.textMuted} text-[10px] md:text-sm px-6 leading-relaxed opacity-70`}>
              Uma nova mensagem inspiradora é liberada todos os dias às 4h da manhã.
            </p>
          </div>
        </div>
        <button
          onClick={onReveal}
          disabled={isRevealing}
          className="w-full py-4 px-8 rounded-2xl bts-gradient text-white font-bold text-sm md:text-base shadow-lg hover:shadow-purple-500/40 transition-all transform active:scale-95 flex items-center justify-center gap-3"
        >
          {isRevealing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Conectando...</span>
            </div>
          ) : "Revelar Mensagem de Hoje"}
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-2xl rounded-[2rem] md:rounded-[2.5rem] border-2 overflow-hidden reveal-animation ${currentColors.card} ${currentColors.border} mx-auto shadow-none`}>
      {message && (
        <div className="flex flex-col">
          <div className="relative h-48 md:h-80 w-full overflow-hidden">
            <img 
              src={message.imageUrl || "https://i.imgur.com/nIvbBDx.jpeg"} 
              className="w-full h-full object-cover"
              alt={message.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://i.imgur.com/nIvbBDx.jpeg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            <div className="absolute top-4 right-5 opacity-90">
               <DayBadge isOverlay />
            </div>
            <div className="absolute bottom-5 left-6 right-6 md:bottom-6 md:left-8 md:right-8">
              <div className="mb-2">
                 <Tag icon={<span className="text-[14px]">💜</span>}>{message.member}</Tag>
              </div>
              <h2 className="text-white text-xl md:text-4xl font-elegant leading-tight">{message.title}</h2>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-8 md:space-y-10">
            <div className={`p-6 md:p-8 rounded-2xl border-2 border-dashed ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-purple-950/20 border-purple-900/40'} relative shadow-none`}>
              <div className={`text-base md:text-xl font-medium leading-relaxed italic ${currentColors.text} opacity-90 whitespace-pre-wrap`}>
                "{formatRichText(message.quote)}"
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag icon={<svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>}>
                  {message.song}
                </Tag>
                <Tag icon={<svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>}>
                  {message.album}
                </Tag>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              {(message.reflection || '').split('\n').map((para, i) => (
                <p key={i} className={`text-sm md:text-base leading-relaxed ${currentColors.text} opacity-80 font-medium whitespace-pre-wrap`}>
                  {formatRichText(para)}
                </p>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 py-4">
              <span className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${currentColors.text}`}>Compartilhar reflexão</span>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleShare('whatsapp')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all hover:scale-105 active:scale-95 shadow-none ${
                    theme === 'light' ? 'bg-purple-100 border-purple-200 text-purple-600' : 'bg-purple-900/40 border-purple-800/60 text-purple-200'
                  }`}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.006.332.013c.101.007.237-.038.37.282.144.346.491 1.197.536 1.285.045.088.075.191.014.311-.06.12-.09.195-.181.299-.091.104-.191.232-.272.311-.097.094-.199.197-.086.391.113.194.502.827 1.077 1.341.74.66 1.362.864 1.557.961.195.097.31.081.425-.052.115-.133.492-.573.622-.769.13-.197.26-.166.44-.099.181.066 1.146.541 1.341.639s.325.146.372.226c.047.081.047.469-.097.874z"/></svg>
                  <span className="text-xs font-bold uppercase tracking-tight">WhatsApp</span>
                </button>
                <button 
                   onClick={() => handleShare('telegram')}
                   className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all hover:scale-105 active:scale-95 shadow-none ${
                    theme === 'light' ? 'bg-purple-100 border-purple-200 text-purple-600' : 'bg-purple-900/40 border-purple-800/60 text-purple-200'
                  }`}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 8.146l-1.92 9.043c-.145.639-.523.797-1.058.497l-2.924-2.155-1.411 1.357c-.156.156-.287.287-.588.287l.21-2.972 5.41-4.887c.235-.211-.051-.328-.365-.119l-6.685 4.209-2.88-.9c-.626-.195-.638-.626.13-.923l11.26-4.34c.521-.19.977.123.821.843z"/></svg>
                  <span className="text-xs font-bold uppercase tracking-tight">Telegram</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/10 space-y-8">
              <div className={`text-center p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] ${theme === 'light' ? 'bg-purple-50' : 'bg-purple-900/10'} border border-purple-500/10 shadow-none`}>
                <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] ${currentColors.textMuted} mb-2 block opacity-60`}>Afirmação do Dia</span>
                <div className={`text-base md:text-lg font-bold italic ${theme === 'light' ? 'text-purple-700' : 'text-purple-300'} leading-snug shadow-none whitespace-pre-wrap`}>
                  "{formatRichText(message.affirmation)}"
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                {message.spotifyUrl && (() => {
                  const mediaInfo = getMediaInfo(message.spotifyUrl);
                  return (
                    <a 
                      href={message.spotifyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white text-xs md:text-sm font-bold transition-all shadow-md active:scale-95 ${mediaInfo.color}`}
                    >
                      {mediaInfo.icon}
                      {mediaInfo.label}
                    </a>
                  );
                })()}

                {onBack && (
                  <button 
                    onClick={onBack}
                    className={`text-xs md:text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-full border transition-all active:scale-95 flex items-center gap-2 shadow-none ${
                      theme === 'light' 
                        ? 'border-purple-200 text-purple-400 hover:bg-purple-50 hover:text-purple-600' 
                        : 'border-purple-900/40 text-purple-500 hover:bg-purple-900/20 hover:text-purple-300'
                    }`}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                    Voltar para a Home
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyWidget;
