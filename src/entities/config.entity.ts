import { METHODS } from '../utils/constants';

export class Config {
	route_name: string;
	methods: string[];
	srcPath: string;

	constructor(route_name: string, methods: string[] = Object.values(METHODS), srcPath = '') {
		this.methods = methods;
		this.route_name = route_name;
		this.srcPath = srcPath;
	}
}