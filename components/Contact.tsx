
import React, { useState } from 'react';
import { Theme } from '../types';
import { COLORS, GOOGLE_SCRIPT_URL } from '../constants';

const Contact: React.FC<{ theme: Theme }> = ({ theme }) => {
  const currentColors = COLORS[theme];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!GOOGLE_SCRIPT_URL) {
      alert("Configuração de envio pendente. Por favor, configure a URL do script.");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      formType: 'contato',
      nome: formData.get('nome'),
      email: formData.get('email'),
      mensagem: formData.get('mensagem'),
    };

    try {
      // Usamos no-cors e enviamos como texto simples para evitar erros de preflight (CORS)
      // O Google Apps Script lerá o corpo via e.postData.contents
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data),
      });
      
      // No modo no-cors não temos acesso à resposta, mas se o fetch não lançar erro,
      // consideramos que o navegador conseguiu despachar o pacote.
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Houve um erro ao enviar. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto reveal-animation space-y-12 pb-24 px-4">
      {isSubmitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSubmitted(false)}></div>
          <div className={`relative w-full max-w-sm p-8 rounded-[2rem] border-2 shadow-2xl ${currentColors.card} ${currentColors.border}`}>
            <h3 className={`text-xl font-bold ${currentColors.text}`}>Mensagem enviada! 💜</h3>
            <p className={`mt-2 text-sm opacity-80 ${currentColors.text}`}>Obrigado por entrar em contato. Vou ler com carinho!</p>
            <button onClick={() => setIsSubmitted(false)} className="mt-8 w-full py-3 rounded-2xl bts-gradient text-white font-bold">Fechar</button>
          </div>
        </div>
      )}
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-elegant bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Contato</h2>
        <p className={`text-lg md:text-xl font-medium ${currentColors.textMuted}`}>Fala ARMY. Envie sua mensagem. Vou amar ler você.</p>
      </div>
      <div className={`p-8 md:p-12 rounded-[2.5rem] border-2 ${currentColors.card} ${currentColors.border} shadow-xl`}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className={`text-sm font-bold uppercase ${currentColors.text}`}>Seu nome</label>
            <input type="text" name="nome" required placeholder="Digite seu nome" className={`w-full p-5 rounded-2xl border-2 outline-none bg-gray-50/50 dark:bg-black/10 ${currentColors.border} ${currentColors.text}`} />
          </div>
          <div className="space-y-3">
            <label className={`text-sm font-bold uppercase ${currentColors.text}`}>Seu email</label>
            <input type="email" name="email" required placeholder="seu@email.com" className={`w-full p-5 rounded-2xl border-2 outline-none bg-gray-50/50 dark:bg-black/10 ${currentColors.border} ${currentColors.text}`} />
          </div>
          <div className="space-y-3">
            <label className={`text-sm font-bold uppercase ${currentColors.text}`}>Sua mensagem</label>
            <textarea name="mensagem" required placeholder="Escreva sua mensagem aqui..." className={`w-full p-6 rounded-3xl border-2 outline-none min-h-[180px] resize-none bg-gray-50/50 dark:bg-black/10 ${currentColors.border} ${currentColors.text}`} />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 rounded-2xl bts-gradient text-white font-bold text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
