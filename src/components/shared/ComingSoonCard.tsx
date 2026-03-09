interface ComingSoonCardProps {
  title: string;
  description: string;
}

export function ComingSoonCard({ title, description }: ComingSoonCardProps) {
  return (
    <div className="rounded-xl bg-navy-800/50 border border-navy-700/50 p-8 text-center opacity-60">
      <span className="inline-block px-3 py-1 rounded-full bg-navy-700 text-slate-400 text-xs font-medium mb-4">
        Coming Soon
      </span>
      <h2 className="text-lg font-semibold text-slate-400 mb-2">{title}</h2>
      <p className="text-sm text-slate-500 max-w-md mx-auto">{description}</p>
    </div>
  );
}
