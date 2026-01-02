
import React from 'react';
import { APPS } from '../constants';
import { AppID } from '../types';

interface HomeProps {
  onOpenApp: (id: AppID) => void;
}

const Home: React.FC<HomeProps> = ({ onOpenApp }) => {
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col h-full items-center p-8 bg-gradient-to-b from-blue-900/20 to-black">
      {/* Clock Widget */}
      <div className="mt-12 text-center text-white">
        <h1 className="text-6xl font-light mb-2">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h1>
        <p className="text-sm font-medium opacity-80 uppercase tracking-widest">{dateStr}</p>
      </div>

      {/* Search Bar */}
      <div className="mt-12 w-full max-w-sm">
        <div 
          onClick={() => onOpenApp('assistant')}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-5 py-3 flex items-center space-x-3 cursor-pointer"
        >
          <i className="fa-solid fa-search text-white/50"></i>
          <span className="text-white/50 flex-1">Search or ask Gemini...</span>
          <i className="fa-solid fa-microphone text-blue-400"></i>
        </div>
      </div>

      {/* App Grid */}
      <div className="mt-auto grid grid-cols-4 gap-8 w-full max-w-sm mb-12">
        {APPS.map((app) => (
          <button 
            key={app.id} 
            onClick={() => onOpenApp(app.id)}
            className="flex flex-col items-center group active:scale-95 transition-transform"
          >
            <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg mb-2`}>
              <i className={app.icon}></i>
            </div>
            <span className="text-white text-[10px] font-medium tracking-tight truncate w-full text-center">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
