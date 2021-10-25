import fs from 'fs';
import path from 'path';

export const defineTargetPathRecursively = async (cwd:string = process.cwd()): Promise<string> => {
	if(cwd === '/') {
		throw new Error('Please go to your project directory');
	}
	if(cwd.indexOf('src') >= 0) {
		return `${cwd.substring(0, cwd.indexOf('src'))}src`;
	}
	const itemsInCwd = await fs.promises.readdir(cwd);
	if(itemsInCwd.includes('src') && itemsInCwd.includes('package.json')){
		return path.join(cwd, 'src');
	}
	const levelUpLocation = path.join(cwd, '../');
	return await defineTargetPathRecursively(levelUpLocation);
};