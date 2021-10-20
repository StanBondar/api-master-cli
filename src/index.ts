#!/usr/bin/env node

import chalk from 'chalk';
import { createConfig } from './utils/create-config';
import {createRouteStructure} from './utils/create-route';

if(process.argv.length > 2) {
	createConfig();
	// createRouteStructure();
}else {
	console.log(chalk.red('Please, provide route name'));
}
