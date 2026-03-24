'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { generateCodeSnippet } from '@/data/mock-data'
import { usePlaygroundStore } from '@/stores/playgroundStore'
import { Code, Copy, Check, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

type Language = 'curl' | 'javascript' | 'python'

const LANGUAGES: { id: Language; label: string; icon: React.ReactNode }[] = [
  { id: 'curl', label: 'cURL', icon: <Terminal className="h-3 w-3" /> },
  { id: 'javascript', label: 'JavaScript', icon: <Code className="h-3 w-3" /> },
  { id: 'python', label: 'Python', icon: <Code className="h-3 w-3" /> },
]

export const CodePanel = () => {
  const config = usePlaygroundStore((s) => s.config)
  const [activeLanguage, setActiveLanguage] = useState<Language>('javascript')
  const [copied, setCopied] = useState(false)

  const code = generateCodeSnippet(config, activeLanguage)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightCode = (code: string, language: Language) => {
    const keywords = {
      javascript: [
        'import',
        'from',
        'const',
        'await',
        'for',
        'process',
        'return',
      ],
      python: ['from', 'import', 'client', 'for', 'in', 'print', 'return'],
      curl: ['curl', '-X', '-H', '-d'],
    }

    const strings = /"[^"]*"/g
    const numbers = /\b\d+\b/g
    const comments = /\/\/.*/g

    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        strings,
        (match) => `<span class="text-emerald-400">${match}</span>`
      )
      .replace(
        numbers,
        (match) => `<span class="text-amber-400">${match}</span>`
      )
      .replace(
        comments,
        (match) => `<span class="text-gray-500">${match}</span>`
      )

    keywords[language].forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g')
      highlighted = highlighted.replace(
        regex,
        `<span class="text-purple-400">${keyword}</span>`
      )
    })

    return highlighted
  }

  return (
    <aside className="relative flex h-full w-80 flex-col rounded-lg border border-white/10 bg-black/40 backdrop-blur">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-[80px]" />
      </div>

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-600/20">
              <Code className="h-3.5 w-3.5 text-purple-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">
                API Reference
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">
                Copy & run
              </span>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] text-gray-400 uppercase">
            {activeLanguage === 'curl'
              ? 'Terminal'
              : activeLanguage === 'javascript'
                ? 'Node'
                : 'Python'}
          </span>
        </div>

        {/* Language tabs */}
        <div className="flex gap-1 border-b border-white/10 px-3 py-2 text-[11px]">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLanguage(lang.id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-1 transition-colors',
                activeLanguage === lang.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:bg-white/5'
              )}
            >
              {lang.icon}
              {lang.label}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="flex-1 overflow-auto px-4 py-4">
          <div className="relative rounded-lg border border-white/10 bg-black/80">
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
              <span className="font-mono text-[10px] text-gray-500">
                {activeLanguage === 'curl'
                  ? '$'
                  : activeLanguage === 'javascript'
                    ? 'index.ts'
                    : 'client.py'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 border border-white/10 bg-black/60"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-gray-300" />
                )}
              </Button>
            </div>
            <pre className="overflow-x-auto p-4">
              <code
                className="font-mono text-[11px] leading-relaxed text-gray-200"
                dangerouslySetInnerHTML={{
                  __html: highlightCode(code, activeLanguage),
                }}
              />
            </pre>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-white/10 px-4 py-4">
          <div className="space-y-3 text-[10px]">
            <div className="rounded-md border border-white/10 bg-black/70 px-3 py-3">
              <h4 className="mb-1 font-mono text-[11px] tracking-[0.18em] text-gray-400 uppercase">
                Current configuration
              </h4>
              <div className="space-y-1 text-gray-400">
                <div className="flex justify-between">
                  <span>Provider</span>
                  <span className="font-mono text-gray-100">
                    {config.provider}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Model</span>
                  <span className="font-mono text-gray-100">
                    {config.model}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature</span>
                  <span className="font-mono text-gray-100">
                    {config.temperature.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Max tokens</span>
                  <span className="font-mono text-gray-100">
                    {config.maxTokens}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-md border border-purple-500/40 bg-purple-500/10 px-3 py-3">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-600/30">
                <Terminal className="h-3.5 w-3.5 text-purple-200" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-white">
                  Ready to integrate?
                </p>
                <p className="text-[10px] text-gray-400">
                  Get your API key from the dashboard and point this to{' '}
                  <span className="font-mono">/api/chat</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
