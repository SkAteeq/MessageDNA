"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function AnalysisForm({
  onAnalyze,
  isLoading
}: {
  onAnalyze: (type: string, content: string) => void;
  isLoading?: boolean;
}) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent, type: "text" | "url") => {
    e.preventDefault();
    const content = type === "text" ? text : url;
    if (!content) return;
    onAnalyze(type, content);
  };

  return (
    <Card className="w-full shadow-sm border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Analyze Copy</CardTitle>
        <CardDescription className="text-xs">
          Provide context for the AI engine to evaluate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 h-9">
            <TabsTrigger value="url" className="text-xs">URL</TabsTrigger>
            <TabsTrigger value="text" className="text-xs">Raw Text</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="mt-0">
            <form onSubmit={(e) => handleSubmit(e, "url")} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-muted/50"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading || !url} className="w-full shadow-none">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Run Analysis"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="text" className="mt-0">
            <form onSubmit={(e) => handleSubmit(e, "text")} className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  id="copy"
                  placeholder="Paste landing page, email, or ad copy..."
                  className="min-h-[160px] resize-none bg-muted/50 text-sm"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading || !text} className="w-full shadow-none">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Run Analysis"}
              </Button>
            </form>
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
