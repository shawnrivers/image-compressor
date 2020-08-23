import { getImagePaths } from './cli';
import { resize } from './resize';
import { compress } from './compress';

const imagePaths = getImagePaths();

const main = async () => {
  for (const imagePath of imagePaths) {
    const resizedFile = await resize(imagePath);
    compress(resizedFile, {
      quality: 75,
    });
  }
};

main();
