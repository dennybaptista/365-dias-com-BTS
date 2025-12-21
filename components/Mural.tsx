
import React, { useState } from 'react';
import { Theme } from '../types';
import { COLORS } from '../constants';

interface MuralProps {
  theme: Theme;
}

interface ArmyMessage {
  id: string;
  name: string;
  location: string;
  date: string;
  content: string;
}

const armyMessages: ArmyMessage[] = [
  {
    id: '1',
    name: 'Maria Silva',
    location: 'São Paulo, Brasil',
    date: '9 de dezembro de 2025',
    content: '"BTS, vocês mudaram minha vida! Obrigada por cada música, cada momento, cada sorriso. Vocês são a minha força nos dias difíceis. 보라해! 💜"'
  },
  {
    id: '2',
    name: 'Ana Beatriz',
    location: 'Rio de Janeiro, Brasil',
    date: '12 de dezembro de 2025',
    content: '"Obrigada por me ensinarem a amar a mim mesma quando ninguém mais ensinou. Vocês são minha luz. ✨"'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    location: 'New York, USA',
    date: '15 de dezembro de 2025',
    content: '"Your music saved me in ways I can\'t even explain. Thank you for being my safe place. Borahae! 💜"'
  },
  {
    id: '4',
    name: 'Lucas Santos',
    location: 'Lisboa, Portugal',
    date: '18 de dezembro de 2025',
    content: '"Atravessando oceanos com a vossa música. O Bangtan é o meu lar. Eternamente grato por cada letra que me toca o coração."'
  },
  {
    id: '5',
    name: 'Elena Rossi',
    location: 'Rome, Italy',
    date: '20 de dezembro de 2025',
    content: '"Grazie per avermi dato la força di sognare ancora. Siete leggenda e la mia costante fonte de inspiração. 💜"'
  }
];

