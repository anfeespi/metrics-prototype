import { clsx } from 'clsx';
import type { Bot } from '../../types';

interface SidebarProps {
  bots: Bot[];
  selectedBotId: string;
  onSelectBot: (id: string) => void;
}

export function Sidebar({ bots, selectedBotId, onSelectBot }: SidebarProps) {
  return (
    <aside className="w-64 min-w-64 bg-yuno-card border-r border-yuno-border/40 h-screen overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-yuno-border/40">
        <h2 className="text-xs font-semibold text-yuno-muted uppercase tracking-wider">Agents</h2>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {bots.map((bot) => (
          <button
            key={bot.id}
            onClick={() => onSelectBot(bot.id)}
            className={clsx(
              'w-full text-left px-3 py-2.5 rounded-lg transition-colors',
              selectedBotId === bot.id
                ? 'bg-yuno-blue-light text-yuno-blue border border-yuno-blue/20'
                : 'text-yuno-text hover:bg-yuno-bg border border-transparent'
            )}
          >
            <div className="flex items-center gap-2">
              <span className={clsx(
                'w-2 h-2 rounded-full flex-shrink-0',
                bot.active ? 'bg-accent-green' : 'bg-yuno-muted'
              )} />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{bot.name}</p>
                <p className="text-xs text-yuno-muted">{bot.type}</p>
              </div>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}
