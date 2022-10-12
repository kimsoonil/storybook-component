import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IVD } from 'views/Admin';
import ActivationInput from 'views/Admin/Boards/Info/ActivationInput';
import NameInput from 'views/Admin/Boards/Info/NameInput';
import Submit from 'views/Admin/Boards/Info/Submit';

const BoardGroupDetail = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.boardAdmin.selected);

  const [activationLabel, setActivationLabel] = useState();
  const [name, setName] = useState('');
  const [nameInputState, setNameInputState] = useState(IVD.blur);

  const isDefault = useMemo(() => selected?.type === 'DEFAULT', [selected?.type]);

  const onChangeName = (e, isDifferent) => {
    const _value = e.target.value;
    if (isDifferent) {
      if (_value.length <= 20) {
        setSidebarName(_value);
      }
    } else {
      if (_value.length <= 20) {
        setSidebarName(_value);
        setName(_value);
        nameValidation(_value);
      }
    }
  };
  const onFocusNameInput = () => {
    setNameInputState(IVD.focus);
  };
  const onBlurNameInput = () => {
    nameValidation(name);
  };
  const nameValidation = (_value) => {
    if (_value === '') {
      setNameInputState(IVD.error);
    } else {
      setNameInputState(IVD.success);
    }
  };

  return (
    <div>
      <div className="boards-contents ">
        <ActivationInput
          activationLabel={activationLabel}
          onChange={(e) => setActivationLabel(e.target.value)}
          disabled={isDefault}
        />
        <NameInput
          name={name}
          onChange={onChangeName}
          disabled={isDefault}
          inputState={nameInputState}
          onBlur={onBlurNameInput}
          onFocus={onFocusNameInput}
        />
        {!isDefault && (
          <div className="boards-contents-merge">
            <button onClick={() => {}}>MERGING</button>
          </div>
        )}
      </div>
      {/* <Submit
        isDefault={isDefault}
        onClickCancel={onClickGroupCancel}
        cancelDisabled={cancelGroupDisabled}
        onClickDelete={onClickGroupDelete}
        onClickSave={onClickGroupSave}
        saveDisabled={saveGroupDisabled}
      /> */}
    </div>
  );
};

export default BoardGroupDetail;
