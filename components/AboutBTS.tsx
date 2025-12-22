
import React from 'react';
import { Theme } from '../types';
import { COLORS } from '../constants';

const members = [
  { 
    id: 'rm', 
    name: 'RM', 
    realName: 'Kim Namjoon', 
    role: 'Líder - Rapper', 
    image: 'https://i.imgur.com/H2IWmY0.png', 
    instagramUrl: 'https://www.instagram.com/rkive/',
    spotifyUrls: ['https://open.spotify.com/intl-pt/artist/2auC28zjQyVTsiZKNgPRGs?si=8kh5YXmFSfCnGOnKYiQ0zQ']
  },
  { 
    id: 'jin', 
    name: 'Jin', 
    realName: 'Kim Seokjin', 
    role: 'Vocalista', 
    image: 'https://i.imgur.com/zpBL7i7.png', 
    instagramUrl: 'https://www.instagram.com/jin/',
    spotifyUrls: ['https://open.spotify.com/intl-pt/artist/5vV3bFXnN6D6N3Nj4xRvaV?si=0busrJ77Qa-UJDKSWyxXyg']
  },
  { 
    id: 'suga', 
    name: 'SUGA', 
    realName: 'Min Yoongi', 
    role: 'Rapper', 
    image: 'https://i.imgur.com/f6SjP8r.png', 
    instagramUrl: 'https://www.instagram.com/agustd/',
    spotifyUrls: [
      'https://open.spotify.com/intl-pt/artist/5RmQ8k4l3HZ8JoPb4mNsML?si=epnfQietQl6ibif7imomZA',
      'https://open.spotify.com/intl-pt/artist/0ebNdVaOfp6N0oZ1guIxM8?si=5p6sM4zmRMCBrzlYct9CMg'
    ]
  },
  { 
    id: 'j-hope', 
    name: 'j-hope', 
    realName: 'Jung Hoseok', 
    role: 'Rapper', 
    image: 'https://i.imgur.com/KDLZoIC.png', 
    instagramUrl: 'https://www.instagram.com/uarmyhope/',
    spotifyUrls: ['https://open.spotify.com/intl-pt/artist/0b1sIQumIAsNbqAoIClSpy?si=GyRTYBiTTdeGkD4Dq2kG4A']
  },
  { 
    id: 'jimin', 
    name: 'Jimin', 
    realName: 'Park Jimin', 
    role: 'Vocalista', 
    image: 'https://i.imgur.com/OUaTvdd.png', 
    instagramUrl: 'https://www.instagram.com/j.m/',
    spotifyUrls: ['https://open.spotify.com/intl-pt/artist/1oSPZhvZMIrWW5I41kPkkY?si=vmWONOo6TS-rS6IGcO8zLA']
  },
  { 
    id: 'v', 
    name: 'V', 
    realName: 'Kim Taehyung', 
    role: 'Vocalista', 
    image: 'https://i.imgur.com/TCCRW1o.png', 
    instagramUrl: 'https://www.instagram.com/thv/',
    spotifyUrls: ['https://open.spotify.com/intl-pt/artist/3JsHnjpbhX4SnySpvpa9DK?si=P_NR-eMbR5WWZZ4skfqZkQ']
  },
  { 
    id: 'jk', 
    name: 'Jung Kook', 
    realName: 'Jeon Jung Kook', 
    role: 'Vocalista', 
    image: 'https://i.imgur.com/cXQpBpd.png', 
    instagramUrl: 'https://www.instagram.com/jungkook.97/',
    spotifyUrls: ['https://open.spotify.com/intl-pt/artist/6HaGTQPmzraVmaVxvz6EUc?si=8w8QSfTJQHGGL3HbLzyKyQ']
  }
];

const SpotifyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.675.464-1.026.249-2.813-1.718-6.353-2.107-10.521-1.154-.403.092-.81-.162-.902-.565-.092-.402.162-.81.565-.902 4.566-1.044 8.473-.596 11.636 1.334.352.215.463.675.248 1.027zm1.464-3.26c-.27.438-.845.58-1.282.311-3.218-1.977-8.125-2.55-11.93-1.396-.494.15-1.018-.128-1.168-.622-.15-.494.128-1.018.622-1.168 4.346-1.32 9.75-.668 13.447 1.597.437.27.579.844.311 1.282zm.127-3.395C15.228 8.49 8.845 8.277 5.162 9.394c-.558.17-1.144-.144-1.314-.702-.17-.558.144-1.144.702-1.314 4.23-1.283 11.285-1.025 15.748 1.624.502.298.667.944.369 1.446-.298.502-.944.667-1.446.369z"/>
  </svg>
);

