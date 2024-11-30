function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 10);

function checkPalindrome (string) {
  string = string.replaceAll(' ','').toLowerCase();
  let invertedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    invertedString += string[i];
  }
  return invertedString === string;
}

checkPalindrome('Топот');

function extractNumbers (string) {
  string = String(string);
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}

extractNumbers('1 кефир, 0.5 батона');
