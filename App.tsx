
import React, { useState, useEffect } from 'react';
import { Theme, Page, DailyMessage } from './types';
import { COLORS } from './constants';
import ThemeToggle from './components/ThemeToggle';
import DailyWidget from './components/DailyWidget';
import Archive from './components/Archive';
import AboutBTS from './components/AboutBTS';
import Project from './components/Project';
import Mural from './components/Mural';
import Contact from './components/Contact';
import AppPage from './components/AppPage';
import { fetchDailyMessageFromSheet, fetchAllPastMessagesFromSheet } from './services/messageService';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [message, setMessage] = useState<DailyMessage | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Efeito para lidar com links diretos (?d=data)
  useEffect(() => {
    const checkDeepLink = async () => {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get('d');
      if (dateParam) {
        setLoading(true);
        const all = await fetchAllPastMessagesFromSheet();
        const found = all.find(m => m.date === dateParam);
        if (found) {
          setMessage(found);
          setRevealed(true);
        }
        setLoading(false);
      }
    };

    checkDeepLink();

    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('app-theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  const handleReveal = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const msg = await fetchDailyMessageFromSheet();
      if (msg) {
        setMessage(msg);
        setRevealed(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: Page) => {
    // Quando volta para a HOME (pelo menu ou logo)
    if (page === 'home') {
      // Força o estado de "não revelado" para que o botão apareça novamente
      setRevealed(false);
      setMessage(null);
      // Limpa a URL para tirar os parâmetros de data se houver
      window.history.pushState({}, '', window.location.pathname);
    }
    setCurrentPage(page);
  };

  const currentColors = COLORS[theme];

  const renderContent = () => {
    switch (currentPage) {
      case 'archive': return <Archive theme={theme} />;
      case 'about-bts': return <AboutBTS theme={theme} />;
      case 'project': return <Project theme={theme} />;
      case 'mural': return <Mural theme={theme} />;
      case 'contact': return <Contact theme={theme} />;
      case 'app': return <AppPage theme={theme} />;
      default: return (
        <div className="flex flex-col items-center max-w-full overflow-hidden">
          {!revealed && (
            <div className="text-center mb-10 px-4 reveal-animation">
              <h2 className="text-4xl md:text-6xl font-elegant bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">365 dias com BTS</h2>
              <p className="mt-4 opacity-70">Sua dose diária de carinho vinda do Bangtan.</p>
            </div>
          )}
          <DailyWidget 
            theme={theme} 
            onReveal={handleReveal} 
            isRevealing={loading} 
            message={message} 
            revealed={revealed} 
            onBack={() => handlePageChange('home')}
          />
        </div>
      );
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about-bts', label: 'O BTS' },
    { id: 'project', label: 'O Projeto' },
    { id: 'mural', label: 'Mural' },
    { id: 'archive', label: 'Arquivo' },
    { id: 'contact', label: 'Contato' },
    { id: 'app', label: 'App' }
  ];

  return (
    <div className={`min-h-screen ${currentColors.bg} ${currentColors.text} flex flex-col transition-colors duration-500`}>
      <header className={`p-4 md:p-6 border-b ${currentColors.border} flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50 ${currentColors.bg} bg-opacity-90 backdrop-blur-sm`}>
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => handlePageChange('home')}>
          <img src="https://i.imgur.com/kLmiBhu.png" alt="BTS" className="w-8 h-8" />
          <h1 className="text-xl font-anton tracking-tight text-purple-600 dark:text-purple-400">Frases do BTS</h1>
        </div>
        <nav className="flex gap-4 overflow-x-auto no-scrollbar max-w-full px-2 py-1">
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => handlePageChange(item.id as Page)} 
              className={`text-[10px] uppercase font-bold tracking-widest whitespace-nowrap transition-colors ${currentPage === item.id ? 'text-pink-500 border-b-2 border-pink-500' : 'opacity-50 hover:opacity-100'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-x-hidden">
        {renderContent()}
      </main>
      <footer className="p-8 text-center opacity-40 text-[10px] uppercase tracking-widest font-bold">
        Feito com 💜 por ARMYs
      </footer>
    </div>
  );
};

export default App;
