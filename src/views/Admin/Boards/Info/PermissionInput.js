import React, { useEffect, useMemo, useRef, useState } from 'react';

import { BVD } from '../index';
import { IVD } from 'views/Admin';
import 'assets/scss/admin/boards.scss';
import useInput from 'hooks/useInput';
import _ from 'lodash';

const PermissionInput = ({ permission, onChange, boardType }) => {
  const onReadChange = (e) => {
    const { value } = e.target;
    const readTier = BVD.permission.staffList.find((staff) => staff.key === value)?.tier || 0;
    const writeTier = BVD.permission.staffList.find((staff) => staff.key === permission.write)?.tier || 0;
    if (readTier > writeTier) {
      onChange({ read: value, write: value });
    } else {
      onChange({ read: value });
    }
  };
  const onReadGradeChange = (e) => {
    const { value } = e.target;
    const readGradeTier = BVD.permission.gradeList.find((grade) => grade.key === value)?.tier || 0;
    const writeGradeTier = BVD.permission.gradeList.find((grade) => grade.key === permission.writeGrade)?.tier || 0;
    if (readGradeTier > writeGradeTier) {
      onChange({ readGrade: value, writeGrade: value });
    } else {
      onChange({ readGrade: value });
    }
  };
  const readGradeDisabled = useMemo(() => permission.read !== BVD.permission.staff.MEMBER, [permission.read]);
  const readGradeGuideText = BVD.permission.readGradeUnderText(_.capitalize(permission.readGrade));

  const onWriteChange = (e) => {
    onChange({ write: e.target.value });
  };
  const onWriteGradeChange = (e) => {
    onChange({ writeGrade: e.target.value });
  };
  const writeList = useMemo(() => {
    const tier = BVD.permission.staffList.find((staff) => staff.key === permission.read)?.tier || 0;
    return BVD.permission.staffList.filter((staff) => staff.tier >= tier);
  }, [permission.read]);
  const writeGradeDisabled = useMemo(() => permission.write !== BVD.permission.staff.MEMBER, [permission.write]);
  const writeGradeGuideText = BVD.permission.writeGradeUnderText(_.capitalize(permission.writeGrade));
  const writeGradeList = useMemo(() => {
    const tier = BVD.permission.gradeList.find((grade) => grade.key === permission.readGrade)?.tier || 0;
    return BVD.permission.gradeList.filter((grade) => grade.tier >= tier);
  }, [permission.readGrade]);

  const disabled = boardType !== 'normal';
  const disabledClassName = disabled ? 'disabled' : '';

  return (
    <div className="boards-contents-permission">
      <div className={`info-title info-title-${disabledClassName}`}>{BVD.permission.title}</div>
      <div className={`info-desc info-desc-${disabledClassName}`}>{BVD.permission.subtitle}</div>

      <div className="permission-row">
        <StaffInput
          label={BVD.permission.read}
          optionList={BVD.permission.staffList}
          value={permission.read}
          onChange={onReadChange}
          disabled={disabled}
        />
        {!disabled && (
          <GradeInput
            label={BVD.permission.readGrade}
            optionList={BVD.permission.gradeList}
            value={permission.readGrade}
            onChange={onReadGradeChange}
            guideText={readGradeGuideText}
            disabled={readGradeDisabled}
          />
        )}
      </div>

      {boardType !== 'media' && (
        <div className="permission-row">
          <StaffInput
            label={BVD.permission.write}
            optionList={writeList}
            value={permission.write}
            onChange={onWriteChange}
            disabled={disabled}
          />
          {!disabled && (
            <GradeInput
              label={BVD.permission.writeGrade}
              optionList={writeGradeList}
              value={permission.writeGrade}
              onChange={onWriteGradeChange}
              guideText={writeGradeGuideText}
              disabled={writeGradeDisabled}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PermissionInput;

const StaffInput = ({ label, optionList, value, onChange, disabled }) => {
  return (
    <div className="permission-input">
      <div className={`permission-input-text staff-label staff-label-${disabled ? 'disabled' : ''}`}>{label}</div>
      <select className="permission-input-select" value={value} onChange={onChange} disabled={disabled}>
        {optionList.map((item) => (
          <option key={item.key} className="permission-input-select-option" value={item.key}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const GradeInput = ({ label, optionList, value, onChange, guideText, disabled }) => (
  <div className="permission-input">
    <div className="permission-input-text grade-label">{label}</div>
    <div className="permission-input-select-wrapper">
      <select
        className="permission-input-select"
        value={disabled ? '-' : value}
        onChange={onChange}
        disabled={disabled}
      >
        {disabled && <option key={'-'}>-</option>}
        {optionList.map((item) => (
          <option key={item.key} className="permission-input-select-option" value={item.key}>
            {item.label}
          </option>
        ))}
      </select>
      {!disabled && <div className="permission-input-guide-text">{guideText}</div>}
    </div>
  </div>
);
