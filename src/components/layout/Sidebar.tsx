import { clsx } from 'clsx';
import { Bot } from '../../types';

interface SidebarProps {
  bots: Bot[];
  selectedBotId: string;
  onSelectBot: (id: string) => void;
}

export function Sidebar({ bots, selectedBotId, onSelectBot }: SidebarProps) {
  return (
    <aside className="w-64 min-w-64 bg-navy-900 border-r border-navy-700 h-screen overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-navy-700">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Agents</h2>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {bots.map((bot) => (
          <button
            key={bot.id}
            onClick={() => onSelectBot(bot.id)}
            className={clsx(
              'w-full text-left px-3 py-2.5 rounded-lg transition-colors',
              selectedBotId === bot.id
                ? 'bg-electric-500/15 text-electric-400 border border-electric-500/30'
                : 'text-slate-300 hover:bg-navy-800 border border-transparent'
            )}
          >
            <div className="flex items-center gap-2">
              <span className={clsx(
                'w-2 h-2 rounded-full flex-shrink-0',
                bot.active ? 'bg-accent-green' : 'bg-slate-500'
              )} />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{bot.name}</p>
                <p className="text-xs text-slate-500">{bot.type}</p>
              </div>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}
