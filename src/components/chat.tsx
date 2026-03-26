import { useState, useCallback } from 'react'
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'

import MessageList from './chat/MessageList'
import {
  Composer,
  ComposerInput,
  ComposerActions,
  ComposerSubmitButton,
  ComposerToolbar,
} from '@/components/ai-elements/composer'
import { type MockMessage, SUGGESTIONS, MOCK_RESPONSES } from '@/data/mock-data'
import { usePlaygroundStore } from '@/stores/playgroundStore'
import { Bot, Sparkles, Loader2 } from 'lucide-react'


export const ChatPanel = () => {
  const config = usePlaygroundStore((s) => s.config)
  const [messages, setMessages] = useState<MockMessage[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const simulateStreaming = async (
    fullContent: string,
    messageId: string,
    reasoning?: string
  ) => {
    if (config.showReasoning && reasoning) {
      for (let i = 0; i <= reasoning.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5))
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, reasoning: reasoning.slice(0, i) }
              : msg
          )
        )
      }
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    for (let i = 0; i <= fullContent.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 8))
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, content: fullContent.slice(0, i) }
            : msg
        )
      )
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || isStreaming) return

    const now = Date.now()

    const userMessage: MockMessage = {
      id: `user-${now}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    const assistantMessage: MockMessage = {
      id: `assistant-${now}`,
      role: 'assistant',
      content: '',
      reasoning: config.showReasoning ? '' : undefined,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setInput('')
    setIsStreaming(true)

    const lower = input.toLowerCase()
    const isCodeQuestion =
      lower.includes('code') ||
      lower.includes('function') ||
      lower.includes('typescript')

    const mockResponse = isCodeQuestion
      ? MOCK_RESPONSES.code
      : MOCK_RESPONSES.default

    await simulateStreaming(
      mockResponse.content,
      assistantMessage.id,
      mockResponse.reasoning
    )

    setIsStreaming(false)
  }, [input, isStreaming, config.showReasoning])

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className="relative flex w-full h-full flex-1 flex-col rounded-lg border border-white/10 bg-black/40 backdrop-blur">
      {/* Glows de fondo dentro del panel */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-purple-600/20 blur-[90px]" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-[90px]" />
      </div>

      <div className="relative flex h-full flex-col">
        {/* Chat header estilo Nexus */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600/20">
              <Sparkles className="h-4 w-4 text-purple-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-medium text-white">
                Nexus IA Playground
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                Interactive Demo
              </span>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-gray-400 uppercase">
            {config.provider}/{config.model}
          </span>
        </div>

        {/* Messages area */}
        <Conversation className="relative flex-1 overflow-hidden">
          <ConversationContent className="relative p-4">
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/60 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                    <Bot className="h-7 w-7 text-purple-300" />
                  </div>
                }
                title="Start optimizing in the playground"
                description="Send a prompt or use a suggestion to see how Nexus IA responds."
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/60 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
                    <Bot className="h-7 w-7 text-purple-300" />
                  </div>
                  <h3 className="mb-2 text-base font-medium text-white">
                    Start a conversation
                  </h3>
                  <p className="mb-6 max-w-sm text-xs text-gray-400">
                    Try a real use case—costly support summaries, complex
                    workflows, or high-volume requests.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-gray-300 transition-colors hover:border-purple-500/60 hover:bg-purple-500/10"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </ConversationEmptyState>
            ) : (
              <MessageList messages={messages} isStreaming={isStreaming} />
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Input area */}
        <div className="border-t border-white/10 p-4">
          <Composer
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className="border border-white/10 bg-black/70"
          >
            <ComposerInput
              value={input}
              onValueChange={setInput}
              onSubmit={handleSubmit}
              placeholder="Type a message... (Enter to send)"
              disabled={isStreaming}
              className="text-xs text-gray-100"
            />
            <ComposerActions>
              <ComposerToolbar className="flex-1 justify-start">
                <span className="font-mono text-[10px] text-gray-500">
                  {input.length} chars
                </span>
              </ComposerToolbar>
              <ComposerSubmitButton
                isLoading={isStreaming}
                disabled={!input.trim()}
                className="bg-purple-600 text-xs font-medium text-white hover:bg-purple-500"
              />
            </ComposerActions>
          </Composer>
        </div>

        {/* Streaming indicator */}
        {isStreaming && (
          <div className="absolute inset-x-0 bottom-18 flex justify-center">
            <div className="flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1.5 text-[11px] text-purple-200 backdrop-blur">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Streaming response from Nexus IA…</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
