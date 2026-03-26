import { ConfigSidebar } from '@/components/config-slider'
import { ChatPanel } from '@/components/chat'
import { CodePanel } from '@/components/code-panel'


export const NexusPlaygroundPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#05030d] text-white">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <div className="relative flex h-screen gap-4 p-6">

        <ConfigSidebar />


        <div className="flex min-w-0 flex-1">
          <ChatPanel />
        </div>
        <CodePanel />
      </div>
    </div>
  )
}
