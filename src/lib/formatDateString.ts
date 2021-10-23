function formatDateString(timestamp: number | string) {
  const date = new Date(timestamp);
  const month = `${date.getUTCMonth() + 1}`.padStart(2, '0');
  const year = `${date.getUTCFullYear()}`.substring(2);
  return `${month}.${year}`;
}

export default formatDateString;