const AboutBTS: React.FC<{ theme: Theme }> = ({ theme }) => {
  const currentColors = COLORS[theme];
  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 pb-24 reveal-animation px-4">
      {/* Hero Section */}
      <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-purple-500/10 max-w-4xl mx-auto aspect-video md:aspect-auto">
        <img src="https://i.imgur.com/nIvbBDx.jpeg" alt="BTS" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
           <h2 className="text-4xl md:text-7xl font-elegant">O BTS</h2>
           <p className="text-sm md:text-xl font-bold opacity-80 mt-1">Bangtan Sonyeondan - Beyond The Scene</p>
        </div>
      </div>

      {/* Description Text Section */}
      <div className={`max-w-4xl mx-auto space-y-8 p-8 md:p-12 rounded-[2.5rem] border-2 ${currentColors.card} ${currentColors.border} shadow-xl`}>
        <div className="space-y-6 text-base md:text-lg leading-relaxed font-medium">
          <div className="flex items-center gap-3 text-purple-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            <h4 className="font-bold text-xl">Sobre o Grupo</h4>
          </div>

          <p className={currentColors.text}>
            O BTS é mais do que um grupo musical. É um abraço coletivo que atravessa idiomas, culturas e distâncias. Formado por RM, Jin, SUGA, j-hope, Jimin, V e Jungkook, o BTS conquistou o mundo não apenas com sua música, mas com mensagens sinceras sobre amor-próprio, amizade, sonhos e coragem para seguir em frente, mesmo nos dias difíceis.
          </p>

          <div className={`p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10 space-y-4 ${currentColors.text}`}>
            <p className="font-bold">Cada membro traz uma cor única a essa história:</p>
            <ul className="space-y-4 opacity-90">
              <li className="flex gap-3"><span>🐨</span> <span><strong>Namjoon</strong>, com suas palavras e liderança, nos ensina a pensar, sentir e crescer.</span></li>
              <li className="flex gap-3"><span>🐹</span> <span><strong>Jin</strong> nos lembra que gentileza e alegria também são formas de força.</span></li>
              <li className="flex gap-3"><span>🐱</span> <span><strong>SUGA</strong>, com sua honestidade crua, transforma dores em música e conforto.</span></li>
              <li className="flex gap-3"><span>🐿️</span> <span><strong>j-hope</strong> espalha luz, esperança e energia, mostrando que sorrir também pode ser um ato de resistência.</span></li>
              <li className="flex gap-3"><span>🐥</span> <span><strong>Jimin</strong> traduz sentimentos profundos em sensibilidade e cuidado.</span></li>
              <li className="flex gap-3"><span>🐻</span> <span><strong>V</strong>, com sua arte e autenticidade, nos inspira a ser quem somos sem medo. <strong>Jungkook</strong>, com sua dedicação e paixão, representa o desejo constante de evoluir e dar o melhor de si.</span></li>
            </ul>
          </div>

          <p className={currentColors.text}>
            Juntos, eles formam um lugar seguro para milhões de pessoas ao redor do mundo. O BTS nos lembra diariamente que não estamos sozinhos, que nossos sentimentos importam e que cada passo, por menor que pareça, faz parte do caminho.
          </p>

          <p className={`font-bold italic ${currentColors.text}`}>
            Este site nasce com esse mesmo propósito: levar adiante mensagens inspiradas no BTS, para que, todos os dias, você encontre aqui um pouco de conforto, força e carinho, do BTS para você, e de você para o mundo. 💜
          </p>
        </div>
      </div>
      
      {/* Members Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {members.map(m => (
          <div key={m.id} className={`p-6 rounded-[2rem] border-2 ${currentColors.card} ${currentColors.border} shadow-lg text-center transition-transform hover:scale-105 group`}>
            <div className="relative mb-4 overflow-hidden rounded-2xl">
              <img src={m.image} alt={m.name} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className={`text-xl font-black ${currentColors.text}`}>{m.name}</h3>
            <p className="text-[10px] text-purple-500 font-bold uppercase tracking-widest mb-4">{m.realName}</p>
            
            <div className="flex justify-center gap-2">
              <a 
                href={m.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center p-2 rounded-full bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition-all shadow-sm"
                title="Instagram"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {m.spotifyUrls.map((url, index) => (
                <a 
                  key={index}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center p-2 rounded-full bg-purple-100 text-[#a855f7] hover:bg-[#a855f7] hover:text-white transition-all shadow-sm"
                  title={m.id === 'suga' ? (index === 0 ? "Spotify (SUGA)" : "Spotify (Agust D)") : "Spotify"}
                >
                  <SpotifyIcon />
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
export default AboutBTS;
