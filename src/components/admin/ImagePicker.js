import React, { useMemo, useRef } from 'react';
import 'assets/scss/component/image-picker.scss';

const ImagePicker = ({ setImageFile, imageSize, maxSize = { value: 0, unit: 'byte' }, tabIndex = 0 }) => {
  const inputRef = useRef();
  const unitList = useMemo(() => ['byte', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'], []);

  const onClick = () => {
    inputRef.current.click();
  };
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.click();
    }
  };

  const handleInput = (e) => {
    inputRef.current.click();
    e.preventDefault();

    let reader = new FileReader();
    let _file = e.target.files[0];
    reader.onloadend = () => {
      if (_file.size > maxSize.value * Math.pow(1024, unitList.indexOf(maxSize.unit))) {
        confirm('허용 용량을 초과하였습니다!', 'ok');
      } else {
        setImageFile({ file: _file, data: reader.result });
      }
    };
    reader.readAsDataURL(_file);
  };

  return (
    <div className="image-picker-input-wrapper" onClick={onClick} tabIndex={tabIndex} onKeyDown={onKeyDown}>
      <input ref={inputRef} type={'file'} className="jg-hidden" accept="image/*" onChange={handleInput} />
      <img
        src={require('images/admin/non-selected-image.svg').default}
        style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
      />
    </div>
  );
};

export default ImagePicker;
