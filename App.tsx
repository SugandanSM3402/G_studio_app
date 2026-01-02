
import React, { useState, useCallback } from 'react';
import StatusBar from './components/StatusBar';
import NavigationBar from './components/NavigationBar';
import Home from './apps/Home';
import Assistant from './apps/Assistant';
import Tasks from './apps/Tasks';
import Calculator from './apps/Calculator';
import CodeHub from './apps/CodeHub';
import { AppID } from './types';

const App: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppID>('home');
  const [history, setHistory] = useState<AppID[]>(['home']);

  const openApp = useCallback((id: AppID) => {
    setActiveApp(id);
    setHistory(prev => [...prev, id]);
  }, []);

  const goHome = useCallback(() => {
    setActiveApp('home');
    setHistory(['home']);
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setActiveApp(newHistory[newHistory.length - 1]);
    } else {
      goHome();
    }
  }, [history, goHome]);

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'home':
        return <Home onOpenApp={openApp} />;
      case 'assistant':
        return <Assistant />;
      case 'tasks':
        return <Tasks />;
      case 'calculator':
        return <Calculator />;
      case 'code':
        return <CodeHub />;
      case 'settings':
        return (
          <div className="flex flex-col h-full bg-gray-50 p-8 pt-12">
            <h2 className="text-3xl font-bold mb-8">Settings</h2>
            <div className="space-y-4">
              {['Connections', 'Display', 'Notifications', 'Battery', 'About DroidOS'].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-700">{item}</span>
                  <i className="fa-solid fa-chevron-right text-gray-300"></i>
                </div>
              ))}
            </div>
            <div className="mt-auto text-center text-gray-400 text-xs">
              DroidOS Version 14.0.1 (Web Build)
            </div>
          </div>
        );
      default:
        return <Home onOpenApp={openApp} />;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900 overflow-hidden">
      {/* Phone Frame */}
      <div className="relative w-full max-w-[420px] h-full max-h-[880px] md:h-[92%] bg-black rounded-[40px] shadow-2xl flex flex-col border-[8px] border-zinc-800 overflow-hidden">
        
        {/* Notch / Camera */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-3xl z-[100] flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-900/50 rounded-full border border-blue-400/20"></div>
        </div>

        <StatusBar />

        {/* Screen Content */}
        <main className="flex-1 relative overflow-hidden">
          {renderActiveApp()}
        </main>

        <NavigationBar onHome={goHome} onBack={goBack} onRecents={() => {}} />
      </div>
    </div>
  );
};

export default App;
