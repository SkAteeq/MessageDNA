/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { AnalysisForm } from "@/components/dashboard/analysis-form";
import { Scorecard } from "@/components/dashboard/scorecard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { AlertCircle, ChevronRight, Loader2, PlayCircle } from "lucide-react";
import { z } from 'zod';

const AnalysisSchemaClient = z.object({
  extractedSummary: z.string(),
  overallScore: z.number(),
  keyFindings: z.array(
    z.object({
      category: z.string(),
      finding: z.string(),
      impact: z.string(),
      recommendation: z.string()
    })
  ),
  metrics: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      score: z.number(),
      status: z.enum(['critical', 'warning', 'optimal']),
      details: z.array(z.string())
    })
  ),
  rewrites: z.array(
    z.object({
      title: z.string(),
      focus: z.string(),
      content: z.string()
    })
  )
});

export default function DashboardPage() {
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [originalContent, setOriginalContent] = useState("");
  const [analysisType, setAnalysisType] = useState<"text" | "url">("text");

  const { addAnalysis } = useAppStore();

  const { object, submit, isLoading, error } = useObject({
    api: '/api/analyze',
    schema: AnalysisSchemaClient,
    onFinish: (result) => {
      if (result.object) {
        addAnalysis({
          id: Date.now().toString(),
          type: analysisType,
          content: originalContent,
          date: new Date().toISOString(),
          result: result.object as Record<string, unknown>,
        });
      }
    }
  });

  const handleAnalyze = (type: string, content: string) => {
    setAnalysisType(type as "text" | "url");
    setHasAnalyzed(true);
    setOriginalContent(content);
    submit({ type, content });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Conversion Analysis</h1>
        <p className="text-muted-foreground">
          Deep structural analysis of messaging, clarity, and persuasion vectors.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />

          {hasAnalyzed && (
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-muted-foreground" />
                  Analyzed Source
                </CardTitle>
                <CardDescription className="text-xs">
                  {analysisType === 'url' ? 'Extracted content from URL' : 'Direct input text'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground line-clamp-6 leading-relaxed whitespace-pre-wrap">
                  {object?.extractedSummary || originalContent}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          {!hasAnalyzed ? (
            <div className="h-full flex items-center justify-center border border-dashed rounded-xl p-12 text-center bg-muted/5 min-h-[400px]">
              <div className="max-w-sm space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl">⚡️</span>
                </div>
                <h3 className="text-lg font-medium">Ready for analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Paste a URL or raw text. We&apos;ll extract the core messaging and evaluate its psychological friction and conversion readiness.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {error && (
                <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm border border-destructive/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Analysis failed</p>
                    <p className="mt-1 opacity-90">{error.message}</p>
                  </div>
                </div>
              )}

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium tracking-tight">Key Findings</h3>
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                </div>

                <div className="grid gap-3">
                  {!object?.keyFindings?.length && isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-24 bg-muted/40 rounded-lg animate-pulse" />
                    ))
                  ) : (
                    object?.keyFindings?.map((finding: any, i: number) => (
                      <Card key={i} className="border-border/50 shadow-sm overflow-hidden">
                        <div className="flex border-l-4 border-primary">
                          <div className="p-4 flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={finding.impact === 'High' ? 'destructive' : finding.impact === 'Medium' ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0">
                                {finding.impact} Impact
                              </Badge>
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {finding.category}
                              </span>
                            </div>
                            <p className="text-sm font-medium leading-snug mb-2">{finding.finding}</p>
                            <div className="bg-muted/40 p-2 rounded text-xs text-muted-foreground flex items-start gap-2">
                              <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
                              <p>{finding.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </section>

              {object?.metrics && object.metrics.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-lg font-medium tracking-tight">Structural Metrics</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {object.metrics.map((metric: any, i: number) => (
                      <Scorecard key={i} {...metric} />
                    ))}
                  </div>
                </section>
              )}

              {object?.rewrites && object.rewrites.length > 0 && (
                <section className="space-y-4 pb-12">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium tracking-tight">Targeted Rewrites</h3>
                      <p className="text-sm text-muted-foreground">Alternative positioning based on findings.</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {object.rewrites.map((rewrite: any, i: number) => (
                      <Card key={i} className="border-border/50 shadow-sm">
                        <CardHeader className="py-3 px-4 bg-muted/20 border-b flex flex-row items-center justify-between space-y-0">
                          <CardTitle className="text-sm font-medium">{rewrite?.title}</CardTitle>
                          <Badge variant="secondary" className="font-normal">
                            {rewrite?.focus}
                          </Badge>
                        </CardHeader>
                        <CardContent className="p-4">
                          <p className="text-sm leading-relaxed">{rewrite?.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
