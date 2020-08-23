import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';

import { getPath } from './file';

export const compress = async (
  imagePath: string,
  options: {
    quality: number;
  } = {
    quality: 75,
  }
) => {
  const { filename, dirname, extension } = getPath(imagePath);

  const outputPath = `${dirname}/${filename}${extension}`;

  await imagemin([imagePath], {
    destination: `${dirname}`,
    plugins: [
      imageminMozjpeg({
        quality: options.quality,
      }),
    ],
  });

  return outputPath;
};
