import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'favorites', 'games.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const games = JSON.parse(fileContents);
    return NextResponse.json(games);
  } catch (error) {
    console.error('Error reading games.json:', error);
    return NextResponse.json({ error: 'Failed to load game data' }, { status: 500 });
  }
}