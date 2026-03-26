import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { usePlaygroundStore } from '@/stores/playgroundStore'

export function SystemPrompt() {
  const config = usePlaygroundStore((s) => s.config)
  const setConfig = usePlaygroundStore((s) => s.setConfig)

  return (
    <div className="space-y-2">
      <Label className="font-mono text-xs font-semibold tracking-[0.2em] text-gray-300 uppercase">
        System prompt
      </Label>
      <Textarea
        value={config.systemPrompt}
        onChange={(e) => setConfig({ systemPrompt: e.target.value })}
        placeholder="You are a helpful AI assistant powered by Nexus IA..."
        className="min-h-25 resize-none border-white/10 bg-black/70 text-[11px] text-gray-100"
      />
    </div>
  )
}

export default SystemPrompt
