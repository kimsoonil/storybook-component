import React, { useRef, useState } from 'react';
import 'assets/scss/_base.scss';

const FilePicker = ({ state, setState, children, tabIndex, type, multiple, ...props }) => {
  const inputFileRef = useRef();
  const onClick = (e) => {
    inputFileRef.current.click();
  };
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputFileRef.current.click();
    }
  };

  const onChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let _file = e.target.files[0];
    reader.onloadend = () => {
      setState({ file: _file, data: reader.result });
    };
    reader.readAsDataURL(_file);
  };

  const accept = type === 'image' ? 'image/*' : '';

  return (
    <div className="flex w-ih h-ih" tabIndex={tabIndex} onKeyDown={onKeyDown}>
      <input
        type={'file'}
        ref={inputFileRef}
        className="jg-hidden "
        multiple={multiple}
        accept={accept}
        onChange={onChange}
      />
      <div onClick={onClick}>{children}</div>
    </div>
  );
};

export default FilePicker;
