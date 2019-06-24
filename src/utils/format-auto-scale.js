export function autoScaleString(policyName) {
  let returnString = '';
  if (typeof policyName === 'undefined' || policyName === '') {
    return '';
  }
  switch (policyName) {
    case 'CPU':
    case 'Memory':
    case 'Network':
    case 'DataDrop':
      returnString = 'Percent';
      break;
    case 'KafkaLag':
    case 'UserDefined':
      returnString = 'At';
      break;
    default:
      console.debug(
        'autoscale-string helper - unknown autoscale policy [' +
          policyName +
          ']',
      );
      break;
  }
  return returnString;
}

export function autoScalePercentOrNot(policyName) {
  let returnString = '';
  if (typeof policyName === 'undefined' || policyName === '') {
    return '';
  }
  switch (policyName) {
    case 'CPU':
    case 'Memory':
    case 'Network':
    case 'DataDrop':
      returnString = '%';
      break;
    case 'KafkaLag':
    case 'UserDefined':
      returnString = '';
      break;
    default:
      console.debug(
        'autoscale-percent-or-not helper - unknown autoscale policy [' +
          policyName +
          ']',
      );
      break;
  }
  return returnString;
}
