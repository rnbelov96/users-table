export const flatArray = (arr, deepKey, expandedUsers) => {
  const flattenArray = [];

  const flat = (array, level) => {
    array.forEach((el) => {
      const objCopy = JSON.parse(JSON.stringify(el));
      objCopy.level = level;
      flattenArray.push(objCopy);
      if (el[deepKey] && expandedUsers.includes(el.id)) {
        flat(el[deepKey], level + 1);
      }
    });
  };

  flat(arr, 0);

  return flattenArray;
};
