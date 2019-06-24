export default function formatNumberWithCommas(num) {
  let formattedNumber = num;
  while (/(\d+)(\d{3})/.test(formattedNumber.toString())) {
    formattedNumber = formattedNumber
      .toString()
      .replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }
  return formattedNumber;
}
