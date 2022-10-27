/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { openReportHistoryDialog } from 'redux/idistStore/admin/dialogSlice';

function ReportCount({ reportCount }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openReportHistoryDialog(true));
  };

  return (
    <div className="report-count">
      <div className="report-count-button" onClick={handleClick}>
        <div className="report-count-label">{reportCount}</div>
      </div>
    </div>
  );
}

export default ReportCount;

// const ReportInfo = ({ open, anchorEl, onClose }) => {
//   const dispatch = useDispatch();

//   const mock = [
//     { name: 'Kate', detail: 'abusive language, personal attacks, etc', date: '2022. 09. 03' },
//     { name: 'Kate', detail: 'abusive language, personal attacks, etc', date: '2022. 09. 03' },
//     { name: 'Kate', detail: 'abusive language, personal attacks, etc', date: '2022. 09. 03' }
//   ];

//   return (
//     <Popover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={onClose}
//       anchorOrigin={{ horizontal: 40, vertical: 40 }}
//       elevation={4}
//       transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//       PaperProps={{ style: { borderRadius: 0 } }}
//     >
//       <div className="report-info-popover">
//         <div className="close-button-wrapper">
//           <img onClick={onClose} src={require('images/admin/icon-x.svg').default} />
//         </div>
//         <div className="report-table">
//           <div className="report-table-columns">
//             <div>No</div>
//             <div>Reported User</div>
//             <div>Report details</div>
//             <div>Report date</div>
//           </div>
//           <div className="report-table-rows">
//             {mock.map((item, index) => (
//               <div className="report-table-row" key={index}>
//                 <div>{index + 1}</div>
//                 <div>{item.name}</div>
//                 <div>{item.detail}</div>
//                 <div>{item.date}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Popover>
//   );
// };
