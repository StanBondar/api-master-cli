import fs from 'fs';
import path from "path";
import {defineCorrectPathToSource} from './define-correct-paths';
import { createRouterMethod, registerRouter } from './routes-generators';
import { createApiEntryPoint, updateApiEntryPoint } from './update-api-entry-point';

const methods = ['delete', 'get', 'patch', 'put', 'post'];

export const createRouteEntryPoint = async (routeName: string, path: string) => {
  try{
    await Promise.all(methods.map(el => fs.promises.writeFile(`${path}/${el}.ts`, createRouterMethod(routeName, el))));
    await fs.promises.writeFile(`${path}/index.ts`, registerRouter(routeName));
  }catch(error) {
    console.error(error);
  }
};

export const createRouteStructure = async (name: string) => {
  const sourcePath = await defineCorrectPathToSource() || '';
  const targetPath = path.join(sourcePath, 'api', name);

  await fs.promises.mkdir(targetPath, {recursive: true});
  await createRouteEntryPoint(name, targetPath);
  if(!fs.existsSync(path.join(sourcePath, 'api', 'index.ts'))) await createApiEntryPoint(path.join(sourcePath, 'api', 'index.ts'));
  updateApiEntryPoint(path.join(sourcePath, 'api', 'index.ts'), name);
  
  // if(fs.existsSync(path.join(sourcePath, 'api'))){
  //   if(fs.existsSync(path.join(sourcePath, 'api', name))){
  //     createRouteEntry(name, targetPath);
  //   }else {
  //     fs.promises.mkdir(path.join(sourcePath, 'api', name)).then(res => {
  //       createRouteEntry(name, targetPath);
  //     })
  //   }
  // }else {
  //   fs.promises.mkdir(path.join(sourcePath, 'api', name), {recursive: true}).then(res => {
  //     createRouteEntry(name, targetPath);
  //   })
  // }
}