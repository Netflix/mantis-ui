export function pluralize(number, singularString, pluralString) {
  const plural = pluralString || singularString + 's';
  return number === 1 ? singularString : plural;
}
