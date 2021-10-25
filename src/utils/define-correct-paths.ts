import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { CONFIG } from './constants';

export const defineTargetPathRecursively = async (cwd:string = process.cwd()) => {
	if(cwd === '/') {
		console.log(chalk.red('Please go to your project directory'));
		return;
	}
	if(cwd.indexOf('src') >= 0) {
		CONFIG.srcPath = `${cwd.substring(0, cwd.indexOf('src'))}src`;
		return;
	}
	const itemsInCwd = await fs.promises.readdir(cwd);
	if(itemsInCwd.includes('src') && itemsInCwd.includes('package.json')){
		CONFIG.srcPath = path.join(cwd, 'src');
		return;
	}
	const levelUpLocation = path.join(cwd, '../');
	await defineTargetPathRecursively(levelUpLocation);
};