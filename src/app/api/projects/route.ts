import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'projects', 'projects.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const projects = JSON.parse(fileContents);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading projects.json:', error);
    return NextResponse.json({ error: 'Failed to load projects data' }, { status: 500 });
  }
}