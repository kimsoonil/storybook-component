import React from 'react';
import Select from 'react-select';

const _Select = ({ options }) => {
  const _options = [
    { value: 'GUEST', label: 'Guest' },
    { value: 'MEMBER', label: 'Member' },
    { value: 'STAFF', label: 'Staff' }
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
      backgroundColor: 'pink'
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: 'flex',
      // backgroundColor: 'pink',
      width: 400
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  };

  const customStyles2 = {
    menu: (provided, state) => ({
      ...provided
      // width: state.selectProps.width,
      // borderBottom: '1px dotted pink',
      // color: state.selectProps.menuColor,
      // padding: 20
    }),

    // control: (_, { selectProps: { width } }) => ({
    //   width: width
    // }),

    control: (provided, state) => {
      return { ...provided };
    },

    // singleValue: (provided, state) => {
    //   const opacity = state.isDisabled ? 0.5 : 1;
    //   const transition = 'opacity 300ms';

    //   return { ...provided, opacity, transition };
    // },
    container: (provided, state) => {
      // const border = state.isFocused ? '1px solid #111111' : '1px solid #999999';
      // return { ...provided, border, outline: 'none', borderColor: 'red' };
      return { ...provided };
    },
    indicatorsContainer: (provided, state) => {
      return { ...provided };
    },
    option: (provided, state) => {
      // console.log(state.isFocused);
      return { ...provided };
    }

    // clearIndicator
    // container
    // control
    // dropdownIndicator
    // group
    // groupHeading
    // indicatorsContainer
    // indicatorSeparator
    // input
    // loadingIndicator
    // loadingMessage
    // menu
    // menuList
    // menuPortal
    // multiValue
    // multiValueLabel
    // multiValueRemove
    // noOptionsMessage
    // option
    // placeholder
    // singleValue
    // valueContainer
  };

  return <Select options={_options} styles={customStyles2} is />;
};

export default _Select;
