// import { Config } from '../entities/config.entity';
import { CONFIG, METHODS } from './constants';
import { defineTargetPathRecursively } from './define-correct-paths';
import pluralize from 'pluralize';
import chalk from 'chalk';

// export const CONFIG: Config = new Config('');

export const createConfig = async () => {
	const args = process.argv.slice(2);
	CONFIG.route_name = pluralize(args[0]);
	if(args.length>1) {
		const userMethods = args[1].split('-').filter(el => Object.values(METHODS).includes(el.toLowerCase() as METHODS));
		if(userMethods.length) {
			CONFIG.methods = userMethods;
		}else{
			console.log(chalk.red('Incorrect methods provided. All available methods templates will be created'));
		}
	}
	await defineTargetPathRecursively();
};