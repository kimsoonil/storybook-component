import { useEffect, useState } from 'react';

const useDetectClose = (elem, initialState, onClickOutside) => {
  const [isOpen, setOpen] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (elem.current !== null && !elem.current.contains(e.target)) {
        setOpen(false);
        onClickOutside?.();
      }
    };

    if (isOpen) {
      window.addEventListener('click', onClick, { capture: true });
      // window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick, { capture: true });
      // window.removeEventListener('click', onClick);
    };
  }, [isOpen]);

  return [isOpen, setOpen];
};

export default useDetectClose;
