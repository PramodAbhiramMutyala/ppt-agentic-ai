import { NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";

export const runtime = "nodejs";

interface PptRequestBody {
  prompt?: string;
  outline?: string[];
}

/**
 * Ensure output filename is safe for content-disposition headers.
 */
function toSafeFileName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 50);
}

/**
 * Convert outline text into 3 bullet points for each slide.
 */
function toBullets(title: string): string[] {
  return [
    `${title}: what it means`,
    `${title}: why it matters`,
    `${title}: practical takeaway`,
  ];
}

/**
 * Generate a pptx file and stream it to the browser for download.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as PptRequestBody;
  const prompt = (body.prompt ?? "").trim() || "Presentation";
  const outline = Array.isArray(body.outline) && body.outline.length > 0 ? body.outline : [
    "Introduction",
    "Key Points",
    "Examples",
    "Summary",
  ];

  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "PPT Chat Assistant";
  pptx.subject = prompt;
  pptx.title = prompt;

  const titleSlide = pptx.addSlide();
  titleSlide.addText(prompt, {
    x: 0.6,
    y: 1.5,
    w: 12,
    h: 1.2,
    fontSize: 34,
    bold: true,
    color: "1E293B",
  });
  titleSlide.addText("Generated from chat", {
    x: 0.6,
    y: 2.9,
    w: 6,
    h: 0.6,
    fontSize: 16,
    color: "475569",
  });

  for (const section of outline) {
    const slide = pptx.addSlide();
    slide.addText(section, {
      x: 0.6,
      y: 0.4,
      w: 12,
      h: 0.7,
      fontSize: 26,
      bold: true,
      color: "0F172A",
    });

    const bullets = toBullets(section).map((point) => ({ text: point, options: { bullet: { indent: 24 } } }));
    slide.addText(bullets, {
      x: 0.9,
      y: 1.5,
      w: 11,
      h: 4,
      fontSize: 18,
      color: "1F2937",
      breakLine: true,
    });
  }

  const buffer = (await pptx.write({ outputType: "nodebuffer" })) as Buffer;
  const bytes = new Uint8Array(buffer);
  const baseName = toSafeFileName(prompt) || "presentation";
  const fileName = `${baseName}.pptx`;

  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
