export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const loadImg = new Image();
    loadImg.src = src;
    loadImg.onload = () => resolve();
    loadImg.onerror = reject;
  });
}

export default preloadImage;
