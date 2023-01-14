import RequestMethods from './requestMethods';

const getRouteMask = (path?: string, method?: RequestMethods | string): string => `[${path}]:[${method}]`;

export {
  getRouteMask,
};
