import { resize } from './resize';
import { compress } from './compress';
import { getImagePaths, getOptions } from './cli';

const options = getOptions();
const imagePaths = getImagePaths();

const main = async () => {
  for (const imagePath of imagePaths) {
    const resizedFile = await resize(imagePath, options.resizeRate);

    if (options.compress) {
      compress(resizedFile, {
        quality: options.quality,
      });
    }
  }
};

main();
