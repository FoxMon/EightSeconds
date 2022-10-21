import imageCompression from "browser-image-compression";

// 용량제한 3MB
interface ImageResizeOptionType {
  maxSizeMB: number;
  maxWidthOrHeight: number;
}

const staticOption: ImageResizeOptionType = {
  maxSizeMB: 3,
  maxWidthOrHeight: 480,
};

export async function imageResize(imgFile: File): Promise<Blob> {
  // compressed 성공 시 type은 Blob
  // maxSizeMB보다 작아짐
  const compressed = await imageCompression(imgFile, staticOption);
  if (!compressed) throw new Error("Image comporess fail");
  return compressed;
}
