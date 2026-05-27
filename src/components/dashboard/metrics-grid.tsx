import { Scorecard } from "./scorecard";

// Mock data based on the proprietary metrics requested
const mockMetrics = [
  {
    title: "Cognitive Friction Index",
    description: "Measures the mental effort required to understand the core value proposition.",
    score: 82,
    status: "optimal" as const,
    details: ["Clear terminology used", "Sentence structure is scannable", "No industry jargon detected"]
  },
  {
    title: "Trust Deficit Score",
    description: "Evaluates missing trust signals and potentially skeptical claims.",
    score: 45,
    status: "warning" as const,
    details: ["Missing social proof near CTA", "Claims lack data backing", "Vague guarantees"]
  },
  {
    title: "Emotional Activation Level",
    description: "Analyzes language that triggers desired emotional states (e.g. urgency, relief).",
    score: 65,
    status: "warning" as const,
    details: ["Good baseline urgency", "Lacking aspirational framing", "Pain points could be sharper"]
  },
  {
    title: "CTA Persuasion Strength",
    description: "Evaluates the likelihood of the call-to-action driving behavior.",
    score: 20,
    status: "critical" as const,
    details: ["Generic 'Click Here' text", "Low contrast against background", "No risk-reversal text nearby"]
  }
];

export function MetricsGrid({ isLoading }: { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mockMetrics.map((metric, i) => (
        <Scorecard key={i} {...metric} />
      ))}
    </div>
  );
}
