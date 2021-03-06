import sharp from 'sharp';
import { getPath } from './file';

export const resize = async (
  imagePath: string,
  resizeRate?: number
): Promise<string> => {
  const { filename, dirname, extension } = getPath(imagePath);

  try {
    const metaData = await sharp(imagePath).metadata();
    const { width, height } = metaData;

    if (width !== undefined && height !== undefined) {
      if (resizeRate === undefined) {
        resizeRate = 1;
        const size = Math.min(width, height);

        for (let i = 1; i < 10; i++) {
          if (size / i <= 2000 && size / i >= 1000) {
            resizeRate = i;
            break;
          }
        }
      }

      const outputPath = `${dirname}/${filename}-compressed${extension}`;

      await sharp(imagePath)
        .resize(Math.round(width / resizeRate))
        .jpeg()
        .toFile(`${dirname}/${filename}-compressed.jpg`);

      return outputPath;
    } else {
      throw new Error(`[${filename}${extension}] No dimension data`);
    }
  } catch (error) {
    throw new Error(`[${filename}${extension}] Something went wrong: ${error}`);
  }
};
