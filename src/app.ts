import cliProgress from 'cli-progress';
import { resize } from './resize';
import { compress } from './compress';
import { getImagePaths, getOptions } from './cli';

const options = getOptions();
const imagePaths = getImagePaths();
const numberOfImage = imagePaths.length;

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);

const main = async () => {
  progressBar.start(numberOfImage, 0);

  for (let i = 0; i < numberOfImage; i++) {
    const imagePath = imagePaths[i];

    const resizedFile = await resize(imagePath, options.resizeRate);

    if (options.compress) {
      await compress(resizedFile, {
        quality: options.quality,
      });
    }

    progressBar.update(i + 1);
  }

  progressBar.stop();
  console.log('Finished!');
};

main();
