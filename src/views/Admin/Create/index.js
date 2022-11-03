/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/scss/admin/create.scss';
import 'assets/scss/admin/admin.scss';
import { useNavigate } from 'react-router-dom';

import { TextInput } from 'components/idist/admin/TextInput';
import FilePicker from 'components/idist/admin/FilePicker';
import JButton from 'components/idist/admin/JButton';
import CreateClubModal from 'components/idist/modal/CreateClubModal';
import CreateClubCancelModal from 'components/idist/modal/CreateClubCancelModal';
import { AVD, loadState, IVD } from 'views/Admin';
import { fileSizeFM } from 'utils/formatter';
import { reqCheckClubName, resetCheckClubName } from 'redux/idistStore/admin/checkClubNameSlice';
import { reqCheckClubAddress, resetCheckClubAddress } from 'redux/idistStore/admin/checkClubAddressSlice';
import { categoriesInit } from 'redux/idistStore/admin/categoriesSlice';
import { showModal } from 'redux/idistStore/admin/modalSlice';
import JSelect from 'components/idist/admin/JSelect';
import AdminHeader from 'views/Admin/AdminHeader';
import Header from 'components/common/header/Header';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Loader } from 'components/idist/Loader';
import nonSelectedImage from 'images/admin/non-selected-image.svg';

