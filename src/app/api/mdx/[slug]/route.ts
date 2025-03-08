// src/app/api/mdx/[slug]/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { evaluateSync } from "@mdx-js/mdx";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const filePath = path.join(process.cwd(), "src/content", `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Cast the options as any to allow outputFormat
  const code = evaluateSync(fileContent, {
    outputFormat: "function-body"
  } as any);

  return NextResponse.json({ code });
}
