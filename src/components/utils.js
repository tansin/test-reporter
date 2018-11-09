export const colors = {
  black: '#5e5e5e',
  green: '#5cb85c',
  red: '#d9534f',
  orange: '#f0ad4e',
  blue: '#5bc0de',
  lightGray: '#f8f8f8',
  gray: '#e7e7e7',
};

export const symbols = {
  passed: {char: '✔', bgColor: colors.green},
  failed: {char: '✖', bgColor: colors.red},
  pending: {char: '…', bgColor: colors.orange},
  excluded: {char: '-', bgColor: colors.orange},
  stopwatch: {char: '◷', bgColor: colors.blue},
  stopwatch2: {char: '⏱', bgColor: colors.blue},
  camera: {char: '📷', bgColor: colors.blue},
};

export function handlePlural(thing, amount) {
  return amount + ' ' + thing + (amount === 1 ? '' : 's')
}

export function capitalize(word) {
  if (word.length > 0)
    return word.substring(0,1).toUpperCase() + word.substring(1);
  else
    return word;
}

export function getHashCode(str) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
