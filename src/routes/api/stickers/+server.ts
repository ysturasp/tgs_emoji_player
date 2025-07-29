import { json } from '@sveltejs/kit';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
	try {
		const stickersPath = join(process.cwd(), 'static', 'stickers');
		const files = await readdir(stickersPath);
		
		const tgsFiles = files
			.filter(file => file.endsWith('.tgs'))
			.sort();
		
		return json(tgsFiles);
	} catch (error) {
		console.error('Error reading stickers directory:', error);
		return json([], { status: 500 });
	}
} 