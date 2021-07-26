export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const loadImg = new Image();
    loadImg.onload = () => resolve();
    loadImg.onerror = reject;
    loadImg.src = src;
  });
}

export default preloadImage;
