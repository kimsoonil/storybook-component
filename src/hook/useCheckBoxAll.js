import { useCallback, useState } from 'react';

const useCheckBoxAll = (checkboxLists) => {
  const [checkedList, setCheckedLists] = useState([]);

  const checkAll = useCallback((checked) => {
    const checkedListArray = [];
    if (checked) checkboxLists.forEach((list) => checkedListArray.push(list));
    setCheckedLists(checkedListArray);
  }, []);

  const checkOne = useCallback(
    (checked, list) => {
      let arrNew = [];
      if (checked) arrNew = [...checkedList, list];
      else arrNew = checkedList.filter((checkbox) => checkbox.id !== list.id);

      setCheckedLists(arrNew);
    },
    [checkedList]
  );
  return [checkedList, checkAll, checkOne];
};

export default useCheckBoxAll;
