export const createRouterMethod = (name: string, method: string) => {
  return `
  import {Request,Response} from "express";

  export const ${method}${name[0].toUpperCase()+name.slice(1)} = async (req:Request, res:Response) => {
    res.sendStatus(200);
  };
  `;
};

export const registerRouter = (name: string) => {
  const capitalizedName = `${name[0].toUpperCase()}${name.slice(1)}`;

  const body = `
  import { Router } from 'express';
  import { get${capitalizedName} } from './get';
  import { post${capitalizedName} } from './post';
  import { patch${capitalizedName} } from './patch';
  import { delete${capitalizedName} } from './delete';
  import { put${capitalizedName} } from './put';

  const router = Router();

  router.get('/', get${capitalizedName});
  router.post('/', post${capitalizedName});
  router.patch('/', patch${capitalizedName});
  router.delete('/', delete${capitalizedName});
  router.put('/', put${capitalizedName});

  export default router; 
  `;

  return body;
}