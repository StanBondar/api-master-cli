#!/usr/bin/env node

import {createRouteStructure} from './utils/create-route';

if(process.argv.length > 2) {
	createRouteStructure(process.argv[2]);
}else {
	console.error('Please, provide route name');
}
