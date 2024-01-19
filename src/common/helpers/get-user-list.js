export const getUserList = (array) => {
  const list = [];


  const setUsers = (arr) => {
    arr.forEach((el) => {
      list.push(el);

      if (el.users) {
        setUsers(el.users);
      }
    });
  };

  setUsers(array);

  return list;
};
