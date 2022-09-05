import React from 'react';
import 'assets/scss/component/radio-button.scss';

// Todo radio button 분리 하기
const RadioButton = ({ value, onChange }) => {
  return (
    // <div className="radio-button-container">
    <div className="radio-button-container">
      {/*  */}

      <div className="radio-button-wrapper">
        <label className="radio-button-label">
          <input
            className="default-input"
            type="radio"
            name="radio-button-input"
            checked={value == 1}
            value={1}
            onChange={onChange}
          />
          <div className="checkmark" tabIndex={0} />
          Yes
        </label>
        <div className="radio-button-explain">Sign up immediately without approval</div>
      </div>

      <div className="radio-button-wrapper">
        <label className="radio-button-label">
          <input
            className="default-input"
            type="radio"
            name="radio-button-input"
            checked={value == 0}
            value={0}
            onChange={onChange}
          />
          <div className="checkmark" tabIndex={0} />
          No
        </label>
        <div className="radio-button-explain">Staff must approve to join</div>
      </div>
    </div>
  );
};

export default RadioButton;

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Radio, { RadioProps } from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// const BpIcon = styled('span')(({ theme }) => ({
//   borderRadius: '50%',
//   width: 16,
//   height: 16,
//   boxShadow:
//     theme.palette.mode === 'dark'
//       ? '0 0 0 1px rgb(16 22 26 / 40%)'
//       : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
//   backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
//   backgroundImage:
//     theme.palette.mode === 'dark'
//       ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
//       : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
//   '.Mui-focusVisible &': {
//     outline: '2px auto rgba(19,124,189,.6)',
//     outlineOffset: 2
//   },
//   'input:hover ~ &': {
//     backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5'
//   },
//   'input:disabled ~ &': {
//     boxShadow: 'none',
//     background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)'
//   }
// }));

// const BpCheckedIcon = styled(BpIcon)({
//   backgroundColor: '#137cbd',
//   backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
//   '&:before': {
//     display: 'block',
//     width: 16,
//     height: 16,
//     backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
//     content: '""'
//   },
//   'input:hover ~ &': {
//     backgroundColor: '#106ba3'
//   }
// });

// function BpRadio(props) {
//   return (
//     <Radio
//       sx={{
//         '&:hover': {
//           bgcolor: 'transparent'
//         }
//       }}
//       disableRipple
//       color="default"
//       checkedIcon={<BpCheckedIcon />}
//       icon={<BpIcon />}
//       {...props}
//       // style={{ backgroundColor: 'yellow' }}
//     />
//   );
// }

// export default function CustomizedRadios() {
//   return (
//     <FormControl
//     // style={{ backgroundColor: 'black', flex: 1, margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}
//     >
//       <FormLabel id="demo-customized-radios" />
//       <RadioGroup
//         row
//         defaultValue="Yes"
//         aria-labelledby="demo-customized-radios"
//         name="customized-radios"
//         // style={{ backgroundColor: 'green', margin: 0, padding: 0, display: 'flex', flex: 1 }}
//       >
//         <FormControlLabel
//           value="Yes"
//           control={<BpRadio />}
//           label="Yes"
//           // style={{ backgroundColor: 'blue', flex: 1, margin: 0, padding: 0, display: 'flex' }}
//         />
//         <FormControlLabel
//           value="No"
//           control={<BpRadio />}
//           label="No"
//           // style={{ backgroundColor: 'blue', flex: 1, margin: 0, padding: 0, display: 'flex' }}
//         />
//       </RadioGroup>
//     </FormControl>
//   );
// }
