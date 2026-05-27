export interface Finding {
  category: string;
  finding: string;
  impact: string;
  recommendation: string;
}

export interface Metric {
  title: string;
  description: string;
  score: number;
  status: "critical" | "warning" | "optimal";
  details: string[];
}

export interface Rewrite {
  title: string;
  focus: string;
  content: string;
}

export interface AnalysisSchemaType {
  extractedSummary: string;
  overallScore: number;
  keyFindings: Finding[];
  metrics: Metric[];
  rewrites: Rewrite[];
}
