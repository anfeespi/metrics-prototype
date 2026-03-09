interface ComingSoonCardProps {
  title: string;
  description: string;
}

export function ComingSoonCard({ title, description }: ComingSoonCardProps) {
  return (
    <div className="yuno-card p-8 text-center opacity-60">
      <span className="inline-block px-3 py-1 rounded-full bg-yuno-bg text-yuno-muted text-xs font-medium mb-4">
        Coming Soon
      </span>
      <h2 className="text-lg font-semibold text-yuno-muted mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{title}</h2>
      <p className="text-sm text-yuno-muted max-w-md mx-auto">{description}</p>
    </div>
  );
}
