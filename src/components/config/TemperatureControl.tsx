import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { usePlaygroundStore } from '@/stores/playgroundStore'

export function TemperatureControl() {
  const config = usePlaygroundStore((s) => s.config)
  const setConfig = usePlaygroundStore((s) => s.setConfig)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-gray-300 uppercase">
          <span>Temperature</span>
        </Label>
        <span className="font-mono text-[11px] text-gray-200">
          {config.temperature.toFixed(2)}
        </span>
      </div>
      <Slider
        value={[config.temperature]}
        onValueChange={(v) => {
          const value = Array.isArray(v) ? v[0] : v
          setConfig({ temperature: value })
        }}
        min={0}
        max={2}
        step={0.01}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-gray-500">
        <span>Precise</span>
        <span>Creative</span>
      </div>
    </div>
  )
}

export default TemperatureControl
