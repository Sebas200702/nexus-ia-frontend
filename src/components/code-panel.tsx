import { useState, useMemo } from 'react'
import { Code, Copy, Check, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePlaygroundStore } from '@/stores/playgroundStore'
import { generateCodeSnippet } from '@/data/mock-data'
import { cn } from '@/lib/utils'
import { highlightCode } from '@/utils'

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

  const code = useMemo(
    () => generateCodeSnippet(config, activeLanguage),
    [config, activeLanguage]
  )

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  

  return (
    <aside className="relative flex h-full max-w-100 flex-1 flex-col overflow-hidden rounded-lg border border-white/10 bg-black/40 backdrop-blur-md">
      {/* Glow ambiental sutil que coincide con tu diseño */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-purple-600/10 blur-[80px]" />
      </div>

      <div className="relative flex h-full flex-col">
        {/* Header - Respetando tu distribución original */}
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-purple-500/20 bg-purple-600/20">
              <Code className="h-4 w-4 text-purple-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-medium text-white/90">
                API Reference
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                Copy & run
              </span>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] tracking-widest text-gray-400 uppercase">
            {activeLanguage === 'curl'
              ? 'Terminal'
              : activeLanguage === 'javascript'
                ? 'Node.js'
                : 'Python 3'}
          </span>
        </header>

        {/* Language tabs - Estilo limpio de Nexus */}
        <nav className="flex gap-1 border-b border-white/10 px-3 py-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLanguage(lang.id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all',
                activeLanguage === lang.id
                  ? 'border border-purple-500/30 bg-purple-600/20 text-purple-300'
                  : 'border border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'
              )}
            >
              {lang.icon}
              {lang.label}
            </button>
          ))}
        </nav>

        {/* Code block - Colores integrados */}
        <div className="nexus-scroll flex-1 overflow-auto px-4 py-4">
          <div className="relative rounded-lg border border-white/10 bg-black/60">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/2 px-3 py-2">
              <span className="font-mono text-[10px] text-gray-500">
                {activeLanguage === 'curl'
                  ? '$ bash'
                  : activeLanguage === 'javascript'
                    ? 'nexus_app.ts'
                    : 'main.py'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 border border-white/10 bg-black/40 transition-colors hover:bg-purple-600/20 hover:text-purple-300"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
            <pre className="overflow-x-auto p-4 selection:bg-purple-500/30">
              <code
                className="font-mono text-[11.5px] leading-relaxed text-zinc-300"
                dangerouslySetInnerHTML={{
                  __html: highlightCode(code),
                }}
              />
            </pre>
          </div>
        </div>

        {/* Footer info - Coincide con tu panel lateral izquierdo */}
        <footer className="space-y-3 border-t border-white/10 px-4 py-4">
          <div className="rounded-md border border-white/10 bg-black/50 px-3 py-3">
            <h4 className="mb-2 font-mono text-[9px] tracking-[0.2em] text-gray-500 uppercase">
              Configuration
            </h4>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Model</span>
                <span className="font-mono text-purple-300">
                  {config.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Temperature</span>
                <span className="font-mono text-amber-400">
                  {config.temperature.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-purple-500/20 bg-purple-500/5 px-3 py-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <p className="text-[10px] text-gray-400">
              Endpoint ready:{' '}
              <span className="font-mono text-gray-200">/v1/chat</span>
            </p>
          </div>
        </footer>
      </div>
    </aside>
  )
}
