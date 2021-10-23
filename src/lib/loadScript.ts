function loadScript<T>(src: string, external: T | undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    if (external) return resolve();

    const script = document.createElement('script');
    script.onload = () => resolve();
    script.onerror = reject;
    script.src = src;
    document.head.appendChild(script);
  });
}

export default loadScript;
