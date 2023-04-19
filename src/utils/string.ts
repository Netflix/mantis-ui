export function pluralize(num: number, singular: string, plural?: string) {
  const pluralString = plural ?? `${singular}s`;
  return num === 1 ? singular : pluralString;
}

export function getUtcFromEpoch(epoch: number) {
  if (epoch == 0) return '--';
  return new Date(epoch).toDateString();
}
