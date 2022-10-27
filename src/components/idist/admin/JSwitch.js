import { styled, Switch } from '@mui/material';
import React from 'react';

const JSwitch = ({ checked, onChange, width, height, thumbSize, margin, disabled }) => {
  return (
    <CustomSwitch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      width={width}
      height={height}
      thumb={thumbSize}
      margin={margin}
    />
  );
};

export default JSwitch;

const CustomSwitch = styled(({ ...props }) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, width = 50, height = 28, margin = 3 }) => {
  return {
    width: width,
    height: height,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: margin,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: `translateX(${width - height}px)`,
        color: '#fff',
        '& + .MuiSwitch-track': {
          // backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#9013fe',
          backgroundColor: '#9013fe',
          opacity: 1,
          border: 0
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.2
        }
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#9013fe',
        border: '6px solid #fff'
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        // color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
        // opacity: 0.3
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        // opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
        opacity: 0.3
      }
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      width: height - 2 * margin,
      height: height - 2 * margin
    },
    '& .MuiSwitch-track': {
      borderRadius: height / 2,
      // backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      backgroundColor: '#eee',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500
      })
    }
  };
});
