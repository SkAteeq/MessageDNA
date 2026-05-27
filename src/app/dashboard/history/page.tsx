"use client";

import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const { history, clearHistory } = useAppStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
          <p className="text-muted-foreground mt-1">Review your past conversions and messaging analyses.</p>
        </div>
        {history.length > 0 && (
          <Button variant="outline" onClick={clearHistory} className="text-destructive border-destructive/20 hover:bg-destructive/10">
            Clear History
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <Card className="border-dashed shadow-none">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
              <span className="text-xl">📭</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-lg">No history yet</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Your previous analyses will appear here. Run your first analysis to get started.
              </p>
            </div>
            <Link href="/dashboard" className="mt-4 inline-flex h-8 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              New Analysis
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {history.map((record) => (
            <Card key={record.id} className="overflow-hidden transition-all hover:shadow-md border-border/50">
              <CardHeader className="pb-3 bg-muted/20">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      {record.type === 'url' ? '🌐 URL Analysis' : '📝 Text Analysis'}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {new Date(record.date).toLocaleString()}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-background">

                    {(record.result as Record<string, unknown>)?.overallScore || 'N/A'} Overall
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {record.type === 'url' ? record.content : `"${record.content}"`}
                </p>
                <div className="mt-4 flex justify-end">
                  <Link href="/dashboard" className="inline-flex h-8 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
                    Run New Analysis
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
