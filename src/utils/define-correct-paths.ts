import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { CONFIG } from './constants';


export const defineCorrectPathToSource = async () => {
	const cwd = process.cwd();
	if(cwd.indexOf('src') >= 0){
		const pathToSrc = `${cwd.substring(0, cwd.indexOf('src'))}src`;
		return pathToSrc;
	}else {
		const cwdFilling = await fs.promises.readdir(process.cwd());
		if(cwdFilling.includes('src')){
			const pathToSrc = path.join(cwd, 'src');
			return pathToSrc;
		}else {
			console.log(chalk.red('Please move to correct project directory'));
		}
	}
};

export const defineTargetPathRecursively = async () => {
	const cwd = process.cwd();
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
			defineTargetPathRecursively();
		}
	}
};