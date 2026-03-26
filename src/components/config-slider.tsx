import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { usePlaygroundStore } from '@/stores/playgroundStore'
import { Settings2, Brain } from 'lucide-react'
import ProviderSelect from '@/components/config/ProviderSelect'
import ModelSelect from '@/components/config/ModelSelect'
import TemperatureControl from '@/components/config/TemperatureControl'
import MaxTokensControl from '@/components/config/MaxTokensControl'
import SystemPrompt from '@/components/config/SystemPrompt'

export const ConfigSidebar = () => {
  const config = usePlaygroundStore((s) => s.config)
  const setConfig = usePlaygroundStore((s) => s.setConfig)

  return (
    <aside className="relative flex h-full max-w-100 flex-col nexus-scroll flex-1 overflow-y-auto px-4 py-4 rounded-lg border border-white/10 bg-black/40 backdrop-blur">
      {/* glows internos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 left-0 h-32 w-32 rounded-full bg-purple-600/20 blur-[80px]" />
      </div>

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <header className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600/20">
            <Settings2 className="h-4 w-4 text-purple-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-md font-medium text-white">
              Configuration
            </span>
            <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
              Routing & cost
            </span>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-6 text-xs">
            <ProviderSelect />
            <ModelSelect />
            <TemperatureControl />
            <MaxTokensControl />
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-black/70 px-3 py-3">
              <Label className="flex flex-col gap-1 text-sm text-gray-200">
                <span className="flex items-center gap-2">
                  <Brain className="h-3.5 w-3.5 text-purple-300" />
                  Show reasoning
                </span>
                <span className="text-xs text-pretty text-gray-400">
                  Collapse/expand chain-of-thought when the model exposes it.
                </span>
              </Label>
              <Switch
                checked={config.showReasoning}
                onCheckedChange={(showReasoning) =>
                  setConfig({ showReasoning })
                }
              />
            </div>
            <SystemPrompt />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-4 py-4">
          <div className="rounded-md border border-purple-500/40 bg-purple-500/10 px-3 py-3">
            <p className="text-sm text-gray-300">
              <span className="font-mono text-xs tracking-[0.2em] text-purple-300 uppercase">
                Pro tip
              </span>
              <br />
              Lower temperature for factual answers. Push it up when you want
              the model to explore options.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
