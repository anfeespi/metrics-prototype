import { ComingSoonCard } from '../shared/ComingSoonCard';

export function HumanEscalationSection() {
  return (
    <section>
      <ComingSoonCard
        title="Human Escalation Rate"
        description="Porcentaje de conversaciones donde el usuario tuvo que recurrir a un humano porque el bot no resolvió la tarea."
      />
    </section>
  );
}
