
import React from 'react';
import { Theme } from '../types';
import { COLORS } from '../constants';

interface ProjectProps {
  theme: Theme;
}

const Project: React.FC<ProjectProps> = ({ theme }) => {
  const currentColors = COLORS[theme];

  const steps = [
    {
      number: '1',
      title: 'Acesse o site diariamente',
      description: 'Entre todos os dias para o seu momento oficial de conexão com o BTS. Leva poucos minutos e rende muito conforto emocional.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: '2',
      title: 'Clique e revele sua mensagem do BTS',
      description: 'Um clique e pronto. Uma mensagem especial com trechos reais de músicas ou falas do BTS aparece para você refletir, sentir e, quem sabe, suspirar um pouco.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      number: '3',
      title: 'Compartilhe se quiser',
      description: 'Gostou da mensagem? Claro que gostou. Você pode compartilhar nas suas redes sociais ou enviar para amigos. Porque BTS é bom sozinho, mas fica ainda melhor quando dividido com quem a gente gosta. 💜',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto reveal-animation space-y-16 pb-24 px-4">
      {/* Title Section */}
      <div className="text-center space-y-4">
        <h2 className={`text-4xl md:text-6xl font-elegant tracking-tight bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent`}>
          O Projeto
        </h2>
        <p className={`text-sm md:text-base font-bold uppercase tracking-[0.3em] ${currentColors.textMuted}`}>
          Frases do BTS: 365 dias com BTS
        </p>
      </div>

      {/* Main Text Content */}
      <div className={`p-8 md:p-12 rounded-[2.5rem] border-2 ${currentColors.card} ${currentColors.border} shadow-xl space-y-8 text-base md:text-lg leading-relaxed font-medium ${currentColors.text}`}>
        <p>
          O <strong>Frases do BTS: 365 dias com BTS</strong> surgiu de uma ideia simples, porém muito séria para qualquer ARMY: receber uma frase do BTS por dia. Porque, convenhamos, a vida já é complicada o suficiente sem uma dose diária de palavras reconfortantes vindas de RM, Jin, SUGA, j-hope, Jimin, V e Jungkook.
        </p>
        
        <p>
          Aqui, cada uma das frases do BTS é escolhida com um cuidado quase científico. No Frases do BTS, você encontra trechos de músicas e falas reais do grupo, sempre devidamente verificados. Sim, a gente confere direitinho se eles realmente disseram aquilo, porque espalhar frases falsas atribuídas ao BTS seria um crime de nível altíssimo.
        </p>

        <p>
          A proposta é simples: transformar essas frases do BTS em um pequeno momento diário de reflexão. Pense como uma meditação matinal, só que com BTS, menos silêncio absoluto e muito mais sentimento. As mensagens falam sobre amor-próprio, sonhos, medos, crescimento pessoal e aquela esperança que, às vezes, a gente só encontra ouvindo uma música às três da manhã.
        </p>

        <p>
          O <strong>Frases do BTS: 365 dias com BTS</strong> é mais do que um projeto. É um lembrete diário de que você não está sozinho(a), que seus sentimentos são válidos e que está tudo bem seguir no seu próprio ritmo — mesmo que ele seja um pouco caótico. O BTS entende. A gente também.
        </p>

        <div className="pt-4 space-y-2 border-t border-purple-500/10">
          <p className="font-bold">Aqui, todos os dias, as frases do BTS falam com você.</p>
          <p>E sim, isso melhora bastante o dia.</p>
          <p className="text-2xl pt-4">Borahae 💜</p>
        </div>
      </div>

      {/* How it Works Section */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className={`text-3xl font-bold ${currentColors.text}`}>Como Funciona</h3>
          <p className={`${currentColors.textMuted} font-medium`}>O projeto é simples e totalmente pensado para o ARMY</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={`flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] border-2 transition-all duration-300 hover:border-purple-400/30 ${currentColors.card} ${currentColors.border} shadow-sm group`}
            >
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-2xl bts-gradient flex items-center justify-center text-white shadow-lg shadow-purple-500/20 transition-transform group-hover:scale-110">
                  {step.icon}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-black px-2 py-0.5 rounded bg-purple-500/10 ${currentColors.primary}`}>
                    PASSO {step.number}
                  </span>
                  <h4 className={`text-xl font-bold ${currentColors.text}`}>
                    {step.title}
                  </h4>
                </div>
                <p className={`${currentColors.textMuted} leading-relaxed`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Aesthetic "Button" */}
        <div className="flex justify-center pt-8">
          <div className="inline-flex items-center gap-3 px-10 py-5 rounded-full border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 shadow-lg shadow-purple-500/5 transition-all hover:scale-105 hover:border-purple-500/40 cursor-default group">
            <span className="text-2xl transition-transform group-hover:scale-125 duration-500">🫰</span>
            <span className={`text-lg font-bold tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
              Juntos somos mais fortes
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;
