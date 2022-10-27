import { Header } from 'components/idist/Header';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import 'assets/scss/create.scss';
import { Link, useNavigate } from 'react-router-dom';

import { TextInput } from 'components/idist/admin/TextInput';
import RadioButton from 'components/idist/admin/RadioButton';
import FilePicker from 'components/idist/admin/FilePicker';
import Tag from 'components/idist/admin/Tag';
import JButton from 'components/idist/admin/JButton';
import { AVD, IVD, loadState } from 'views/Admin';
import { numFM, fileSizeFM } from 'utils/formatter';
import { categoriesInit } from 'redux/idistStore/admin/categoriesSlice';
import { reqCheckClubName } from 'redux/idistStore/admin/checkClubNameSlice';
import { reqCheckClubAddress } from 'redux/idistStore/admin/checkClubAddressSlice';
import ModifyClubModal from 'components/idist/modal/ModifyClubModal';
import ModifyClubCancelModal from 'components/idist/modal/ModifyClubCancelModal';
import { showModal } from 'redux/idistStore/admin/modalSlice';
import JSelect from 'components/idist/admin/JSelect';

const Information = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { club, adminState, setAdminState } = useOutletContext();

  const categories = useSelector((state) => state.categories.list);
  const categoryOptions = useMemo(
    () => categories.map((item) => ({ value: item.id, label: item.title })),
    [categories]
  );

  const checkClubNameState = useSelector((state) => state.checkClubName);
  const [nameInputState, setNameInputState] = useState(IVD.success);
  const [nameValid, setNameValid] = useState({ status: loadState.SUCCESS, errorText: ' ' });

  const checkName = (e) => {
    const _name = e.target.value;
    if (_name === '') {
      setNameInputState(IVD.error);
      setNameValid({ status: loadState.ERROR, errorText: AVD.errorText.name.empty });
    } else {
      dispatch(reqCheckClubName({ id: club?.id, data: { title: _name } }));
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
    const _address = e.target.value;
    if (_address === '') {
      setAddressInputState(IVD.error);
      setAddressValid({ status: loadState.ERROR, errorText: AVD.errorText.address.empty });
    } else {
      dispatch(reqCheckClubAddress({ id: club?.id, data: { address: _address } }));
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
  const checkCategory = (categoryOption) => {
    if (!categoryOption) {
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
      setCategoryOption({ value: club?.category, label: categories.find((item) => item.id === club?.category).title });
    }
    return () => {};
  }, [categories]);

  const [descriptionInputState, setDescriptionInputState] = useState(IVD.blur);
  const checkDescription = () => {
    if (adminState.description === '') {
      setDescriptionInputState(IVD.blur);
    } else {
      setDescriptionInputState(IVD.success);
    }
  };

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
      const tagValid = !adminState.tags.includes(ret);
      if (tagValid) {
        setAdminState((prev) => ({ ...prev, tags: [...prev.tags, { title: ret }] }));
      }
      setCurrentTagText('');
    }
  };
  const onChangeCurrentTagText = useCallback((e) => {
    setCurrentTagText(e.target.value);
  }, []);

  // const errorImage = useMemo(() => require('images/admin/valid-error.svg').default, []);
  const [autoApproval, setAutoApproval] = useState(club?.is_auto_approval ? 'yes' : 'no');

  const _club = {
    id: club.id,
    title: adminState.title,
    address: tmpAddress,
    category: categoryOption.value,
    ...(adminState.bannerImage.data.base64 && { banner_image: adminState.bannerImage.data.base64 }),
    ...(adminState.profileImage.data.base64 && { profile_image: adminState.profileImage.data.base64 }),
    description: adminState.description,
    tags: adminState.tags.map((tag) => tag.title),
    is_auto_approval: autoApproval === 'yes'
  };

  return (
    <div className="admin">
      <div className="admin-content-wrapper">
        <div className="h-60"></div>
        {/* Club Name */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.name.title} description={AVD.name.description} isEssential={true} />
            <div className="name">
              <TextInput
                placeholder={AVD.name.placeholder}
                value={adminState.title}
                state={nameInputState}
                onChange={(e) => {
                  setAdminState((prev) => ({ ...prev, title: e.target.value }));
                  checkName(e);
                }}
                onFocus={() => {
                  setNameInputState(IVD.focus);
                }}
                onBlur={checkName}
                maxLength={60}
              />
              <div className="under-text"> {`${adminState.title.length}${AVD.name.extraText}`}</div>
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
                <img src={require('images/admin/valid-error.svg').default} />
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
                <img src={require('images/admin/valid-error.svg').default} />
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
                  setAdminState((prev) => ({ ...prev, profileImage: { ...prev.profileImage, data: state } }))
                }
                tabIndex={0}
                type={'image'}
                multiple={true}
                maxSize={{ value: 10, unit: 'mb' }}
              >
                <div className="image-picker">
                  {adminState.profileImage.url ? (
                    <div className="image-picker-selected-wrapper profile-size">
                      <img
                        className="image-picker-selected profile-size"
                        src={adminState.profileImage.data.base64 || adminState.profileImage.url}
                      />
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
              >{`${fileSizeFM(adminState.profileImage.data.file.size) || '0'}${AVD.profileImages.extraText}`}</div>
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
                  setAdminState((prev) => ({ ...prev, bannerImage: { ...prev.bannerImage, data: state } }))
                }
                tabIndex={0}
                type={'image'}
                multiple={true}
                maxSize={{ value: 20, unit: 'mb' }}
              >
                <div className="image-picker ">
                  {adminState.bannerImage.url ? (
                    <div className="image-picker-selected-wrapper banner-size">
                      <img
                        className="image-picker-selected banner-size"
                        src={adminState.bannerImage.data.base64 || adminState.bannerImage.url}
                      />
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
              >{`${fileSizeFM(adminState.bannerImage.data.file.size) || '0'}${AVD.bannerImage.extraText}`}</div>
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
                value={adminState.description}
                maxLength={300}
                onChange={(e) => {
                  setAdminState((prev) => ({ ...prev, description: e.target.value }));
                }}
                onFocus={() => {}}
                onBlur={() => {
                  checkDescription();
                }}
              ></textarea>
              <div className="under-text">{`${adminState.description.length}${AVD.description.extraText}`}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="form-wrapper">
          <div className="form-body">
            <FormLabel title={AVD.tags.title} description={AVD.tags.description} />
            <div className="tags-wrapper">
              <div className="input-tags-wrapper">
                {adminState.tags.map((item, index) => (
                  <button
                    className="input-tags-button"
                    key={index}
                    onClick={(e) => {
                      setAdminState((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((_item, _index) => index !== _index)
                      }));
                    }}
                  >
                    {`# ${item.title}`}
                    <div className="input-tags-button-hover">Delete</div>
                  </button>
                ))}
                {adminState.tags.length < 8 && (
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
              <div className="under-text">{`${adminState.tags.length}${AVD.tags.extraText}`}</div>
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
              dispatch(showModal({ type: 'modifyClubCancel', data: club.id }));
            }}
            tabIndex={0}
          />
          <JButton
            label={'Save'}
            onClick={() => {
              dispatch(showModal({ type: 'modifyClub', data: _club }));
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
