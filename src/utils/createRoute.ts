import fs from 'fs';
import path from "path";
import {defineCorrectPathToSource} from './defineCorrectPaths';

export const createRouteStructure = async (name: string) => {
  // const targetPath = path.join(process.cwd(), 'api', name);
  const sourcePath = await defineCorrectPathToSource();
  const targetPath = path.join(sourcePath, 'api', name);
  
  if(fs.existsSync(path.join(sourcePath, 'api'))){
    if(fs.existsSync(path.join(sourcePath, 'api', name))){
      // TODO write file
    }else {
      // TODO mkdir route dir
    }
  }else {
    // TODO create api and route dir
  }

  // TODO separate this to func
  try{
    await fs.promises.writeFile(`${targetPath}/index.ts`, `hello dolly`);
  }catch(error) {
    console.error(error);
  }
}