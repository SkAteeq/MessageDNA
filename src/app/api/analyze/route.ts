import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Define the structured output schema for our multi-agent analysis
const AnalysisSchema = z.object({
  metrics: z.array(z.object({
    title: z.string(),
    description: z.string(),
    score: z.number().min(0).max(100),
    status: z.enum(['critical', 'warning', 'optimal']),
    details: z.array(z.string())
  })),
  rewrites: z.array(z.object({
    title: z.string(),
    focus: z.string(),
    content: z.string()
  }))
});

export async function POST(req: Request) {
  try {
    const { content, type } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // In a full implementation, we would orchestrate multiple agents here.
    // For this prototype, we use a single comprehensive prompt to simulate the multi-agent system.
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: AnalysisSchema,
      prompt: `Analyze the following marketing ${type === 'url' ? 'website copy from URL' : 'copy'}:

      CONTENT:
      "${content}"

      Act as a team of expert conversion copywriters, behavioral psychologists, and UX researchers.

      Generate proprietary behavioral metrics including:
      1. Cognitive Friction Index
      2. Trust Deficit Score
      3. Emotional Activation Level
      4. CTA Persuasion Strength

      For each metric, provide a score (0-100), status (critical, warning, optimal), and specific details explaining the score.

      Then, generate 2-3 specific rewrites optimized for different psychological triggers (e.g., High-Trust, Urgency, Clarity).`,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error('Analysis API Error:', error);
    return NextResponse.json({ error: 'Failed to analyze content' }, { status: 500 });
  }
}
