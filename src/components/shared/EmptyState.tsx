export function EmptyState({ message }: { message: string }) {
  return (
    <div className="yuno-card p-12 text-center">
      <p className="text-yuno-muted text-sm">{message}</p>
    </div>
  );
}
