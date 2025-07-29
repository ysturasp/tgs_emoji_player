import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';

async function generateStickersList() {
	try {
		const stickersPath = join(process.cwd(), 'static', 'stickers');
		const files = await readdir(stickersPath);
		
		const tgsFiles = files
			.filter(file => file.endsWith('.tgs'))
			.sort();
		
		const outputPath = join(process.cwd(), 'src', 'lib', 'stickers-list.json');
		await writeFile(outputPath, JSON.stringify(tgsFiles, null, 2));
		
		console.log(`Generated stickers list with ${tgsFiles.length} files`);
	} catch (error) {
		console.error('Error generating stickers list:', error);
		process.exit(1);
	}
}

generateStickersList(); 