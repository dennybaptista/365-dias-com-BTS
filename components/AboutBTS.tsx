
import React from 'react';
import { Theme } from '../types';
import { COLORS } from '../constants';

const members = [
  { id: 'rm', name: 'RM', realName: 'Kim Namjoon', role: 'Líder - Rapper', image: 'https://i.imgur.com/H2IWmY0.png', instagramUrl: 'https://www.instagram.com/rkive/' },
  { id: 'jin', name: 'Jin', realName: 'Kim Seokjin', role: 'Vocalista', image: 'https://i.imgur.com/zpBL7i7.png', instagramUrl: 'https://www.instagram.com/jin/' },
  { id: 'suga', name: 'SUGA', realName: 'Min Yoongi', role: 'Rapper', image: 'https://i.imgur.com/f6SjP8r.png', instagramUrl: 'https://www.instagram.com/agustd/' },
  { id: 'j-hope', name: 'j-hope', realName: 'Jung Hoseok', role: 'Rapper', image: 'https://i.imgur.com/KDLZoIC.png', instagramUrl: 'https://www.instagram.com/uarmyhope/' },
  { id: 'jimin', name: 'Jimin', realName: 'Park Jimin', role: 'Vocalista', image: 'https://i.imgur.com/OUaTvdd.png', instagramUrl: 'https://www.instagram.com/j.m/' },
  { id: 'v', name: 'V', realName: 'Kim Taehyung', role: 'Vocalista', image: 'https://i.imgur.com/TCCRW1o.png', instagramUrl: 'https://www.instagram.com/thv/' },
  { id: 'jk', name: 'Jung Kook', realName: 'Jeon Jung Kook', role: 'Vocalista', image: 'https://i.imgur.com/cXQpBpd.png', instagramUrl: 'https://www.instagram.com/jungkook.97/' }
];

const AboutBTS: React.FC<{ theme: Theme }> = ({ theme }) => {
  const currentColors = COLORS[theme];
  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 pb-24 reveal-animation">
      <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-purple-500/10 max-w-4xl mx-auto aspect-video md:aspect-auto">
        <img src="https://i.imgur.com/nIvbBDx.jpeg" alt="BTS" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
           <h2 className="text-4xl md:text-7xl font-elegant">O BTS</h2>
        </div>
      </div>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {members.map(m => (
          <div key={m.id} className={`p-6 rounded-[2rem] border-2 ${currentColors.card} ${currentColors.border} shadow-lg text-center transition-transform hover:scale-105`}>
            <div className="relative mb-4 overflow-hidden rounded-2xl group">
              <img src={m.image} alt={m.name} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className={`text-xl font-black ${currentColors.text}`}>{m.name}</h3>
            <p className="text-[10px] text-purple-500 font-bold uppercase tracking-widest mb-4">{m.realName}</p>
            <a 
              href={m.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold hover:bg-purple-500 hover:text-white transition-all"
            >
              Instagram
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};
export default AboutBTS;
