export function parse(queryString = '') {
  const qs = queryString.trim().replace(/^[?#&]/, '');
  const queryObject = {};

  if (!qs) {
		return queryObject;
  }

  for (const param of qs.split('&')) {
		let [key, value] = splitOnFirstOccurrence(param, '=');
		value = (value === undefined) ? null : value;

    queryObject[key] = value;
  }

  return queryObject;
}

export function splitOnFirstOccurrence(string, separator) {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new Error('Expected both arguments to be of type string');
  }

  if (separator === '') {
    return string;
  }

  const separatorIndex = string.indexOf(separator);
  if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
  ];
}

export function replaceQueryString(queryString, key, value) {
  const queryObject = parse(queryString);

  queryObject[key] = value;

  return stringify(queryObject);
}

export function stringify(queryObject) {
  const keys = Object.keys(queryObject);

  return keys.map(key => {
		const value = queryObject[key];

		if (value === undefined || value === '') {
			return '';
		}

		return `${key}=${value}`;
	}).filter(x => x.length > 0).join('&');
}
