import sharp from 'sharp';
import { getPath } from './file';

export const resize = async (imagePath: string): Promise<string> => {
  const { filename, dirname, extension } = getPath(imagePath);

  try {
    const metaData = await sharp(imagePath).metadata();
    const { width, height } = metaData;

    if (width !== undefined && height !== undefined) {
      let resizeRate = 1;
      const size = Math.min(width, height);

      for (let i = 1; i < 10; i++) {
        if (size / i <= 2000 && size / i >= 1000) {
          resizeRate = i;
          break;
        }
      }

      console.log(
        `[${filename}${extension}] Reducing width by ${resizeRate} times...`
      );

      const outputPath = `${dirname}/${filename}-resized${extension}`;

      sharp(imagePath)
        .resize(Math.round(width / resizeRate))
        .toFile(`${dirname}/${filename}-resized${extension}`)
        .then(() => {
          console.log(`[${filename}${extension}] Finished!`);
        });

      return outputPath;
    } else {
      throw new Error(`[${filename}${extension}] No dimension data`);
    }
  } catch (error) {
    throw new Error(`[${filename}${extension}] Something went wrong: ${error}`);
  }
};
