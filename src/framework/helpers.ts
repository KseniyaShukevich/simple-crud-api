import RequestMethods from './http/RequestMethods';

const getRouteMask = (path?: string, method?: RequestMethods | string): string => {
  const parsedUrl = path?.split('/');
  let newPath: string | undefined = '';

  if (parsedUrl) {
    const [,, route, id] = parsedUrl;

    newPath = id ? `/api/${route}/:id` : `/api/${route}/`;
  }

  return `[${newPath}]:[${method}]`;
};

export {
  getRouteMask,
};
