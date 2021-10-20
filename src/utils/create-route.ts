import fs from 'fs';
import path from 'path';
import { METHODS } from './constants';
import {defineCorrectPathToSource} from './define-correct-paths';
import { createRouterMethod, registerRouter } from './routes-generators';
import { createApiEntryPoint, updateApiEntryPoint } from './update-api-entry-point';
import {CONFIG} from './config';
import chalk from 'chalk';

// const methods = ['delete', 'get', 'patch', 'put', 'post'];
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
	const {route_name} = CONFIG;
	const sourcePath = await defineCorrectPathToSource() || '';
	const targetPath = path.join(sourcePath, 'api', route_name);

	await fs.promises.mkdir(targetPath, {recursive: true});
	await createRouteEntryPoint(route_name, targetPath);
	if(!fs.existsSync(path.join(sourcePath, 'api', 'index.ts'))) {
		await createApiEntryPoint(path.join(sourcePath, 'api', 'index.ts'));
	}
	updateApiEntryPoint(path.join(sourcePath, 'api', 'index.ts'), route_name);
};