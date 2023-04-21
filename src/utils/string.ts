export function pluralize(num: number, singular: string, plural?: string) {
  const pluralString = plural ?? `${singular}s`;
  return num === 1 ? singular : pluralString;
}
