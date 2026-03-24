'use client'

import {
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message'
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning'
import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MockMessage } from '@/data/mock-data'

interface MessageItemProps {
  message: MockMessage
  isLast?: boolean
  isStreaming?: boolean
  onSuggestionClick?: (s: string) => void
}

export function MessageItem({
  message,
  isLast,
  isStreaming,
}: MessageItemProps) {
  const isAssistant = message.role === 'assistant'

  if (isAssistant) {
    return (
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/70">
          <Bot className="h-4 w-4 text-purple-300" />
        </div>
        <div className="min-w-0 flex-1">
          {message.reasoning && (
            <Reasoning isStreaming={!!isStreaming && isLast} className="mb-3">
              <ReasoningTrigger />
              <ReasoningContent>
                <pre className="font-mono text-[11px] whitespace-pre-wrap text-gray-300">
                  {message.reasoning}
                </pre>
              </ReasoningContent>
            </Reasoning>
          )}

          <MessageContent
            className={cn(
              'rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-xs leading-relaxed'
            )}
          >
            <MessageResponse>{message.content}</MessageResponse>
          </MessageContent>
        </div>
      </div>
    )
  }

  return (
    <MessageContent
      className={cn(
        'ml-auto max-w-[80%] rounded-2xl bg-white/10 px-4 py-2.5 text-xs text-white'
      )}
    >
      {message.content}
    </MessageContent>
  )
}

export default MessageItem
