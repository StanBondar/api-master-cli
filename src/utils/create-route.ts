import fs from 'fs';
import path from 'path';
import { createRouterMethod, registerRouter } from './routes-generators';
import { createApiEntryPoint, updateApiEntryPoint } from './update-api-entry-point';
import {CONFIG} from './constants';
import chalk from 'chalk';

export const createRouteEntryPoint = async (routeName: string, path: string) => {
	try{
		await Promise.all(CONFIG.methods.map(el => fs.promises.writeFile(`${path}/${el}.ts`, createRouterMethod(routeName, el))));
		await fs.promises.writeFile(`${path}/index.ts`, registerRouter(routeName));
	}catch(error) {
		console.log(chalk.red(error));
	}
};

export const createRouteStructure = async () => {
	const {routeName, srcPath} = CONFIG;
	const targetPath = path.join(srcPath, 'api', routeName);

	if(fs.existsSync(targetPath)){
		console.log(chalk.red('Chosen route already exists. Please check your api folder and try to create another one.'));
		return;
	}

	await fs.promises.mkdir(targetPath, {recursive: true});
	await createRouteEntryPoint(routeName, targetPath);
	if(!fs.existsSync(path.join(srcPath, 'api', 'index.ts'))) {
		await createApiEntryPoint(path.join(srcPath, 'api', 'index.ts'));
	}
	updateApiEntryPoint(path.join(srcPath, 'api', 'index.ts'), routeName);
};