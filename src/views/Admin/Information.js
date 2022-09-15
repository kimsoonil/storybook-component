import { Header } from 'components/Header';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import 'assets/scss/create.scss';
import { Link, useNavigate } from 'react-router-dom';

import { TextInput } from 'components/admin/TextInput';
import JSelect from 'components/admin/JSelect';
import RadioButton from 'components/admin/RadioButton';
import FilePicker from 'components/admin/FilePicker';
import Tag from 'components/admin/Tag';
import JButton from 'components/admin/JButton';
import { openCreateClubPopup } from 'redux/store/popupSlice';
import { CreateClubPopup } from 'components/popup/CreateClubPopup';
import { admin as constants, loadState } from 'constants';
import { getIdClubInit } from 'redux/store/clubSlice';
import { numFM, fileSizeFM } from 'utils/formatter';
import { categoriesInit } from 'redux/store/admin/categoriesSlice';
import { reqCheckClubName } from 'redux/store/admin/checkClubNameSlice';
import { reqCheckClubAddress } from 'redux/store/admin/checkClubAddressSlice';

const Information = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const outlet = useOutletContext();

  // const _clubId = outlet.club.id || 42;
  const clubState = useSelector((state) => state.club);
  const { isLoading, clubId } = clubState;

  useEffect(() => {
    if (!clubId?.id) {
      dispatch(getIdClubInit(46));
    }
  }, [clubId?.id]);
  const _club = clubId?.data;

  const categories = useSelector((state) => state.categories.list);
  useEffect(() => {
    console.log('Information useEffect');
    if (!categories?.[0]) {
      dispatch(categoriesInit());
    }
    return () => {};
  }, []);

  const checkClubNameState = useSelector((state) => state.checkClubName);
  const [tmpName, setTmpName] = useState(_club?.name || '');
  const [nameInputState, setNameInputState] = useState(constants.inputState.success);
  const [nameValid, setNameValid] = useState({ status: loadState.SUCCESS, errorText: ' ' });

  const checkName = (e) => {
    const _name = e.target.value;
    if (_name === '') {
      setNameInputState(constants.inputState.error);
      setNameValid({ status: loadState.ERROR, errorText: constants.errorText.name.empty });
    } else {
      dispatch(reqCheckClubName({ id: _club?.id, name: _name }));
    }
  };
  useEffect(() => {
    if (checkClubNameState.status === loadState.SUCCESS) {
      setNameValid({ status: checkClubNameState.status, errorText: ' ' });
      setNameInputState(constants.inputState.success);
    }
    if (checkClubNameState.status === loadState.ERROR) {
      setNameValid({ status: checkClubNameState.status, errorText: checkClubNameState.error });
      setNameInputState(constants.inputState.error);
    }
  }, [checkClubNameState]);

  const checkClubAddressState = useSelector((state) => state.checkClubAddress);
  const [tmpAddress, setTmpAddress] = useState(_club?.address || '');
  const [addressInputState, setAddressInputState] = useState(constants.inputState.success);
  const [addressValid, setAddressValid] = useState({ status: loadState.SUCCESS, errorText: '' });

  const checkAddress = (e) => {
    const _address = e.target.value;
    if (_address === '') {
      setAddressInputState(constants.inputState.error);
      setAddressValid({ status: loadState.ERROR, errorText: constants.errorText.address.empty });
    } else {
      dispatch(reqCheckClubAddress({ id: _club?.id, address: _address }));
    }
  };
  useEffect(() => {
    if (checkClubAddressState.status === loadState.SUCCESS) {
      setAddressValid({ status: checkClubAddressState.status, errorText: ' ' });
      setAddressInputState(constants.inputState.success);
    }
    if (checkClubAddressState.status === loadState.ERROR) {
      setAddressValid({ status: checkClubAddressState.status, errorText: checkClubAddressState.error });
      setAddressInputState(constants.inputState.error);
    }
  }, [checkClubAddressState]);

  const [categoryId, setCategoryId] = useState(_club?.category || 'Game');
  const [categoryInputState, setCategoryInputState] = useState(constants.inputState.success);
  const [categoryValid, setCategoryValid] = useState({ status: loadState.SUCCESS, errorText: '' });
  const checkCategory = (e) => {
    if (categoryId < 0) {
      setCategoryInputState(constants.inputState.error);
      setCategoryValid({ status: loadState.ERROR, errorText: constants.errorText.category.empty });
    } else {
      setCategoryInputState(constants.inputState.success);
      setCategoryValid({ status: loadState.SUCCESS, errorText: '' });
    }
  };

  const [profileImageData, setProfileImageData] = useState({
    file: {},
    data: _club?.profileImageUrl || ''
  });

  const [bannerImageData, setBannerImageData] = useState({
    file: {},
    data: _club?.bannerImageUrl || ''
  });

  const [tmpDescription, setTmpDescription] = useState(_club?.description || '');
  const [descriptionInputState, setDescriptionInputState] = useState(constants.inputState.blur);
  const checkDescription = () => {
    if (tmpDescription === '') {
      setDescriptionInputState(constants.inputState.blur);
    } else {
      setDescriptionInputState(constants.inputState.success);
    }
  };

  const [tags, setTags] = useState(_club?.tags || []);
  const [currentTagText, setCurrentTagText] = useState('');
  const onKeyDownTagInput = (e) => {
    if ((e.key === 'Enter') & (e.nativeEvent.isComposing === false)) {
      addTags();
    }
  };
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
        setTags((prev) => [...prev, ret]);
      }
      setCurrentTagText('');
    }
  };
  const onChnageCurrentTagText = useCallback((e) => {
    setCurrentTagText(e.target.value);
  }, []);

  const errorImage = useMemo(() => require('images/admin/valid-error.svg').default, []);

  const [autoApproval, setAutoApproval] = useState(_club?.autoApproval || 1);

  useEffect(() => {
    if (clubId?.data) {
      setTmpName(_club?.name || '');
      setTmpAddress(_club?.address || 'testclub');
      setCategoryId(_club?.category || 7);
      setProfileImageData((prev) => ({ ...prev, data: _club.profileImageUrl }));
      setBannerImageData((prev) => ({ ...prev, data: _club.bannerImageUrl }));
      setTmpDescription(_club?.description || '');
      setTags(_club?.tags || []);
      setAutoApproval(_club?.autoApproval || 1);
    }
  }, [clubId?.data]);

  const club = {
    name: tmpName,
    address: tmpAddress,
    category: categoryId,
    profileImage: profileImageData.data,
    bannerImage: bannerImageData.data,
    description: tmpDescription,
    tags: tags,
    isAutoApproval: autoApproval === 1
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="admin">
      <div className="admin-content-wrapper">
        <div className="h-60"></div>
        {/* Club Name */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={constants.name.title} description={constants.name.description} isEssential={true} />
            <div className="name">
              <TextInput
                placeholder={constants.name.placeholder}
                value={tmpName}
                state={nameInputState}
                onChange={(e) => {
                  setTmpName(e.target.value);
                  checkName(e);
                }}
                onFocus={() => {
                  setNameInputState(constants.inputState.focus);
                }}
                onBlur={checkName}
                maxLength={60}
              />
              <div className="under-text"> {`${tmpName.length}${constants.name.extraText}`}</div>
            </div>
          </div>
          {nameValid.status === loadState.ERROR && (
            <div className="form-side-wrapper">
              <div className="form-side-inner">
                <img src={require('images/admin/valid-error.svg').default} />
                <div className="error-text">{nameValid.errorText}</div>
              </div>
            </div>
          )}
        </div>

        {/* Club Address */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={constants.address.title} description={constants.address.description} isEssential={true} />
            <div className="address">
              <div className="url-wrapper">
                <div className="club-url">{constants.address.url}</div>
                <div className="address-input-wrapper">
                  <TextInput
                    placeholder={constants.address.placeholder}
                    value={tmpAddress}
                    state={addressInputState}
                    onChange={(e) => {
                      setTmpAddress(e.target.value);
                      checkAddress(e);
                    }}
                    onFocus={() => {
                      setAddressInputState(constants.inputState.focus);
                    }}
                    onBlur={checkAddress}
                    maxLength={20}
                  />
                </div>
              </div>
              <div className="under-text">{`${tmpAddress.length}${constants.address.extraText}`}</div>
            </div>
          </div>
          {addressValid.status === loadState.ERROR && (
            <div className="form-side-wrapper">
              <div className="form-side-inner">
                <img src={require('images/admin/valid-error.svg').default} />
                <div className="error-text">{addressValid.errorText}</div>
              </div>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel
              title={constants.category.title}
              description={constants.category.description}
              isEssential={true}
            />
            <div className="category">
              <JSelect
                selectedValue={categories.filter((item) => item.id === categoryId)[0]?.name || ''}
                setSelectedValue={(value) => {
                  setCategoryId(categories.filter((item) => item.name === value)[0]?.id || -1);
                }}
                state={categoryInputState}
                options={categories.map((item) => item.name)}
                placeholder={'Select category'}
                onBlur={checkCategory}
                onFocus={() => {
                  setCategoryValid({ status: loadState.SUCCESS, errorText: '' });
                }}
              />
            </div>
          </div>
          {categoryValid.status === loadState.ERROR && (
            <div className="form-side-wrapper">
              <div className="form-side-inner">
                <img src={require('images/admin/valid-error.svg').default} />
                <div className="error-text">{categoryValid.errorText}</div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Image */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={constants.profileImages.title} description={constants.profileImages.description} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FilePicker
                state={profileImageData.data}
                setState={setProfileImageData}
                tabIndex={0}
                type={'image'}
                multiple={true}
                maxSize={{ value: 10, unit: 'mb' }}
              >
                <div className="image-picker">
                  {profileImageData.data ? (
                    <div className="image-picker-selected-wrapper profile-size">
                      <img className="image-picker-selected profile-size" src={profileImageData.data} />
                      <div className="image-picker-selected-hover profile-size">
                        <img src={require('images/admin/non-selected-image.svg').default} />
                      </div>
                    </div>
                  ) : (
                    <div className="image-picker-default profile-size">
                      <img src={require('images/admin/non-selected-image.svg').default} />
                    </div>
                  )}
                </div>
              </FilePicker>
              <div
                style={{ marginTop: '3px', fontWeight: 500, fontSize: '16px', lineHeight: '22px', color: '#808080' }}
              >{`${fileSizeFM(profileImageData.file.size) || '0'}${constants.profileImages.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={constants.bannerImage.title} description={constants.bannerImage.description} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FilePicker
                state={bannerImageData}
                setState={setBannerImageData}
                tabIndex={0}
                type={'image'}
                multiple={true}
                maxSize={{ value: 20, unit: 'mb' }}
              >
                <div className="image-picker ">
                  {bannerImageData.data ? (
                    <div className="image-picker-selected-wrapper banner-size">
                      <img className="image-picker-selected banner-size" src={bannerImageData.data} />
                      <div className="image-picker-selected-hover banner-size">
                        <img src={require('images/admin/non-selected-image.svg').default} />
                      </div>
                    </div>
                  ) : (
                    <div className="image-picker-default banner-size">
                      <img src={require('images/admin/non-selected-image.svg').default} />
                    </div>
                  )}
                </div>
              </FilePicker>
              <div
                style={{ marginTop: '3px', fontWeight: 500, fontSize: '16px', lineHeight: '22px', color: '#808080' }}
              >{`${fileSizeFM(bannerImageData.file.size) || '0'}${constants.bannerImage.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={constants.description.title} description={constants.description.description} />
            <div className="description-wrapper">
              <textarea
                className={`description-textarea description-textarea-${descriptionInputState}`}
                placeholder={constants.description.placeholder}
                value={tmpDescription}
                maxLength={300}
                onChange={(e) => {
                  const val = e.target.value;
                  setTmpDescription(val);
                }}
                onFocus={() => {}}
                onBlur={() => {
                  checkDescription();
                }}
              ></textarea>
              <div className="under-text">{`${tmpDescription.length}${constants.description.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={constants.tags.title} description={constants.tags.description} />
            <div className="tags-wrapper">
              <div className="input-tags-wrapper">
                {tags.map((item, index) => (
                  <button
                    className="input-tags-button"
                    key={index}
                    onClick={(e) => {
                      setTags((prev) => prev.filter((_item, _index) => index !== _index));
                    }}
                  >
                    {`# ${item.name}`}
                    <div className="input-tags-button-hover">Delete</div>
                  </button>
                ))}
                {tags.length < 8 && (
                  <input
                    className="input-tags-text"
                    onKeyDown={onKeyDownTagInput}
                    type={'text'}
                    placeholder={constants.tags.placeholder}
                    value={currentTagText}
                    onChange={onChnageCurrentTagText}
                    onBlur={addTags}
                  />
                )}
              </div>
              <div className="under-text">{`${tags.length}${constants.tags.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Auto Approval */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={constants.autoApproval.title} />
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
            label={'Cancel'}
            outline
            color={'none'}
            onClick={() => {
              dispatch(openCreateClubPopup({ type: 'modifyCancel', text: constants.popupText.modifyCancel }));
            }}
            tabIndex={0}
          />
          <JButton
            label={'Save'}
            onClick={() => {
              dispatch(openCreateClubPopup({ type: 'modifySave', text: constants.popupText.modifySave, club }));
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
      <CreateClubPopup />
    </div>
  );
};

export default Information;

const FormLabel = ({ title = '', description = '', isEssential = false }) => (
  <div className="form-label">
    <div className="flex-row">
      <div className="form-label-title">{title}</div>
      {isEssential && <div className="form-label-essential" />}
    </div>
    <div className="form-label-description">{description}</div>
  </div>
);