const Mural: React.FC<MuralProps> = ({ theme }) => {
  const currentColors = COLORS[theme];
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    // Note: Formspree handles the actual POST, this just triggers the UI feedback
    setTimeout(() => {
      setIsSubmitted(true);
      setMessage('');
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto reveal-animation space-y-12 pb-24 px-4 relative">
      {/* Confirmation Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsSubmitted(false)}
          ></div>
          <div className={`relative w-full max-w-sm p-8 rounded-[2rem] border-2 shadow-2xl animate-scale-up ${currentColors.card} ${currentColors.border} text-left`}>
            <div className="space-y-2">
              <h3 className={`text-xl font-bold flex items-center gap-2 ${currentColors.text}`}>
                Mensagem enviada! <span className="text-purple-500">💜</span>
              </h3>
              <p className={`text-sm md:text-base leading-relaxed opacity-80 ${currentColors.text}`}>
                Sua mensagem será analisada e pode aparecer na página de mensagens dos fãs.
              </p>
            </div>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-8 w-full py-3 rounded-2xl bts-gradient text-white font-bold transition-transform active:scale-95 shadow-lg shadow-purple-500/20"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Decorative Top Button */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-[#ec4899]/20 bg-[#ec4899]/5 shadow-sm transition-all hover:scale-105 cursor-default group">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#ec4899]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-sm font-black uppercase tracking-widest text-[#ec4899]">
            Mensagens do ARMY
          </span>
        </div>
      </div>

      {/* Header Text */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className={`text-3xl md:text-5xl font-elegant tracking-tight ${currentColors.text}`}>
          Do ARMY para o Bangtan
        </h2>
        <p className={`text-base md:text-lg font-medium leading-relaxed ${currentColors.textMuted}`}>
          Mensagens de amor e gratidão enviadas por ARMYs de todo o mundo para nossos meninos. Cada palavra carrega o nosso 보라해(Borahae) 💜
        </p>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 gap-6">
        {armyMessages.map((msg) => (
          <div 
            key={msg.id}
            className={`p-8 md:p-10 rounded-[2.5rem] border-2 transition-all duration-300 ${currentColors.card} ${currentColors.border} shadow-sm hover:shadow-md hover:border-purple-400/30 group`}
          >
            {/* Message Content */}
            <div className={`text-lg md:text-xl font-medium leading-relaxed mb-8 ${currentColors.text}`}>
              {msg.content}
            </div>

            {/* Metadata Footer */}
            <div className="flex flex-wrap items-center gap-y-4 gap-x-6 md:gap-x-10 text-[11px] md:text-xs font-semibold">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/5 text-purple-500 transition-colors group-hover:bg-purple-500/10`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <span className={currentColors.text}>{msg.name}</span>
              </div>
              <div className={`flex items-center gap-2 ${currentColors.textMuted}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{msg.location}</span>
              </div>
              <div className={`flex items-center gap-2 ${currentColors.textMuted}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{msg.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Form Section */}
      <section className="pt-20 space-y-12">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-pink-500/10 text-pink-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold">Deixe sua mensagem</span>
          </div>
        </div>

        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-elegant tracking-tight ${currentColors.text}`}>
            Do ARMY para o Bangtan
          </h2>
          <p className={`text-sm md:text-base font-medium leading-relaxed opacity-70 ${currentColors.textMuted}`}>
            Envie sua mensagem de carinho para o BTS. As mensagens passam por moderação antes de serem publicadas em nosso mural.
          </p>
        </div>

        <form 
          action="https://formspree.io/f/mrsrightbangtan@gmail.com"
          method="POST"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Seu nome */}
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${currentColors.text}`}>Seu nome</label>
            <input 
              type="text" 
              name="nome"
              required
              placeholder="Como você quer ser chamado(a)"
              className={`w-full p-4 rounded-2xl border-2 outline-none transition-all focus:border-purple-400 ${currentColors.card} ${currentColors.border} ${currentColors.text}`}
            />
          </div>

          {/* Seu e-mail */}
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${currentColors.text}`}>Seu e-mail</label>
            <input 
              type="email" 
              name="email"
              required
              placeholder="seu@email.com"
              className={`w-full p-4 rounded-2xl border-2 outline-none transition-all focus:border-purple-400 ${currentColors.card} ${currentColors.border} ${currentColors.text}`}
            />
          </div>

          {/* Cidade/Estado */}
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${currentColors.text}`}>Cidade/Estado</label>
            <input 
              type="text" 
              name="localidade"
              required
              placeholder="Ex: São Paulo/SP"
              className={`w-full p-4 rounded-2xl border-2 outline-none transition-all focus:border-purple-400 ${currentColors.card} ${currentColors.border} ${currentColors.text}`}
            />
          </div>

          {/* País */}
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${currentColors.text}`}>País</label>
            <input 
              type="text" 
              name="pais"
              required
              placeholder="Ex: Brasil"
              className={`w-full p-4 rounded-2xl border-2 outline-none transition-all focus:border-purple-400 ${currentColors.card} ${currentColors.border} ${currentColors.text}`}
            />
          </div>

          {/* Mensagem */}
          <div className="md:col-span-2 space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${currentColors.text}`}>Sua mensagem para o BTS</label>
            <div className="relative">
              <textarea 
                name="mensagem"
                required
                maxLength={500}
                placeholder="Escreva aqui sua mensagem de amor, gratidão ou apoio para o Bangtan... 💜"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full p-6 rounded-3xl border-2 outline-none transition-all focus:border-purple-400 min-h-[160px] resize-none ${currentColors.card} ${currentColors.border} ${currentColors.text}`}
              />
              <div className={`absolute bottom-4 right-6 text-[10px] font-bold ${currentColors.textMuted} opacity-40`}>
                {message.length}/500 caracteres
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <button 
              type="submit"
              className="w-full py-5 rounded-3xl bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-lg shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Enviar mensagem
            </button>
          </div>
          
          {/* Disclaimer Footer */}
          <div className={`md:col-span-2 text-center text-[10px] md:text-[11px] leading-relaxed opacity-60 px-6 ${currentColors.textMuted}`}>
            Sua mensagem será revisada antes de aparecer na página de mensagens. Não toleramos discurso de ódio, nem shipps. Também não publicaremos mensagens com duplo sentido, +18, com publicidade ou divulgações.
          </div>
        </form>
      </section>

      {/* Decorative Footer dots */}
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-20"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-40"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-20"></div>
      </div>

      <style>{`
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-up {
          animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Mural;
