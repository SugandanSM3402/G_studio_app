
import React, { useState } from 'react';
import { Task } from '../types';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTask.trim(), completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] text-gray-900">
      <div className="p-8 pt-12">
        <h2 className="text-3xl font-bold mb-1">My Tasks</h2>
        <p className="text-gray-500 text-sm">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} today</p>
      </div>

      <div className="flex-1 px-8 space-y-3 overflow-y-auto">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group animate-in fade-in slide-in-from-bottom-2">
            <button 
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
            >
              {task.completed && <i className="fa-solid fa-check text-[10px] text-white"></i>}
            </button>
            <span className={`flex-1 ml-4 text-sm transition-all ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)} className="text-gray-300 hover:text-red-500 transition-colors">
              <i className="fa-solid fa-trash-can text-sm"></i>
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400">
            <i className="fa-solid fa-clipboard-list text-4xl mb-4 opacity-20"></i>
            <p className="text-sm">Nothing to do yet!</p>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="flex items-center space-x-2 bg-white rounded-3xl shadow-lg border border-gray-100 p-2 pl-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a task..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <button 
            onClick={addTask}
            className="bg-green-500 w-10 h-10 rounded-full text-white active:scale-95 transition-transform"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
