'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { PROVIDERS, type ProviderId } from '@/data/mock-data'
import { Sparkles } from 'lucide-react'
import { usePlaygroundStore } from '@/stores/playgroundStore'

export function ProviderSelect() {
  const config = usePlaygroundStore((s) => s.config)
  const setConfig = usePlaygroundStore((s) => s.setConfig)

  const handleProviderChange = (value: ProviderId | null) => {
    if (!value) return
    const provider = PROVIDERS.find((p) => p.id === value)
    if (!provider) return
    setConfig({ provider: value, model: provider.models[0] })
  }

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gray-400 uppercase">
        <Sparkles className="h-3 w-3 text-purple-300" />
        Provider
      </Label>
      <Select
        value={config.provider}
        onValueChange={(v) => handleProviderChange(v as ProviderId | null)}
      >
        <SelectTrigger className="h-8 border-white/10 bg-black/70 text-xs text-gray-100">
          <SelectValue placeholder="Select a provider" />
        </SelectTrigger>
        <SelectContent className="border-white/10 bg-[#05030d] text-xs text-gray-100">
          {PROVIDERS.map((provider) => (
            <SelectItem
              key={provider.id}
              value={provider.id}
              className="text-xs"
            >
              {provider.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ProviderSelect
