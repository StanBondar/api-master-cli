export enum METHODS {
  GET='get',
  POST= 'post',
  PATCH='patch',
  PUT='put',
  DELETE='delete', 
}

export const CONFIG = {
	route_name: '',
	methods: Object.values(METHODS) as string[],
	srcPath: ''
};