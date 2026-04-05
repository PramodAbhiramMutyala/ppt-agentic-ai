import { NextResponse } from "next/server";

interface ChatRequestBody {
  prompt?: string;
}

/**
 * Build a simple slide outline from user text for downstream PPT generation.
 */
function buildOutline(prompt: string): string[] {
  const topic = prompt.trim() || "Untitled Topic";
  return [
    `Introduction to ${topic}`,
    `Core Ideas of ${topic}`,
    `Key Examples for ${topic}`,
    `Challenges in ${topic}`,
    `Wrap-up and Next Steps`,
  ];
}

/**
 * Return a concise assistant response and structured outline for PPT creation.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as ChatRequestBody;
  const prompt = (body.prompt ?? "").trim();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  const outline = buildOutline(prompt);
  const reply = `Great choice. I prepared a ${outline.length}-slide structure for "${prompt}" and started generating your presentation.`;

  return NextResponse.json({ reply, outline });
}
