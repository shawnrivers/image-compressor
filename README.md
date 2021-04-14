## Intro

A node app for compressing and resizing images

## Libraries

- `sharp` for image resizing
- `imagemin-mozjpeg` for image compression

## Usage

### Basic

1. Build
   ```shell
   npm run build
   ```
2. Run
   ```shell
   npm start <image path> -- --<flag>
   ```

### Flags

`--rate`

- decides how many times to reduce image resolution
- value: number larger than 0
  - default: by default, it will reduce the smallest dimension into a number between 1000px and 2000px
- usage:
  - e.g. `--rate=2`
  - this will resize images to half the width and size

`--compress`

- compress the image
- default: `true`
- usage:
  - `--compress`

`--quality`

- the quality of compression
- value: integer between 1 and 100. When the value is large, the image quality will be better, but the size will be larger.
  - default: `90`
- usage:
  - e.g. `--quality=80`
