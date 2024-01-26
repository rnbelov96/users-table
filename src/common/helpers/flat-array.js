export const flatArray = (arr, deepKey) => {
  const flattenArray = [];

  const flat = (array, level, parentId) => {
    array.forEach((el) => {
      const objCopy = JSON.parse(JSON.stringify(el));
      objCopy.level = level;
      if (parentId) {
        objCopy.parentId = parentId;
      }
      flattenArray.push(objCopy);
      if (el[deepKey]) {
        flat(el[deepKey], level + 1, el.id);
      }
    });
  };

  flat(arr, 0);

  return flattenArray;
};
