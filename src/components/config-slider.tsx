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
    <aside className="relative flex h-full w-72 flex-col rounded-lg border border-white/10 bg-black/40 backdrop-blur">
      {/* glows internos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 left-0 h-32 w-32 rounded-full bg-purple-600/20 blur-[80px]" />
      </div>

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-600/20">
            <Settings2 className="h-3.5 w-3.5 text-purple-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white">
              Configuration
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">
              Routing & cost
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-6 text-xs">
            <ProviderSelect />
            <ModelSelect />
            <TemperatureControl />
            <MaxTokensControl />
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-black/70 px-3 py-3">
              <Label className="flex flex-col gap-1 text-xs text-gray-200">
                <span className="flex items-center gap-2">
                  <Brain className="h-3 w-3 text-purple-300" />
                  Show reasoning
                </span>
                <span className="text-[10px] text-gray-500">
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
            <p className="text-[11px] text-gray-300">
              <span className="font-mono text-[10px] tracking-[0.2em] text-purple-300 uppercase">
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
