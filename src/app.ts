import { getImagePaths } from './cli';
import { resize } from './resize';

const imagePaths = getImagePaths();

const main = () => {
  for (const imagePath of imagePaths) {
    resize(imagePath);
  }
};

main();
