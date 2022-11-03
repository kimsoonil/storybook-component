import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'assets/scss/admin/reports.scss';
import {
  getReportChoicesInit,
  patchReportChoiceInit,
  postReportChoiceInit
} from 'redux/idistStore/admin/reportsSettingAdminSlice';
import JButton from 'components/idist/admin/JButton';

function ReportsSetting() {
  const dispatch = useDispatch();
  const { id: clubId = -1 } = useSelector((state) => state.commonAdmin.club);
  const rootClassName = useMemo(() => 'admin-reports-setting', []);
  const [rcsTrigger, setRcsTrigger] = useState(0);
  useEffect(() => {
    dispatch(getReportChoicesInit({ id: clubId }));
  }, [rcsTrigger]);

  const reportChoicesRedux = useSelector((state) => state.reportsSettingAdmin.reportChoices);

  const [reportChoices, setReportChoices] = useState([]);
  useEffect(() => {
    if (reportChoicesRedux[0]) {
      setReportChoices(reportChoicesRedux);
    }
  }, [reportChoicesRedux]);
  // const isChanged = useMemo(
  //   () => JSON.stringify(reportChoices) === JSON.stringify(reportChoicesRedux),
  //   [reportChoicesRedux, reportChoices]
  // );

  const [editingId, setEditingId] = useState(-1);

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const isChanged = useMemo(
    () => (editTitle && editContent) || (newTitle && newContent),
    [editTitle, editContent, newTitle, newContent]
  );

  const addReportChoice = () => {
    if (editingId > 0) {
      if (!editTitle && !editContent) {
        // confirm('title content 모두 입력해주세요');
        return;
      }
      dispatch(patchReportChoiceInit({ id: editingId, data: { title: editTitle, content: editContent } }));
      setTimeout(() => {
        setRcsTrigger((prev) => prev + 1);
        setEditingId(-1);
      }, 100);
    } else {
      if (!newTitle && !newContent) {
        // confirm('title content 모두 입력해주세요');
        return;
      }
      dispatch(postReportChoiceInit({ id: clubId, data: { title: newTitle, content: newContent } }));
      setTimeout(() => {
        setRcsTrigger((prev) => prev + 1);
      }, 100);
    }
  };

  const onClickEdit = (reportChoice) => {
    if (editingId > -1) {
      // confirm('수정 중인 다른 작업을 완료해주세요');
      return;
    }
    setEditingId(reportChoice.id);
  };

  const onClickActivation = (reportChoice) => {
    dispatch(patchReportChoiceInit({ id: reportChoice.id, data: { is_active: !reportChoice.is_active } }));
  };

  return (
    <div className={`${rootClassName}`}>
      <div className={`${rootClassName}-container`}>
        <div className={`${rootClassName}-choices-container`}>
          {reportChoices.map((reportChoiceItem, reportChoiceIndex) => {
            const key = `report${reportChoiceIndex}`;
            return (
              // console.log(reportChoiceItem);
              <div className={`${rootClassName}-choice-item-container`} key={key}>
                {reportChoiceItem.id === editingId ? (
                  <div className={`${rootClassName}-choice-input-container`}>
                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                  </div>
                ) : (
                  <>
                    <div className={`${rootClassName}-choice-item-title`}>
                      {reportChoiceItem.is_active ? '활성화' : '비활성화'}
                    </div>
                    <div className={`${rootClassName}-choice-item-title`}> {reportChoiceItem.title}</div>
                    <div className={`${rootClassName}-choice-item-content`}> {reportChoiceItem.content}</div>
                    <div style={{ gap: '10px' }}>
                      <JButton label="활성화/비활성화" onClick={() => onClickActivation(reportChoiceItem)} />
                      <JButton label="수정" onClick={() => onClickEdit(reportChoiceItem)} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className={`${rootClassName}-choice-input-container`}>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
        </div>

        <div className={`${rootClassName}-submit-container`}>
          <div style={{ gap: '10px' }}>
            <JButton label="reset" onClick={() => console.log('reset')} />
            <JButton label="save" disabled={!isChanged} onClick={() => addReportChoice({ id: clubId })} />
            {/* <JButton label={'수정'} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsSetting;
