import { sleep } from "./sleep";

export async function preloadImg(
  src: string
): Promise<string> {
  if (src.includes("169")) await sleep(4000);
  return new Promise<string>(resolve => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      canvas.getContext("2d")!.drawImage(image, 0, 0);

      const newSrc = canvas.toDataURL("image/png");
      resolve(newSrc);
    };
    image.src = src;
  });
}
