import path from 'path';
import fs from 'fs';

export const defineCorrectPathToSource = async () => {
  const cwd = process.cwd();
  if(cwd.indexOf('src') >= 0){
    const pathToApi = `${cwd.substring(0, cwd.indexOf('src'))}src`;
    return pathToApi;
  }else {
    const cwdFilling = await fs.promises.readdir(process.cwd());
    if(cwdFilling.includes('src')){
      const pathToApi = `${cwd}/src`;
      return pathToApi;
    }else {
      console.error('Please move to correct project directory');
    }
  }
}