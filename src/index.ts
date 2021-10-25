#!/usr/bin/env node

import chalk from 'chalk';
import { createConfig } from './utils/create-config';
import {createRouteStructure} from './utils/create-route';

const initCli = async () => {
	try{
		await	createConfig();
		await createRouteStructure();
	}catch(err) {
		console.log(chalk.red(err));
	}
};

initCli();