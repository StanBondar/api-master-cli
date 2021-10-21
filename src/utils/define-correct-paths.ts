import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { CONFIG } from './constants';

export const defineTargetPathRecursively = async (location = '') => {
	const cwd = location.length > 0 ? location : process.cwd();
	if(cwd === '/') {
		console.log(chalk.red('Please go to your project directory'));
		return;
	}
	if(cwd.indexOf('src') >= 0) {
		CONFIG.srcPath = `${cwd.substring(0, cwd.indexOf('src'))}src`;
		return;
	}else{
		const itemsInCwd = await fs.promises.readdir(cwd);
		if(itemsInCwd.includes('src') && itemsInCwd.includes('package.json')){
			CONFIG.srcPath = path.join(cwd, 'src');
			return;
		}else {
			const levelUpLocation = path.join(cwd, '../');
			await defineTargetPathRecursively(levelUpLocation);
		}
	}
};