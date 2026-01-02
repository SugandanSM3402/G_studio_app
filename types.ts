
export type AppID = 'home' | 'assistant' | 'tasks' | 'settings' | 'calculator' | 'code';

export interface AppConfig {
  id: AppID;
  name: string;
  icon: string;
  color: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