const VD = {
  header: {
    title: 'Create Super Club and leads clubs and clans',
    subTitle: 'Recruit members with the same interests as you, run and grow your club.'
  },
  name: {
    label: 'Club Name',
    description: 'The club name can be modified 3 months after the last change date.',
    placeholder: 'Please name your club'
  },
  address: {
    label: 'Club Address',
    description: 'The club address cannot be changed later.',
    placeholder: 'Please enter the club address'
  },
  category: {
    label: 'Category',
    description: 'The category can be modified 3 months after the last change date.',
    placeholder: 'Select category'
  },
  profileImage: {
    label: 'Profile Image',
    description: 'The profile image is a representative image of the club.',
    placeholder: ''
  },
  bannerImage: {
    label: 'Banner Image',
    description: 'The banner image is the background image for the top of the club.',
    placeholder: ''
  },
  description: {
    label: 'Description',
    description: 'The banner image is the background image for the top of the club.',
    placeholder: ''
  },
  tags: {
    label: 'Tags',
    description: 'Cafe search terms are reflected in Naver searches.',
    placeholder: 'input tag'
  },
  autoApproval: {
    label: 'Auto Approval',
    yes: {
      label: 'Yes',
      description: 'Sign up immediately without approval'
    },
    no: {
      label: 'No',
      description: 'Staff must approve to join'
    }
  }
};

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rootClassName = useMemo(() => 'admin-create', []);

  const { club, postClubLoading } = useSelector((state) => state.commonAdmin);

  const categories = useSelector((state) => state.categories.list);
  const categoryOptions = useMemo(
    () => categories.map((item) => ({ value: item.id, label: item.title })),
    [categories]
  );

  const init = () => {
    dispatch(resetCheckClubName());
    dispatch(resetCheckClubAddress());
  };
  useEffect(() => {
    if (!categories?.[0]) {
      dispatch(categoriesInit());
    }
    init();
    return () => {
      init();
    };
  }, []);

  useEffect(() => {
    if (club.address) {
      navigate(`/club/${club.address}/admin`);
    }
  }, [club]);

  const checkClubNameState = useSelector((state) => state.checkClubName);
  const [tmpName, setTmpName] = useState('');
  const [nameInputState, setNameInputState] = useState(IVD.blur);
  const [nameValid, setNameValid] = useState({ status: loadState.NONE, errorText: ' ' });

  const checkName = (e) => {
    const targetName = e.target.value;
    if (targetName === '') {
      setNameInputState(IVD.error);
      setNameValid({ status: loadState.ERROR, errorText: AVD.errorText.name.empty });
    } else {
      dispatch(reqCheckClubName({ data: { title: targetName } }));
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
    const targetAddress = e.target.value;
    // valid 로직
    if (targetAddress === '') {
      setAddressInputState(IVD.error);
      setAddressValid({ status: loadState.ERROR, errorText: AVD.errorText.address.empty });
    } else {
      dispatch(reqCheckClubAddress({ data: { address: targetAddress } }));
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
  const checkCategory = (option) => {
    if (!option) {
      setCategoryInputState(IVD.error);
      setCategoryValid({ status: loadState.ERROR, errorText: AVD.errorText.category.empty });
    } else {
      setCategoryInputState(IVD.success);
      setCategoryValid({ status: loadState.SUCCESS, errorText: '' });
    }
  };

  const [profileImage, setProfileImage] = useState({ file: {}, base64: '' });
  const [bannerImage, setBannerImage] = useState({ file: {}, base64: '' });

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
  const onKeyDownTagInput = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      addTags();
    }
  };

  const onChangeCurrentTagText = useCallback((e) => {
    setCurrentTagText(e.target.value);
  }, []);

  const [autoApproval, setAutoApproval] = useState('Yes');
  const handleChange = (event) => setAutoApproval(event.target.value);
  const controlProps = (item) => ({
    checked: autoApproval === item,
    onChange: handleChange,
    value: item,
    label: item,
    name: 'color-radio-button-demo',
    sx: {
      flexDirection: 'row'
    }
  });
  const radioProps = (item) => ({
    inputProps: { 'aria-label': item },
    sx: {
      '&.Mui-checked': {
        color: '#00b78b'
      }
    }
  });

  const clubData = {
    title: tmpName,
    address: tmpAddress,
    club_category: categoryOption.value,
    profile_image: profileImage.base64,
    banner_image: bannerImage.base64,
    description: tmpDescription,
    tags,
    is_auto_approval: autoApproval === 'Yes'
  };

  const profileStyle = useMemo(
    () => (profileImage?.base64 ? { background: `no-repeat center/cover url(${profileImage?.base64})` } : {}),
    [profileImage?.base64]
  );

  const bannerStyle = useMemo(
    () => (bannerImage?.base64 ? { background: `no-repeat center/cover url(${bannerImage?.base64})` } : {}),
    [bannerImage?.base64]
  );

  return (
    <div>
      <Header />
      {postClubLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            marginTop: '400px'
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="admin-root">
          <div className="admin-inner">
            <div className="admin-header-wrapper">
              <AdminHeader
                editable
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                bannerImage={bannerImage}
                setBannerImage={setBannerImage}
                title={tmpName}
                description={tmpDescription}
              />
            </div>

            <div className={`${rootClassName}`}>
              <div className={`${rootClassName}-title`}>{VD.header.title}</div>
              <div className={`${rootClassName}-subtitle`}>{VD.header.subTitle}</div>

              <div className={`${rootClassName}-form`}>
                {/* Club Name */}
                <div className={`${rootClassName}-input-container`}>
                  <div className={`${rootClassName}-input-label`}>{VD.name.label}</div>
                  <div className={`${rootClassName}-input-description`}>{VD.name.description}</div>
                  <div className={`${rootClassName}-input-contents`}>
                    <TextInput
                      placeholder={AVD.name.placeholder}
                      value={tmpName}
                      state={nameInputState}
                      onChange={(e) => {
                        setTmpName(e.target.value);
                        checkName(e);
                      }}
                      onFocus={() => setNameInputState(IVD.focus)}
                      onBlur={checkName}
                      maxLength={30}
                    />
                    {nameValid.status === loadState.ERROR && (
                      <div className={`${rootClassName}-input-valid-text`}>{nameValid.errorText || ' '}</div>
                    )}
                  </div>
                  <div className={`${rootClassName}-input-size-text`}>{`${tmpName.length}${AVD.name.extraText}`}</div>
                </div>

                {/* Address */}
                <div className={`${rootClassName}-input-container`}>
                  <div className={`${rootClassName}-input-label`}>{VD.address.label}</div>
                  <div className={`${rootClassName}-input-description`}>{VD.address.description}</div>

                  <div className={`${rootClassName}-input-contents`}>
                    <div className={`${rootClassName}-input-address`}>
                      <div>{AVD.address.url}</div>
                      <div>
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
                          onFocus={() => setAddressInputState(IVD.focus)}
                          onBlur={checkAddress}
                          maxLength={20}
                          lowerCase
                        />
                      </div>
                    </div>
                    {addressValid.status === loadState.ERROR && (
                      <div className={`${rootClassName}-input-valid-text`}>{addressValid.errorText || ' '}</div>
                    )}
                  </div>

                  <div
                    className={`${rootClassName}-input-size-text`}
                  >{`${tmpAddress.length}${AVD.address.extraText}`}</div>
                </div>

                {/* Category */}
                <div className={`${rootClassName}-input-container`}>
                  <div className={`${rootClassName}-input-label`}>{VD.category.label}</div>
                  <div className={`${rootClassName}-input-description`}>{VD.category.description}</div>
                  <div className={`${rootClassName}-input-contents`}>
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

                    {categoryValid.status === loadState.ERROR && (
                      <div className={`${rootClassName}-input-valid-text`}>{categoryValid.errorText || ' '}</div>
                    )}
                  </div>
                  <div className={`${rootClassName}-input-size-text`} style={{ height: '26px' }} />
                </div>

                {/* Profile Image */}
                <div className={`${rootClassName}-input-container`}>
                  <div className={`${rootClassName}-input-label`}>{VD.profileImage.label}</div>
                  <div className={`${rootClassName}-input-description`}>{VD.profileImage.description}</div>
                  <div className={`${rootClassName}-input-contents`}>
                    <div className={`${rootClassName}-input-profile-wrapper`}>
                      <FilePicker setData={setProfileImage} maxSize={{ value: 10, unit: 'mb' }}>
                        <div className={`${rootClassName}-input-profile`} style={profileStyle}>
                          <div className={`${rootClassName}-input-profile-covered`}>
                            <img src={nonSelectedImage} alt="non-selected" />
                          </div>
                        </div>
                      </FilePicker>
                    </div>
                  </div>

                  <div className={`${rootClassName}-input-size-text`}>{`${fileSizeFM(profileImage.file.size) || '0'}${
                    AVD.profileImages.extraText
                  }`}</div>
                </div>

                {/* Banner Image */}
                <div className={`${rootClassName}-input-container`}>
                  <div className={`${rootClassName}-input-label`}>{VD.bannerImage.label}</div>
                  <div className={`${rootClassName}-input-description`}>{VD.bannerImage.description}</div>
                  <div className={`${rootClassName}-input-contents`}>
                    <FilePicker setData={setBannerImage} maxSize={{ value: 20, unit: 'mb' }}>
                      <div className={`${rootClassName}-input-banner`} style={bannerStyle}>
                        <div className={`${rootClassName}-input-banner-covered`}>
                          <img src={nonSelectedImage} alt="non-selected" />
                        </div>
                      </div>
                    </FilePicker>
                  </div>

                  <div className={`${rootClassName}-input-size-text`}>{`${fileSizeFM(bannerImage.file.size) || '0'}${
                    AVD.bannerImage.extraText
                  }`}</div>
                </div>

                {/* Description */}
                <div className={`${rootClassName}-input-container`}>
                  <div className={`${rootClassName}-input-label`}>{VD.description.label}</div>
                  <div className={`${rootClassName}-input-description`}>{VD.description.description}</div>
                  <div className={`${rootClassName}-input-contents`}>
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
                    />
                  </div>

                  <div
                    className={`${rootClassName}-input-size-text`}
                  >{`${tmpDescription.length}${AVD.description.extraText}`}</div>
                </div>

                {/* Tags */}
                <div className={`${rootClassName}-input-container`}>
                  <div className={`${rootClassName}-input-label`}>{VD.tags.label}</div>
                  <div className={`${rootClassName}-input-description`}>{VD.tags.description}</div>
                  <div className={`${rootClassName}-input-contents`}>
                    <div className="tags-wrapper">
                      <div className="input-tags-wrapper">
                        {tags.map((item, index) => {
                          const key = `tags${index}`;
                          return (
                            <button
                              className="input-tags-button"
                              key={key}
                              onClick={() => {
                                setTags((prev) => prev.filter((_item, _index) => index !== _index));
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
                    </div>
                  </div>

                  <div className={`${rootClassName}-input-size-text`}>{`${tags.length}${AVD.tags.extraText}`}</div>
                </div>

                {/* Auto Approval */}
                <div className={`${rootClassName}-input-container`}>
                  <div style={{ flexDirection: 'row', padding: '50px 0', alignItems: 'center' }}>
                    <div style={{ width: '330px', justifyContent: 'center', marginTop: '-30px' }}>
                      <div className={`${rootClassName}-input-label`}>{VD.autoApproval.label}</div>
                    </div>
                    <div style={{ gap: '20px' }}>
                      <RadioGroup row name="use-radio-group" defaultValue="Yes">
                        <div
                          style={{ width: '400px', cursor: 'pointer' }}
                          onClick={() => setAutoApproval('Yes')}
                          tabIndex={0}
                          onKeyDown={(e) => (e.key === 'Enter' ? setAutoApproval('Yes') : {})}
                          role="button"
                        >
                          <FormControlLabel {...controlProps('Yes')} control={<Radio {...radioProps('Yes')} />} />
                          <div style={{ fontWeight: 500, fontSize: '13px', lineHeight: '22px', color: '#121212' }}>
                            {AVD.autoApproval.yesText}
                          </div>
                        </div>

                        <div
                          style={{ cursor: 'pointer' }}
                          onClick={() => setAutoApproval('No')}
                          tabIndex={0}
                          onKeyDown={(e) => (e.key === 'Enter' ? setAutoApproval('No') : {})}
                          role="button"
                        >
                          <FormControlLabel {...controlProps('No')} control={<Radio {...radioProps('No')} />} />
                          <div style={{ fontWeight: 500, fontSize: '13px', lineHeight: '22px', color: '#121212' }}>
                            {AVD.autoApproval.noText}
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="submit-button-wrapper">
                  <JButton
                    label="Cancel"
                    outline
                    color="none"
                    onClick={() => {
                      dispatch(showModal({ type: 'createClubCancel' }));
                    }}
                    tabIndex={0}
                  />
                  <JButton
                    label="Create"
                    onClick={() => {
                      dispatch(showModal({ type: 'createClub', data: clubData }));
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
            </div>

            <CreateClubModal />
            <CreateClubCancelModal />
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;
