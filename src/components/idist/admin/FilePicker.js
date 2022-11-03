/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useRef } from 'react';

function FilePicker({
  setData,
  tabIndex = 0,
  accept = 'image/*',
  multiple = false,
  maxSize = { value: 0, unit: 'byte' },
  disabled,
  children,
  containerProps,
  inputProps
}) {
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

    const reader = new FileReader();
    const fileData = e.target?.files?.[0];

    reader.onloadend = () => {
      if (fileData.size > maxSize.value * 1024 ** unitList.indexOf(maxSize.unit)) {
        // confirm('허용 용량을 초과하였습니다!', 'ok');
      } else {
        setData({ file: fileData, base64: reader.result });
      }
    };
    if (fileData) {
      reader.readAsDataURL(fileData);
    }
    e.target.value = null;
  };

  return (
    <div tabIndex={tabIndex} onKeyDown={onKeyDown} {...containerProps} role="button">
      <input
        type="file"
        ref={inputFileRef}
        multiple={multiple}
        accept={accept}
        onChange={onChange}
        style={{ display: 'none' }}
        disabled={disabled}
        {...inputProps}
      />
      <div onClick={onClick} onKeyDown={(e) => (e.key === 'Enter' ? onClick(e) : {})} tabIndex={0} role="button">
        {children}
      </div>
    </div>
  );
}

export default FilePicker;
