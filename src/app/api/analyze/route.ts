import { NextResponse } from 'next/server';
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import * as cheerio from 'cheerio';

// Configure edge compatibility if needed, but cheerio relies on Node.js modules
// so we'll stick to the Node.js runtime for now.

const AnalysisSchema = z.object({
  extractedSummary: z.string().describe("A brief summary of what the page/copy is about based on the extracted text."),
  overallScore: z.number().min(0).max(100).describe("Overall conversion readiness score based on heuristics."),
  keyFindings: z.array(
    z.object({
      category: z.enum(['Clarity', 'Trust', 'CTA', 'Emotion', 'Readability']),
      finding: z.string().describe("Specific finding, e.g., 'The hero headline is vague.'"),
      impact: z.enum(['High', 'Medium', 'Low']),
      recommendation: z.string().describe("Actionable advice to fix this finding.")
    })
  ).describe("The most important issues identified in the copy."),
  metrics: z.array(
    z.object({
      title: z.string().describe("Name of the metric, e.g. 'Clarity Index', 'Trust Signals'"),
      description: z.string().describe("What this metric means."),
      score: z.number().min(0).max(100),
      status: z.enum(['critical', 'warning', 'optimal']),
      details: z.array(z.string()).describe("Specific bullet points referencing actual text from the input to justify the score.")
    })
  ).describe("Detailed breakdown of scores across different marketing dimensions."),
  rewrites: z.array(
    z.object({
      title: z.string().describe("Name of the variation, e.g., 'Direct Response', 'SaaS Minimalist'"),
      focus: z.string().describe("The primary psychological trigger focused on in this rewrite."),
      content: z.string().describe("The newly rewritten copy.")
    })
  ).describe("Alternative versions of the main headline or core copy.")
});

async function fetchAndExtractURL(url: string): Promise<string> {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'MessageDNA-Bot/1.0' } });
    if (!response.ok) throw new Error('Failed to fetch URL');
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove noise
    $('script, style, nav, footer, iframe, noscript, svg').remove();

    // Extract semantic text
    const extractedText = $('h1, h2, h3, p, a, button, li').map((_, el) => $(el).text().trim()).get().filter(t => t.length > 0).join('\n');
    return extractedText.substring(0, 5000); // Limit to ~5000 chars for token limits
  } catch (error) {
    console.error("Scraping error:", error);
    throw new Error("Could not extract content from the provided URL. Make sure it's accessible.");
  }
}

export async function POST(req: Request) {
  try {
    const { content, type } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    let analyzeText = content;


    if (type === 'url') {
      try {
        analyzeText = await fetchAndExtractURL(content);

      } catch (e: unknown) {
         const msg = e instanceof Error ? e.message : String(e); return NextResponse.json({ error: msg }, { status: 400 });
      }
    }

    // Use streamObject for progressive rendering
    const result = await streamObject({
      model: openai('gpt-4o'),
      schema: AnalysisSchema,
      system: `You are an elite conversion rate optimization (CRO) expert, behavioral psychologist, and direct response copywriter.
      Analyze the provided content deeply. Do NOT generate generic scores or platitudes.
      Every score and finding MUST reference specific text from the input.
      If the text lacks urgency, quote the exact passive CTA. If trust is low, note the exact lack of social proof.
      Be brutal but constructive. Your goal is to increase conversions.`,
      prompt: `Analyze the following marketing copy:\n\n${analyzeText}`,
    });

    // In Next.js App Router, we can return the stream response directly using result.toTextStreamResponse()
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Analysis API Error:', error);
    return NextResponse.json({ error: 'Failed to analyze content' }, { status: 500 });
  }
}
