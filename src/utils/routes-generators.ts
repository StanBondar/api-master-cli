import { CONFIG } from './constants';


export const createRouterMethod = (name: string, method: string) => {
	return `
  import {Request,Response} from 'express';

  export const ${method}${name[0].toUpperCase()+name.slice(1)} = async (req:Request, res:Response) => {
    res.sendStatus(200);
  };
  `;
};

export const registerRouter = (name: string) => {
	const capitalizedName = `${name[0].toUpperCase()}${name.slice(1)}`;

	const getImportMethod = (requestType: string) => {
		return `import { ${requestType}${capitalizedName} } from './${requestType}';\n`;
	};

	const getRouteHandler = (requestType: string) => {
		return `router.${requestType}('/', ${requestType}${capitalizedName});\n`;
	};

	const allRouterImports = CONFIG.methods.map(el => getImportMethod(el));
	const allRouteHandlers = CONFIG.methods.map(el => getRouteHandler(el));

	const body = `
import { Router } from 'express';
${allRouterImports.join('')}

const router = Router();

${allRouteHandlers.join('')}

export default router; 
  `;

	return body;
};