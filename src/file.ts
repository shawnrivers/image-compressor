import * as path from 'path';

export const getPath = (pathname: string) => {
  const dirname = path.dirname(pathname);
  const extension = path.extname(pathname);
  const filename = path.basename(pathname, extension);

  return { dirname, extension, filename };
};
