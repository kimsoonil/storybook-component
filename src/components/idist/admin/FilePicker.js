/* eslint-disable */
import React, { useMemo, useRef } from 'react';

const FilePicker = ({
  setData,
  tabIndex = 0,
  accept = 'image/*',
  multiple = false,
  maxSize = { value: 0, unit: 'byte' },
  disabled,
  children,
  containerProps,
  inputProps
}) => {
  const inputFileRef = useRef();
  const unitList = useMemo(() => ['byte', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'], []);
  const onClick = () => inputFileRef.current.click();
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputFileRef.current.click();
    }
  };

  const onChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let _file = e.target?.files?.[0];

    reader.onloadend = () => {
      if (_file.size > maxSize.value * Math.pow(1024, unitList.indexOf(maxSize.unit))) {
        confirm('허용 용량을 초과하였습니다!', 'ok');
      } else {
        setData({ file: _file, base64: reader.result });
      }
    };
    _file && reader.readAsDataURL(_file);
    e.target.value = null;
  };

  return (
    <div tabIndex={tabIndex} onKeyDown={onKeyDown} {...containerProps}>
      <input
        type={'file'}
        ref={inputFileRef}
        multiple={multiple}
        accept={accept}
        onChange={onChange}
        style={{ display: 'none' }}
        disabled={disabled}
        {...inputProps}
      />
      <div onClick={onClick}>{children}</div>
    </div>
  );
};

export default FilePicker;
