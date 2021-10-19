import fs from 'fs';

const createImportLine = (routerName: string) => {
  return `import ${routerName}Router from './${routerName}';`;
}

const createNewRouterLine = (routerName: string) => {
  return `\tapp.use('/${routerName}', ${routerName}Router);`
}

export const updateApiEntryPoint = async (filePath: string, routeName: string) => {
  const entryPointData = await fs.promises.readFile(filePath, 'utf8');
  const newImportIndex = entryPointData.indexOf('\n', entryPointData.lastIndexOf('import'));
  
  const fileWithImport = `${entryPointData.slice(0, newImportIndex+1)}${createImportLine(routeName)}${'\n'}${entryPointData.slice(newImportIndex+1)}`;

  const newRouterIndex = fileWithImport.indexOf('\n', fileWithImport.lastIndexOf('app.use('));

  const fileWithRouter = `${fileWithImport.slice(0, newRouterIndex+1)}${createNewRouterLine(routeName)}${'\n'}${fileWithImport.slice(newRouterIndex+1)}`
  fs.promises.writeFile(filePath, fileWithRouter);
}

export const createApiEntryPoint = async (filePath: string) => {
  const apiEntryPointTemplate = `
  import { Express, json } from 'express';

  export const registerRouters = (app:Express)=> {
    app.use(json());
 
  }
  `;

  await fs.promises.writeFile(filePath, apiEntryPointTemplate);
}