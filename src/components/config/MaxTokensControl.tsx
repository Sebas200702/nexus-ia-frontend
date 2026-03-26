import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { usePlaygroundStore } from '@/stores/playgroundStore'

export function MaxTokensControl() {
  const config = usePlaygroundStore((s) => s.config)
  const setConfig = usePlaygroundStore((s) => s.setConfig)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-gray-300 uppercase">
          <span>Max Tokens</span>
        </Label>
        <span className="font-mono text-[11px] text-gray-200">
          {config.maxTokens}
        </span>
      </div>
      <Slider
        value={[config.maxTokens]}
        onValueChange={(v) => {
          const value = Array.isArray(v) ? v[0] : v
          setConfig({ maxTokens: value })
        }}
        min={256}
        max={8192}
        step={256}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-gray-500">
        <span>256</span>
        <span>8192</span>
      </div>
    </div>
  )
}

export default MaxTokensControl
