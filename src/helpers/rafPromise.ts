export function rafPromise() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(resolve);
  });
}
