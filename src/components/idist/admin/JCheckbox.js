/* eslint-disable */
import React, { useMemo } from 'react';
import 'assets/scss/component/jcheckbox.scss';

const JCheckbox = ({ checked, onClick, indeterminate, disabled, label, size = 24 }) => {
  // Todo disabled, label 스타일 적용

  // 체크박스 상태에 따른 이미지
  const src = useMemo(
    () =>
      checked
        ? require('images/components/checkbox/checkbox-checked.svg').default
        : indeterminate
        ? require('images/components/checkbox/indeterminate-checked.svg').default
        : require('images/components/checkbox/checkbox.svg').default,
    [checked, indeterminate]
  );
  const checkedClassName = useMemo(() => (checked || indeterminate ? 'checked' : 'default'), [checked, indeterminate]);

  return (
    <div className="jcheckbox">
      <div
        className={`jcheckbox-image-wrapper jcheckbox-image-wrapper-${checkedClassName}`}
        style={{ width: size + 6, height: size + 6 }}
        onClick={() => onClick(checked, indeterminate)}
      >
        <img src={src} style={{ width: size, height: size, borderRadius: size }} />
      </div>
      <div className="jcheckbox-label">{label}</div>
    </div>
  );
};

export default JCheckbox;
