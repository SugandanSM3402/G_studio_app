
import React, { useState, useEffect } from 'react';

const StatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-2 bg-transparent text-white text-xs font-medium z-50">
      <div>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="flex items-center space-x-2">
        <i className="fa-solid fa-signal"></i>
        <i className="fa-solid fa-wifi"></i>
        <div className="flex items-center space-x-1">
          <span>85%</span>
          <i className="fa-solid fa-battery-three-quarters"></i>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
