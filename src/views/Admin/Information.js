import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import 'assets/scss/create.scss';

import { TextInput } from 'components/idist/admin/TextInput';
import RadioButton from 'components/idist/admin/RadioButton';
import FilePicker from 'components/idist/admin/FilePicker';
import JButton from 'components/idist/admin/JButton';
import { AVD, IVD, loadState } from 'views/Admin';
import { fileSizeFM } from 'utils/formatter';
import { categoriesInit } from 'redux/idistStore/admin/categoriesSlice';
import { reqCheckClubName } from 'redux/idistStore/admin/checkClubNameSlice';
import { reqCheckClubAddress } from 'redux/idistStore/admin/checkClubAddressSlice';
import ModifyClubModal from 'components/idist/modal/ModifyClubModal';
import ModifyClubCancelModal from 'components/idist/modal/ModifyClubCancelModal';
import { showModal } from 'redux/idistStore/admin/modalSlice';
import JSelect from 'components/idist/admin/JSelect';
import errorImage from 'images/admin/valid-error.svg';
import nonSelectedImage from 'images/admin/non-selected-image.svg';

function Information() {
  const dispatch = useDispatch();

  const { adminHeaderProps } = useOutletContext();
  const club = useSelector((state) => state.commonAdmin.club);

  const categories = useSelector((state) => state.categories.list);
  const categoryOptions = useMemo(
    () => categories.map((item) => ({ value: item.id, label: item.title })),
    [categories]
  );

  const checkClubNameState = useSelector((state) => state.checkClubName);
  const [nameInputState, setNameInputState] = useState(IVD.success);
  const [nameValid, setNameValid] = useState({ status: loadState.SUCCESS, errorText: ' ' });

  const checkName = (e) => {
    const targetName = e.target.value;
    if (targetName === '') {
      setNameInputState(IVD.error);
      setNameValid({ status: loadState.ERROR, errorText: AVD.errorText.name.empty });
    } else {
      dispatch(reqCheckClubName({ id: club?.id, data: { title: targetName } }));
    }
  };
  useEffect(() => {
    if (checkClubNameState.status === loadState.SUCCESS) {
      setNameValid({ status: checkClubNameState.status, errorText: ' ' });
      setNameInputState(IVD.success);
    }
    if (checkClubNameState.status === loadState.ERROR) {
      setNameValid({ status: checkClubNameState.status, errorText: checkClubNameState.error });
      setNameInputState(IVD.error);
    }
  }, [checkClubNameState]);

  const checkClubAddressState = useSelector((state) => state.checkClubAddress);
  const [tmpAddress, setTmpAddress] = useState(club?.address || '');
  const [addressInputState, setAddressInputState] = useState(IVD.success);
  const [addressValid, setAddressValid] = useState({ status: loadState.SUCCESS, errorText: '' });

  const checkAddress = (e) => {
    const targetAddress = e.target.value;
    if (targetAddress === '') {
      setAddressInputState(IVD.error);
      setAddressValid({ status: loadState.ERROR, errorText: AVD.errorText.address.empty });
    } else {
      dispatch(reqCheckClubAddress({ id: club?.id, data: { address: targetAddress } }));
    }
  };
  useEffect(() => {
    if (checkClubAddressState.status === loadState.SUCCESS) {
      setAddressValid({ status: checkClubAddressState.status, errorText: ' ' });
      setAddressInputState(IVD.success);
    }
    if (checkClubAddressState.status === loadState.ERROR) {
      setAddressValid({ status: checkClubAddressState.status, errorText: checkClubAddressState.error });
      setAddressInputState(IVD.error);
    }
  }, [checkClubAddressState]);

  const [categoryOption, setCategoryOption] = useState('');
  const [categoryInputState, setCategoryInputState] = useState(IVD.success);
  const [categoryValid, setCategoryValid] = useState({ status: loadState.SUCCESS, errorText: '' });
  const checkCategory = (option) => {
    if (!option) {
      setCategoryInputState(IVD.error);
      setCategoryValid({ status: loadState.ERROR, errorText: AVD.errorText.category.empty });
    } else {
      setCategoryInputState(IVD.success);
      setCategoryValid({ status: loadState.SUCCESS, errorText: '' });
    }
  };

  useEffect(() => {
    console.log('Information useEffect');
    if (!categories?.[0]) {
      dispatch(categoriesInit());
    } else {
      setCategoryOption({ value: club?.category, label: categories.find((item) => item.id === club?.category)?.title });
    }
    return () => {};
  }, [categories]);

  const [descriptionInputState, setDescriptionInputState] = useState(IVD.blur);
  const checkDescription = () => {
    if (adminHeaderProps.description === '') {
      setDescriptionInputState(IVD.blur);
    } else {
      setDescriptionInputState(IVD.success);
    }
  };

  const [tags, setTags] = useState([]);
  const [currentTagText, setCurrentTagText] = useState('');
  const addTags = () => {
    // Todo : 태그 추가 유효성 검사 추가하기
    if (currentTagText) {
      const tmpText = currentTagText
        .match(/[a-zA-Z0-9가-힇ㄱ-ㅎㅏ-ㅣぁ-ゔァ-ヴー々〆〤一-龥]/g)
        .join('')
        .toLowerCase();
      const ret = tmpText.charAt(0).toUpperCase() + tmpText.slice(1);
      const tagValid = !tags.includes(ret);
      if (tagValid) {
        setTags((prev) => [...prev, { title: ret }]);
      }
      setCurrentTagText('');
    }
  };
  const onKeyDownTagInput = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      addTags();
    }
  };

  const onChangeCurrentTagText = useCallback((e) => {
    setCurrentTagText(e.target.value);
  }, []);

  const [autoApproval, setAutoApproval] = useState(club?.is_auto_approval ? 'yes' : 'no');

  const clubData = {
    id: club.id
  };

  return (
    <div className="admin">
      <div className="admin-content-wrapper">
        <div className="h-60" />
        {/* Club Name */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.name.title} description={AVD.name.description} isEssential />
            <div className="name">
              <TextInput
                placeholder={AVD.name.placeholder}
                value={adminHeaderProps.title}
                state={nameInputState}
                onChange={(e) => {
                  adminHeaderProps.setTitle(e.target.value);
                  checkName(e);
                }}
                onFocus={() => {
                  setNameInputState(IVD.focus);
                }}
                onBlur={checkName}
                maxLength={60}
              />
              <div className="under-text"> {`${adminHeaderProps.title.length}${AVD.name.extraText}`}</div>
            </div>
          </div>
          {nameValid.status === loadState.ERROR && (
            <div className="form-side-wrapper">
              <div className="form-side-inner">
                <img src={errorImage} alt="error" />
                <div className="error-text">{nameValid.errorText}</div>
              </div>
            </div>
          )}
        </div>

        {/* Club Address */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.address.title} description={AVD.address.description} isEssential />
            <div className="address">
              <div className="url-wrapper">
                <div className="club-url">{AVD.address.url}</div>
                <div className="address-input-wrapper">
                  <TextInput
                    placeholder={AVD.address.placeholder}
                    value={tmpAddress}
                    state={addressInputState}
                    onChange={(e) => {
                      setTmpAddress(e.target.value);
                      checkAddress(e);
                    }}
                    onFocus={() => {
                      setAddressInputState(IVD.focus);
                    }}
                    onBlur={checkAddress}
                    maxLength={20}
                  />
                </div>
              </div>
              <div className="under-text">{`${tmpAddress.length}${AVD.address.extraText}`}</div>
            </div>
          </div>
          {addressValid.status === loadState.ERROR && (
            <div className="form-side-wrapper">
              <div className="form-side-inner">
                <img src={errorImage} alt="error" />
                <div className="error-text">{addressValid.errorText}</div>
              </div>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.category.title} description={AVD.category.description} isEssential />
            <div className="category">
              <JSelect
                options={categoryOptions}
                selectedOption={categoryOption}
                setSelectedOption={(option) => {
                  setCategoryOption(option);
                  checkCategory(option);
                }}
                inputState={categoryInputState}
                placeholder="Select category"
                onBlur={() => checkCategory(categoryOption)}
              />
            </div>
          </div>
          {categoryValid.status === loadState.ERROR && (
            <div className="form-side-wrapper">
              <div className="form-side-inner">
                <img src={errorImage} alt="error" />
                <div className="error-text">{categoryValid.errorText}</div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Image */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.profileImages.title} description={AVD.profileImages.description} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FilePicker
                setState={(state) =>
                  adminHeaderProps.setProfileImage((prev) => ({
                    ...prev,
                    profileImage: { ...prev.profileImage, data: state }
                  }))
                }
                tabIndex={0}
                type="image"
                multiple
                maxSize={{ value: 10, unit: 'mb' }}
              >
                <div className="image-picker">
                  {adminHeaderProps.profileImage.base64 ? (
                    <div className="image-picker-selected-wrapper profile-size">
                      {/* <img
                        className="image-picker-selected profile-size"
                        src={adminHeaderProps.profileImage.base64 || adminHeaderProps.profileImage.url}
                      /> */}
                      <div className="image-picker-selected-hover profile-size">
                        <img src={nonSelectedImage} alt="none" />
                      </div>
                    </div>
                  ) : (
                    <div className="image-picker-default profile-size">
                      <img src={nonSelectedImage} alt="none" />
                    </div>
                  )}
                </div>
              </FilePicker>
              <div
                style={{ marginTop: '3px', fontWeight: 500, fontSize: '16px', lineHeight: '22px', color: '#808080' }}
              >{`${fileSizeFM(adminHeaderProps.profileImage.file.size) || '0'}${AVD.profileImages.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.bannerImage.title} description={AVD.bannerImage.description} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FilePicker
                setState={(state) =>
                  adminHeaderProps.setBannerImage((prev) => ({
                    ...prev,
                    bannerImage: { ...prev.bannerImage, data: state }
                  }))
                }
                tabIndex={0}
                type="image"
                multiple
                maxSize={{ value: 20, unit: 'mb' }}
              >
                <div className="image-picker ">
                  {adminHeaderProps.bannerImage ? (
                    <div className="image-picker-selected-wrapper banner-size">
                      {/* <img
                        className="image-picker-selected banner-size"
                        src={adminHeaderProps.bannerImage.data.base64 || adminHeaderProps.bannerImage.url}
                      /> */}
                      <div className="image-picker-selected-hover banner-size">
                        <img src={nonSelectedImage} alt="none" />
                      </div>
                    </div>
                  ) : (
                    <div className="image-picker-default banner-size">
                      <img src={nonSelectedImage} alt="none" />
                    </div>
                  )}
                </div>
              </FilePicker>
              <div
                style={{ marginTop: '3px', fontWeight: 500, fontSize: '16px', lineHeight: '22px', color: '#808080' }}
              >{`${fileSizeFM(adminHeaderProps.bannerImage.file.size) || '0'}${AVD.bannerImage.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.description.title} description={AVD.description.description} />
            <div className="description-wrapper">
              <textarea
                className={`description-textarea description-textarea-${descriptionInputState}`}
                placeholder={AVD.description.placeholder}
                value={adminHeaderProps.description}
                maxLength={300}
                onChange={(e) => {
                  adminHeaderProps.setDescription((prev) => ({ ...prev, description: e.target.value }));
                }}
                onFocus={() => {}}
                onBlur={() => {
                  checkDescription();
                }}
              />
              <div className="under-text">{`${adminHeaderProps.description.length}${AVD.description.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.tags.title} description={AVD.tags.description} />
            <div className="tags-wrapper">
              <div className="input-tags-wrapper">
                {tags.map((item, index) => {
                  const key = `${index}tag`;
                  return (
                    <button
                      className="input-tags-button"
                      key={key}
                      onClick={() => {
                        setTags((prev) => prev.filter((_, _index) => index !== _index));
                      }}
                    >
                      {`# ${item}`}
                      <div className="input-tags-button-hover">Delete</div>
                    </button>
                  );
                })}
                {tags.length < 8 && (
                  <input
                    className="input-tags-text"
                    onKeyDown={onKeyDownTagInput}
                    type="text"
                    placeholder={AVD.tags.placeholder}
                    value={currentTagText}
                    onChange={onChangeCurrentTagText}
                    onBlur={addTags}
                  />
                )}
              </div>
              <div className="under-text">{`${tags.length}${AVD.tags.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Auto Approval */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.autoApproval.title} />
            <div className="auto-approval-wrapper">
              <RadioButton
                value={autoApproval}
                onChange={(e) => {
                  setAutoApproval(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="submit-button-wrapper">
          <JButton
            label="Cancel"
            outline
            color="none"
            onClick={() => {
              dispatch(showModal({ type: 'modifyClubCancel', data: club.id }));
            }}
            tabIndex={0}
          />
          <JButton
            label="Save"
            onClick={() => {
              dispatch(showModal({ type: 'modifyClub', data: clubData }));
            }}
            tabIndex={0}
            disabled={
              nameValid.status !== loadState.SUCCESS ||
              addressValid.status !== loadState.SUCCESS ||
              categoryValid.status !== loadState.SUCCESS
            }
          />
        </div>
      </div>
      <ModifyClubModal />
      <ModifyClubCancelModal />
    </div>
  );
}

export default Information;

function FormLabel({ title = '', description = '', isEssential = false }) {
  return (
    <div className="form-label">
      <div className="flex-row">
        <div className="form-label-title">{title}</div>
        {isEssential && <div className="form-label-essential" />}
      </div>
      <div className="form-label-description">{description}</div>
    </div>
  );
}
