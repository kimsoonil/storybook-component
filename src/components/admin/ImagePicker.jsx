import React, { useRef } from 'react';
import 'assets/scss/component/image-picker.scss';

const ImagePicker = ({ setImageFile, imageSize }) => {
  const inputRef = useRef();

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
      setImageFile({ file: _file, data: reader.result });
    };
    reader.readAsDataURL(_file);
  };

  return (
    <div className="image-picker-input-wrapper" onClick={onClick} tabIndex={0} onKeyDown={onKeyDown}>
      <input ref={inputRef} type={'file'} className="jg-hidden" accept="image/*" onChange={handleInput} />
      <img
        src={require('images/admin/non-selected-image.svg').default}
        style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
      />
    </div>
  );
};

export default ImagePicker;
