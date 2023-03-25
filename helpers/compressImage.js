import sharp from "sharp";

const compressImage = async (base64Image) => {
  const buffer = Buffer.from(base64Image, "base64");
  const compressedImageBuffer = await sharp(buffer)
    .webp({ quality: 80 })
    .toBuffer(); // compress the image using sharp and convert to webP format
  return compressedImageBuffer;
};

export default compressImage;
