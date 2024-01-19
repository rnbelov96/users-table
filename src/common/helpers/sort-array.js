export const sortArray = (array, options, deepKey) => {
  if (!options.key) {
    return array;
  }
  const newArray = array.toSorted((a, b) => {
    const modifiedA = String(a[options.key]).toLowerCase();
    const modifiedB = String(b[options.key]).toLowerCase();

    if (options.direction === 'ASC') {
      return modifiedA > modifiedB ? 1 : modifiedB > modifiedA ? -1 : 0;
    }

    return modifiedA > modifiedB ? -1 : modifiedB > modifiedA ? 1 : 0;
  });

  newArray.forEach((el) => {
    if (el[deepKey]) {
      el[deepKey] = sortArray(el[deepKey], options, deepKey);
    }
  });

  return newArray;
};
