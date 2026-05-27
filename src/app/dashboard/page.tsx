"use client";

import { useState } from "react";
import { AnalysisForm } from "@/components/dashboard/analysis-form";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { Scorecard } from "@/components/dashboard/scorecard";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Metric {
  title: string;
  description: string;
  score: number;
  status: "critical" | "warning" | "optimal";
  details: string[];
}

interface Rewrite {
  title: string;
  focus: string;
  content: string;
}

interface AnalysisResult {
  metrics?: Metric[];
  rewrites?: Rewrite[];
}

export default function DashboardPage() {
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [originalContent, setOriginalContent] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (type: string, content: string) => {
    setIsAnalyzing(true);
    setHasAnalyzed(false);
    setOriginalContent(content);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, content })
      });

      if (!res.ok) {
        throw new Error('Failed to analyze');
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback for mock view if API fails (e.g. no OpenAI key)
    } finally {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Intelligence Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Run behavioral psychology and persuasion science models on your marketing copy.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
          <AnalysisForm onAnalyze={handleAnalyze} />

          {hasAnalyzed && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Original Content Segment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-6 italic bg-muted/50 p-3 rounded-md">
                  &quot;{originalContent || 'No content provided.'}&quot;
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-8">
          {isAnalyzing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Behavioral Metrics</h3>
                <MetricsGrid isLoading={true} />
              </div>
              <Separator />
              <div className="h-64 rounded-xl bg-muted animate-pulse" />
            </div>
          ) : hasAnalyzed ? (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold tracking-tight">Behavioral Intelligence Metrics</h3>
                </div>
                {analysisResult && analysisResult.metrics ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {analysisResult.metrics.map((metric: Metric, i: number) => (
                      <Scorecard key={i} {...metric} />
                    ))}
                  </div>
                ) : (
                  <MetricsGrid /> // Fallback mock
                )}
              </section>

              <Separator />

              <section>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">AI Rewrite Variations</h3>
                    <p className="text-sm text-muted-foreground">Optimized for specific psychological triggers.</p>
                  </div>
                  <Button variant="outline" size="sm">Regenerate All</Button>
                </div>

                <div className="grid gap-4">
                  {analysisResult && analysisResult.rewrites ? (
                    analysisResult.rewrites.map((rewrite: Rewrite, i: number) => (
                      <Card key={i}>
                        <CardHeader className="py-3 px-4 bg-muted/30 border-b">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">{rewrite.title}</CardTitle>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                              {rewrite.focus} Focus
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 text-sm">
                          {rewrite.content}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    // Mock Rewrites
                    <>
                      <Card>
                        <CardHeader className="py-3 px-4 bg-muted/30 border-b">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">High-Trust Variant</CardTitle>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                              Trust Deficit Focus
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 text-sm">
                          Join 10,000+ marketing teams increasing conversions by 24% on average. Guaranteed results in 30 days or your money back. Start your free trial today.
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="py-3 px-4 bg-muted/30 border-b">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">Urgency Variant</CardTitle>
                            <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full font-medium">
                              Emotional Activation Focus
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 text-sm">
                          Stop losing customers to poor messaging. Lock in our early-access pricing before it increases next week. Only 40 spots remaining for the beta program.
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </section>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-12 text-center bg-muted/10">
              <div className="max-w-sm space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold">Awaiting Input</h3>
                <p className="text-sm text-muted-foreground">
                  Paste your copy or a URL on the left to generate proprietary behavioral metrics and highly optimized AI rewrites.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
