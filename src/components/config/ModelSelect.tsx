'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { usePlaygroundStore } from '@/stores/playgroundStore'
import { Cpu } from 'lucide-react'

export function ModelSelect() {
  const config = usePlaygroundStore((s) => s.config)
  const setConfig = usePlaygroundStore((s) => s.setConfig)
  const currentProvider = config.provider

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gray-400 uppercase">
        <Cpu className="h-3 w-3 text-purple-300" />
        Model
      </Label>
      <Select
        value={config.model}
        onValueChange={(model) => {
          if (!model) return
          setConfig({ model: model as string })
        }}
      >
        <SelectTrigger className="h-8 border-white/10 bg-black/70 text-xs text-gray-100">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent className="border-white/10 bg-[#05030d] text-xs text-gray-100">
          {config &&
            currentProvider &&
            // read provider models from PROVIDERS in mock-data when needed
            // fallback: show current model only
            (Array.isArray((config as any).model) ? [] : [])}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ModelSelect
