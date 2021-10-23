export function preloadImage(src: string): Promise<string> {
  return new Promise((resolve) => {
    const loadImg = new Image();
    loadImg.onload = () => resolve(src);
    // we cannot handle broken images properly.
    loadImg.onerror = () => resolve(src);
    loadImg.src = src;
  });
}

export default preloadImage;
