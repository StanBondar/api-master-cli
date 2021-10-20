import { Config } from '../entities/config.entity';
import { METHODS } from './constants';

export const CONFIG: Config = new Config('');

export const createConfig = () => {
	const args = process.argv.slice(2);
	CONFIG.route_name = args[0];
	if(args.length>1) {
		const userMethods = args[1].split('-').filter(el => Object.values(METHODS).includes(el.toLowerCase() as METHODS));
    
		console.log(userMethods);
	}
};