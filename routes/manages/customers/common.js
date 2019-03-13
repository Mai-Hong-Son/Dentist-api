import sharp from 'sharp';

export const resizeImage = (input) => {
  return sharp(input).resize(600).png();
}