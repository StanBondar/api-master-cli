// import { Config } from '../entities/config.entity';
import { CONFIG, METHODS } from './constants';
import { defineTargetPathRecursively } from './define-correct-paths';

// export const CONFIG: Config = new Config('');

export const createConfig = async () => {
	const args = process.argv.slice(2);
	CONFIG.route_name = args[0];
	if(args.length>1) {
		const userMethods = args[1].split('-').filter(el => Object.values(METHODS).includes(el.toLowerCase() as METHODS));
		if(userMethods.length) {
			CONFIG.methods = userMethods;
		}
	}
	await defineTargetPathRecursively();
};