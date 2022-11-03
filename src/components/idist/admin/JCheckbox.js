import React, { useMemo } from 'react';
import 'assets/scss/component/jcheckbox.scss';

import checkedImage from 'images/components/checkbox/checkbox-checked.svg';
import indeterminateImage from 'images/components/checkbox/indeterminate-checked.svg';
import defaultImage from 'images/components/checkbox/checkbox.svg';

function JCheckbox({ checked, onClick, indeterminate, label, size = 24 }) {
  // Todo disabled, label 스타일 적용

  // 체크박스 상태에 따른 이미지
  const src = useMemo(() => {
    if (checked) {
      return checkedImage;
    }
    if (indeterminate) {
      return indeterminateImage;
    }
    return defaultImage;
  }, [checked, indeterminate]);
  const checkedClassName = useMemo(() => (checked || indeterminate ? 'checked' : 'default'), [checked, indeterminate]);

  return (
    <div className="jcheckbox">
      <div
        className={`jcheckbox-image-wrapper jcheckbox-image-wrapper-${checkedClassName}`}
        style={{ width: size + 6, height: size + 6 }}
        onClick={() => onClick(checked, indeterminate)}
        onKeyDown={(e) => (e.key === 'Enter' ? onClick(checked, indeterminate) : {})}
        tabIndex={0}
        role="button"
      >
        <img src={src} style={{ width: size, height: size, borderRadius: size }} alt="check-icon" />
      </div>
      <div className="jcheckbox-label">{label}</div>
    </div>
  );
}

export default JCheckbox;
