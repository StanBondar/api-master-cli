import { METHODS } from '../utils/constants';

export class Config {
	route_name: string;
	methods: string[];

	constructor(route_name: string, methods: string[] = Object.values(METHODS)) {
		this.methods = methods;
		this.route_name = route_name;
	}
}