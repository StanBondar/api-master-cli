import fs from 'fs';
import path from 'path';
import { METHODS } from './constants';
import {defineCorrectPathToSource} from './define-correct-paths';
import { createRouterMethod, registerRouter } from './routes-generators';
import { createApiEntryPoint, updateApiEntryPoint } from './update-api-entry-point';
import {CONFIG} from './constants';
import chalk from 'chalk';

const methods = Object.values(METHODS);

export const createRouteEntryPoint = async (routeName: string, path: string) => {
	try{
		await Promise.all(methods.map(el => fs.promises.writeFile(`${path}/${el}.ts`, createRouterMethod(routeName, el))));
		await fs.promises.writeFile(`${path}/index.ts`, registerRouter(routeName));
	}catch(error) {
		console.log(chalk.red(error));
	}
};

export const createRouteStructure = async () => {
	const {route_name, srcPath} = CONFIG;
	const targetPath = path.join(srcPath, 'api', route_name);

	await fs.promises.mkdir(targetPath, {recursive: true});
	await createRouteEntryPoint(route_name, targetPath);
	if(!fs.existsSync(path.join(srcPath, 'api', 'index.ts'))) {
		await createApiEntryPoint(path.join(srcPath, 'api', 'index.ts'));
	}
	updateApiEntryPoint(path.join(srcPath, 'api', 'index.ts'), route_name);
};