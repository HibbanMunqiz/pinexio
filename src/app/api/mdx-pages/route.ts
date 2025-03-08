import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content'))
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''));

  return NextResponse.json(files);
}
