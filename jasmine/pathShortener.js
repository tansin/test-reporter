/**
 * Shortens all __specFilePath in the array of @suites removing the common root part.
 * @param suites: array of suites.
 */
function shortenSpecFilePaths(suites) {
  let shortestCommonLength = findShortestCommonPathLength(suites);
  if (shortestCommonLength === 0)
    return;

  suites.forEach(suite => {
    let path = suite.__specFilePath;
    if (path && path.length > shortestCommonLength)
      suite.__specFilePath = path.substring(shortestCommonLength - 1);
  });
}

function findShortestCommonPathLength(suites) {
  if (!suites || !suites.length)
    return 0;

  let pathWithShortestCommonPart = '';
  let shortestCommonLength = 0;

  suites.forEach(suite => {
    const path = suite.__specFilePath || '';

    if (!path)
      return;

    if (!pathWithShortestCommonPart) {
      pathWithShortestCommonPart = path;
      shortestCommonLength = path.length;
    }

    const length = findShortestCommonLength(path, pathWithShortestCommonPart);

    if (length < shortestCommonLength) {
      shortestCommonLength = length;
      pathWithShortestCommonPart = path;
    }
  });

  return shortestCommonLength;
}

/**
 * Returns shortest length until which @a and @b is the same.
 * @param a: string or array.
 * @param b: string or array.
 * @returns {*} number: one-based length.
 */
function findShortestCommonLength(a, b) {
  if (Math.min(a.length, b.length) === 0) return 0;
  if (a === b) return a.length;
  let i = 0;
  while (a[i] === b[i]) i++;
  return i + 1;
}

module.exports.shortenSpecFilePaths = shortenSpecFilePaths;