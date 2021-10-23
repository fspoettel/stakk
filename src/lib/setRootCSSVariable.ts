export default function setRootCSSVariable(name: string, value: string | null): void {
  if (value) {
    document.documentElement.style.setProperty(name, value);
  }
}
