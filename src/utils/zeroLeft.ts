export default function (n: number): string {
  return Math.floor(n).toString().padStart(2, '0');
}
