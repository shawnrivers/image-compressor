import yargs from 'yargs';

const args = yargs.argv;
const compressArg = args.compress;
const resizeRateArg = Number(args['resize-rate']);
const qualityArg = Number(args.quality);

type Options = {
  compress: boolean;
  quality: number;
  resizeRate: number | undefined;
};

const options: Options = {
  compress: compressArg !== false,
  quality: qualityArg !== NaN ? qualityArg : 75,
  resizeRate: resizeRateArg !== NaN ? resizeRateArg : undefined,
};

export const getOptions = (): Options => {
  if (options.quality > 100 || options.quality < 1) {
    throw new Error('"quality" must be an int between [0, 100]');
  }

  if (options.resizeRate) {
    if (options.resizeRate < 0) {
      throw new Error('"resize-rate" must be a number larger than 1');
    }
  }

  return options;
};

export const getImagePaths = () => {
  return args._;
};
