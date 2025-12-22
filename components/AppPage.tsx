
import React from 'react';
import { Theme } from '../types';
import { COLORS } from '../constants';

interface AppPageProps {
  theme: Theme;
}

const AppIconPreview = () => (
  <div className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white border-2 border-[#3B125C] rounded-[1.2rem] shadow-md w-20 h-20 md:w-24 md:h-24 shrink-0 pointer-events-none select-none">
    <img src="https://i.imgur.com/kLmiBhu.png" alt="BTS" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
    <span className="text-[7px] md:text-[9px] font-anton tracking-wider text-[#3B125C] uppercase text-center leading-tight">
      Frases<br/>do BTS
    </span>
  </div>
);

const AppPage: React.FC<AppPageProps> = ({ theme }) => {
  const currentColors = COLORS[theme];

  return (
    <div className="w-full max-w-4xl mx-auto reveal-animation space-y-12 pb-24 px-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-elegant bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
          Tenha o BTS no seu bolso
        </h2>
        <p className={`text-lg md:text-xl font-medium ${currentColors.textMuted}`}>
          Saiba como instalar este site como um aplicativo no seu celular. É rápido, gratuito e não ocupa espaço na memória! 💜
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* iPhone Instruction */}
        <div className={`p-8 md:p-10 rounded-[2.5rem] border-2 ${currentColors.card} ${currentColors.border} shadow-xl flex flex-col items-center text-center space-y-6`}>
          <div className="relative">
            <AppIconPreview />
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-gray-100 flex items-center justify-center">
              <span className="text-xl">🍎</span>
            </div>
          </div>
          <h3 className={`text-2xl font-bold ${currentColors.text}`}>No iPhone (iOS)</h3>
          <ol className="text-left space-y-4 text-sm md:text-base opacity-80 leading-relaxed">
            <li className="flex gap-3">
              <span className="font-black text-purple-500">1.</span>
              <span>Abra este site pelo navegador <strong>Safari</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-purple-500">2.</span>
              <span>Toque no botão de <strong>Compartilhar</strong> (o ícone de um quadradinho com uma seta para cima na parte inferior).</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-purple-500">3.</span>
              <span>Role as opções para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-purple-500">4.</span>
              <span>Clique em <strong>"Adicionar"</strong> no canto superior direito.</span>
            </li>
          </ol>
        </div>

        {/* Android Instruction */}
        <div className={`p-8 md:p-10 rounded-[2.5rem] border-2 ${currentColors.card} ${currentColors.border} shadow-xl flex flex-col items-center text-center space-y-6`}>
          <div className="relative">
            <AppIconPreview />
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-gray-100 flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
          </div>
          <h3 className={`text-2xl font-bold ${currentColors.text}`}>No Android</h3>
          <ol className="text-left space-y-4 text-sm md:text-base opacity-80 leading-relaxed">
            <li className="flex gap-3">
              <span className="font-black text-pink-500">1.</span>
              <span>Abra este site pelo navegador <strong>Chrome</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-pink-500">2.</span>
              <span>Toque nos <strong>três pontinhos</strong> no canto superior direito.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-pink-500">3.</span>
              <span>Toque na opção <strong>"Instalar Aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-pink-500">4.</span>
              <span>Confirme clicando em <strong>"Instalar"</strong>.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
