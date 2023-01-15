import RequestMethods from './requestMethods';

const getRouteMask = (path?: string, method?: RequestMethods | string): string => {
  const parsedUrl = path?.split('/');
  let newPath: string | undefined = '';

  if (parsedUrl) {
    const [, route, id] = parsedUrl;

    newPath = id ? `/${route}/:id` : path;
  }

  return `[${newPath}]:[${method}]`;
};

export {
  getRouteMask,
};
