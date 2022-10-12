import React, { useMemo, useRef } from 'react';
import 'assets/scss/_base.scss';

const FilePicker = ({
  state,
  setState,
  children,
  tabIndex,
  type,
  multiple,
  maxSize = { value: 0, unit: 'byte' },
  ...props
}) => {
  const inputFileRef = useRef();
  const unitList = useMemo(() => ['byte', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'], []);
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
    let _file = e.target?.files?.[0];

    reader.onloadend = () => {
      if (_file.size > maxSize.value * Math.pow(1024, unitList.indexOf(maxSize.unit))) {
        confirm('허용 용량을 초과하였습니다!', 'ok');
      } else {
        setState({ file: _file, base64: reader.result });
      }
    };
    _file && reader.readAsDataURL(_file);
    e.target.value = null;
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
