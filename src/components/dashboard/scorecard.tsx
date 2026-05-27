import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


interface ScorecardProps {
  title: string;
  description: string;
  score: number; // 0-100
  trend?: "up" | "down" | "neutral";
  status: "critical" | "warning" | "optimal";
  details?: string[];
}

export function Scorecard({ title, description, score, status, details }: ScorecardProps) {
  const statusColors = {
    critical: "bg-destructive",
    warning: "bg-amber-500",
    optimal: "bg-emerald-500"
  };

  const statusTextColors = {
    critical: "text-destructive",
    warning: "text-amber-500",
    optimal: "text-emerald-500"
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <span className={`text-2xl font-bold ${statusTextColors[status]}`}>{score}</span>
        </div>
        <CardDescription className="text-xs line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 mt-2">
        <div className="space-y-1.5">
          <Progress value={score} className="h-2" indicatorColor={statusColors[status]} />
          <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase">
            <span>Critical</span>
            <span>Warning</span>
            <span>Optimal</span>
          </div>
        </div>

        {details && details.length > 0 && (
          <div className="mt-auto space-y-2">
            {details.map((detail, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <div className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${statusColors[status]}`} />
                <span className="text-muted-foreground leading-tight">{detail}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
