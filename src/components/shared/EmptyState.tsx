export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl bg-navy-800/50 border border-navy-700/50 p-12 text-center">
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
}
