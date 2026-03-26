import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PlaygroundConfig, MockMessage } from '@/data/mock-data'
import { DEFAULT_CONFIG } from '@/data/mock-data'

type PlaygroundStore = {
  config: PlaygroundConfig
  setConfig: (config: Partial<PlaygroundConfig> | PlaygroundConfig) => void
  messages: MockMessage[]
  appendMessage: (message: MockMessage) => void
  updateMessage: (id: string, patch: Partial<MockMessage>) => void
  clearMessages: () => void
  isStreaming: boolean
  setStreaming: (s: boolean) => void
}

export const usePlaygroundStore = create<PlaygroundStore>()(
  persist(
    (set, get) => ({
      config: DEFAULT_CONFIG,
      setConfig: (config) => {
        if (typeof config === 'function') return
        set((state) => ({
          config: { ...state.config, ...(config as Partial<PlaygroundConfig>) },
        }))
      },
      messages: [],
      appendMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      updateMessage: (id, patch) =>
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === id ? { ...m, ...patch } : m
          ),
        })),
      clearMessages: () => set({ messages: [] }),
      isStreaming: false,
      setStreaming: (s) => set({ isStreaming: s }),
    }),
    {
      name: 'nexus-playground-store',
      partialize: (state) => ({ config: state.config }),
    }
  )
)

