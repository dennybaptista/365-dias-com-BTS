import React from 'react';
import { Theme } from '../types';
import { COLORS } from '../constants';

const steps = [
  { number: '1', title: 'Acesse o site diariamente', description: 'Entre todos os dias para o seu momento oficial de conexão com o BTS.' },
  { number: '2', title: 'Clique e revele sua mensagem', description: 'Um clique e pronto. Uma mensagem especial aparece para você.' },
  { number: '3', title: 'Compartilhe se quiser', description: 'Gostou da mensagem? Compartilhe nas suas redes sociais. 💜' }
];

const Project: React.FC<{ theme: Theme }> = ({ theme }) => {
  const currentColors = COLORS[theme];
  return (
    <div className="w-full max-w-4xl mx-auto reveal-animation space-y-16 pb-24 px-4">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-elegant bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">O Projeto</h2>
        <p className={`text-sm md:text-base font-bold uppercase tracking-[0.3em] ${currentColors.textMuted}`}>365 dias com BTS</p>
      </div>
      <div className={`p-8 md:p-12 rounded-xl border-2 ${currentColors.card} ${currentColors.border} shadow-xl space-y-8 text-base md:text-lg leading-relaxed ${currentColors.text}`}>
        <p>O <strong>Frases do BTS: 365 dias com BTS</strong> surgiu da ideia simples de receber uma frase ou trecho de música do BTS por dia, junto de uma reflexão gostosinha no melhor estilo "Meditação Matinal". Cada uma das frases é escolhida com cuidado, verificando se são trechos reais de músicas ou falas do grupo.</p>
        <p>A proposta é simples: transformar essas frases em um pequeno momento diário de reflexão. As mensagens falam sobre amor-próprio, sonhos, crescimento pessoal e esperança.</p>
        <p className="text-2xl pt-4 font-bold">Borahae 💜</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {steps.map(step => (
          <div key={step.number} className={`flex flex-col md:flex-row gap-6 p-8 rounded-xl border-2 ${currentColors.card} ${currentColors.border} shadow-sm group`}>
            <div className="w-14 h-14 rounded-lg bts-gradient flex items-center justify-center text-white font-anton text-2xl shrink-0">{step.number}</div>
            <div className="space-y-3">
              <h4 className={`text-xl font-bold ${currentColors.text}`}>{step.title}</h4>
              <p className={`${currentColors.textMuted}`}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Project;
