export function isStringValidFloat(str: string): boolean {
  return !isNaN(parseFloat(str));
}