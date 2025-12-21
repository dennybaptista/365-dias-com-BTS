
import React, { useState } from 'react';
import { Theme } from '../types';
import { COLORS } from '../constants';

interface ContactProps {
  theme: Theme;
}

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const currentColors = COLORS[theme];
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto reveal-animation space-y-12 pb-24 px-4 relative">
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
                Obrigado por entrar em contato. Vou ler com carinho!
              </p>
            </div>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-8 w-full py-3 rounded-2xl bts-gradient text-white font-bold transition-transform active:scale-95 shadow-lg shadow-purple-500/20"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Top Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/5 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-bold">Entre em contato</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className={`text-5xl md:text-6xl font-elegant tracking-tight bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent`}>
          Contato
        </h2>
        <p className={`text-lg md:text-xl font-medium ${currentColors.textMuted}`}>
          Fala ARMY. Envie sua mensagem. Vou amar ler você.
        </p>
      </div>

      {/* Form Card */}
      <div className={`p-8 md:p-12 rounded-[2.5rem] border-2 ${currentColors.card} ${currentColors.border} shadow-xl`}>
        <form 
          action="https://formspree.io/f/mrsrightbangtan@gmail.com"
          method="POST"
          className="space-y-8"
          onSubmit={() => setTimeout(() => setIsSubmitted(true), 500)}
        >
          {/* Nome */}
          <div className="space-y-3">
            <label className={`text-sm font-bold uppercase tracking-wider block ${currentColors.text}`}>Seu nome</label>
            <input 
              type="text" 
              name="nome"
              required
              placeholder="Digite seu nome"
              className={`w-full p-5 rounded-2xl border-2 outline-none transition-all focus:border-purple-400 bg-gray-50/50 dark:bg-black/10 ${currentColors.border} ${currentColors.text}`}
            />
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label className={`text-sm font-bold uppercase tracking-wider block ${currentColors.text}`}>Seu email</label>
            <input 
              type="email" 
              name="email"
              required
              placeholder="seu@email.com"
              className={`w-full p-5 rounded-2xl border-2 outline-none transition-all focus:border-purple-400 bg-gray-50/50 dark:bg-black/10 ${currentColors.border} ${currentColors.text}`}
            />
          </div>

          {/* Mensagem */}
          <div className="space-y-3">
            <label className={`text-sm font-bold uppercase tracking-wider block ${currentColors.text}`}>Sua mensagem</label>
            <textarea 
              name="mensagem"
              required
              placeholder="Escreva sua mensagem aqui..."
              className={`w-full p-6 rounded-3xl border-2 outline-none transition-all focus:border-purple-400 min-h-[180px] resize-none bg-gray-50/50 dark:bg-black/10 ${currentColors.border} ${currentColors.text}`}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-5 rounded-2xl bts-gradient text-white font-bold text-lg shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Enviar Mensagem
            </button>
          </div>
        </form>
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

export default Contact;
