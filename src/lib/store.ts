import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AnalysisRecord {
  id: string;
  type: 'text' | 'url';
  content: string;
  extractedContent?: string;
  date: string;
  result: Record<string, unknown>; // We'll refine this later
}

interface AppState {
  history: AnalysisRecord[];
  addAnalysis: (record: AnalysisRecord) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      history: [],
      addAnalysis: (record) => set((state) => ({ history: [record, ...state.history] })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'messagedna-storage',
    }
  )
);
