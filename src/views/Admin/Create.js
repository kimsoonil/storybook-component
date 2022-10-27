import { Header } from 'components/idist/Header';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/scss/create.scss';
import { Link, useNavigate } from 'react-router-dom';

import { TextInput } from 'components/idist/admin/TextInput';
import RadioButton from 'components/idist/admin/RadioButton';
import FilePicker from 'components/idist/admin/FilePicker';
import Tag from 'components/idist/admin/Tag';
import JButton from 'components/idist/admin/JButton';
import CreateClubModal from 'components/idist/modal/CreateClubModal';
import CreateClubCancelModal from 'components/idist/modal/CreateClubCancelModal';
import { AVD, loadState, IVD } from 'views/Admin';
import { numFM, fileSizeFM } from 'utils/formatter';
import { reqCheckClubName, resetCheckClubName } from 'redux/idistStore/admin/checkClubNameSlice';
import { reqCheckClubAddress, resetCheckClubAddress } from 'redux/idistStore/admin/checkClubAddressSlice';
import { categoriesInit } from 'redux/idistStore/admin/categoriesSlice';
import { showModal } from 'redux/idistStore/admin/modalSlice';
import JSelect from 'components/idist/admin/JSelect';

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.list);
  const categoryOptions = useMemo(
    () => categories.map((item) => ({ value: item.id, label: item.title })),
    [categories]
  );

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
  const [nameInputState, setNameInputState] = useState(IVD.blur);
  const [nameValid, setNameValid] = useState({ status: loadState.NONE, errorText: ' ' });

  const checkName = (e) => {
    const _name = e.target.value;
    if (_name === '') {
      setNameInputState(IVD.error);
      setNameValid({ status: loadState.ERROR, errorText: AVD.errorText.name.empty });
    } else {
      dispatch(reqCheckClubName({ data: { title: _name } }));
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
  const [tmpAddress, setTmpAddress] = useState('');
  const [addressInputState, setAddressInputState] = useState(IVD.blur);
  const [addressValid, setAddressValid] = useState({ status: loadState.NONE, errorText: ' ' });
  const checkAddress = (e) => {
    const _address = e.target.value;
    // valid 로직
    if (_address === '') {
      setAddressInputState(IVD.error);
      setAddressValid({ status: loadState.ERROR, errorText: AVD.errorText.address.empty });
    } else {
      dispatch(reqCheckClubAddress({ data: { address: _address } }));
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
  const [categoryInputState, setCategoryInputState] = useState(IVD.blur);
  const [categoryValid, setCategoryValid] = useState({ status: loadState.NONE, errorText: '' });
  const checkCategory = (categoryOption) => {
    if (!categoryOption) {
      setCategoryInputState(IVD.error);
      setCategoryValid({ status: loadState.ERROR, errorText: AVD.errorText.category.empty });
    } else {
      setCategoryInputState(IVD.success);
      setCategoryValid({ status: loadState.SUCCESS, errorText: '' });
    }
  };

  const [profileImageData, setProfileImageData] = useState({
    file: {},
    base64: ''
  });

  const [bannerImageData, setBannerImageData] = useState({
    file: {},
    base64: ''
  });

  const [tmpDescription, setTmpDescription] = useState('');
  const [descriptionInputState, setDescriptionInputState] = useState(IVD.blur);
  const checkDescription = () => {
    if (tmpDescription === '') {
      setDescriptionInputState(IVD.blur);
    } else {
      setDescriptionInputState(IVD.success);
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
  const onChangeCurrentTagText = useCallback((e) => {
    setCurrentTagText(e.target.value);
  }, []);

  const errorImage = useMemo(() => require('images/admin/valid-error.svg').default, []);

  const [autoApproval, setAutoApproval] = useState('yes');

  const _club = {
    title: tmpName,
    address: tmpAddress,
    category: categoryOption.value,
    profile_image: profileImageData.base64,
    banner_image: bannerImageData.base64,
    description: tmpDescription,
    tags: tags,
    is_auto_approval: autoApproval === 'yes'
  };

  return (
    <div className="admin">
      <Header />
      {/* Banner */}
      <div className="admin-banner-wrapper">
        {bannerImageData.base64 && <img className="banner-image" src={bannerImageData.base64} />}

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
            {profileImageData.base64 ? (
              <img className="banner-profile-image" src={profileImageData.base64} />
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
        <div className="headline-title">{AVD.headline.title}</div>
        <div className="headline-description">{AVD.headline.description}</div>

        {/* Club Name */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.name.title} description={AVD.name.description} isEssential={true} />
            <div className="name">
              <TextInput
                placeholder={AVD.name.placeholder}
                value={tmpName}
                state={nameInputState}
                onChange={(e) => {
                  setTmpName(e.target.value);
                  checkName(e);
                }}
                onFocus={() => {
                  setNameInputState(IVD.focus);
                }}
                onBlur={checkName}
                maxLength={60}
              />
              <div className="under-text"> {`${tmpName.length}${AVD.name.extraText}`}</div>
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
            <FormLabel title={AVD.address.title} description={AVD.address.description} isEssential={true} />
            <div className="address">
              <div className="url-wrapper">
                <div className="club-url">{AVD.address.url}</div>
                <div className="address-input-wrapper">
                  <TextInput
                    placeholder={AVD.address.placeholder}
                    value={tmpAddress}
                    state={addressInputState}
                    onChange={(e) => {
                      if (e.target.value.match(/^[a-z0-9]*$/) != null) {
                        checkAddress(e);
                        setTmpAddress(e.target.value);
                      }
                    }}
                    onFocus={() => {
                      setAddressInputState(IVD.focus);
                    }}
                    onBlur={checkAddress}
                    maxLength={20}
                    lowerCase
                  />
                </div>
              </div>
              <div className="under-text">{`${tmpAddress.length}${AVD.address.extraText}`}</div>
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
            <FormLabel title={AVD.category.title} description={AVD.category.description} isEssential={true} />
            <div className="category">
              <JSelect
                options={categoryOptions}
                selectedOption={categoryOption}
                setSelectedOption={(option) => {
                  setCategoryOption(option);
                  checkCategory(option);
                }}
                inputState={categoryInputState}
                placeholder={'Select category'}
                onBlur={() => checkCategory(categoryOption)}
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
            <FormLabel title={AVD.profileImages.title} description={AVD.profileImages.description} />
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
                  {profileImageData.base64 ? (
                    <div className="image-picker-selected-wrapper profile-size">
                      <img className="image-picker-selected profile-size" src={profileImageData.base64} />
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
              >{`${fileSizeFM(profileImageData.file.size) || '0'}${AVD.profileImages.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.bannerImage.title} description={AVD.bannerImage.description} />
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
                  {bannerImageData.base64 ? (
                    <div className="image-picker-selected-wrapper banner-size">
                      <img className="image-picker-selected banner-size" src={bannerImageData.base64} />
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
              >{`${fileSizeFM(bannerImageData.file.size) || '0'}${AVD.bannerImage.extraText}`}</div>
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
              <div className="under-text">{`${tmpDescription.length}${AVD.description.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.tags.title} description={AVD.tags.description} />
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
            label={'Cancel'}
            outline
            color={'none'}
            onClick={() => {
              dispatch(showModal({ type: 'createClubCancel' }));
            }}
            tabIndex={0}
          />
          <JButton
            label={'Create'}
            onClick={() => {
              dispatch(showModal({ type: 'createClub', data: _club }));
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
      <CreateClubModal />
      <CreateClubCancelModal />
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
