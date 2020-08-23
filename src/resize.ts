import sharp from 'sharp';
import * as path from 'path';

export const resize = async (imagePath: string): Promise<string> => {
  const imageDirname = path.dirname(imagePath);
  const imageExtension = path.extname(imagePath);
  const imageFilename = path.basename(imagePath, imageExtension);

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
        `[${imageFilename}${imageExtension}] Reducing width by ${resizeRate} times...`
      );

      const outputPath = `${imageDirname}/${imageFilename}-resized${imageExtension}`;

      sharp(imagePath)
        .resize(Math.round(width / resizeRate))
        .toFile(`${imageDirname}/${imageFilename}-resized${imageExtension}`)
        .then(() => {
          console.log(`[${imageFilename}${imageExtension}] Finished!`);
        });

      return outputPath;
    } else {
      throw new Error(`[${imageFilename}${imageExtension}] No dimension data`);
    }
  } catch (error) {
    throw new Error(
      `[${imageFilename}${imageExtension}] Something went wrong: ${error}`
    );
  }
};
