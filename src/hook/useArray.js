import { useState } from 'react';

export default function useArray(initVal) {
  const [array, setArray] = useState(initVal);

  function pushArray(element) {
    setArray((item) => [...item, element]);
  }

  function delArray(index) {
    setArray((item) => item.filter(index));
  }

  function updateArray(index, val) {
    setArray((item) => item.filter(index));

    setArray((item) => [...item.slice(0, index), val, ...item.slice(index + 1, item.length - 1)]);
  }

  function removeArray(index) {
    setArray((item) => [...item.slice(0, index), ...item.slice(index + 1, item.length - 1)]);
  }

  function init() {
    setArray([]);
  }
  return {
    array,
    set: setArray,
    pushArray,
    delArray,
    updateArray,
    removeArray,
    init
  };
}
