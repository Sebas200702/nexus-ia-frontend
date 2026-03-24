export const PROVIDERS = [
  {
    id: 'openai',
    name: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: ['claude-3-5-sonnet', 'claude-3-opus', 'claude-3-haiku'],
  },
  {
    id: 'google',
    name: 'Google',
    models: ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
  },
  {
    id: 'groq',
    name: 'Groq',
    models: ['llama-3.3-70b', 'mixtral-8x7b', 'gemma2-9b'],
  },
  {
    id: 'mistral',
    name: 'Mistral',
    models: ['mistral-large', 'mistral-medium', 'mistral-small'],
  },
] as const

export type Provider = (typeof PROVIDERS)[number]
export type ProviderId = Provider['id']

export interface MockMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  reasoning?: string
  timestamp: Date
}

// Alias for backwards compatibility
export type Message = MockMessage

export interface PlaygroundConfig {
  provider: ProviderId
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
  showReasoning: boolean
}

export const DEFAULT_CONFIG: PlaygroundConfig = {
  provider: 'openai',
  model: 'gpt-4o',
  temperature: 0.7,
  maxTokens: 2048,
  systemPrompt: 'You are a helpful AI assistant powered by Nexus IA.',
  showReasoning: false,
}

export const SUGGESTIONS = [
  'Explain how REST APIs work',
  'Write a TypeScript function to debounce',
  'What are the benefits of edge computing?',
  'Compare SQL vs NoSQL databases',
]

export const MOCK_RESPONSES: Record<
  string,
  { content: string; reasoning?: string }
> = {
  default: {
    reasoning: `Let me analyze this request step by step:
1. Understanding the user's intent
2. Gathering relevant information
3. Formulating a comprehensive response
4. Ensuring accuracy and clarity`,
    content: `I'd be happy to help you with that! Here's a comprehensive answer:

## Overview

This is a demonstration of the **Nexus IA** playground. In a real implementation, this would connect to our multimodal API.

### Key Features

- **Streaming responses** with real-time updates
- **Multiple providers** including OpenAI, Anthropic, Google, and more
- **Configurable parameters** for fine-tuned control

\`\`\`typescript
// Example API call
const response = await nexus.chat({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello!" }],
  stream: true
});
\`\`\`

Let me know if you have any other questions!`,
  },
  code: {
    content: `Here's a TypeScript debounce function:

\`\`\`typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, wait);
  };
}

// Usage example
const debouncedSearch = debounce((query: string) => {
  console.log("Searching for:", query);
}, 300);
\`\`\`

This implementation:
- Uses generics for type safety
- Clears previous timeout on each call
- Preserves \`this\` context
- Returns void (fire-and-forget pattern)`,
  },
}

export function generateCodeSnippet(
  config: PlaygroundConfig,
  language: 'curl' | 'javascript' | 'python'
): string {
  const { provider, model, temperature, maxTokens, systemPrompt } = config

  if (language === 'curl') {
    return `curl -X POST https://api.nexus-ia.com/v1/chat \\
  -H "Authorization: Bearer $NEXUS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "${provider}",
    "model": "${model}",
    "messages": [
      {"role": "system", "content": "${systemPrompt}"},
      {"role": "user", "content": "Your message here"}
    ],
    "temperature": ${temperature},
    "max_tokens": ${maxTokens},
    "stream": true
  }'`
  }

  if (language === 'javascript') {
    return `import Nexus from "@nexus-ia/sdk";

const nexus = new Nexus({
  apiKey: process.env.NEXUS_API_KEY,
});

const response = await nexus.chat.completions.create({
  provider: "${provider}",
  model: "${model}",
  messages: [
    { role: "system", content: "${systemPrompt}" },
    { role: "user", content: "Your message here" },
  ],
  temperature: ${temperature},
  max_tokens: ${maxTokens},
  stream: true,
});

for await (const chunk of response) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`
  }

  // Python
  return `from nexus_ia import Nexus

client = Nexus(api_key=os.environ["NEXUS_API_KEY"])

response = client.chat.completions.create(
    provider="${provider}",
    model="${model}",
    messages=[
        {"role": "system", "content": "${systemPrompt}"},
        {"role": "user", "content": "Your message here"},
    ],
    temperature=${temperature},
    max_tokens=${maxTokens},
    stream=True,
)

for chunk in response:
    print(chunk.choices[0].delta.content or "", end="")`
}
