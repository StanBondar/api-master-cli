import { CONFIG, METHODS } from './constants';
import { defineTargetPathRecursively } from './define-correct-paths';
import pluralize from 'pluralize';
import chalk from 'chalk';

export const createConfig = async () => {
	const args = process.argv.slice(2).map(el => el.toLowerCase());
	const [routeName = '', methods = ''] = args;

	if(!routeName) {
		throw new Error('Please, provide route name');
	}

	CONFIG.routeName = (args.includes('-s') || pluralize.isPlural(routeName)) ? routeName : pluralize(routeName);

	const defaultMethods = Object.values(METHODS);
	const userMethods = defaultMethods.filter(el => methods.includes(el));
	if(userMethods.length){
		CONFIG.methods = userMethods;
	}else {
		methods.length && console.log(chalk.red('Correct method. All available methods templates will be created'));
	}

	CONFIG.srcPath = await defineTargetPathRecursively();
};