
import React, { useState } from 'react';
import { Theme } from '../types';
import { COLORS, GOOGLE_SCRIPT_URL } from '../constants';

const armyMessages = [
  { id: '1', name: 'Maria Silva', location: 'São Paulo, Brasil', date: '9 de dezembro de 2025', content: '"BTS, vocês mudaram minha vida! Obrigada por cada música, cada momento, cada sorriso. Vocês são a minha força nos dias difíceis. 보라해! 💜"' }
];

const Mural: React.FC<{ theme: Theme }> = ({ theme }) => {
  const currentColors = COLORS[theme];
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!GOOGLE_SCRIPT_URL) {
      alert("Configuração de envio pendente.");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      formType: 'mural',
      nome: formData.get('nome'),
      email: formData.get('email'),
      localidade: formData.get('localidade'),
      pais: formData.get('pais'),
      mensagem: formData.get('mensagem'),
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data),
      });
      setIsSubmitted(true);
      setMessage('');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Erro ao enviar mural:", error);
      alert("Erro ao enviar para o mural.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto reveal-animation space-y-12 pb-24 px-4">
      {isSubmitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSubmitted(false)}></div>
          <div className={`relative w-full max-w-sm p-8 rounded-[2rem] border-2 shadow-2xl ${currentColors.card} ${currentColors.border}`}>
            <h3 className={`text-xl font-bold ${currentColors.text}`}>Mensagem enviada! 💜</h3>
            <p className={`mt-2 text-sm opacity-80 ${currentColors.text}`}>Sua mensagem será analisada e pode aparecer no mural.</p>
            <button onClick={() => setIsSubmitted(false)} className="mt-8 w-full py-3 rounded-2xl bts-gradient text-white font-bold">Entendido</button>
          </div>
        </div>
      )}
      <div className="text-center space-y-4">
        <h2 className={`text-3xl md:text-5xl font-elegant ${currentColors.text}`}>Do ARMY para o Bangtan</h2>
        <p className={`text-base md:text-lg font-medium ${currentColors.textMuted}`}>Mensagens de amor e gratidão enviadas por ARMYs de todo o mundo.</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {armyMessages.map((msg) => (
          <div key={msg.id} className={`p-8 md:p-10 rounded-[2.5rem] border-2 ${currentColors.card} ${currentColors.border} shadow-sm group`}>
            <div className={`text-lg md:text-xl font-medium leading-relaxed mb-8 ${currentColors.text}`}>{msg.content}</div>
            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
              <span className={currentColors.text}>{msg.name}</span>
              <span className={currentColors.textMuted}>{msg.location}</span>
              <span className={currentColors.textMuted}>{msg.date}</span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="pt-20 space-y-8">
        <h2 className={`text-center text-3xl font-elegant ${currentColors.text}`}>Deixe sua mensagem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="nome" placeholder="Seu nome" className={`p-4 rounded-2xl border-2 ${currentColors.card} ${currentColors.border} ${currentColors.text}`} required />
          <input type="email" name="email" placeholder="Seu e-mail" className={`p-4 rounded-2xl border-2 ${currentColors.card} ${currentColors.border} ${currentColors.text}`} required />
          <input type="text" name="localidade" placeholder="Cidade/Estado" className={`p-4 rounded-2xl border-2 ${currentColors.card} ${currentColors.border} ${currentColors.text}`} required />
          <input type="text" name="pais" placeholder="País" className={`p-4 rounded-2xl border-2 ${currentColors.card} ${currentColors.border} ${currentColors.text}`} required />
          <textarea name="mensagem" maxLength={500} value={message} onChange={e => setMessage(e.target.value)} placeholder="Escreva aqui sua mensagem... 💜" className={`md:col-span-2 p-6 rounded-3xl border-2 min-h-[160px] resize-none ${currentColors.card} ${currentColors.border} ${currentColors.text}`} required />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-5 rounded-3xl bg-[#9333ea] text-white font-bold text-lg disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar mensagem"}
        </button>
      </form>
    </div>
  );
};
export default Mural;
