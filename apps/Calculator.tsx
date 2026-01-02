
import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleDigit = (digit: string) => {
    setDisplay(prev => prev === '0' ? digit : prev + digit);
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      // Simple eval alternative for demo purposes
      const result = eval(equation + display);
      setEquation(equation + display + ' =');
      setDisplay(String(result));
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', '']
  ];

  return (
    <div className="flex flex-col h-full bg-[#171717]">
      <div className="flex-1 flex flex-col justify-end p-8 text-right">
        <div className="text-gray-500 text-lg mb-2 h-8 overflow-hidden">{equation}</div>
        <div className="text-white text-6xl font-light overflow-hidden whitespace-nowrap">{display}</div>
      </div>
      
      <div className="p-4 grid grid-cols-4 gap-3 bg-[#1e1e1e] rounded-t-[40px]">
        {buttons.flat().map((btn, i) => {
          if (!btn) return <div key={i}></div>;
          const isOp = ['/', '*', '-', '+', '='].includes(btn);
          const isClear = btn === 'C';
          return (
            <button
              key={btn}
              onClick={() => {
                if (isClear) clear();
                else if (btn === '=') calculate();
                else if (isOp) handleOp(btn);
                else handleDigit(btn);
              }}
              className={`h-16 rounded-2xl text-xl font-medium active:scale-95 transition-transform ${
                isOp ? 'bg-orange-500 text-white' : 
                isClear ? 'bg-gray-700 text-orange-400' : 'bg-gray-800 text-white'
              }`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
