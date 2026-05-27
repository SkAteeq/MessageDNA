"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function AnalysisForm({ onAnalyze }: { onAnalyze: (type: string, content: string) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent, type: "text" | "url") => {
    e.preventDefault();
    setIsLoading(true);
    const content = type === "text" ? text : url;

    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 1500));

    onAnalyze(type, content);
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analyze Copy</CardTitle>
        <CardDescription>
          Paste your marketing copy or a URL to receive behavioral insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="text">Paste Text</TabsTrigger>
            <TabsTrigger value="url">Website URL</TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <form onSubmit={(e) => handleSubmit(e, "text")} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="copy">Marketing Copy</Label>
                <Textarea
                  id="copy"
                  placeholder="Paste your landing page, email, or ad copy here..."
                  className="min-h-[200px]"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading || !text} className="w-full">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Generate Insights"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="url">
            <form onSubmit={(e) => handleSubmit(e, "url")} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Our system will scrape the URL, extract the core messaging, and analyze it.
                </p>
              </div>
              <Button type="submit" disabled={isLoading || !url} className="w-full">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Scrape & Analyze"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
