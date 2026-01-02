
import React from 'react';
import { AppID } from '../types';

interface NavigationBarProps {
  onHome: () => void;
  onBack: () => void;
  onRecents: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onHome, onBack, onRecents }) => {
  return (
    <div className="flex justify-around items-center h-12 bg-black/40 backdrop-blur-md text-white border-t border-white/10 z-50">
      <button onClick={onBack} className="w-1/3 flex justify-center py-2 active:bg-white/10 transition-colors rounded-full mx-2">
        <i className="fa-solid fa-chevron-left text-sm opacity-80"></i>
      </button>
      <button onClick={onHome} className="w-1/3 flex justify-center py-2 active:bg-white/10 transition-colors rounded-full mx-2">
        <i className="fa-solid fa-circle text-lg"></i>
      </button>
      <button onClick={onRecents} className="w-1/3 flex justify-center py-2 active:bg-white/10 transition-colors rounded-full mx-2">
        <i className="fa-solid fa-square text-sm opacity-80"></i>
      </button>
    </div>
  );
};

export default NavigationBar;
