interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-yuno-text">{title}</h2>
      <p className="text-sm text-yuno-muted">{description}</p>
    </div>
  );
}
