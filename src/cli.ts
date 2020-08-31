import yargs from 'yargs';

const args = yargs.argv;

type Options = {
  compress: boolean;
  quality: number;
  resizeRate: number | undefined;
};

const options: Options = {
  compress: args.compress !== undefined ? args.compress === true : true,
  quality: args.quality !== undefined ? Number(args.quality) : 75,
  resizeRate:
    args['resize-rate'] !== undefined ? Number(args['resize-rate']) : undefined,
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
