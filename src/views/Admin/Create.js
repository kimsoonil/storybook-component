import { Header } from 'components/Header';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { numFM, fileSizeFM } from 'utils/formatter';
import { reqCheckClubName, resetCheckClubName } from 'redux/store/admin/checkClubNameSlice';
import { reqCheckClubAddress, resetCheckClubAddress } from 'redux/store/admin/checkClubAddressSlice';
import { categoriesInit } from 'redux/store/admin/categoriesSlice';

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.list);

  useEffect(() => {
    console.log('Create index useEffect');
    if (!categories?.[0]) {
      dispatch(categoriesInit());
    }
    init();
    return () => {
      init();
    };
  }, []);
  const init = () => {
    dispatch(resetCheckClubName());
    dispatch(resetCheckClubAddress());
  };

  const checkClubNameState = useSelector((state) => state.checkClubName);
  const [tmpName, setTmpName] = useState('');
  const [nameInputState, setNameInputState] = useState(constants.inputState.blur);
  const [nameValid, setNameValid] = useState({ status: loadState.NONE, errorText: ' ' });

  const checkName = (e) => {
    const _name = e.target.value;
    if (_name === '') {
      setNameInputState(constants.inputState.error);
      setNameValid({ status: loadState.ERROR, errorText: constants.errorText.name.empty });
    } else {
      dispatch(reqCheckClubName({ name: _name }));
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
  const [tmpAddress, setTmpAddress] = useState('');
  const [addressInputState, setAddressInputState] = useState(constants.inputState.blur);
  const [addressValid, setAddressValid] = useState({ status: loadState.NONE, errorText: ' ' });
  const checkAddress = (e) => {
    const _address = e.target.value;
    // valid 로직
    if (_address === '') {
      setAddressInputState(constants.inputState.error);
      setAddressValid({ status: loadState.ERROR, errorText: constants.errorText.address.empty });
    } else {
      dispatch(reqCheckClubAddress({ address: _address }));
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

  const [categoryId, setCategoryId] = useState(-1);
  const [categoryInputState, setCategoryInputState] = useState(constants.inputState.blur);
  const [categoryValid, setCategoryValid] = useState({ status: loadState.NONE, errorText: '' });
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
    data: ''
  });

  const [bannerImageData, setBannerImageData] = useState({
    file: {},
    data: ''
  });

  const [tmpDescription, setTmpDescription] = useState('');
  const [descriptionInputState, setDescriptionInputState] = useState(constants.inputState.blur);
  const checkDescription = () => {
    if (tmpDescription === '') {
      setDescriptionInputState(constants.inputState.blur);
    } else {
      setDescriptionInputState(constants.inputState.success);
    }
  };

  const [tags, setTags] = useState([]);
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
        ?.join('')
        ?.toLowerCase();
      if (tmpText) {
        const ret = tmpText.charAt(0).toUpperCase() + tmpText.slice(1);
        const tagValid = !tags.includes(ret);
        if (tagValid) {
          setTags((prev) => [...prev, ret]);
        }
        setCurrentTagText('');
      } else {
        setCurrentTagText('');
      }
    }
  };
  const onChnageCurrentTagText = useCallback((e) => {
    setCurrentTagText(e.target.value);
  }, []);

  const errorImage = useMemo(() => require('images/admin/valid-error.svg').default, []);

  const [autoApproval, setAutoApproval] = useState(1);

  const _club = {
    name: tmpName,
    address: tmpAddress,
    category: categoryId,
    profileImage: profileImageData.data,
    bannerImage: bannerImageData.data,
    description: tmpDescription,
    tags: tags,
    isAutoApproval: autoApproval === 1
  };

  return (
    <div className="admin">
      <Header />
      {/* Banner */}
      <div className="admin-banner-wrapper">
        {bannerImageData.data && <img className="banner-image" src={bannerImageData.data} />}

        <div className="banner-content-wrapper">
          <button
            className="go-back"
            onClick={() => {
              navigate(-1);
            }}
          >
            {'< Go Back'}
          </button>

          <div className="banner-bottom-wrapper">
            <div className="tag-container">
              {tags.map((item, index) => (
                <Tag key={index} value={item} />
              ))}
            </div>
            {profileImageData.data ? (
              <img className="banner-profile-image" src={profileImageData.data} />
            ) : (
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  marginBottom: '-80px',
                  backgroundColor: '#bdbdbd'
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="admin-title-wrapper">
        <div className={`club-name ${tmpName && `writing`}`}>{tmpName || 'Club Name'}</div>
        <div className={`club-description ${tmpDescription && 'writing'}`}>{tmpDescription || 'Description'}</div>
      </div>

      {/* 구분선 */}
      <hr style={{ margin: 0 }} />

      <div className="admin-content-wrapper">
        <div className="headline-title">{constants.headline.title}</div>
        <div className="headline-description">{constants.headline.description}</div>

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
                <img src={errorImage} />
                <div className="error-text">{nameValid.errorText || ' '}</div>
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
                      if (e.target.value.match(/^[a-z0-9]*$/) != null) {
                        checkAddress(e);
                        setTmpAddress(e.target.value);
                      }
                    }}
                    onFocus={() => {
                      setAddressInputState(constants.inputState.focus);
                    }}
                    onBlur={checkAddress}
                    maxLength={20}
                    lowerCase
                  />
                </div>
              </div>
              <div className="under-text">{`${tmpAddress.length}${constants.address.extraText}`}</div>
            </div>
          </div>
          {addressValid.status === loadState.ERROR && (
            <div className="form-side-wrapper">
              <div className="form-side-inner">
                <img src={errorImage} />
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
                  setCategoryValid({ status: loadState.NONE, errorText: '' });
                }}
              />
            </div>
          </div>
          {categoryValid.status === loadState.ERROR && (
            <div className="form-side-wrapper">
              <div className="form-side-inner">
                <img src={errorImage} />
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
                state={profileImageData}
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
                    {`# ${item}`}
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
              dispatch(openCreateClubPopup({ type: 'cancel', text: constants.popupText.cancel }));
            }}
            tabIndex={0}
          />
          <JButton
            label={'Create'}
            onClick={() => {
              dispatch(openCreateClubPopup({ type: 'create', text: constants.popupText.create, club: _club }));
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

export default Create;

const FormLabel = ({ title = '', description = '', isEssential = false }) => (
  <div className="form-label">
    <div className="flex-row">
      <div className="form-label-title">{title}</div>
      {isEssential && <div className="form-label-essential" />}
    </div>
    <div className="form-label-description">{description}</div>
  </div>
);
