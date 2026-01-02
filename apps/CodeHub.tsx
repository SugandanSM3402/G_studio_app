
import React, { useState } from 'react';
import { generateAndroidCode } from '../services/geminiService';

const TEMPLATES = {
  kotlin: {
    title: 'Jetpack Compose Example',
    code: `import androidx.compose.material.Button\nimport androidx.compose.material.Text\nimport androidx.compose.runtime.Composable\n\n@Composable\nfun Greeting(name: String) {\n    Button(onClick = { /* TODO */ }) {\n        Text(text = "Hello $name!")\n    }\n}`
  },
  java: {
    title: 'XML & Java Activity',
    code: `public class MainActivity extends AppCompatActivity {\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        setContentView(R.layout.activity_main);\n\n        Button btn = findViewById(R.id.myButton);\n        btn.setOnClickListener(v -> {\n            Toast.makeText(this, "Hello World", Toast.LENGTH_SHORT).show();\n        });\n    }\n}`
  }
};

const CodeHub: React.FC = () => {
  const [lang, setLang] = useState<'kotlin' | 'java'>('kotlin');
  const [code, setCode] = useState(TEMPLATES[lang].code);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLangSwitch = (newLang: 'kotlin' | 'java') => {
    setLang(newLang);
    setCode(TEMPLATES[newLang].code);
  };

  const generateCustomCode = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await generateAndroidCode(prompt, lang);
    setCode(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117] text-gray-300">
      {/* App Bar */}
      <div className="p-4 bg-[#161b22] border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-code text-purple-400"></i>
          <span className="font-semibold text-white">Kotlin Lab</span>
        </div>
        <div className="flex bg-black/40 rounded-lg p-1 border border-gray-800">
          <button 
            onClick={() => handleLangSwitch('kotlin')}
            className={`px-3 py-1 rounded-md text-xs transition-colors ${lang === 'kotlin' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Kotlin
          </button>
          <button 
            onClick={() => handleLangSwitch('java')}
            className={`px-3 py-1 rounded-md text-xs transition-colors ${lang === 'java' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Java
          </button>
        </div>
      </div>

      {/* Editor View */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed relative">
        <div className="absolute top-4 right-4 text-[10px] text-gray-600 uppercase tracking-widest pointer-events-none">
          {lang === 'kotlin' ? 'Compose UI' : 'Android Views'}
        </div>
        <pre className="whitespace-pre-wrap break-words text-blue-300">
          {loading ? (
            <span className="animate-pulse text-purple-400">// Gemini is thinking...</span>
          ) : (
            code.split('\n').map((line, i) => (
              <div key={i} className="flex">
                <span className="w-8 text-gray-600 select-none">{i + 1}</span>
                <span className={line.trim().startsWith('import') ? 'text-gray-500' : line.includes('fun') || line.includes('class') ? 'text-purple-400' : ''}>
                  {line}
                </span>
              </div>
            ))
          )}
        </pre>
      </div>

      {/* Generation Bar */}
      <div className="p-4 bg-[#161b22] border-t border-gray-800 space-y-3">
        <div className="flex items-center space-x-2 bg-black/20 rounded-xl border border-gray-700 px-3 py-2">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateCustomCode()}
            placeholder={`Describe a feature in ${lang === 'kotlin' ? 'Kotlin' : 'Java'}...`}
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-600"
          />
          <button 
            onClick={generateCustomCode}
            disabled={loading || !prompt.trim()}
            className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center active:scale-95 disabled:opacity-30 transition-all"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
          </button>
        </div>
        <div className="flex overflow-x-auto space-x-2 pb-1 no-scrollbar">
          {['Retrofit Client', 'Room DB', 'Navigation', 'ViewModel'].map(tag => (
            <button 
              key={tag}
              onClick={() => { setPrompt(tag); }}
              className="px-3 py-1 bg-gray-800 rounded-full text-[10px] text-gray-400 hover:bg-gray-700 whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeHub;
