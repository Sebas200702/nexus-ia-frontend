'use client'

import type { MockMessage } from '@/data/mock-data'
import { Message } from '@/components/ai-elements/message'
import MessageItem from './MessageItem'
import { cn } from '@/lib/utils'

interface MessageListProps {
  messages: MockMessage[]
  isStreaming?: boolean
}

export function MessageList({ messages, isStreaming }: MessageListProps) {
  return (
    <>
      {messages.map((message, index) => {
        const isLast = index === messages.length - 1

        return (
          <Message
            key={message.id}
            from={message.role}
            className={cn(
              'mb-3',
              message.role === 'assistant'
                ? 'data-[from=assistant]:justify-start'
                : 'justify-end'
            )}
          >
            <MessageItem
              message={message}
              isLast={isLast}
              isStreaming={isStreaming}
            />
          </Message>
        )
      })}
    </>
  )
}

export default MessageList
